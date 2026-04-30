QUIZ_SYSTEM_PROMPT = """
You are an expert quiz maker specializing in creating educational multiple choice questions from Wikipedia articles.
Your questions are clear, factual, and directly based on the provided content.
You never make up facts or add information not present in the article.
"""

QUIZ_PROMPT_TEMPLATE = """
You are an expert quiz maker. Based on the Wikipedia article content below, generate exactly {num_questions} multiple choice questions.

Article Title: {title}
Article Content:
{content}

Difficulty requested: {difficulty}

Rules:
- Each question must have exactly 4 options labeled A, B, C, D
- Only one option is correct
- Include a clear explanation for the correct answer
- Difficulty must be one of: easy, medium, hard
- If difficulty is "mixed", distribute evenly across easy / medium / hard
- Include the section name the question is based on
- Questions must be strictly factual — no opinions, no assumptions
- Avoid trivial questions like dates unless they are very significant
- Make distractors (wrong options) plausible, not obviously wrong

Respond ONLY with a valid JSON array. No preamble, no markdown, no backticks.

Format:
[
  {{
    "question": "Question text here?",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A. option1",
    "explanation": "Explanation why A is correct",
    "difficulty": "easy",
    "section": "Section name from article"
  }}
]
"""

REGENERATE_PROMPT_TEMPLATE = """
You are an expert quiz maker. The user wants FRESH questions about the same article.

Article Title: {title}
Article Content:
{content}

Previously asked questions (DO NOT repeat these):
{previous_questions}

Generate exactly {num_questions} NEW multiple choice questions that are different from the ones above.

Rules:
- Each question must have exactly 4 options labeled A, B, C, D
- Only one option is correct
- Include a clear explanation for the correct answer
- Difficulty must be one of: easy, medium, hard
- Include the section name the question is based on
- Focus on different aspects, sections, or facts than the previous questions

Respond ONLY with a valid JSON array. No preamble, no markdown, no backticks.

Format:
[
  {{
    "question": "Question text here?",
    "options": ["A. option1", "B. option2", "C. option3", "D. option4"],
    "answer": "A. option1",
    "explanation": "Explanation why A is correct",
    "difficulty": "medium",
    "section": "Section name from article"
  }}
]
"""

DIFFICULTY_INSTRUCTIONS = {
    "easy":   "Focus on basic facts, definitions, and well-known information from the article.",
    "medium": "Focus on specific details, relationships between concepts, and moderately known facts.",
    "hard":   "Focus on nuanced details, lesser-known facts, and complex relationships in the article.",
    "mixed":  "Mix questions: roughly 2 easy, 3 medium, 2 hard (adjust proportionally for other counts)."
}


def get_difficulty_instruction(difficulty: str) -> str:
    return DIFFICULTY_INSTRUCTIONS.get(difficulty.lower(), DIFFICULTY_INSTRUCTIONS["mixed"])


def format_quiz_prompt(
    title: str,
    content: str,
    num_questions: int = 7,
    difficulty: str = "mixed"
) -> str:
    """Return the filled quiz prompt string."""
    return QUIZ_PROMPT_TEMPLATE.format(
        title         = title,
        content       = content,
        num_questions = num_questions,
        difficulty    = f"{difficulty} — {get_difficulty_instruction(difficulty)}"
    )


def format_regenerate_prompt(
    title: str,
    content: str,
    previous_questions: list[dict],
    num_questions: int = 7
) -> str:
    """Return the filled regenerate prompt string."""
    prev_text = "\n".join(
        f"- {q['question']}" for q in previous_questions
    )
    return REGENERATE_PROMPT_TEMPLATE.format(
        title              = title,
        content            = content,
        previous_questions = prev_text,
        num_questions      = num_questions
    )