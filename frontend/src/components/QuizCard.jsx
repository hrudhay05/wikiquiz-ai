// import React, { useState } from "react";

// export default function QuizCard({ quiz, dark, onTakeQuiz, onRegenerate, onBack }) {
//   const [showAll,   setShowAll]   = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");

//   const questions     = quiz.quiz            || [];
//   const topics        = quiz.related_topics  || [];
//   const entities      = quiz.key_entities    || {};
//   const sections      = quiz.sections        || [];
//   const diffCounts    = questions.reduce((acc, q) => {
//     acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
//     return acc;
//   }, {});

//   const diffColor = { easy: "#10b981", medium: "#f59e0b", hard: "#ef4444" };

//   const s = {
//     card:    { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" },
//     title:   { fontSize: "24px", fontWeight: 800, marginBottom: "6px" },
//     url:     { fontSize: "12px", color: "#6366f1", marginBottom: "16px", wordBreak: "break-all" },
//     summary: { fontSize: "14px", color: dark ? "#94a3b8" : "#64748b", lineHeight: "1.6", marginBottom: "20px" },
//     tabs:    { display: "flex", gap: "4px", marginBottom: "20px", borderBottom: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, paddingBottom: "0" },
//     tab:     (active) => ({ padding: "8px 18px", borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer", fontWeight: active ? 700 : 400, background: active ? "#6366f1" : "transparent", color: active ? "#fff" : dark ? "#94a3b8" : "#64748b", fontSize: "14px" }),
//     badges:  { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" },
//     badge:   (color) => ({ background: color + "20", color, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }),
//     qItem:   { padding: "14px 16px", borderRadius: "10px", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, marginBottom: "10px", background: dark ? "#0f172a" : "#f8fafc" },
//     qText:   { fontSize: "14px", fontWeight: 500, marginBottom: "6px" },
//     qDiff:   (d) => ({ fontSize: "11px", fontWeight: 700, color: diffColor[d] || "#64748b" }),
//     topic:   { display: "inline-block", padding: "6px 14px", borderRadius: "20px", background: dark ? "#312e81" : "#eef2ff", color: "#6366f1", fontSize: "13px", margin: "4px", cursor: "pointer" },
//     entity:  { fontSize: "13px", marginBottom: "6px", color: dark ? "#94a3b8" : "#64748b" },
//     btns:    { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" },
//     btnPrim: { padding: "13px 28px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700, fontSize: "15px" },
//     btnSec:  { padding: "13px 20px", background: "transparent", border: "1px solid #6366f1", color: "#6366f1", borderRadius: "10px", cursor: "pointer", fontSize: "14px" },
//     btnBack: { padding: "13px 20px", background: "transparent", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, color: dark ? "#94a3b8" : "#64748b", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }
//   };

//   return (
//     <div style={s.card}>
//       <div style={s.title}>{quiz.title}</div>
//       <div style={s.url}>{quiz.url}</div>

//       {/* Difficulty badges */}
//       <div style={s.badges}>
//         <span style={s.badge("#6366f1")}>{questions.length} Questions</span>
//         <span style={s.badge("#0ea5e9")}>Version {quiz.version}</span>
//         {Object.entries(diffCounts).map(([d, c]) =>
//           <span key={d} style={s.badge(diffColor[d] || "#64748b")}>{c} {d}</span>
//         )}
//       </div>

//       {/* Tabs */}
//       <div style={s.tabs}>
//         {["overview", "questions", "topics", "entities"].map(tab =>
//           <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
//             {{ overview: "📋 Overview", questions: "❓ Questions", topics: "🔗 Topics", entities: "👥 Entities" }[tab]}
//           </button>
//         )}
//       </div>

//       {/* Overview tab */}
//       {activeTab === "overview" && (
//         <div>
//           <div style={s.summary}>{quiz.summary}</div>
//           <div style={{ fontSize: "13px", color: dark ? "#94a3b8" : "#64748b" }}>
//             <strong>Sections covered:</strong> {sections.join(", ") || "General"}
//           </div>
//         </div>
//       )}

//       {/* Questions tab */}
//       {activeTab === "questions" && (
//         <div>
//           {(showAll ? questions : questions.slice(0, 3)).map((q, i) => (
//             <div key={i} style={s.qItem}>
//               <div style={s.qText}>Q{i + 1}. {q.question}</div>
//               <div style={s.qDiff(q.difficulty)}>
//                 {q.difficulty?.toUpperCase()} · {q.section}
//               </div>
//             </div>
//           ))}
//           {questions.length > 3 && (
//             <button
//               onClick={() => setShowAll(v => !v)}
//               style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "14px" }}
//             >
//               {showAll ? "Show less ▲" : `Show all ${questions.length} questions ▼`}
//             </button>
//           )}
//         </div>
//       )}

