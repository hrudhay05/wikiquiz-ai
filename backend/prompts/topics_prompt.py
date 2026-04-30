TOPICS_SYSTEM_PROMPT = """
You are a knowledgeable Wikipedia curator who suggests relevant related topics
for curious readers who want to explore further after reading an article.
"""

TOPICS_PROMPT_TEMPLATE = """
Based on the Wikipedia article about "{title}", suggest exactly 6 related topics
that a curious reader might want to explore next.

Article summary:
{summary}

Key entities mentioned:
- People: {people}
- Organizations: {organizations}
- Locations: {locations}

Rules:
- Topics should be real Wikipedia article titles
- Mix of directly related and broader context topics
- No duplicates
- Each topic should be genuinely interesting to explore

Respond ONLY with a valid JSON array of exactly 6 strings.
No preamble, no markdown, no backticks.

Format:
["Topic 1", "Topic 2", "Topic 3", "Topic 4", "Topic 5", "Topic 6"]
"""


def format_topics_prompt(
    title: str,
    summary: str,
    key_entities: dict = None
) -> str:
    """Return the filled topics prompt string."""
    if key_entities is None:
        key_entities = {}

    people        = ", ".join(key_entities.get("people", []))        or "none"
    organizations = ", ".join(key_entities.get("organizations", [])) or "none"
    locations     = ", ".join(key_entities.get("locations", []))     or "none"

    return TOPICS_PROMPT_TEMPLATE.format(
        title         = title,
        summary       = summary[:800],
        people        = people,
        organizations = organizations,
        locations     = locations
    )