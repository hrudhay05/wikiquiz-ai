# schemas.py
# This file defines request and response data structures
# Pydantic validates all incoming and outgoing data

from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

# ─────────────────────────────────────────
# QUIZ QUESTION SCHEMA
# Structure of each quiz question
# ─────────────────────────────────────────
class QuizQuestion(BaseModel):
    question    : str                    # Question text
    options     : List[str]              # 4 options A-D
    answer      : str                    # Correct answer
    explanation : str                    # Short explanation
    difficulty  : str                    # easy / medium / hard
    section     : Optional[str] = None  # Article section it came from


# ─────────────────────────────────────────
# KEY ENTITIES SCHEMA
# People, organizations, locations
# ─────────────────────────────────────────
class KeyEntities(BaseModel):
    people        : List[str] = []
    organizations : List[str] = []
    locations     : List[str] = []


# ─────────────────────────────────────────
# REQUEST SCHEMAS
# What frontend sends to backend
# ─────────────────────────────────────────

# Request to generate quiz
class GenerateQuizRequest(BaseModel):
    url           : str                  # Wikipedia URL
    num_questions : Optional[int] = 7   # Number of questions (5-10)
    difficulty    : Optional[str] = "mixed"  # easy/medium/hard/mixed

# Request to submit quiz attempt
class SubmitAttemptRequest(BaseModel):
    quiz_id         : int
    user_name       : str
    score           : int
    total_questions : int
    time_taken      : int                # Time in seconds
    answers         : List[Dict[str, Any]]  # User answers


# ─────────────────────────────────────────
# RESPONSE SCHEMAS
# What backend sends to frontend
# ─────────────────────────────────────────

# Article preview response
class ArticlePreviewResponse(BaseModel):
    title   : str
    summary : str
    url     : str

# Full quiz response
class QuizResponse(BaseModel):
    id             : int
    url            : str
    title          : str
    summary        : str
    key_entities   : KeyEntities
    sections       : List[str]
    quiz           : List[QuizQuestion]
    related_topics : List[str]
    version        : int
    created_at     : datetime

    class Config:
        from_attributes = True

# History list item response
class HistoryItemResponse(BaseModel):
    id             : int
    quiz_id        : int
    url            : str
    title          : str
    total_questions: int
    version        : int
    created_at     : datetime

    class Config:
        from_attributes = True

# Quiz attempt response
class AttemptResponse(BaseModel):
    id              : int
    quiz_id         : int
    user_name       : str
    score           : int
    total_questions : int
    time_taken      : int
    created_at      : datetime

    class Config:
        from_attributes = True

# Leaderboard item response
class LeaderboardItemResponse(BaseModel):
    rank            : int
    user_name       : str
    score           : int
    total_questions : int
    time_taken      : int
    created_at      : datetime

    class Config:
        from_attributes = True