//       {/* Topics tab */}
//       {activeTab === "topics" && (
//         <div>
//           {topics.length
//             ? topics.map((t, i) => <span key={i} style={s.topic}>{t}</span>)
//             : <div style={{ color: "#64748b" }}>No related topics found.</div>
//           }
//         </div>
//       )}

//       {/* Entities tab */}
//       {activeTab === "entities" && (
//         <div>
//           {entities.people?.length > 0 &&
//             <div style={s.entity}><strong>👤 People:</strong> {entities.people.join(", ")}</div>}
//           {entities.organizations?.length > 0 &&
//             <div style={s.entity}><strong>🏢 Organizations:</strong> {entities.organizations.join(", ")}</div>}
//           {entities.locations?.length > 0 &&
//             <div style={s.entity}><strong>📍 Locations:</strong> {entities.locations.join(", ")}</div>}
//           {!entities.people?.length && !entities.organizations?.length && !entities.locations?.length &&
//             <div style={{ color: "#64748b" }}>No entities extracted.</div>}
//         </div>
//       )}

//       {/* Action buttons */}
//       <div style={s.btns}>
//         <button onClick={onTakeQuiz}   style={s.btnPrim}>▶ Take Quiz</button>
//         <button onClick={onRegenerate} style={s.btnSec}>🔄 Regenerate</button>
//         <button onClick={onBack}       style={s.btnBack}>← Back</button>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import DetailsModal from "./DetailsModal";

