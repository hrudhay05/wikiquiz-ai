import requests
from bs4 import BeautifulSoup
from typing import Optional
import re
import json

def scrape_wikipedia(url: str) -> dict:
    """
    Scrape a Wikipedia article and extract structured data.
    Returns: title, summary, raw_html, sections, key_entities
    """
    headers = {
        "User-Agent": "wikiquiz-ai/1.0 (educational project)"
    }

    response = requests.get(url, headers=headers, timeout=10)
    response.raise_for_status()

    soup = BeautifulSoup(response.text, "html.parser")
    raw_html = response.text

    # ── Title ──────────────────────────────────────────────────────────────
    title_tag = soup.find("h1", {"id": "firstHeading"})
    title = title_tag.get_text(strip=True) if title_tag else "Unknown"

    # ── Summary (first non-empty paragraphs before TOC) ───────────────────
    content_div = soup.find("div", {"class": "mw-parser-output"})
    summary_parts = []
    if content_div:
        for tag in content_div.children:
            if tag.name == "div" and "toc" in tag.get("id", ""):
                break
            if tag.name == "p":
                text = tag.get_text(strip=True)
                if text:
                    summary_parts.append(text)
            if len(summary_parts) >= 3:
                break
    summary = " ".join(summary_parts)

    # ── Sections ───────────────────────────────────────────────────────────
    sections = []
    if content_div:
        current_section = None
        current_text = []

        for tag in content_div.find_all(["h2", "h3", "p"]):
            if tag.name in ["h2", "h3"]:
                # Save previous section
                if current_section and current_text:
                    sections.append({
                        "title": current_section,
                        "content": " ".join(current_text).strip()
                    })
                heading_text = tag.get_text(strip=True)
                # Skip navigation sections
                skip_sections = {"See also", "References", "External links",
                                  "Further reading", "Notes", "Bibliography",
                                  "Contents", "Footnotes"}
                if heading_text in skip_sections:
                    current_section = None
                    current_text = []
                else:
                    current_section = heading_text
                    current_text = []
            elif tag.name == "p" and current_section:
                text = tag.get_text(strip=True)
                if text:
                    current_text.append(text)

        # Last section
        if current_section and current_text:
            sections.append({
                "title": current_section,
                "content": " ".join(current_text).strip()
            })

    # Keep only sections with meaningful content
    sections = [s for s in sections if len(s["content"]) > 100][:15]

    # ── Key Entities ───────────────────────────────────────────────────────
    key_entities = extract_key_entities(soup, content_div)

    return {
        "title":        title,
        "summary":      summary,
        "raw_html":     raw_html,
        "sections":     sections,
        "key_entities": key_entities
    }


def extract_key_entities(soup: BeautifulSoup, content_div) -> dict:
    """
    Extract people, organizations, and locations from infobox + first paragraphs.
    Simple heuristic-based extraction using Wikipedia structure.
    """
    people       = set()
    organizations = set()
    locations    = set()

    # ── From infobox ──────────────────────────────────────────────────────
    infobox = soup.find("table", {"class": re.compile(r"infobox")})
    if infobox:
        rows = infobox.find_all("tr")
        for row in rows:
            header = row.find("th")
            data   = row.find("td")
            if not header or not data:
                continue
            label = header.get_text(strip=True).lower()
            value = data.get_text(separator=", ", strip=True)

            if any(k in label for k in ["born", "died", "nationality", "citizenship"]):
                # likely a person article
                pass
            if any(k in label for k in ["location", "headquarters", "country", "city", "region"]):
                for loc in value.split(","):
                    loc = loc.strip()
                    if loc:
                        locations.add(loc)
            if any(k in label for k in ["employer", "organization", "institution", "university", "company"]):
                for org in value.split(","):
                    org = org.strip()
                    if org:
                        organizations.add(org)

    # ── From first 5 paragraphs (capitalized noun phrases heuristic) ──────
    if content_div:
        paragraphs = content_div.find_all("p")[:5]
        for para in paragraphs:
            # Extract linked names (Wikipedia links are usually entities)
            for link in para.find_all("a", href=True):
                href = link.get("href", "")
                text = link.get_text(strip=True)
                if not text or len(text) < 2:
                    continue
                # Skip citation links
                if href.startswith("#") or "cite" in href:
                    continue

                # Heuristic classification by link category
                if any(k in href.lower() for k in ["/wiki/category:people", "born_in", "person"]):
                    people.add(text)
                elif any(k in href.lower() for k in ["university", "institute", "corporation",
                                                       "company", "organization", "foundation"]):
                    organizations.add(text)
                elif any(k in href.lower() for k in ["country", "city", "state", "region",
                                                       "district", "province"]):
                    locations.add(text)
                # Fallback: if title-cased and short, guess by position
                elif text[0].isupper() and 2 <= len(text.split()) <= 4:
                    # Check surrounding text for clues
                    parent_text = para.get_text().lower()
                    if any(w in parent_text for w in ["born", "died", "physicist",
                                                       "mathematician", "scientist", "engineer",
                                                       "philosopher", "politician", "author"]):
                        people.add(text)

    # ── Clean up ──────────────────────────────────────────────────────────
    def clean(s: set) -> list:
        result = []
        for item in s:
            item = re.sub(r"\[.*?\]", "", item).strip()
            if item and len(item) > 1:
                result.append(item)
        return sorted(result)[:10]

    return {
        "people":        clean(people),
        "organizations": clean(organizations),
        "locations":     clean(locations)
    }


def get_article_preview(url: str) -> dict:
    """
    Lightweight preview — fetch only title + summary without storing raw HTML.
    Used by GET /api/quiz/preview
    """
    data = scrape_wikipedia(url)
    return {
        "title":   data["title"],
        "summary": data["summary"][:500] + "..." if len(data["summary"]) > 500 else data["summary"],
        "url":     url
    }


def get_section_titles(sections: list) -> list[str]:
    """Return just the section title strings for storage / display."""
    return [s["title"] for s in sections]


def sections_to_text(sections: list, max_chars: int = 8000) -> str:
    """
    Flatten sections into a single text blob for the LLM prompt.
    Truncates to max_chars to stay within token limits.
    """
    parts = []
    total = 0
    for sec in sections:
        chunk = f"## {sec['title']}\n{sec['content']}\n\n"
        if total + len(chunk) > max_chars:
            remaining = max_chars - total
            if remaining > 200:
                parts.append(chunk[:remaining])
            break
        parts.append(chunk)
        total += len(chunk)
    return "".join(parts)