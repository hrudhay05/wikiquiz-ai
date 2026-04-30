import React, { useState } from "react";

const API = "http://localhost:8000";

export default function URLInput({ onGenerate, dark }) {
  const [url,        setUrl]        = useState("");
  const [numQ,       setNumQ]       = useState(7);
  const [difficulty, setDifficulty] = useState("mixed");
  const [preview,    setPreview]    = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [error,      setError]      = useState("");

  const isValidWikiURL = (u) =>
    u.includes("wikipedia.org/wiki/");

  const fetchPreview = async () => {
    if (!isValidWikiURL(url)) return;
    setPreviewing(true);
    setError("");
    try {
      const res  = await fetch(`${API}/api/quiz/preview?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Preview failed");
      setPreview(data);
    } catch (e) {
      setError(e.message);
      setPreview(null);
    } finally {
      setPreviewing(false);
    }
  };

  const handleSubmit = () => {
    if (!isValidWikiURL(url)) {
      setError("Please enter a valid Wikipedia URL");
      return;
    }
    onGenerate({ url, num_questions: numQ, difficulty });
  };

  const s = {
    wrap:    { maxWidth: "600px", margin: "60px auto" },
    title:   { fontSize: "34px", fontWeight: 800, textAlign: "center", marginBottom: "8px", color: "#6366f1" },
    sub:     { textAlign: "center", color: "#64748b", marginBottom: "36px", fontSize: "15px" },
    card:    { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "36px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" },
    label:   { fontSize: "13px", fontWeight: 600, color: dark ? "#94a3b8" : "#64748b", marginBottom: "6px", display: "block" },
    input:   { width: "100%", padding: "13px 16px", borderRadius: "10px", border: `1.5px solid ${dark ? "#475569" : "#e2e8f0"}`, background: dark ? "#0f172a" : "#f8fafc", color: dark ? "#e2e8f0" : "#1e293b", fontSize: "14px", boxSizing: "border-box", outline: "none", marginBottom: "16px" },
    row:     { display: "flex", gap: "12px", marginBottom: "16px" },
    select:  { flex: 1, padding: "11px 12px", borderRadius: "10px", border: `1.5px solid ${dark ? "#475569" : "#e2e8f0"}`, background: dark ? "#0f172a" : "#f8fafc", color: dark ? "#e2e8f0" : "#1e293b", fontSize: "14px" },
    btn:     { width: "100%", padding: "15px", borderRadius: "12px", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", border: "none", fontSize: "16px", fontWeight: 700, cursor: "pointer", letterSpacing: "0.3px" },
    prev:    { background: dark ? "#0f172a" : "#f1f5f9", borderRadius: "12px", padding: "16px", marginBottom: "16px", borderLeft: "4px solid #6366f1" },
    prevTtl: { fontWeight: 700, marginBottom: "6px", fontSize: "15px" },
    prevSum: { fontSize: "13px", color: "#64748b", lineHeight: "1.5" },
    err:     { color: "#ef4444", fontSize: "13px", marginBottom: "12px" },
    hint:    { fontSize: "12px", color: "#94a3b8", marginTop: "12px", textAlign: "center" }
  };

  return (
    <div style={s.wrap}>
      <div style={s.title}>🧠 WikiQuiz AI</div>
      <div style={s.sub}>Paste any Wikipedia URL and get an AI-generated quiz instantly</div>

      <div style={s.card}>
        {/* URL Input */}
        <label style={s.label}>Wikipedia URL</label>
        <input
          style={s.input}
          placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
          value={url}
          onChange={e => { setUrl(e.target.value); setPreview(null); setError(""); }}
          onBlur={fetchPreview}
          onKeyDown={e => e.key === "Enter" && fetchPreview()}
        />

        {/* Preview */}
        {previewing && <div style={{ fontSize: "13px", color: "#6366f1", marginBottom: "12px" }}>🔍 Fetching article preview...</div>}
        {error      && <div style={s.err}>⚠️ {error}</div>}
        {preview    && (
          <div style={s.prev}>
            <div style={s.prevTtl}>📄 {preview.title}</div>
            <div style={s.prevSum}>{preview.summary?.slice(0, 220)}...</div>
          </div>
        )}

        {/* Options */}
        <label style={s.label}>Quiz Settings</label>
        <div style={s.row}>
          <select style={s.select} value={numQ} onChange={e => setNumQ(Number(e.target.value))}>
            {[5, 6, 7, 8, 9, 10].map(n =>
              <option key={n} value={n}>{n} Questions</option>
            )}
          </select>
          <select style={s.select} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
            <option value="mixed">🎲 Mixed</option>
            <option value="easy">🟢 Easy</option>
            <option value="medium">🟡 Medium</option>
            <option value="hard">🔴 Hard</option>
          </select>
        </div>

        {/* Submit */}
        <button style={s.btn} onClick={handleSubmit}>
          ✨ Generate Quiz
        </button>

        <div style={s.hint}>
          💡 Tip: Blur the URL field to auto-preview the article
        </div>
      </div>
    </div>
  );
}