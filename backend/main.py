import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from database import engine, Base
from routers.quiz import router as quiz_router
from routers.history import router as history_router

load_dotenv()

APP_HOST = os.getenv("APP_HOST", "0.0.0.0")
APP_PORT = int(os.getenv("APP_PORT", "8000"))

# ── Create all DB tables on startup ───────────────────────────────────────────
Base.metadata.create_all(bind=engine)

# ── FastAPI app ───────────────────────────────────────────────────────────────
app = FastAPI(
    title       = "WikiQuiz AI",
    description = "Generate quizzes from any Wikipedia article using Gemini AI",
    version     = "1.0.0",
    docs_url    = "/docs",
    redoc_url   = "/redoc"
)

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins     = ["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials = True,
    allow_methods     = ["*"],
    allow_headers     = ["*"]
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(quiz_router)
app.include_router(history_router)


# ── Root ──────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {
        "app":     "WikiQuiz AI",
        "version": "1.0.0",
        "status":  "running",
        "docs":    "/docs"
    }


# ── Health check ──────────────────────────────────────────────────────────────
@app.get("/health")
def health():
    try:
        from database import SessionLocal
        db = SessionLocal()
        db.execute(__import__("sqlalchemy").text("SELECT 1"))
        db.close()
        db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"

    return {
        "status":   "ok",
        "database": db_status
    }


# ── Run ───────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host   = APP_HOST,
        port   = APP_PORT,
        reload = True
    )