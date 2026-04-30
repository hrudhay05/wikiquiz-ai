// import React from "react";

// export default function DetailsModal({ quiz, dark, onClose }) {
//   if (!quiz) return null;

//   const questions = quiz.quiz || quiz.questions || [];
//   const diffColor = { easy: "#10b981", medium: "#f59e0b", hard: "#ef4444" };

//   const s = {
//     overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
//     modal:   { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", maxWidth: "680px", width: "100%", maxHeight: "80vh", overflowY: "auto", position: "relative" },
//     close:   { position: "absolute", top: "16px", right: "20px", background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: dark ? "#94a3b8" : "#64748b" },
//     title:   { fontSize: "20px", fontWeight: 800, marginBottom: "6px" },
//     url:     { fontSize: "12px", color: "#6366f1", marginBottom: "16px" },
//     qItem:   { padding: "16px", borderRadius: "12px", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, marginBottom: "12px", background: dark ? "#0f172a" : "#f8fafc" },
//     qNum:    { fontSize: "12px", color: "#6366f1", fontWeight: 700, marginBottom: "4px" },
//     qText:   { fontSize: "14px", fontWeight: 600, marginBottom: "10px" },
//     opt:     (isAns) => ({ padding: "8px 12px", borderRadius: "8px", marginBottom: "6px", fontSize: "13px", background: isAns ? "#10b98120" : "transparent", border: `1px solid ${isAns ? "#10b981" : dark ? "#334155" : "#e2e8f0"}`, color: isAns ? "#10b981" : "inherit", fontWeight: isAns ? 700 : 400 }),
//     exp:     { fontSize: "12px", color: "#64748b", marginTop: "8px", padding: "8px", background: dark ? "#1e293b" : "#f1f5f9", borderRadius: "8px" },
//     diff:    (d) => ({ fontSize: "11px", fontWeight: 700, color: diffColor[d] || "#64748b", marginBottom: "8px" })
//   };

//   return (
//     <div style={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
//       <div style={s.modal}>
//         <button style={s.close} onClick={onClose}>✕</button>
//         <div style={s.title}>{quiz.title}</div>
//         <div style={s.url}>{quiz.url}</div>
//         <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "20px" }}>
//           {questions.length} Questions · Version {quiz.version}
//         </div>

//         {questions.map((q, i) => (
//           <div key={i} style={s.qItem}>
//             <div style={s.qNum}>Q{i + 1} · {q.section}</div>
//             <div style={s.diff(q.difficulty)}>{q.difficulty?.toUpperCase()}</div>
//             <div style={s.qText}>{q.question}</div>
//             {q.options.map((opt, j) =>
//               <div key={j} style={s.opt(opt === q.answer)}>{opt}</div>
//             )}
//             <div style={s.exp}>💡 {q.explanation}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";

