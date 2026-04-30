from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models import Article, Quiz, QuizAttempt, Leaderboard
from schemas import (
    GenerateQuizRequest,
    QuizResponse,
    ArticlePreviewResponse,
    SubmitAttemptRequest,
    AttemptResponse,
    QuizQuestion,
    KeyEntities
)
from scraper import scrape_wikipedia, get_article_preview, sections_to_text, get_section_titles
from llm_chain import generate_quiz_and_topics, generate_quiz
from prompts.quiz_prompt import format_regenerate_prompt
from datetime import datetime
import json

router = APIRouter(prefix="/api/quiz", tags=["quiz"])


# ── Helper: serialize quiz for response ───────────────────────────────────────
def build_quiz_response(article: Article, quiz: Quiz) -> dict:
    return {
        "id":             quiz.id,
        "url":            article.url,
        "title":          article.title,
        "summary":        article.summary,
        "key_entities":   article.key_entities or {"people": [], "organizations": [], "locations": []},
        "sections":       get_section_titles(article.sections or []),
        "quiz":           quiz.questions,
        "related_topics": quiz.related_topics or [],
        "version":        quiz.version,
        "created_at":     quiz.created_at
    }


# ── POST /api/quiz/generate ───────────────────────────────────────────────────
@router.post("/generate")
def generate_quiz_endpoint(
    request: GenerateQuizRequest,
    db: Session = Depends(get_db)
):
    """
    Main endpoint:
    1. Check if article already cached in DB
    2. If not, scrape Wikipedia
    3. Generate quiz via Gemini
    4. Store article + quiz in DB
    5. Return full quiz response
    """
    url = request.url.strip()

    # ── Check cache ───────────────────────────────────────────────────────
    existing_article = db.query(Article).filter(Article.url == url).first()

    if existing_article:
        # Article cached — generate new quiz version
        last_quiz = (
            db.query(Quiz)
            .filter(Quiz.article_id == existing_article.id)
            .order_by(Quiz.version.desc())
            .first()
        )
        next_version = (last_quiz.version + 1) if last_quiz else 1

        content   = sections_to_text(existing_article.sections or [])
        llm_result = generate_quiz_and_topics(
            title         = existing_article.title,
            content       = content,
            summary       = existing_article.summary,
            num_questions = request.num_questions,
            difficulty    = request.difficulty
        )

        new_quiz = Quiz(
            article_id     = existing_article.id,
            questions      = llm_result["questions"],
            related_topics = llm_result["related_topics"],
            version        = next_version,
            created_at     = datetime.utcnow()
        )
        db.add(new_quiz)
        db.commit()
        db.refresh(new_quiz)

        return build_quiz_response(existing_article, new_quiz)

    # ── Fresh scrape ──────────────────────────────────────────────────────
    try:
        scraped = scrape_wikipedia(url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to scrape URL: {str(e)}")

    # ── Save article ──────────────────────────────────────────────────────
    article = Article(
        url          = url,
        title        = scraped["title"],
        summary      = scraped["summary"],
        raw_html     = scraped["raw_html"],
        sections     = scraped["sections"],
        key_entities = scraped["key_entities"],
        created_at   = datetime.utcnow()
    )
    db.add(article)
    db.commit()
    db.refresh(article)

    # ── Generate quiz ─────────────────────────────────────────────────────
    try:
        content    = sections_to_text(scraped["sections"])
        llm_result = generate_quiz_and_topics(
            title         = scraped["title"],
            content       = content,
            summary       = scraped["summary"],
            num_questions = request.num_questions,
            difficulty    = request.difficulty
        )
    except Exception as e:
        # Rollback article if LLM fails
        db.delete(article)
        db.commit()
        raise HTTPException(status_code=500, detail=f"Quiz generation failed: {str(e)}")

    # ── Save quiz ─────────────────────────────────────────────────────────
    quiz = Quiz(
        article_id     = article.id,
        questions      = llm_result["questions"],
        related_topics = llm_result["related_topics"],
        version        = 1,
        created_at     = datetime.utcnow()
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)

    return build_quiz_response(article, quiz)


# ── GET /api/quiz/preview ─────────────────────────────────────────────────────
@router.get("/preview")
def preview_article(url: str, db: Session = Depends(get_db)):
    """
    Lightweight preview before generating quiz.
    Returns title + summary only.
    """
    # Check cache first
    existing = db.query(Article).filter(Article.url == url).first()
    if existing:
        return ArticlePreviewResponse(
            title   = existing.title,
            summary = existing.summary[:500],
            url     = url
        )

    try:
        preview = get_article_preview(url)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch article: {str(e)}")

    return ArticlePreviewResponse(
        title   = preview["title"],
        summary = preview["summary"],
        url     = url
    )


# ── GET /api/quiz/{id} ────────────────────────────────────────────────────────
@router.get("/{quiz_id}")
def get_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """Get a specific quiz by ID."""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    article = db.query(Article).filter(Article.id == quiz.article_id).first()
    return build_quiz_response(article, quiz)


# ── GET /api/quiz/{id}/versions ───────────────────────────────────────────────
@router.get("/{quiz_id}/versions")
def get_quiz_versions(quiz_id: int, db: Session = Depends(get_db)):
    """Get all versions of a quiz for a given article."""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    all_versions = (
        db.query(Quiz)
        .filter(Quiz.article_id == quiz.article_id)
        .order_by(Quiz.version.asc())
        .all()
    )

    article = db.query(Article).filter(Article.id == quiz.article_id).first()

    return {
        "article_title": article.title,
        "url":           article.url,
        "versions": [
            {
                "quiz_id":    v.id,
                "version":    v.version,
                "questions":  len(v.questions),
                "created_at": v.created_at
            }
            for v in all_versions
        ]
    }


# ── POST /api/quiz/{id}/regenerate ────────────────────────────────────────────
@router.post("/{quiz_id}/regenerate")
def regenerate_quiz(
    quiz_id: int,
    request: GenerateQuizRequest,
    db: Session = Depends(get_db)
):
    """
    Generate fresh questions for the same article,
    avoiding repeating previous questions.
    """
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    article = db.query(Article).filter(Article.id == quiz.article_id).first()

    # Collect all previous questions across versions
    all_versions = (
        db.query(Quiz)
        .filter(Quiz.article_id == article.id)
        .all()
    )
    previous_questions = []
    for v in all_versions:
        previous_questions.extend(v.questions or [])

    content = sections_to_text(article.sections or [])

    # Use regenerate prompt
    from llm_chain import get_llm, clean_json_response
    from langchain.prompts import PromptTemplate
    from langchain.chains import LLMChain
    import json, re

    regen_prompt_text = format_regenerate_prompt(
        title              = article.title,
        content            = content,
        previous_questions = previous_questions,
        num_questions      = request.num_questions
    )

    llm   = get_llm(temperature=0.9)
    raw   = llm.invoke(regen_prompt_text).content
    clean = clean_json_response(raw)

    try:
        questions = json.loads(clean)
    except Exception:
        match = re.search(r"\[.*\]", clean, re.DOTALL)
        if match:
            questions = json.loads(match.group())
        else:
            raise HTTPException(status_code=500, detail="Failed to parse regenerated questions")

    # Get related topics from latest version
    last_version = max(all_versions, key=lambda v: v.version)
    next_version = last_version.version + 1

    new_quiz = Quiz(
        article_id     = article.id,
        questions      = questions,
        related_topics = last_version.related_topics,
        version        = next_version,
        created_at     = datetime.utcnow()
    )
    db.add(new_quiz)
    db.commit()
    db.refresh(new_quiz)

    return build_quiz_response(article, new_quiz)


# ── POST /api/attempt ─────────────────────────────────────────────────────────
@router.post("/attempt")
def submit_attempt(
    request: SubmitAttemptRequest,
    db: Session = Depends(get_db)
):
    """Submit a quiz attempt and save to leaderboard if score qualifies."""
    quiz = db.query(Quiz).filter(Quiz.id == request.quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    # Save attempt
    attempt = QuizAttempt(
        quiz_id         = request.quiz_id,
        user_name       = request.user_name,
        score           = request.score,
        total_questions = request.total_questions,
        time_taken      = request.time_taken,
        answers         = request.answers,
        created_at      = datetime.utcnow()
    )
    db.add(attempt)

    # Save to leaderboard
    lb_entry = Leaderboard(
        quiz_id         = request.quiz_id,
        user_name       = request.user_name,
        score           = request.score,
        total_questions = request.total_questions,
        time_taken      = request.time_taken,
        created_at      = datetime.utcnow()
    )
    db.add(lb_entry)
    db.commit()
    db.refresh(attempt)

    return AttemptResponse(
        id              = attempt.id,
        quiz_id         = attempt.quiz_id,
        user_name       = attempt.user_name,
        score           = attempt.score,
        total_questions = attempt.total_questions,
        time_taken      = attempt.time_taken,
        created_at      = attempt.created_at
    )


# ── GET /api/leaderboard/{id} ─────────────────────────────────────────────────
@router.get("/leaderboard/{quiz_id}")
def get_leaderboard(quiz_id: int, db: Session = Depends(get_db)):
    """Get top 10 leaderboard entries for a quiz."""
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    entries = (
        db.query(Leaderboard)
        .filter(Leaderboard.quiz_id == quiz_id)
        .order_by(Leaderboard.score.desc(), Leaderboard.time_taken.asc())
        .limit(10)
        .all()
    )

    return {
        "quiz_id": quiz_id,
        "leaderboard": [
            {
                "rank":            idx + 1,
                "user_name":       e.user_name,
                "score":           e.score,
                "total_questions": e.total_questions,
                "time_taken":      e.time_taken,
                "created_at":      e.created_at
            }
            for idx, e in enumerate(entries)
        ]
    }