export default function QuizCard({ quiz, dark, onTakeQuiz, onRegenerate, onBack }) {
  const [showAll,     setShowAll]     = useState(false);
  const [activeTab,   setActiveTab]   = useState("overview");
  const [showModal,   setShowModal]   = useState(false);

  const questions  = quiz.quiz           || [];
  const topics     = quiz.related_topics || [];
  const entities   = quiz.key_entities   || {};
  const sections   = quiz.sections       || [];
  const diffCounts = questions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {});

  const diffColor = { easy: "#10b981", medium: "#f59e0b", hard: "#ef4444" };

  const s = {
    card:    { background: dark ? "#1e293b" : "#fff", borderRadius: "20px", padding: "32px", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" },
    title:   { fontSize: "24px", fontWeight: 800, marginBottom: "6px" },
    url:     { fontSize: "12px", color: "#6366f1", marginBottom: "16px", wordBreak: "break-all" },
    summary: { fontSize: "14px", color: dark ? "#94a3b8" : "#64748b", lineHeight: "1.6", marginBottom: "20px" },
    tabs:    { display: "flex", gap: "4px", marginBottom: "20px", borderBottom: `1px solid ${dark ? "#334155" : "#e2e8f0"}` },
    tab:     (active) => ({ padding: "8px 18px", borderRadius: "8px 8px 0 0", border: "none", cursor: "pointer", fontWeight: active ? 700 : 400, background: active ? "#6366f1" : "transparent", color: active ? "#fff" : dark ? "#94a3b8" : "#64748b", fontSize: "14px" }),
    badges:  { display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "20px" },
    badge:   (color) => ({ background: color + "20", color, padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }),
    qItem:   { padding: "14px 16px", borderRadius: "10px", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, marginBottom: "10px", background: dark ? "#0f172a" : "#f8fafc", cursor: "pointer", transition: "border-color 0.2s" },
    qText:   { fontSize: "14px", fontWeight: 500, marginBottom: "6px" },
    qDiff:   (d) => ({ fontSize: "11px", fontWeight: 700, color: diffColor[d] || "#64748b" }),
    topic:   { display: "inline-block", padding: "6px 14px", borderRadius: "20px", background: dark ? "#312e81" : "#eef2ff", color: "#6366f1", fontSize: "13px", margin: "4px" },
    entity:  { fontSize: "13px", marginBottom: "6px", color: dark ? "#94a3b8" : "#64748b" },
    btns:    { display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" },
    btnPrim: { padding: "13px 28px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 700, fontSize: "15px" },
    btnSec:  { padding: "13px 20px", background: "transparent", border: "1px solid #6366f1", color: "#6366f1", borderRadius: "10px", cursor: "pointer", fontSize: "14px" },
    btnBack: { padding: "13px 20px", background: "transparent", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, color: dark ? "#94a3b8" : "#64748b", borderRadius: "10px", cursor: "pointer", fontSize: "14px" },
    btnDet:  { padding: "13px 20px", background: "transparent", border: "1px solid #f59e0b", color: "#f59e0b", borderRadius: "10px", cursor: "pointer", fontSize: "14px" }
  };

  return (
    <>
      {/* ── Details Modal ── */}
      {showModal && (
        <DetailsModal quiz={quiz} dark={dark} onClose={() => setShowModal(false)} />
      )}

      <div style={s.card}>
        <div style={s.title}>{quiz.title}</div>
        <div style={s.url}>{quiz.url}</div>

        {/* Badges */}
        <div style={s.badges}>
          <span style={s.badge("#6366f1")}>{questions.length} Questions</span>
          <span style={s.badge("#0ea5e9")}>Version {quiz.version}</span>
          {Object.entries(diffCounts).map(([d, c]) =>
            <span key={d} style={s.badge(diffColor[d] || "#64748b")}>{c} {d}</span>
          )}
        </div>

        {/* Tabs */}
        {/* <div style={s.tabs}>
          {["overview", "questions", "topics", "entities"].map(tab =>
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
              {{ overview: "📋 Overview", questions: "❓ Questions", topics: "🔗 Topics", entities: "👥 Entities" }[tab]}
            </button>
          )}
        </div> */}

        {/* Overview */}
        {activeTab === "overview" && (
          <div>
            <div style={s.summary}>{quiz.summary}</div>
            <div style={{ fontSize: "13px", color: dark ? "#94a3b8" : "#64748b" }}>
              <strong>Sections covered:</strong> {sections.join(", ") || "General"}
            </div>
          </div>
        )}

        {/* Questions — clickable to open modal */}
        {activeTab === "questions" && (
          <div>
            <div style={{ fontSize: "12px", color: "#94a3b8", marginBottom: "10px" }}>
              💡 Click any question to see full details
            </div>
            {(showAll ? questions : questions.slice(0, 3)).map((q, i) => (
              <div
                key={i}
                style={s.qItem}
                onClick={() => setShowModal(true)}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#6366f1"}
                onMouseLeave={e => e.currentTarget.style.borderColor = dark ? "#334155" : "#e2e8f0"}
              >
                <div style={s.qText}>Q{i + 1}. {q.question}</div>
                <div style={s.qDiff(q.difficulty)}>
                  {q.difficulty?.toUpperCase()} · {q.section}
                </div>
              </div>
            ))}
            {questions.length > 3 && (
              <button
                onClick={() => setShowAll(v => !v)}
                style={{ background: "none", border: "none", color: "#6366f1", cursor: "pointer", fontSize: "14px" }}
              >
                {showAll ? "Show less ▲" : `Show all ${questions.length} questions ▼`}
              </button>
            )}
          </div>
        )}

        {/* Topics */}
        {activeTab === "topics" && (
          <div>
            {topics.length
              ? topics.map((t, i) => <span key={i} style={s.topic}>{t}</span>)
              : <div style={{ color: "#64748b" }}>No related topics found.</div>
            }
          </div>
        )}

        {/* Entities */}
        {activeTab === "entities" && (
          <div>
            {entities.people?.length > 0        && <div style={s.entity}><strong>👤 People:</strong> {entities.people.join(", ")}</div>}
            {entities.organizations?.length > 0  && <div style={s.entity}><strong>🏢 Organizations:</strong> {entities.organizations.join(", ")}</div>}
            {entities.locations?.length > 0      && <div style={s.entity}><strong>📍 Locations:</strong> {entities.locations.join(", ")}</div>}
            {!entities.people?.length && !entities.organizations?.length && !entities.locations?.length &&
              <div style={{ color: "#64748b" }}>No entities extracted.</div>}
          </div>
        )}

        {/* Buttons */}
        <div style={s.btns}>
          <button onClick={onTakeQuiz}          style={s.btnPrim}>▶ Take Quiz</button>
          <button onClick={() => setShowModal(true)} style={s.btnDet}>🔍 View Details</button>
          <button onClick={onRegenerate}         style={s.btnSec}>🔄 Regenerate</button>
          <button onClick={onBack}               style={s.btnBack}>← Back</button>
        </div>
      </div>
    </>
  );
}