export default function DetailsModal({ quiz, dark, onClose }) {
  const [filter,      setFilter]      = useState("all");
  const [expandedIdx, setExpandedIdx] = useState(null);

  if (!quiz) return null;

  const questions = quiz.quiz || quiz.questions || [];
  const diffColor = { easy: "#10b981", medium: "#f59e0b", hard: "#ef4444" };

  const filtered = filter === "all"
    ? questions
    : questions.filter(q => q.difficulty === filter);

  const s = {
    overlay:  { position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", animation: "fadeIn 0.2s ease" },
    modal:    { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", maxWidth: "700px", width: "100%", maxHeight: "85vh", overflowY: "auto", position: "relative", animation: "slideUp 0.3s ease", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" },
    close:    { position: "absolute", top: "16px", right: "20px", background: dark ? "#334155" : "#f1f5f9", border: "none", width: "32px", height: "32px", borderRadius: "50%", fontSize: "16px", cursor: "pointer", color: dark ? "#e2e8f0" : "#475569", display: "flex", alignItems: "center", justifyContent: "center" },
    header:   { marginBottom: "20px", paddingRight: "40px" },
    title:    { fontSize: "20px", fontWeight: 800, marginBottom: "4px" },
    url:      { fontSize: "12px", color: "#6366f1", marginBottom: "12px", wordBreak: "break-all" },
    meta:     { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" },
    badge:    (color) => ({ background: color + "20", color, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }),
    filters:  { display: "flex", gap: "6px", marginBottom: "20px" },
    fBtn:     (active, color) => ({ padding: "5px 14px", borderRadius: "20px", border: `1.5px solid ${active ? color : dark ? "#475569" : "#e2e8f0"}`, background: active ? color + "20" : "transparent", color: active ? color : dark ? "#94a3b8" : "#64748b", cursor: "pointer", fontSize: "12px", fontWeight: active ? 700 : 400 }),
    qCard:    { borderRadius: "14px", border: `1.5px solid ${dark ? "#334155" : "#e2e8f0"}`, marginBottom: "12px", overflow: "hidden" },
    qHeader:  { padding: "14px 16px", cursor: "pointer", background: dark ? "#0f172a" : "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    qNum:     { fontSize: "11px", color: "#6366f1", fontWeight: 700, marginBottom: "4px" },
    qText:    { fontSize: "14px", fontWeight: 600, flex: 1, paddingRight: "10px" },
    qMeta:    { display: "flex", gap: "6px", marginTop: "6px" },
    qBody:    { padding: "14px 16px", borderTop: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, animation: "fadeIn 0.25s ease" },
    opt:      (isAns) => ({
      padding: "9px 14px",
      borderRadius: "8px",
      marginBottom: "6px",
      fontSize: "13px",
      background: isAns ? "#10b98120" : "transparent",
      border: `1.5px solid ${isAns ? "#10b981" : dark ? "#334155" : "#e2e8f0"}`,
      color: isAns ? "#10b981" : dark ? "#e2e8f0" : "#1e293b",
      fontWeight: isAns ? 700 : 400,
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }),
    exp:      { marginTop: "12px", padding: "12px 14px", borderRadius: "10px", background: dark ? "#0f172a" : "#fffbeb", border: `1px solid ${dark ? "#854d0e" : "#fde68a"}`, fontSize: "13px", color: dark ? "#fcd34d" : "#92400e", lineHeight: "1.6" },
    chevron:  (open) => ({ fontSize: "12px", color: "#94a3b8", transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", marginTop: "2px" })
  };

  return (
    <>
      <style>{`
        @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>

      <div style={s.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
        <div style={s.modal}>
          {/* Close button */}
          <button style={s.close} onClick={onClose}>✕</button>

          {/* Header */}
          <div style={s.header}>
            <div style={s.title}>{quiz.title}</div>
            <div style={s.url}>{quiz.url}</div>
            <div style={s.meta}>
              <span style={s.badge("#6366f1")}>{questions.length} Questions</span>
              <span style={s.badge("#0ea5e9")}>Version {quiz.version}</span>
              {quiz.related_topics?.slice(0, 2).map((t, i) =>
                <span key={i} style={s.badge("#8b5cf6")}>{t}</span>
              )}
            </div>
          </div>

          {/* Difficulty filter */}
          <div style={s.filters}>
            {["all", "easy", "medium", "hard"].map(f =>
              <button
                key={f}
                style={s.fBtn(filter === f, f === "all" ? "#6366f1" : diffColor[f])}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? `All (${questions.length})` : `${f} (${questions.filter(q => q.difficulty === f).length})`}
              </button>
            )}
          </div>

          {/* Questions */}
          {filtered.map((q, i) => {
            const isOpen = expandedIdx === i;
            return (
              <div key={i} style={s.qCard}>
                {/* Collapsible header */}
                <div style={s.qHeader} onClick={() => setExpandedIdx(isOpen ? null : i)}>
                  <div style={{ flex: 1 }}>
                    <div style={s.qNum}>Q{i + 1} · {q.section}</div>
                    <div style={s.qText}>{q.question}</div>
                    <div style={s.qMeta}>
                      <span style={{ ...s.badge(diffColor[q.difficulty] || "#64748b"), fontSize: "11px" }}>
                        {q.difficulty?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div style={s.chevron(isOpen)}>▼</div>
                </div>

                {/* Expanded body */}
                {isOpen && (
                  <div style={s.qBody}>
                    {q.options.map((opt, j) => (
                      <div key={j} style={s.opt(opt === q.answer)}>
                        <span>{opt === q.answer ? "✅" : "⬜"}</span>
                        <span>{opt}</span>
                      </div>
                    ))}
                    {q.explanation && (
                      <div style={s.exp}>
                        💡 <strong>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}