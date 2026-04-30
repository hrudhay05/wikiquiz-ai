// import React, { useState, useEffect } from "react";

// export default function ScoreBoard({ attempt, quiz, dark, onHome, onRetake, API }) {
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [activeTab,   setActiveTab]   = useState("score");

//   const pct      = Math.round((attempt.score / attempt.total_questions) * 100);
//   const emoji    = pct >= 80 ? "🏆" : pct >= 60 ? "🥈" : pct >= 40 ? "👍" : "📚";
//   const message  = pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Good job!" : pct >= 40 ? "Keep practicing!" : "Don't give up!";
//   const color    = pct >= 80 ? "#10b981" : pct >= 60 ? "#6366f1" : pct >= 40 ? "#f59e0b" : "#ef4444";

//   useEffect(() => {
//     if (!quiz?.id) return;
//     fetch(`${API}/api/leaderboard/${quiz.id}`)
//       .then(r => r.json())
//       .then(d => setLeaderboard(d.leaderboard || []))
//       .catch(() => {});
//   }, [quiz?.id]);

//   const answers = attempt.answers || [];

//   const s = {
//     wrap:    { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" },
//     tabs:    { display: "flex", gap: "4px", marginBottom: "24px", borderBottom: `1px solid ${dark ? "#334155" : "#e2e8f0"}` },
//     tab:     (a) => ({ padding: "8px 18px", border: "none", cursor: "pointer", fontWeight: a ? 700 : 400, background: a ? "#6366f1" : "transparent", color: a ? "#fff" : dark ? "#94a3b8" : "#64748b", borderRadius: "8px 8px 0 0", fontSize: "14px" }),
//     stat:    { textAlign: "center", flex: 1 },
//     statN:   { fontSize: "28px", fontWeight: 800 },
//     statL:   { fontSize: "12px", color: "#64748b" },
//     row:     { display: "flex", gap: "16px", marginBottom: "24px" },
//     aItem:   (correct) => ({ padding: "12px 16px", borderRadius: "10px", border: `1px solid ${correct ? "#10b98140" : "#ef444440"}`, background: correct ? (dark ? "#052e16" : "#f0fdf4") : (dark ? "#450a0a" : "#fef2f2"), marginBottom: "8px" }),
//     aQ:      { fontSize: "13px", fontWeight: 600, marginBottom: "4px" },
//     aRow:    { display: "flex", gap: "16px", fontSize: "12px" },
//     lb:      { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, marginBottom: "8px", fontSize: "13px" },
//     btns:    { display: "flex", gap: "12px", marginTop: "24px", justifyContent: "center" },
//     btnPrim: { padding: "13px 28px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700 },
//     btnSec:  { padding: "13px 20px", background: "transparent", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, color: dark ? "#94a3b8" : "#64748b", borderRadius: "10px", cursor: "pointer" }
//   };

//   return (
//     <div style={s.wrap}>
//       {/* Tabs */}
//       <div style={s.tabs}>
//         {["score", "answers", "leaderboard"].map(tab =>
//           <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
//             {{ score: "🎯 Score", answers: "📝 Answers", leaderboard: "🏆 Leaderboard" }[tab]}
//           </button>
//         )}
//       </div>

//       {/* Score Tab */}
//       {activeTab === "score" && (
//         <div style={{ textAlign: "center" }}>
//           <div style={{ fontSize: "64px", marginBottom: "8px" }}>{emoji}</div>
//           <div style={{ fontSize: "52px", fontWeight: 900, color }}>{pct}%</div>
//           <div style={{ fontSize: "18px", color: "#64748b", marginBottom: "24px" }}>{message}</div>
//           <div style={s.row}>
//             <div style={s.stat}><div style={{ ...s.statN, color: "#6366f1" }}>{attempt.score}</div><div style={s.statL}>Correct</div></div>
//             <div style={s.stat}><div style={{ ...s.statN, color: "#ef4444" }}>{attempt.total_questions - attempt.score}</div><div style={s.statL}>Wrong</div></div>
//             <div style={s.stat}><div style={{ ...s.statN, color: "#f59e0b" }}>{attempt.time_taken}s</div><div style={s.statL}>Time</div></div>
//           </div>
//           <div style={{ fontSize: "14px", color: "#64748b" }}>
//             Attempted by <strong>{attempt.user_name}</strong>
//           </div>
//         </div>
//       )}

