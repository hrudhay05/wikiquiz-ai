import os
import json
import re
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL   = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

# ── LLM instance (shared) ─────────────────────────────────────────────────────
def get_llm(temperature: float = 0.7):
    return ChatGoogleGenerativeAI(
        model       = GEMINI_MODEL,
        google_api_key = GEMINI_API_KEY,
        temperature = temperature,
        convert_system_message_to_human = True
    )


# ── Quiz prompt template ──────────────────────────────────────────────────────
QUIZ_PROMPT_TEMPLATE = """
You are an expert quiz maker. Based on the Wikipedia article content below, generate exactly {num_questions} multiple choice questions.

Article Title: {title}
Article Content:
{content}

Rules:
- Each question must have exactly 4 options labeled A, B, C, D
- Only one option is correct
- Include a clear explanation for the correct answer
- Difficulty must be one of: easy, medium, hard
- If difficulty is "mixed", distribute questions across easy/medium/hard
- Include the section name the question is based on
- Questions must be factual and based strictly on the article

Respond ONLY with a valid JSON array. No preamble, no markdown, no backticks.

Format:
[
  {{
    "question": "Question text here?",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A. option1",
    "explanation": "Explanation why A is correct",
    "difficulty": "easy",
    "section": "Section name"
  }}
]
"""

# ── Topics prompt template ────────────────────────────────────────────────────
TOPICS_PROMPT_TEMPLATE = """
Based on the Wikipedia article about "{title}", suggest exactly 6 related topics that a curious reader might want to explore next.

Article summary: {summary}

Respond ONLY with a valid JSON array of 6 strings. No preamble, no markdown, no backticks.

Format:
["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6"]
"""


# ── Clean raw LLM output ──────────────────────────────────────────────────────
def clean_json_response(text: str) -> str:
    """Strip markdown fences and whitespace from LLM output."""
    text = text.strip()
    # Remove ```json ... ``` or ``` ... ```
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return text.strip()


# ── Generate quiz questions ───────────────────────────────────────────────────
def generate_quiz(
    title: str,
    content: str,
    num_questions: int = 7,
    difficulty: str = "mixed"
) -> list[dict]:
    """
    Call Gemini to generate quiz questions from article content.
    Returns a list of question dicts.
    """
    llm = get_llm(temperature=0.7)

    prompt = PromptTemplate(
        input_variables=["title", "content", "num_questions", "difficulty"],
        template=QUIZ_PROMPT_TEMPLATE
    )

    chain = LLMChain(llm=llm, prompt=prompt)

    raw = chain.run(
        title         = title,
        content       = content,
        num_questions = num_questions,
        difficulty    = difficulty
    )

    cleaned = clean_json_response(raw)

    try:
        questions = json.loads(cleaned)
    except json.JSONDecodeError:
        # Try extracting JSON array from response
        match = re.search(r"\[.*\]", cleaned, re.DOTALL)
        if match:
            questions = json.loads(match.group())
        else:
            raise ValueError(f"Could not parse quiz JSON from LLM response:\n{raw}")

    # Validate structure
    validated = []
    for q in questions:
        if all(k in q for k in ["question", "options", "answer", "explanation", "difficulty"]):
            if len(q["options"]) == 4:
                validated.append({
                    "question":    q["question"],
                    "options":     q["options"],
                    "answer":      q["answer"],
                    "explanation": q["explanation"],
                    "difficulty":  q["difficulty"].lower(),
                    "section":     q.get("section", "General")
                })

    if not validated:
        raise ValueError("No valid questions parsed from LLM response")

    return validated


# ── Generate related topics ───────────────────────────────────────────────────
def generate_related_topics(title: str, summary: str) -> list[str]:
    """
    Call Gemini to suggest 6 related Wikipedia topics.
    Returns a list of topic strings.
    """
    llm = get_llm(temperature=0.9)

    prompt = PromptTemplate(
        input_variables=["title", "summary"],
        template=TOPICS_PROMPT_TEMPLATE
    )

    chain = LLMChain(llm=llm, prompt=prompt)

    raw = chain.run(title=title, summary=summary)
    cleaned = clean_json_response(raw)

    try:
        topics = json.loads(cleaned)
    except json.JSONDecodeError:
        match = re.search(r"\[.*\]", cleaned, re.DOTALL)
        if match:
            topics = json.loads(match.group())
        else:
            # Fallback: split by newlines
            topics = [t.strip().strip('"').strip("'") for t in raw.split("\n") if t.strip()]

    return [str(t) for t in topics[:6]]


# ── Combined: generate quiz + topics together ─────────────────────────────────
def generate_quiz_and_topics(
    title: str,
    content: str,
    summary: str,
    num_questions: int = 7,
    difficulty: str = "mixed"
) -> dict:
    """
    Main entry point called by the router.
    Returns { questions: [...], related_topics: [...] }
    """
    questions      = generate_quiz(title, content, num_questions, difficulty)
    related_topics = generate_related_topics(title, summary)

    return {
        "questions":      questions,
        "related_topics": related_topics
    }