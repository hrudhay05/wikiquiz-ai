import React, { useState, useEffect, useCallback } from "react";
import Timer from "./Timer";

export default function TakeQuiz({ quiz, dark, onSubmit, onBack }) {
  const questions              = quiz.quiz || [];
  const [current,  setCurrent] = useState(0);
  const [answers,  setAnswers] = useState({});
  const [userName, setUserName]= useState("");
  const [timeLeft, setTimeLeft]= useState(0);
  const [totalTime,setTotalTime]=useState(0);
  const [showExp,  setShowExp] = useState(false);
  const [timerKey, setTimerKey]= useState(0);
  const startTime              = React.useRef(Date.now());

  const q = questions[current];

  const handleNext = useCallback(() => {
    setShowExp(false);
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setTimerKey(k => k + 1);
    }
  }, [current, questions.length]);

  const handleAnswer = (opt) => {
    if (answers[current]) return;
    setAnswers(a => ({ ...a, [current]: opt }));
    setShowExp(true);
  };

  const handleExpire = useCallback(() => {
    if (!answers[current]) {
      setAnswers(a => ({ ...a, [current]: "" }));
      setShowExp(true);
    }
  }, [current, answers]);

  const handleSubmit = () => {
    const elapsed = Math.round((Date.now() - startTime.current) / 1000);
    let score = 0;
    const ans = questions.map((q, i) => {
      const selected = answers[i] || "";
      const correct  = selected === q.answer;
      if (correct) score++;
      return { question: q.question, selected, correct_answer: q.answer, correct };
    });
    onSubmit({
      user_name:       userName.trim() || "Anonymous",
      score,
      total_questions: questions.length,
      time_taken:      elapsed,
      answers:         ans
    });
  };

  const isLast    = current === questions.length - 1;
  const answered  = answers[current] !== undefined;
  const diffColor = { easy: "#10b981", medium: "#f59e0b", hard: "#ef4444" };

  const s = {
    wrap:     { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" },
    header:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
    progress: { height: "6px", background: dark ? "#334155" : "#e2e8f0", borderRadius: "3px", marginBottom: "24px", overflow: "hidden" },
    fill:     { height: "100%", borderRadius: "3px", background: "#6366f1", width: `${((current + 1) / questions.length) * 100}%`, transition: "width 0.3s" },
    qNum:     { fontSize: "13px", color: "#6366f1", fontWeight: 700, marginBottom: "8px" },
    qText:    { fontSize: "18px", fontWeight: 700, marginBottom: "8px", lineHeight: "1.4" },
    diff:     { fontSize: "12px", fontWeight: 700, color: diffColor[q?.difficulty] || "#64748b", marginBottom: "24px" },
    opt:      (opt) => ({
      padding: "14px 18px", borderRadius: "12px", marginBottom: "10px", cursor: answered ? "default" : "pointer",
      border: `2px solid ${
  answers[current] === opt ? "#6366f1" : (dark ? "#334155" : "#e2e8f0")
}`,
background: answers[current] === opt ? "#6366f120" : "transparent",
        
      fontSize: "14px",
      display: "flex", alignItems: "center", gap: "10px"
    }),
    optIcon: (opt) => "⬜",
    exp:      { background: dark ? "#0f172a" : "#f0fdf4", border: "1px solid #10b98140", borderRadius: "10px", padding: "14px", marginTop: "4px", marginBottom: "16px", fontSize: "13px", color: dark ? "#86efac" : "#166534", lineHeight: "1.5" },
    nameRow:  { display: "flex", gap: "10px", marginTop: "16px", alignItems: "center" },
    nameInput:{ flex: 1, padding: "12px", borderRadius: "10px", border: `1.5px solid ${dark ? "#475569" : "#e2e8f0"}`, background: dark ? "#0f172a" : "#f8fafc", color: dark ? "#e2e8f0" : "#1e293b", fontSize: "14px" },
    btnNext:  { padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700 },
    btnSub:   { padding: "12px 24px", background: "#10b981", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700 },
    btnBack:  { padding: "12px 20px", background: "transparent", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, color: dark ? "#94a3b8" : "#64748b", borderRadius: "10px", cursor: "pointer" }
  };

  if (!q) return null;

  return (
    <div style={s.wrap}>
      {/* Header */}
      <div style={s.header}>
        <div style={{ fontSize: "14px", color: dark ? "#94a3b8" : "#64748b" }}>
          {current + 1} / {questions.length}
        </div>
        <Timer key={timerKey} duration={30} onExpire={handleExpire} running={!answered} />
      </div>

      {/* Progress bar */}
      <div style={s.progress}><div style={s.fill} /></div>

      {/* Question */}
      <div style={s.qNum}>Question {current + 1}</div>
      <div style={s.qText}>{q.question}</div>
      <div style={s.diff}>{q.difficulty?.toUpperCase()} · {q.section}</div>

      {/* Options */}
      {q.options.map((opt, i) => (
        <div key={i} style={s.opt(opt)} onClick={() => handleAnswer(opt)}>
          <span>{s.optIcon(opt)}</span>
          <span>{opt}</span>
        </div>
      ))}

      {/* Explanation */}
      {/* {showExp && answered && (
        <div style={s.exp}>
          💡 <strong>Explanation:</strong> {q.explanation}
        </div>
      )} */}

      {/* Navigation */}
      {!isLast && answered && (
        <button style={s.btnNext} onClick={handleNext}>Next →</button>
      )}

      {isLast && answered && (
        <div style={s.nameRow}>
          <input
            style={s.nameInput}
            placeholder="Enter your name (optional)"
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <button style={s.btnSub} onClick={handleSubmit}>Submit ✓</button>
        </div>
      )}

      <div style={{ marginTop: "12px" }}>
        <button style={s.btnBack} onClick={onBack}>← Back to Quiz</button>
      </div>
    </div>
  );
}