//       {/* Answers Tab */}
//       {activeTab === "answers" && (
//         <div>
//           {answers.map((a, i) => (
//             <div key={i} style={s.aItem(a.correct)}>
//               <div style={s.aQ}>{i + 1}. {a.question}</div>
//               <div style={s.aRow}>
//                 <span>Your answer: <strong style={{ color: a.correct ? "#10b981" : "#ef4444" }}>{a.selected || "Not answered"}</strong></span>
//                 {!a.correct && <span>Correct: <strong style={{ color: "#10b981" }}>{a.correct_answer}</strong></span>}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Leaderboard Tab */}
//       {activeTab === "leaderboard" && (
//         <div>
//           {leaderboard.length === 0
//             ? <div style={{ textAlign: "center", color: "#64748b", padding: "40px" }}>No entries yet.</div>
//             : leaderboard.map((e, i) => (
//               <div key={i} style={s.lb}>
//                 <span style={{ fontWeight: 700, color: i === 0 ? "#f59e0b" : "inherit" }}>#{e.rank} {e.user_name}</span>
//                 <span style={{ color: "#6366f1", fontWeight: 700 }}>{e.score}/{e.total_questions}</span>
//                 <span style={{ color: "#64748b" }}>{e.time_taken}s</span>
//               </div>
//             ))
//           }
//         </div>
//       )}

//       {/* Buttons */}
//       <div style={s.btns}>
//         <button onClick={onRetake} style={s.btnPrim}>🔄 Retake Quiz</button>
//         <button onClick={onHome}   style={s.btnSec}>🏠 Home</button>
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";

