from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from database import get_db
from models import Article, Quiz, QuizAttempt, Leaderboard
from schemas import HistoryItemResponse, LeaderboardItemResponse
from datetime import datetime

router = APIRouter(prefix="/api", tags=["history"])


# ── GET /api/history ──────────────────────────────────────────────────────────
@router.get("/history")
def get_history(
    skip:  int = Query(default=0,  ge=0),
    limit: int = Query(default=20, ge=1, le=100),
    db:    Session = Depends(get_db)
):
    """
    Return all past quizzes with article info.
    Sorted by newest first. Supports pagination.
    """
    quizzes = (
        db.query(Quiz)
        .order_by(desc(Quiz.created_at))
        .offset(skip)
        .limit(limit)
        .all()
    )

    result = []
    for quiz in quizzes:
        article = db.query(Article).filter(Article.id == quiz.article_id).first()
        if not article:
            continue
        result.append({
            "id":              quiz.id,
            "quiz_id":         quiz.id,
            "url":             article.url,
            "title":           article.title,
            "total_questions": len(quiz.questions or []),
            "version":         quiz.version,
            "created_at":      quiz.created_at
        })

    total = db.query(Quiz).count()

    return {
        "total":   total,
        "skip":    skip,
        "limit":   limit,
        "history": result
    }


# ── GET /api/history/{quiz_id} ────────────────────────────────────────────────
@router.get("/history/{quiz_id}")
def get_history_detail(quiz_id: int, db: Session = Depends(get_db)):
    """
    Return full detail of a single quiz including
    all questions and article info.
    """
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    article = db.query(Article).filter(Article.id == quiz.article_id).first()
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")

    # Get all attempts for this quiz
    attempts = (
        db.query(QuizAttempt)
        .filter(QuizAttempt.quiz_id == quiz_id)
        .order_by(desc(QuizAttempt.created_at))
        .all()
    )

    return {
        "quiz_id":         quiz.id,
        "version":         quiz.version,
        "url":             article.url,
        "title":           article.title,
        "summary":         article.summary,
        "key_entities":    article.key_entities or {"people": [], "organizations": [], "locations": []},
        "questions":       quiz.questions or [],
        "related_topics":  quiz.related_topics or [],
        "total_questions": len(quiz.questions or []),
        "created_at":      quiz.created_at,
        "attempts": [
            {
                "id":              a.id,
                "user_name":       a.user_name,
                "score":           a.score,
                "total_questions": a.total_questions,
                "time_taken":      a.time_taken,
                "created_at":      a.created_at
            }
            for a in attempts
        ]
    }


# ── GET /api/history/article ──────────────────────────────────────────────────
@router.get("/history/article/search")
def search_history_by_url(
    url: str,
    db:  Session = Depends(get_db)
):
    """
    Search quiz history by Wikipedia URL.
    Returns all quiz versions for that article.
    """
    article = db.query(Article).filter(Article.url == url).first()
    if not article:
        raise HTTPException(status_code=404, detail="No quiz found for this URL")

    quizzes = (
        db.query(Quiz)
        .filter(Quiz.article_id == article.id)
        .order_by(Quiz.version.asc())
        .all()
    )

    return {
        "url":     article.url,
        "title":   article.title,
        "summary": article.summary[:300],
        "versions": [
            {
                "quiz_id":         q.id,
                "version":         q.version,
                "total_questions": len(q.questions or []),
                "created_at":      q.created_at
            }
            for q in quizzes
        ]
    }


# ── DELETE /api/history/{quiz_id} ─────────────────────────────────────────────
@router.delete("/history/{quiz_id}")
def delete_quiz(quiz_id: int, db: Session = Depends(get_db)):
    """
    Delete a quiz and all its attempts + leaderboard entries.
    Does NOT delete the article (cache stays).
    """
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    # Delete related records first
    db.query(QuizAttempt).filter(QuizAttempt.quiz_id == quiz_id).delete()
    db.query(Leaderboard).filter(Leaderboard.quiz_id  == quiz_id).delete()
    db.delete(quiz)
    db.commit()

    return {"message": f"Quiz {quiz_id} deleted successfully"}


# ── GET /api/attempts/{quiz_id} ───────────────────────────────────────────────
@router.get("/attempts/{quiz_id}")
def get_attempts(quiz_id: int, db: Session = Depends(get_db)):
    """
    Return all attempts for a specific quiz,
    sorted by score desc, time asc.
    """
    quiz = db.query(Quiz).filter(Quiz.id == quiz_id).first()
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")

    attempts = (
        db.query(QuizAttempt)
        .filter(QuizAttempt.quiz_id == quiz_id)
        .order_by(
            desc(QuizAttempt.score),
            QuizAttempt.time_taken.asc()
        )
        .all()
    )

    return {
        "quiz_id":  quiz_id,
        "total":    len(attempts),
        "attempts": [
            {
                "id":              a.id,
                "user_name":       a.user_name,
                "score":           a.score,
                "total_questions": a.total_questions,
                "time_taken":      a.time_taken,
                "answers":         a.answers,
                "created_at":      a.created_at
            }
            for a in attempts
        ]
    }


# ── GET /api/stats ────────────────────────────────────────────────────────────
@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    """
    Global stats for dashboard.
    Returns total articles, quizzes, attempts scraped.
    """
    total_articles = db.query(Article).count()
    total_quizzes  = db.query(Quiz).count()
    total_attempts = db.query(QuizAttempt).count()

    top_articles = (
        db.query(Article)
        .join(Quiz, Quiz.article_id == Article.id)
        .order_by(desc(Article.created_at))
        .limit(5)
        .all()
    )

    return {
        "total_articles": total_articles,
        "total_quizzes":  total_quizzes,
        "total_attempts": total_attempts,
        "recent_articles": [
            {
                "title":      a.title,
                "url":        a.url,
                "created_at": a.created_at
            }
            for a in top_articles
        ]
    }