import { useState, useCallback } from "react";

const API = "http://localhost:8000";

export default function useQuiz() {
  const [quiz,    setQuiz]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");

  // ── Generate quiz ──────────────────────────────────────────────────────
  const generateQuiz = useCallback(async ({ url, num_questions, difficulty }) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/quiz/generate`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ url, num_questions, difficulty })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to generate quiz");
      }
      const data = await res.json();
      setQuiz(data);
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Fetch quiz by ID ───────────────────────────────────────────────────
  const fetchQuiz = useCallback(async (quizId) => {
    setLoading(true);
    setError("");
    try {
      const res  = await fetch(`${API}/api/quiz/${quizId}`);
      if (!res.ok) throw new Error("Quiz not found");
      const data = await res.json();
      setQuiz(data);
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Regenerate quiz ────────────────────────────────────────────────────
  const regenerateQuiz = useCallback(async (quizId, numQuestions = 7) => {
    if (!quiz) return null;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/quiz/${quizId}/regenerate`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          url:           quiz.url,
          num_questions: numQuestions,
          difficulty:    "mixed"
        })
      });
      if (!res.ok) throw new Error("Regeneration failed");
      const data = await res.json();
      setQuiz(data);
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [quiz]);

  // ── Submit attempt ─────────────────────────────────────────────────────
  const submitAttempt = useCallback(async (attemptData) => {
    setError("");
    try {
      const res = await fetch(`${API}/api/quiz/attempt`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ quiz_id: quiz?.id, ...attemptData })
      });
      if (!res.ok) throw new Error("Failed to submit attempt");
      return await res.json();
    } catch (e) {
      setError(e.message);
      return null;
    }
  }, [quiz]);

  // ── Preview article ────────────────────────────────────────────────────
  const previewArticle = useCallback(async (url) => {
    try {
      const res  = await fetch(`${API}/api/quiz/preview?url=${encodeURIComponent(url)}`);
      if (!res.ok) throw new Error("Preview failed");
      return await res.json();
    } catch (e) {
      return null;
    }
  }, []);

  // ── Export quiz as JSON ────────────────────────────────────────────────
  const exportQuiz = useCallback(() => {
    if (!quiz) return;
    const blob = new Blob([JSON.stringify(quiz, null, 2)], { type: "application/json" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `${quiz.title.replace(/\s+/g, "_")}_quiz.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [quiz]);

  // ── Clear state ────────────────────────────────────────────────────────
  const clearQuiz = useCallback(() => {
    setQuiz(null);
    setError("");
  }, []);

  return {
    quiz,
    loading,
    error,
    generateQuiz,
    fetchQuiz,
    regenerateQuiz,
    submitAttempt,
    previewArticle,
    exportQuiz,
    clearQuiz,
    setQuiz,
    setError
  };
}