export default function ScoreBoard({ attempt, quiz, dark, onHome, onRetake, API }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [activeTab,   setActiveTab]   = useState("score");
  const [expandedIdx, setExpandedIdx] = useState(null);

  const pct     = Math.round((attempt.score / attempt.total_questions) * 100);
  const emoji   = pct >= 80 ? "🏆" : pct >= 60 ? "🥈" : pct >= 40 ? "👍" : "📚";
  const message = pct >= 80 ? "Excellent! 🎉" : pct >= 60 ? "Good job!" : pct >= 40 ? "Keep practicing!" : "Don't give up!";
  const color   = pct >= 80 ? "#10b981" : pct >= 60 ? "#6366f1" : pct >= 40 ? "#f59e0b" : "#ef4444";

  // merge attempt answers with original quiz questions to get explanations
  const questions = quiz?.quiz || [];
  const answers   = (attempt.answers || []).map((a, i) => ({
    ...a,
    explanation: questions[i]?.explanation || ""
  }));

  useEffect(() => {
    if (!quiz?.id) return;
    fetch(`${API}/api/leaderboard/${quiz.id}`)
      .then(r => r.json())
      .then(d => setLeaderboard(d.leaderboard || []))
      .catch(() => {});
  }, [quiz?.id]);

  const s = {
    wrap:     { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" },
    tabs:     { display: "flex", gap: "4px", marginBottom: "24px", borderBottom: `1px solid ${dark ? "#334155" : "#e2e8f0"}` },
    tab:      (a) => ({ padding: "8px 18px", border: "none", cursor: "pointer", fontWeight: a ? 700 : 400, background: a ? "#6366f1" : "transparent", color: a ? "#fff" : dark ? "#94a3b8" : "#64748b", borderRadius: "8px 8px 0 0", fontSize: "14px" }),
    statRow:  { display: "flex", gap: "16px", marginBottom: "24px" },
    stat:     { textAlign: "center", flex: 1 },
    statN:    { fontSize: "28px", fontWeight: 800 },
    statL:    { fontSize: "12px", color: "#64748b" },
    aItem:    (correct) => ({
      padding: "14px 16px",
      borderRadius: "12px",
      border: `1.5px solid ${correct ? "#10b98140" : "#ef444440"}`,
      background: correct
        ? (dark ? "#052e16" : "#f0fdf4")
        : (dark ? "#450a0a" : "#fef2f2"),
      marginBottom: "10px",
      cursor: correct ? "default" : "pointer",
      transition: "box-shadow 0.2s"
    }),
    aHeader:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    aQ:       { fontSize: "13px", fontWeight: 600, marginBottom: "6px", flex: 1 },
    aIcon:    { fontSize: "18px", marginLeft: "8px" },
    aRow:     { display: "flex", gap: "16px", fontSize: "12px", flexWrap: "wrap", marginBottom: "4px" },
    aLabel:   { color: "#64748b" },
    aCorrect: { color: "#10b981", fontWeight: 700 },
    aWrong:   { color: "#ef4444", fontWeight: 700 },
    exp:      {
      marginTop: "10px",
      padding: "10px 14px",
      borderRadius: "8px",
      background: dark ? "#1e293b" : "#fff7ed",
      border: `1px solid ${dark ? "#334155" : "#fed7aa"}`,
      fontSize: "12px",
      color: dark ? "#fdba74" : "#9a3412",
      lineHeight: "1.6",
      animation: "fadeIn 0.3s ease"
    },
    expandBtn: {
      fontSize: "11px",
      color: "#ef4444",
      background: "none",
      border: "none",
      cursor: "pointer",
      padding: "0",
      marginTop: "4px",
      textDecoration: "underline"
    },
    lb:       { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderRadius: "10px", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, marginBottom: "8px", fontSize: "13px" },
    btns:     { display: "flex", gap: "12px", marginTop: "24px", justifyContent: "center" },
    btnPrim:  { padding: "13px 28px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700 },
    btnSec:   { padding: "13px 20px", background: "transparent", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, color: dark ? "#94a3b8" : "#64748b", borderRadius: "10px", cursor: "pointer" }
  };

  return (
    <>
      {/* animation keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0%   { transform: scale(0.8); opacity: 0; }
          80%  { transform: scale(1.05); }
          100% { transform: scale(1);   opacity: 1; }
        }
      `}</style>

      <div style={s.wrap}>
        {/* Tabs */}
        <div style={s.tabs}>
          {["score", "answers", "leaderboard"].map(tab =>
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
              {{ score: "🎯 Score", answers: "📝 Answers", leaderboard: "🏆 Leaderboard" }[tab]}
            </button>
          )}
        </div>

        {/* ── Score Tab ── */}
        {activeTab === "score" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "72px", marginBottom: "8px", animation: "popIn 0.5s ease" }}>{emoji}</div>
            <div style={{ fontSize: "56px", fontWeight: 900, color, animation: "popIn 0.6s ease" }}>{pct}%</div>
            <div style={{ fontSize: "18px", color: "#64748b", marginBottom: "28px" }}>{message}</div>
            <div style={s.statRow}>
              <div style={s.stat}>
                <div style={{ ...s.statN, color: "#10b981" }}>{attempt.score}</div>
                <div style={s.statL}>✅ Correct</div>
              </div>
              <div style={s.stat}>
                <div style={{ ...s.statN, color: "#ef4444" }}>{attempt.total_questions - attempt.score}</div>
                <div style={s.statL}>❌ Wrong</div>
              </div>
              <div style={s.stat}>
                <div style={{ ...s.statN, color: "#f59e0b" }}>{attempt.time_taken}s</div>
                <div style={s.statL}>⏱️ Time</div>
              </div>
            </div>
            <div style={{ fontSize: "14px", color: "#64748b" }}>
              Attempted by <strong>{attempt.user_name}</strong>
            </div>
          </div>
        )}

        {/* ── Answers Tab ── */}
        {activeTab === "answers" && (
          <div>
            <div style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "14px" }}>
              💡 Click any wrong answer to see the explanation
            </div>
            {answers.map((a, i) => (
              <div
                key={i}
                style={s.aItem(a.correct)}
                onClick={() => !a.correct && setExpandedIdx(expandedIdx === i ? null : i)}
              >
                {/* Question header */}
                <div style={s.aHeader}>
                  <div style={s.aQ}>{i + 1}. {a.question}</div>
                  <span style={s.aIcon}>{a.correct ? "✅" : "❌"}</span>
                </div>

                {/* Answer row */}
                <div style={s.aRow}>
                  <span style={s.aLabel}>
                    Your answer:{" "}
                    <span style={a.correct ? s.aCorrect : s.aWrong}>
                      {a.selected || "⏰ Not answered"}
                    </span>
                  </span>
                  {!a.correct && (
                    <span style={s.aLabel}>
                      Correct:{" "}
                      <span style={s.aCorrect}>{a.correct_answer}</span>
                    </span>
                  )}
                </div>

                {/* Expand explanation for wrong answers */}
                {!a.correct && (
                  <>
                    <button style={s.expandBtn}>
                      {expandedIdx === i ? "▲ Hide explanation" : "▼ Show explanation"}
                    </button>
                    {expandedIdx === i && a.explanation && (
                      <div style={s.exp}>
                        💡 <strong>Explanation:</strong> {a.explanation}
                      </div>
                    )}
                    {expandedIdx === i && !a.explanation && (
                      <div style={s.exp}>No explanation available.</div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Leaderboard Tab ── */}
        {activeTab === "leaderboard" && (
          <div>
            {leaderboard.length === 0
              ? <div style={{ textAlign: "center", color: "#64748b", padding: "40px" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>🏆</div>
                  No entries yet. Be the first!
                </div>
              : leaderboard.map((e, i) => (
                <div key={i} style={s.lb}>
                  <span style={{ fontWeight: 700, color: i === 0 ? "#f59e0b" : i === 1 ? "#94a3b8" : i === 2 ? "#b45309" : "inherit" }}>
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${e.rank}`} {e.user_name}
                  </span>
                  <span style={{ color: "#6366f1", fontWeight: 700 }}>{e.score}/{e.total_questions}</span>
                  <span style={{ color: "#64748b" }}>{e.time_taken}s</span>
                </div>
              ))
            }
          </div>
        )}

        {/* Buttons */}
        <div style={s.btns}>
          <button onClick={onRetake} style={s.btnPrim}>🔄 Retake Quiz</button>
          <button onClick={onHome}   style={s.btnSec}>🏠 Home</button>
        </div>
      </div>
    </>
  );
}