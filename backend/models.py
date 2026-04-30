# models.py
# This file defines all database tables using SQLAlchemy
# Each class = one table in PostgreSQL

from sqlalchemy import Column, Integer, String, Text, DateTime, JSON, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

# ─────────────────────────────────────────
# TABLE 1: articles
# Stores scraped Wikipedia article data
# ─────────────────────────────────────────
class Article(Base):
    __tablename__ = "articles"

    id              = Column(Integer, primary_key=True, index=True)
    url             = Column(String, unique=True, index=True)  # Wikipedia URL
    title           = Column(String)                           # Article title
    summary         = Column(Text)                             # Article summary
    raw_html        = Column(Text)                             # Raw scraped HTML
    sections        = Column(JSON)                             # List of sections
    key_entities    = Column(JSON)                             # People, orgs, locations
    created_at      = Column(DateTime, default=datetime.utcnow)

    # One article can have many quizzes (regenerate feature)
    quizzes         = relationship("Quiz", back_populates="article")


# ─────────────────────────────────────────
# TABLE 2: quizzes
# Stores generated quiz questions
# ─────────────────────────────────────────
class Quiz(Base):
    __tablename__ = "quizzes"

    id              = Column(Integer, primary_key=True, index=True)
    article_id      = Column(Integer, ForeignKey("articles.id"))  # Link to article
    questions       = Column(JSON)                                 # All questions JSON
    related_topics  = Column(JSON)                                 # Related topics list
    version         = Column(Integer, default=1)                   # Version for regenerate
    created_at      = Column(DateTime, default=datetime.utcnow)

    # Link back to article
    article         = relationship("Article", back_populates="quizzes")

    # One quiz can have many attempts
    attempts        = relationship("QuizAttempt", back_populates="quiz")


# ─────────────────────────────────────────
# TABLE 3: quiz_attempts
# Stores user quiz attempts and scores
# ─────────────────────────────────────────
class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"

    id              = Column(Integer, primary_key=True, index=True)
    quiz_id         = Column(Integer, ForeignKey("quizzes.id"))   # Link to quiz
    user_name       = Column(String)                               # User name
    score           = Column(Integer)                              # Score out of total
    total_questions = Column(Integer)                              # Total questions
    time_taken      = Column(Integer)                              # Time in seconds
    answers         = Column(JSON)                                 # User answers JSON
    created_at      = Column(DateTime, default=datetime.utcnow)

    # Link back to quiz
    quiz            = relationship("Quiz", back_populates="attempts")


# ─────────────────────────────────────────
# TABLE 4: leaderboard
# Stores top scores per quiz
# ─────────────────────────────────────────
class Leaderboard(Base):
    __tablename__ = "leaderboard"

    id              = Column(Integer, primary_key=True, index=True)
    quiz_id         = Column(Integer, ForeignKey("quizzes.id"))   # Link to quiz
    user_name       = Column(String)                               # User name
    score           = Column(Integer)                              # Score
    total_questions = Column(Integer)                              # Total questions
    time_taken      = Column(Integer)                              # Time in seconds
    created_at      = Column(DateTime, default=datetime.utcnow)