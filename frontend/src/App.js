// // // import React, { useState } from "react";

// // // const API = "http://localhost:8000";

// // // // ── Page constants ─────────────────────────────────────────────────────────
// // // const PAGE = {
// // //   HOME:    "home",
// // //   QUIZ:    "quiz",
// // //   TAKE:    "take",
// // //   SCORE:   "score",
// // //   HISTORY: "history"
// // // };

// // // export default function App() {
// // //   const [page,        setPage]        = useState(PAGE.HOME);
// // //   const [quiz,        setQuiz]        = useState(null);
// // //   const [attempt,     setAttempt]     = useState(null);
// // //   const [darkMode,    setDarkMode]    = useState(false);
// // //   const [loading,     setLoading]     = useState(false);
// // //   const [error,       setError]       = useState("");

// // //   // ── Dark mode class on root ──────────────────────────────────────────────
// // //   React.useEffect(() => {
// // //     document.body.style.background = darkMode ? "#0f172a" : "#f8fafc";
// // //     document.body.style.color      = darkMode ? "#e2e8f0" : "#1e293b";
// // //   }, [darkMode]);

// // //   // ── Navigation helpers ───────────────────────────────────────────────────
// // //   const goHome    = ()      => { setPage(PAGE.HOME);    setError(""); };
// // //   const goQuiz    = (q)     => { setQuiz(q);  setPage(PAGE.QUIZ);  };
// // //   const goTake    = ()      => setPage(PAGE.TAKE);
// // //   const goScore   = (att)   => { setAttempt(att); setPage(PAGE.SCORE); };
// // //   const goHistory = ()      => setPage(PAGE.HISTORY);

// // //   // ── Generate quiz ────────────────────────────────────────────────────────
// // //   const handleGenerate = async ({ url, num_questions, difficulty }) => {
// // //     setLoading(true);
// // //     setError("");
// // //     try {
// // //       const res = await fetch(`${API}/api/quiz/generate`, {
// // //         method:  "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body:    JSON.stringify({ url, num_questions, difficulty })
// // //       });
// // //       if (!res.ok) {
// // //         const err = await res.json();
// // //         throw new Error(err.detail || "Failed to generate quiz");
// // //       }
// // //       const data = await res.json();
// // //       goQuiz(data);
// // //     } catch (e) {
// // //       setError(e.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ── Regenerate quiz ──────────────────────────────────────────────────────
// // //   const handleRegenerate = async () => {
// // //     if (!quiz) return;
// // //     setLoading(true);
// // //     setError("");
// // //     try {
// // //       const res = await fetch(`${API}/api/quiz/${quiz.id}/regenerate`, {
// // //         method:  "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body:    JSON.stringify({ url: quiz.url, num_questions: quiz.quiz.length, difficulty: "mixed" })
// // //       });
// // //       if (!res.ok) throw new Error("Regeneration failed");
// // //       const data = await res.json();
// // //       setQuiz(data);
// // //     } catch (e) {
// // //       setError(e.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // ── Submit attempt ───────────────────────────────────────────────────────
// // //   const handleSubmitAttempt = async (attemptData) => {
// // //     try {
// // //       const res = await fetch(`${API}/api/quiz/attempt`, {
// // //         method:  "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body:    JSON.stringify({ quiz_id: quiz.id, ...attemptData })
// // //       });
// // //       if (!res.ok) throw new Error("Failed to submit attempt");
// // //       const data = await res.json();
// // //       goScore({ ...attemptData, id: data.id });
// // //     } catch (e) {
// // //       setError(e.message);
// // //     }
// // //   };

// // //   // ── Styles ───────────────────────────────────────────────────────────────
// // //   const dark = darkMode;
// // //   const s = {
// // //     app: {
// // //       minHeight:  "100vh",
// // //       fontFamily: "'Segoe UI', sans-serif",
// // //       background: dark ? "#0f172a" : "#f8fafc",
// // //       color:      dark ? "#e2e8f0" : "#1e293b"
// // //     },
// // //     nav: {
// // //       display:        "flex",
// // //       alignItems:     "center",
// // //       justifyContent: "space-between",
// // //       padding:        "14px 32px",
// // //       background:     dark ? "#1e293b" : "#ffffff",
// // //       borderBottom:   `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
// // //       position:       "sticky",
// // //       top:            0,
// // //       zIndex:         100
// // //     },
// // //     logo: {
// // //       fontSize:   "20px",
// // //       fontWeight: 700,
// // //       cursor:     "pointer",
// // //       color:      "#6366f1"
// // //     },
// // //     navRight: {
// // //       display:    "flex",
// // //       alignItems: "center",
// // //       gap:        "12px"
// // //     },
// // //     navBtn: {
// // //       padding:      "6px 16px",
// // //       borderRadius: "8px",
// // //       border:       `1px solid ${dark ? "#475569" : "#e2e8f0"}`,
// // //       background:   "transparent",
// // //       color:        dark ? "#e2e8f0" : "#475569",
// // //       cursor:       "pointer",
// // //       fontSize:     "14px"
// // //     },
// // //     main: {
// // //       maxWidth: "900px",
// // //       margin:   "0 auto",
// // //       padding:  "32px 16px"
// // //     },
// // //     error: {
// // //       background:   "#fee2e2",
// // //       color:        "#dc2626",
// // //       padding:      "12px 16px",
// // //       borderRadius: "8px",
// // //       marginBottom: "16px",
// // //       fontSize:     "14px"
// // //     },
// // //     loader: {
// // //       textAlign:  "center",
// // //       padding:    "80px 0",
// // //       fontSize:   "16px",
// // //       color:      "#6366f1"
// // //     }
// // //   };

// // //   return (
// // //     <div style={s.app}>
// // //       {/* ── Navbar ── */}
// // //       <nav style={s.nav}>
// // //         <span style={s.logo} onClick={goHome}>🧠 WikiQuiz AI</span>
// // //         <div style={s.navRight}>
// // //           <button style={s.navBtn} onClick={goHome}>Home</button>
// // //           <button style={s.navBtn} onClick={goHistory}>History</button>
// // //           <button
// // //             style={{ ...s.navBtn, fontSize: "18px", border: "none" }}
// // //             onClick={() => setDarkMode(d => !d)}
// // //           >
// // //             {dark ? "☀️" : "🌙"}
// // //           </button>
// // //         </div>
// // //       </nav>

// // //       {/* ── Main ── */}
// // //       <main style={s.main}>
// // //         {error && <div style={s.error}>⚠️ {error}</div>}

// // //         {loading && (
// // //           <div style={s.loader}>
// // //             <div style={{ fontSize: "40px", marginBottom: "16px" }}>⚙️</div>
// // //             <div>Generating your quiz, please wait...</div>
// // //           </div>
// // //         )}

// // //         {!loading && (
// // //           <>
// // //             {page === PAGE.HOME &&
// // //               <URLInput
// // //                 onGenerate={handleGenerate}
// // //                 dark={dark}
// // //                 API={API}
// // //               />
// // //             }
// // //             {page === PAGE.QUIZ && quiz &&
// // //               <QuizCard
// // //                 quiz={quiz}
// // //                 dark={dark}
// // //                 onTakeQuiz={goTake}
// // //                 onRegenerate={handleRegenerate}
// // //                 onBack={goHome}
// // //               />
// // //             }
// // //             {page === PAGE.TAKE && quiz &&
// // //               <TakeQuiz
// // //                 quiz={quiz}
// // //                 dark={dark}
// // //                 onSubmit={handleSubmitAttempt}
// // //                 onBack={() => setPage(PAGE.QUIZ)}
// // //               />
// // //             }
// // //             {page === PAGE.SCORE && attempt &&
// // //               <ScoreBoard
// // //                 attempt={attempt}
// // //                 quiz={quiz}
// // //                 dark={dark}
// // //                 onHome={goHome}
// // //                 onRetake={goTake}
// // //                 API={API}
// // //               />
// // //             }
// // //             {page === PAGE.HISTORY &&
// // //               <HistoryTable
// // //                 dark={dark}
// // //                 onSelect={goQuiz}
// // //                 API={API}
// // //               />
// // //             }
// // //           </>
// // //         )}
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // // ── Placeholder components (replaced in later steps) ─────────────────────────
// // // function URLInput({ onGenerate, dark, API }) {
// // //   const [url, setUrl]               = useState("");
// // //   const [numQ, setNumQ]             = useState(7);
// // //   const [difficulty, setDifficulty] = useState("mixed");
// // //   const [preview, setPreview]       = useState(null);
// // //   const [previewing, setPreviewing] = useState(false);

// // //   const fetchPreview = async () => {
// // //     if (!url.includes("wikipedia.org")) return;
// // //     setPreviewing(true);
// // //     try {
// // //       const res  = await fetch(`${API}/api/quiz/preview?url=${encodeURIComponent(url)}`);
// // //       const data = await res.json();
// // //       setPreview(data);
// // //     } catch { setPreview(null); }
// // //     finally  { setPreviewing(false); }
// // //   };

// // //   const s = {
// // //     wrap:   { maxWidth: "600px", margin: "60px auto" },
// // //     title:  { fontSize: "32px", fontWeight: 700, textAlign: "center", marginBottom: "8px" },
// // //     sub:    { textAlign: "center", color: "#64748b", marginBottom: "32px" },
// // //     card:   { background: dark ? "#1e293b" : "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
// // //     input:  { width: "100%", padding: "12px 16px", borderRadius: "10px", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, background: dark ? "#0f172a" : "#f8fafc", color: dark ? "#e2e8f0" : "#1e293b", fontSize: "15px", boxSizing: "border-box", marginBottom: "12px" },
// // //     row:    { display: "flex", gap: "12px", marginBottom: "12px" },
// // //     select: { flex: 1, padding: "10px 12px", borderRadius: "10px", border: `1px solid ${dark ? "#475569" : "#e2e8f0"}`, background: dark ? "#0f172a" : "#f8fafc", color: dark ? "#e2e8f0" : "#1e293b", fontSize: "14px" },
// // //     btn:    { width: "100%", padding: "14px", borderRadius: "10px", background: "#6366f1", color: "#fff", border: "none", fontSize: "16px", fontWeight: 600, cursor: "pointer", marginTop: "8px" },
// // //     prev:   { background: dark ? "#0f172a" : "#f1f5f9", borderRadius: "10px", padding: "14px", marginBottom: "12px" }
// // //   };

// // //   return (
// // //     <div style={s.wrap}>
// // //       <div style={s.title}>🧠 WikiQuiz AI</div>
// // //       <div style={s.sub}>Generate a quiz from any Wikipedia article</div>
// // //       <div style={s.card}>
// // //         <input
// // //           style={s.input}
// // //           placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
// // //           value={url}
// // //           onChange={e => { setUrl(e.target.value); setPreview(null); }}
// // //           onBlur={fetchPreview}
// // //         />
// // //         {previewing && <div style={{ fontSize: "13px", color: "#6366f1", marginBottom: "8px" }}>Fetching preview...</div>}
// // //         {preview && (
// // //           <div style={s.prev}>
// // //             <div style={{ fontWeight: 600, marginBottom: "4px" }}>{preview.title}</div>
// // //             <div style={{ fontSize: "13px", color: "#64748b" }}>{preview.summary?.slice(0, 200)}...</div>
// // //           </div>
// // //         )}
// // //         <div style={s.row}>
// // //           <select style={s.select} value={numQ} onChange={e => setNumQ(Number(e.target.value))}>
// // //             {[5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Questions</option>)}
// // //           </select>
// // //           <select style={s.select} value={difficulty} onChange={e => setDifficulty(e.target.value)}>
// // //             <option value="mixed">Mixed</option>
// // //             <option value="easy">Easy</option>
// // //             <option value="medium">Medium</option>
// // //             <option value="hard">Hard</option>
// // //           </select>
// // //         </div>
// // //         <button style={s.btn} onClick={() => onGenerate({ url, num_questions: numQ, difficulty })}>
// // //           Generate Quiz ✨
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function QuizCard({ quiz, dark, onTakeQuiz, onRegenerate, onBack }) {
// // //   return (
// // //     <div style={{ background: dark ? "#1e293b" : "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
// // //       <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "8px" }}>{quiz.title}</div>
// // //       <div style={{ fontSize: "13px", color: "#64748b", marginBottom: "16px" }}>{quiz.summary?.slice(0, 300)}...</div>
// // //       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "24px" }}>
// // //         <span style={{ background: "#6366f1", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" }}>{quiz.quiz?.length} Questions</span>
// // //         <span style={{ background: "#10b981", color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "13px" }}>Version {quiz.version}</span>
// // //       </div>
// // //       <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
// // //         <button onClick={onTakeQuiz}  style={{ padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: 600 }}>Take Quiz ▶</button>
// // //         <button onClick={onRegenerate} style={{ padding: "12px 24px", background: "transparent", border: "1px solid #6366f1", color: "#6366f1", borderRadius: "10px", cursor: "pointer" }}>Regenerate 🔄</button>
// // //         <button onClick={onBack}       style={{ padding: "12px 24px", background: "transparent", border: "1px solid #94a3b8", color: "#94a3b8", borderRadius: "10px", cursor: "pointer" }}>← Back</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function TakeQuiz({ quiz, dark, onSubmit, onBack }) {
// // //   const [current, setCurrent] = useState(0);
// // //   const [answers, setAnswers] = useState({});
// // //   const [userName, setUserName] = useState("");
// // //   const questions = quiz.quiz || [];

// // //   const handleAnswer = (opt) => setAnswers(a => ({ ...a, [current]: opt }));
// // //   const handleSubmit = () => {
// // //     let score = 0;
// // //     const ans = questions.map((q, i) => {
// // //       const selected = answers[i] || "";
// // //       const correct  = selected === q.answer;
// // //       if (correct) score++;
// // //       return { question: q.question, selected, correct_answer: q.answer, correct };
// // //     });
// // //     onSubmit({ user_name: userName || "Anonymous", score, total_questions: questions.length, time_taken: 0, answers: ans });
// // //   };

// // //   const q = questions[current];
// // //   if (!q) return null;

// // //   return (
// // //     <div style={{ background: dark ? "#1e293b" : "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
// // //       <div style={{ marginBottom: "8px", color: "#6366f1", fontWeight: 600 }}>Question {current + 1} / {questions.length}</div>
// // //       <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "24px" }}>{q.question}</div>
// // //       {q.options.map((opt, i) => (
// // //         <div key={i}
// // //           onClick={() => handleAnswer(opt)}
// // //           style={{ padding: "14px 18px", borderRadius: "10px", border: `2px solid ${answers[current] === opt ? "#6366f1" : dark ? "#334155" : "#e2e8f0"}`, background: answers[current] === opt ? (dark ? "#312e81" : "#eef2ff") : "transparent", marginBottom: "10px", cursor: "pointer" }}
// // //         >{opt}</div>
// // //       ))}
// // //       <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
// // //         {current > 0 && <button onClick={() => setCurrent(c => c - 1)} style={{ padding: "10px 20px", borderRadius: "8px", border: "1px solid #94a3b8", background: "transparent", cursor: "pointer" }}>← Prev</button>}
// // //         {current < questions.length - 1
// // //           ? <button onClick={() => setCurrent(c => c + 1)} style={{ padding: "10px 20px", borderRadius: "8px", background: "#6366f1", color: "#fff", border: "none", cursor: "pointer" }}>Next →</button>
// // //           : (
// // //             <>
// // //               <input placeholder="Your name" value={userName} onChange={e => setUserName(e.target.value)} style={{ padding: "10px", borderRadius: "8px", border: "1px solid #e2e8f0", flex: 1 }} />
// // //               <button onClick={handleSubmit} style={{ padding: "10px 24px", borderRadius: "8px", background: "#10b981", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600 }}>Submit ✓</button>
// // //             </>
// // //           )
// // //         }
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function ScoreBoard({ attempt, quiz, dark, onHome, onRetake, API }) {
// // //   const pct = Math.round((attempt.score / attempt.total_questions) * 100);
// // //   return (
// // //     <div style={{ background: dark ? "#1e293b" : "#fff", borderRadius: "16px", padding: "40px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
// // //       <div style={{ fontSize: "60px" }}>{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
// // //       <div style={{ fontSize: "28px", fontWeight: 700, margin: "16px 0 8px" }}>{attempt.score} / {attempt.total_questions}</div>
// // //       <div style={{ fontSize: "48px", fontWeight: 800, color: pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444" }}>{pct}%</div>
// // //       <div style={{ color: "#64748b", margin: "8px 0 32px" }}>{pct >= 80 ? "Excellent!" : pct >= 50 ? "Good job!" : "Keep practicing!"}</div>
// // //       <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
// // //         <button onClick={onRetake} style={{ padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: "10px", cursor: "pointer" }}>Retake Quiz</button>
// // //         <button onClick={onHome}   style={{ padding: "12px 24px", background: "transparent", border: "1px solid #94a3b8", color: "#94a3b8", borderRadius: "10px", cursor: "pointer" }}>Home</button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function HistoryTable({ dark, onSelect, API }) {
// // //   const [history, setHistory] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   React.useEffect(() => {
// // //     fetch(`${API}/api/history`)
// // //       .then(r => r.json())
// // //       .then(d => { setHistory(d.history || []); setLoading(false); })
// // //       .catch(() => setLoading(false));
// // //   }, []);

// // //   if (loading) return <div style={{ textAlign: "center", padding: "60px", color: "#6366f1" }}>Loading history...</div>;
// // //   if (!history.length) return <div style={{ textAlign: "center", padding: "60px", color: "#64748b" }}>No quizzes yet. Generate your first one!</div>;

// // //   return (
// // //     <div>
// // //       <div style={{ fontSize: "22px", fontWeight: 700, marginBottom: "20px" }}>📋 Quiz History</div>
// // //       {history.map(item => (
// // //         <div key={item.id}
// // //           onClick={() => fetch(`${API}/api/quiz/${item.quiz_id}`).then(r => r.json()).then(onSelect)}
// // //           style={{ background: dark ? "#1e293b" : "#fff", borderRadius: "12px", padding: "16px 20px", marginBottom: "10px", cursor: "pointer", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}
// // //         >
// // //           <div>
// // //             <div style={{ fontWeight: 600 }}>{item.title}</div>
// // //             <div style={{ fontSize: "13px", color: "#64748b" }}>{item.total_questions} questions · v{item.version} · {new Date(item.created_at).toLocaleDateString()}</div>
// // //           </div>
// // //           <span style={{ color: "#6366f1" }}>→</span>
// // //         </div>
// // //       ))}
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useCallback } from "react";

// // const API = "http://localhost:8000";

// // const PAGES = { HOME: "home", PREVIEW: "preview", QUIZ: "quiz", RESULT: "result", HISTORY: "history" };

// // const css = `
// //   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

// //   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //   :root {
// //     --bg:       #0a0a0f;
// //     --surface:  #13131a;
// //     --surface2: #1c1c28;
// //     --border:   #2a2a3a;
// //     --primary:  #7c6af7;
// //     --primary2: #a78bfa;
// //     --accent:   #06d6a0;
// //     --danger:   #ff6b6b;
// //     --warn:     #ffd166;
// //     --text:     #f0f0ff;
// //     --muted:    #8888aa;
// //     --card-shadow: 0 8px 40px rgba(124,106,247,0.12);
// //   }

// //   body {
// //     background: var(--bg);
// //     color: var(--text);
// //     font-family: 'DM Sans', sans-serif;
// //     min-height: 100vh;
// //     overflow-x: hidden;
// //   }

// //   .page-enter {
// //     animation: pageEnter 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
// //   }
// //   @keyframes pageEnter {
// //     from { opacity: 0; transform: translateY(24px); }
// //     to   { opacity: 1; transform: translateY(0); }
// //   }

// //   .fade-in {
// //     animation: fadeIn 0.35s ease forwards;
// //   }
// //   @keyframes fadeIn {
// //     from { opacity: 0; } to { opacity: 1; }
// //   }

// //   .slide-up {
// //     animation: slideUp 0.4s cubic-bezier(0.22,1,0.36,1) forwards;
// //   }
// //   @keyframes slideUp {
// //     from { opacity: 0; transform: translateY(32px); }
// //     to   { opacity: 1; transform: translateY(0); }
// //   }

// //   .pop {
// //     animation: pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards;
// //   }
// //   @keyframes pop {
// //     from { opacity: 0; transform: scale(0.85); }
// //     to   { opacity: 1; transform: scale(1); }
// //   }

// //   .shake {
// //     animation: shake 0.4s ease;
// //   }
// //   @keyframes shake {
// //     0%,100% { transform: translateX(0); }
// //     20%     { transform: translateX(-8px); }
// //     40%     { transform: translateX(8px); }
// //     60%     { transform: translateX(-5px); }
// //     80%     { transform: translateX(5px); }
// //   }

// //   .pulse {
// //     animation: pulse 1.5s ease infinite;
// //   }
// //   @keyframes pulse {
// //     0%,100% { opacity: 1; }
// //     50%     { opacity: 0.5; }
// //   }

// //   .spin {
// //     animation: spin 1s linear infinite;
// //   }
// //   @keyframes spin {
// //     to { transform: rotate(360deg); }
// //   }

// //   .glow {
// //     box-shadow: 0 0 24px rgba(124,106,247,0.4), var(--card-shadow);
// //   }

// //   .btn {
// //     display: inline-flex; align-items: center; justify-content: center; gap: 8px;
// //     padding: 13px 28px; border-radius: 12px; border: none; cursor: pointer;
// //     font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600;
// //     transition: all 0.2s cubic-bezier(0.22,1,0.36,1);
// //     position: relative; overflow: hidden;
// //   }
// //   .btn:hover  { transform: translateY(-2px); }
// //   .btn:active { transform: translateY(0) scale(0.97); }

// //   .btn-primary {
// //     background: linear-gradient(135deg, var(--primary), var(--primary2));
// //     color: #fff;
// //     box-shadow: 0 4px 20px rgba(124,106,247,0.35);
// //   }
// //   .btn-primary:hover { box-shadow: 0 8px 32px rgba(124,106,247,0.5); }

// //   .btn-outline {
// //     background: transparent;
// //     border: 1.5px solid var(--border);
// //     color: var(--muted);
// //   }
// //   .btn-outline:hover { border-color: var(--primary); color: var(--primary2); }

// //   .btn-accent {
// //     background: linear-gradient(135deg, #06d6a0, #0bab7e);
// //     color: #000;
// //     box-shadow: 0 4px 20px rgba(6,214,160,0.3);
// //   }

// //   .btn-danger {
// //     background: linear-gradient(135deg, #ff6b6b, #ee5a52);
// //     color: #fff;
// //   }

// //   .card {
// //     background: var(--surface);
// //     border: 1px solid var(--border);
// //     border-radius: 20px;
// //     padding: 28px;
// //   }

// //   .tag {
// //     display: inline-flex; align-items: center; gap: 5px;
// //     padding: 4px 12px; border-radius: 99px; font-size: 12px; font-weight: 600;
// //   }

// //   input, select, textarea {
// //     font-family: 'DM Sans', sans-serif;
// //   }

// //   ::-webkit-scrollbar { width: 6px; }
// //   ::-webkit-scrollbar-track { background: var(--bg); }
// //   ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
// // `;

// // export default function App() {
// //   const [page,       setPage]       = useState(PAGES.HOME);
// //   const [quiz,       setQuiz]       = useState(null);
// //   const [attempt,    setAttempt]    = useState(null);
// //   const [loading,    setLoading]    = useState(false);
// //   const [loadingMsg, setLoadingMsg] = useState("");
// //   const [error,      setError]      = useState("");
// //   const [retakeQ,    setRetakeQ]    = useState(null); // shuffled questions for retake

// //   const navigate = (p) => { setError(""); setPage(p); };

// //   // ── Generate quiz ────────────────────────────────────────────────────
// //   const handleGenerate = async ({ url, num_questions, difficulty }) => {
// //     setLoading(true);
// //     setError("");
// //     const msgs = [
// //       "🔍 Scraping Wikipedia article...",
// //       "🧠 Reading the content...",
// //       "✨ Gemini is crafting your questions...",
// //       "🎯 Finalizing quiz..."
// //     ];
// //     let mi = 0;
// //     setLoadingMsg(msgs[0]);
// //     const interval = setInterval(() => {
// //       mi = (mi + 1) % msgs.length;
// //       setLoadingMsg(msgs[mi]);
// //     }, 2000);
// //     try {
// //       const res = await fetch(`${API}/api/quiz/generate`, {
// //         method: "POST", headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ url, num_questions, difficulty })
// //       });
// //       if (!res.ok) { const e = await res.json(); throw new Error(e.detail || "Failed"); }
// //       const data = await res.json();
// //       setQuiz(data);
// //       setRetakeQ(null);
// //       navigate(PAGES.PREVIEW);
// //     } catch (e) { setError(e.message); }
// //     finally { clearInterval(interval); setLoading(false); }
// //   };

// //   // ── Regenerate ───────────────────────────────────────────────────────
// //   const handleRegenerate = async () => {
// //     if (!quiz) return;
// //     setLoading(true);
// //     setLoadingMsg("✨ Generating fresh questions...");
// //     setError("");
// //     try {
// //       const res = await fetch(`${API}/api/quiz/${quiz.id}/regenerate`, {
// //         method: "POST", headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ url: quiz.url, num_questions: quiz.quiz?.length || 7, difficulty: "mixed" })
// //       });
// //       if (!res.ok) throw new Error("Regeneration failed");
// //       const data = await res.json();
// //       setQuiz(data);
// //       setRetakeQ(null);
// //       navigate(PAGES.PREVIEW);
// //     } catch (e) { setError(e.message); }
// //     finally { setLoading(false); }
// //   };

// //   // ── Submit attempt ───────────────────────────────────────────────────
// //   const handleSubmit = async (attemptData) => {
// //     try {
// //       const res = await fetch(`${API}/api/quiz/attempt`, {
// //         method: "POST", headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ quiz_id: quiz.id, ...attemptData })
// //       });
// //       const data = await res.json();
// //       setAttempt({ ...attemptData, id: data.id });
// //       navigate(PAGES.RESULT);
// //     } catch { setAttempt(attemptData); navigate(PAGES.RESULT); }
// //   };

// //   // ── Retake with shuffle ──────────────────────────────────────────────
// //   const handleRetake = () => {
// //     const shuffled = [...(quiz.quiz || [])].sort(() => Math.random() - 0.5);
// //     setRetakeQ(shuffled);
// //     navigate(PAGES.QUIZ);
// //   };

// //   if (loading) return (
// //     <>
// //       <style>{css}</style>
// //       <LoadingScreen message={loadingMsg} />
// //     </>
// //   );

// //   return (
// //     <>
// //       <style>{css}</style>
// //       <Navbar onHome={() => navigate(PAGES.HOME)} onHistory={() => navigate(PAGES.HISTORY)} page={page} />
// //       <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 16px" }}>
// //         {error && <ErrorBanner msg={error} onClose={() => setError("")} />}
// //         <div className="page-enter" key={page}>
// //           {page === PAGES.HOME    && <HomePage onGenerate={handleGenerate} API={API} />}
// //           {page === PAGES.PREVIEW && quiz && <PreviewPage quiz={quiz} onTake={() => navigate(PAGES.QUIZ)} onBack={() => navigate(PAGES.HOME)} />}
// //           {page === PAGES.QUIZ    && quiz && <QuizPage questions={retakeQ || quiz.quiz || []} dark={true} onSubmit={handleSubmit} onBack={() => navigate(PAGES.PREVIEW)} />}
// //           {page === PAGES.RESULT  && attempt && quiz && <ResultPage attempt={attempt} quiz={quiz} onRetake={handleRetake} onNewQuiz={handleRegenerate} onHome={() => navigate(PAGES.HOME)} API={API} />}
// //           {page === PAGES.HISTORY && <HistoryPage API={API} onSelect={(q) => { setQuiz(q); setRetakeQ(null); navigate(PAGES.PREVIEW); }} />}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // // ── Loading Screen ────────────────────────────────────────────────────────────
// // function LoadingScreen({ message }) {
// //   return (
// //     <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
// //       <div style={{ position: "relative", width: 100, height: 100 }}>
// //         <svg viewBox="0 0 100 100" style={{ width: 100, height: 100, position: "absolute" }}>
// //           <circle cx="50" cy="50" r="44" fill="none" stroke="#2a2a3a" strokeWidth="6" />
// //           <circle cx="50" cy="50" r="44" fill="none" stroke="url(#grad)" strokeWidth="6"
// //             strokeDasharray="276" strokeDashoffset="60" strokeLinecap="round"
// //             style={{ animation: "spin 1.5s linear infinite", transformOrigin: "center" }} />
// //           <defs>
// //             <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
// //               <stop offset="0%" stopColor="#7c6af7" />
// //               <stop offset="100%" stopColor="#06d6a0" />
// //             </linearGradient>
// //           </defs>
// //         </svg>
// //         <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🧠</div>
// //       </div>
// //       <div style={{ textAlign: "center" }}>
// //         <div style={{ fontFamily: "Syne, sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 10, color: "#f0f0ff" }}>WikiQuiz AI</div>
// //         <div className="pulse" style={{ color: "#8888aa", fontSize: 15 }}>{message}</div>
// //       </div>
// //       <div style={{ display: "flex", gap: 8 }}>
// //         {[0,1,2].map(i => (
// //           <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#7c6af7", animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Navbar ────────────────────────────────────────────────────────────────────
// // function Navbar({ onHome, onHistory, page }) {
// //   return (
// //     <nav style={{ background: "rgba(19,19,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #2a2a3a", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
// //       <div onClick={onHome} style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, cursor: "pointer", background: "linear-gradient(135deg, #7c6af7, #06d6a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
// //         🧠 WikiQuiz AI
// //       </div>
// //       <div style={{ display: "flex", gap: 8 }}>
// //         <button className="btn btn-outline" style={{ padding: "8px 18px", fontSize: 13 }} onClick={onHome}>Home</button>
// //         <button className="btn btn-outline" style={{ padding: "8px 18px", fontSize: 13, borderColor: page === "history" ? "#7c6af7" : undefined, color: page === "history" ? "#a78bfa" : undefined }} onClick={onHistory}>History</button>
// //       </div>
// //     </nav>
// //   );
// // }

// // // ── Error Banner ──────────────────────────────────────────────────────────────
// // function ErrorBanner({ msg, onClose }) {
// //   return (
// //     <div className="slide-up" style={{ background: "#2d1515", border: "1px solid #ff6b6b44", borderRadius: 12, padding: "12px 18px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
// //       <span style={{ color: "#ff6b6b", fontSize: 14 }}>⚠️ {msg}</span>
// //       <button onClick={onClose} style={{ background: "none", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: 18 }}>×</button>
// //     </div>
// //   );
// // }

// // // ── Home Page ─────────────────────────────────────────────────────────────────
// // function HomePage({ onGenerate, API }) {
// //   const [url,        setUrl]        = useState("");
// //   const [numQ,       setNumQ]       = useState(7);
// //   const [difficulty, setDifficulty] = useState("mixed");
// //   const [preview,    setPreview]    = useState(null);
// //   const [previewing, setPreviewing] = useState(false);
// //   const [urlError,   setUrlError]   = useState("");

// //   const isWiki = (u) => u.includes("wikipedia.org/wiki/");

// //   const fetchPreview = async () => {
// //     if (!isWiki(url)) { if (url) setUrlError("Please enter a valid Wikipedia URL"); return; }
// //     setUrlError(""); setPreviewing(true);
// //     try {
// //       const res = await fetch(`${API}/api/quiz/preview?url=${encodeURIComponent(url)}`);
// //       const d   = await res.json();
// //       setPreview(d);
// //     } catch { setPreview(null); }
// //     finally { setPreviewing(false); }
// //   };

// //   const handleSubmit = () => {
// //     if (!isWiki(url)) { setUrlError("Please enter a valid Wikipedia URL"); return; }
// //     onGenerate({ url, num_questions: numQ, difficulty });
// //   };

// //   return (
// //     <div style={{ maxWidth: 580, margin: "0 auto", paddingTop: 40 }}>
// //       {/* Hero */}
// //       <div className="slide-up" style={{ textAlign: "center", marginBottom: 48 }}>
// //         <div style={{ fontSize: 56, marginBottom: 16 }}>🧠</div>
// //         <h1 style={{ fontFamily: "Syne, sans-serif", fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 12 }}>
// //           Turn Wikipedia into<br />
// //           <span style={{ background: "linear-gradient(135deg,#7c6af7,#06d6a0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
// //             instant quizzes
// //           </span>
// //         </h1>
// //         <p style={{ color: "#8888aa", fontSize: 16, lineHeight: 1.6 }}>
// //           Paste any Wikipedia URL · AI generates quiz · Learn & compete
// //         </p>
// //       </div>

// //       {/* Card */}
// //       <div className="card slide-up" style={{ animationDelay: "0.1s" }}>
// //         {/* URL input */}
// //         <label style={{ fontSize: 12, fontWeight: 600, color: "#8888aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 8 }}>Wikipedia URL</label>
// //         <div style={{ position: "relative", marginBottom: 4 }}>
// //           <input
// //             value={url}
// //             onChange={e => { setUrl(e.target.value); setPreview(null); setUrlError(""); }}
// //             onBlur={fetchPreview}
// //             onKeyDown={e => e.key === "Enter" && fetchPreview()}
// //             placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
// //             style={{ width: "100%", background: "#0a0a0f", border: `1.5px solid ${urlError ? "#ff6b6b" : "#2a2a3a"}`, borderRadius: 12, padding: "13px 44px 13px 16px", color: "#f0f0ff", fontSize: 14, outline: "none", transition: "border-color 0.2s" }}
// //             onFocus={e => e.target.style.borderColor = "#7c6af7"}
// //           />
// //           {previewing && <div className="spin" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", width: 18, height: 18, border: "2px solid #7c6af7", borderTopColor: "transparent", borderRadius: "50%" }} />}
// //         </div>
// //         {urlError && <div style={{ color: "#ff6b6b", fontSize: 12, marginBottom: 8 }}>⚠️ {urlError}</div>}

// //         {/* Preview */}
// //         {preview && (
// //           <div className="slide-up" style={{ background: "#0a0a0f", border: "1px solid #2a2a3a", borderLeft: "3px solid #7c6af7", borderRadius: 10, padding: "12px 14px", marginBottom: 16, marginTop: 8 }}>
// //             <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>📄 {preview.title}</div>
// //             <div style={{ color: "#8888aa", fontSize: 12, lineHeight: 1.5 }}>{preview.summary?.slice(0, 200)}...</div>
// //           </div>
// //         )}

// //         {/* Settings */}
// //         <div style={{ display: "flex", gap: 12, margin: "16px 0" }}>
// //           <div style={{ flex: 1 }}>
// //             <label style={{ fontSize: 12, fontWeight: 600, color: "#8888aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Questions</label>
// //             <select value={numQ} onChange={e => setNumQ(Number(e.target.value))}
// //               style={{ width: "100%", background: "#0a0a0f", border: "1.5px solid #2a2a3a", borderRadius: 10, padding: "11px 12px", color: "#f0f0ff", fontSize: 14 }}>
// //               {[5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Questions</option>)}
// //             </select>
// //           </div>
// //           <div style={{ flex: 1 }}>
// //             <label style={{ fontSize: 12, fontWeight: 600, color: "#8888aa", textTransform: "uppercase", letterSpacing: "0.08em", display: "block", marginBottom: 6 }}>Difficulty</label>
// //             <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
// //               style={{ width: "100%", background: "#0a0a0f", border: "1.5px solid #2a2a3a", borderRadius: 10, padding: "11px 12px", color: "#f0f0ff", fontSize: 14 }}>
// //               <option value="mixed">🎲 Mixed</option>
// //               <option value="easy">🟢 Easy</option>
// //               <option value="medium">🟡 Medium</option>
// //               <option value="hard">🔴 Hard</option>
// //             </select>
// //           </div>
// //         </div>

// //         <button className="btn btn-primary" style={{ width: "100%", fontSize: 16, padding: "15px" }} onClick={handleSubmit}>
// //           ✨ Generate Quiz
// //         </button>

// //         <div style={{ textAlign: "center", color: "#555577", fontSize: 12, marginTop: 12 }}>
// //           Powered by Gemini 2.5 Flash · BeautifulSoup · PostgreSQL
// //         </div>
// //       </div>

// //       {/* Example URLs */}
// //       <div className="slide-up" style={{ marginTop: 24, animationDelay: "0.2s" }}>
// //         <div style={{ fontSize: 12, color: "#555577", marginBottom: 10, textAlign: "center" }}>Try these:</div>
// //         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
// //           {["Alan_Turing", "Black_hole", "Python_(programming_language)"].map(t => (
// //             <button key={t} onClick={() => { setUrl(`https://en.wikipedia.org/wiki/${t}`); setPreview(null); }}
// //               style={{ background: "#13131a", border: "1px solid #2a2a3a", borderRadius: 20, padding: "5px 14px", color: "#8888aa", fontSize: 12, cursor: "pointer" }}>
// //               {t.replace(/_/g, " ")}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Preview Page ──────────────────────────────────────────────────────────────
// // function PreviewPage({ quiz, onTake, onBack }) {
// //   const [tab, setTab] = useState("overview");
// //   const questions     = quiz.quiz || [];
// //   const topics        = quiz.related_topics || [];
// //   const entities      = quiz.key_entities || {};
// //   const diffColor     = { easy: "#06d6a0", medium: "#ffd166", hard: "#ff6b6b" };

// //   const tabs = ["overview", "questions", "topics", "entities"];

// //   return (
// //     <div className="slide-up">
// //       {/* Header */}
// //       <div style={{ marginBottom: 24 }}>
// //         <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
// //           <span className="tag" style={{ background: "#7c6af720", color: "#a78bfa" }}>{questions.length} Questions</span>
// //           <span className="tag" style={{ background: "#06d6a020", color: "#06d6a0" }}>v{quiz.version}</span>
// //           {Object.entries(questions.reduce((a,q)=>{a[q.difficulty]=(a[q.difficulty]||0)+1;return a},{}) ).map(([d,c]) =>
// //             <span key={d} className="tag" style={{ background: (diffColor[d]||"#888") + "20", color: diffColor[d]||"#888" }}>{c} {d}</span>
// //           )}
// //         </div>
// //         <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{quiz.title}</h2>
// //         <div style={{ fontSize: 12, color: "#7c6af7", wordBreak: "break-all", marginBottom: 16 }}>{quiz.url}</div>
// //       </div>

// //       {/* Tabs */}
// //       <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid #2a2a3a", paddingBottom: 0 }}>
// //         {tabs.map(t => (
// //           <button key={t} onClick={() => setTab(t)}
// //             style={{ padding: "9px 18px", background: tab===t ? "#7c6af7" : "transparent", color: tab===t ? "#fff" : "#8888aa", border: "none", borderRadius: "10px 10px 0 0", cursor: "pointer", fontSize: 13, fontWeight: tab===t ? 700 : 400, transition: "all 0.2s" }}>
// //             {{ overview:"📋 Overview", questions:"❓ Questions", topics:"🔗 Topics", entities:"👥 Entities" }[t]}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Tab content */}
// //       <div className="card" style={{ minHeight: 180 }}>
// //         {tab === "overview" && (
// //           <div className="fade-in">
// //             <p style={{ color: "#aaaacc", lineHeight: 1.7, fontSize: 14 }}>{quiz.summary}</p>
// //             {quiz.sections?.length > 0 && (
// //               <div style={{ marginTop: 16 }}>
// //                 <div style={{ fontSize: 12, color: "#8888aa", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Sections covered</div>
// //                 <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
// //                   {quiz.sections.map((s,i) => <span key={i} className="tag" style={{ background: "#1c1c28", color: "#8888aa", border: "1px solid #2a2a3a" }}>{s}</span>)}
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {tab === "questions" && (
// //           <div className="fade-in">
// //             {questions.map((q, i) => (
// //               <div key={i} style={{ padding: "12px 14px", border: "1px solid #2a2a3a", borderRadius: 10, marginBottom: 8, background: "#0a0a0f" }}>
// //                 <div style={{ fontSize: 11, color: "#7c6af7", fontWeight: 700, marginBottom: 4 }}>Q{i+1} · {q.section}</div>
// //                 <div style={{ fontSize: 14, fontWeight: 500 }}>{q.question}</div>
// //                 <div style={{ fontSize: 11, color: diffColor[q.difficulty]||"#888", fontWeight: 700, marginTop: 4 }}>{q.difficulty?.toUpperCase()}</div>
// //               </div>
// //             ))}
// //           </div>
// //         )}

// //         {tab === "topics" && (
// //           <div className="fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
// //             {topics.length ? topics.map((t,i) =>
// //               <span key={i} className="tag" style={{ background: "#1c1c28", border: "1px solid #7c6af740", color: "#a78bfa", padding: "7px 16px", fontSize: 13 }}>{t}</span>
// //             ) : <div style={{ color: "#8888aa" }}>No related topics.</div>}
// //           </div>
// //         )}

// //         {tab === "entities" && (
// //           <div className="fade-in">
// //             {entities.people?.length > 0 && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 12, color: "#8888aa", marginBottom: 6, textTransform: "uppercase" }}>👤 People</div><div style={{ color: "#f0f0ff", fontSize: 14 }}>{entities.people.join(", ")}</div></div>}
// //             {entities.organizations?.length > 0 && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 12, color: "#8888aa", marginBottom: 6, textTransform: "uppercase" }}>🏢 Organizations</div><div style={{ color: "#f0f0ff", fontSize: 14 }}>{entities.organizations.join(", ")}</div></div>}
// //             {entities.locations?.length > 0 && <div style={{ marginBottom: 12 }}><div style={{ fontSize: 12, color: "#8888aa", marginBottom: 6, textTransform: "uppercase" }}>📍 Locations</div><div style={{ color: "#f0f0ff", fontSize: 14 }}>{entities.locations.join(", ")}</div></div>}
// //             {!entities.people?.length && !entities.organizations?.length && !entities.locations?.length && <div style={{ color: "#8888aa" }}>No entities found.</div>}
// //           </div>
// //         )}
// //       </div>

// //       {/* Action buttons */}
// //       <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
// //         <button className="btn btn-primary" style={{ flex: 1, minWidth: 160, fontSize: 16 }} onClick={onTake}>▶ Take Quiz</button>
// //         <button className="btn btn-outline" onClick={onBack}>← Back</button>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Quiz Page ─────────────────────────────────────────────────────────────────
// // function QuizPage({ questions, onSubmit, onBack }) {
// //   const [current,  setCurrent]  = useState(0);
// //   const [answers,  setAnswers]  = useState({});
// //   const [selected, setSelected] = useState(null);
// //   const [timerKey, setTimerKey] = useState(0);
// //   const [expired,  setExpired]  = useState(false);
// //   const [userName, setUserName] = useState("");
// //   const [shakeKey, setShakeKey] = useState(0);
// //   const startRef               = React.useRef(Date.now());

// //   const q         = questions[current];
// //   const answered  = answers[current] !== undefined;
// //   const isLast    = current === questions.length - 1;
// //   const diffColor = { easy: "#06d6a0", medium: "#ffd166", hard: "#ff6b6b" };

// //   const handleSelect = (opt) => {
// //     if (answered) return;
// //     setSelected(opt);
// //     setAnswers(a => ({ ...a, [current]: opt }));
// //     if (opt !== q.answer) setShakeKey(k => k + 1);
// //   };

// //   const handleExpire = () => {
// //     if (!answered) { setAnswers(a => ({ ...a, [current]: "" })); setExpired(true); }
// //   };

// //   const handleNext = () => {
// //     setSelected(null); setExpired(false);
// //     setCurrent(c => c + 1);
// //     setTimerKey(k => k + 1);
// //   };

// //   const handleSubmit = () => {
// //     const elapsed = Math.round((Date.now() - startRef.current) / 1000);
// //     let score = 0;
// //     const ans = questions.map((q, i) => {
// //       const sel     = answers[i] || "";
// //       const correct = sel === q.answer;
// //       if (correct) score++;
// //       return { question: q.question, selected: sel, correct_answer: q.answer, correct, explanation: q.explanation || "" };
// //     });
// //     onSubmit({ user_name: userName.trim() || "Anonymous", score, total_questions: questions.length, time_taken: elapsed, answers: ans });
// //   };

// //   const optColor = (opt) => {
// //     if (!answered) return { border: "#2a2a3a", bg: "transparent", color: "#f0f0ff" };
// //     if (opt === q.answer) return { border: "#06d6a0", bg: "#06d6a015", color: "#06d6a0" };
// //     if (opt === answers[current] && opt !== q.answer) return { border: "#ff6b6b", bg: "#ff6b6b15", color: "#ff6b6b" };
// //     return { border: "#2a2a3a", bg: "transparent", color: "#8888aa" };
// //   };

// //   const optIcon = (opt) => {
// //     if (!answered) return null;
// //     if (opt === q.answer) return "✅";
// //     if (opt === answers[current] && opt !== q.answer) return "❌";
// //     return null;
// //   };

// //   return (
// //     <div className="slide-up">
// //       {/* Progress */}
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
// //         <div style={{ fontSize: 13, color: "#8888aa" }}>Question <strong style={{ color: "#f0f0ff" }}>{current+1}</strong> of {questions.length}</div>
// //         <TimerRing key={timerKey} duration={30} onExpire={handleExpire} stopped={answered} />
// //       </div>
// //       <div style={{ height: 4, background: "#1c1c28", borderRadius: 2, marginBottom: 28, overflow: "hidden" }}>
// //         <div style={{ height: "100%", width: `${((current+1)/questions.length)*100}%`, background: "linear-gradient(90deg,#7c6af7,#06d6a0)", borderRadius: 2, transition: "width 0.4s ease" }} />
// //       </div>

// //       {/* Question */}
// //       <div key={current} className="slide-up">
// //         <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
// //           <span className="tag" style={{ background: "#7c6af720", color: "#a78bfa", fontSize: 11 }}>Q{current+1}</span>
// //           <span className="tag" style={{ background: (diffColor[q?.difficulty]||"#888")+"20", color: diffColor[q?.difficulty]||"#888", fontSize: 11 }}>{q?.difficulty?.toUpperCase()}</span>
// //           {q?.section && <span className="tag" style={{ background: "#1c1c28", color: "#8888aa", fontSize: 11 }}>{q.section}</span>}
// //         </div>
// //         <h3 style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 24 }}>{q?.question}</h3>

// //         {/* Options */}
// //         <div key={shakeKey}>
// //           {q?.options?.map((opt, i) => {
// //             const c = optColor(opt);
// //             const icon = optIcon(opt);
// //             const isWrong = answered && opt === answers[current] && opt !== q.answer;
// //             return (
// //               <div key={i}
// //                 className={isWrong ? "shake" : answered && opt === q.answer ? "pop" : ""}
// //                 onClick={() => handleSelect(opt)}
// //                 style={{ padding: "14px 18px", borderRadius: 12, border: `2px solid ${c.border}`, background: c.bg, color: c.color, marginBottom: 10, cursor: answered ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.25s", fontSize: 14, fontWeight: 500 }}>
// //                 <span>{opt}</span>
// //                 {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Expired */}
// //         {expired && <div className="slide-up" style={{ background: "#2d1515", border: "1px solid #ff6b6b44", borderRadius: 10, padding: "10px 14px", marginBottom: 12, color: "#ff6b6b", fontSize: 13 }}>⏰ Time's up! The correct answer was: <strong>{q?.answer}</strong></div>}

// //         {/* Explanation */}
// //         {answered && q?.explanation && (
// //           <div className="slide-up" style={{ background: "#0d1f17", border: "1px solid #06d6a040", borderRadius: 12, padding: "14px 16px", marginTop: 8, marginBottom: 16 }}>
// //             <div style={{ fontSize: 11, color: "#06d6a0", fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>💡 Explanation</div>
// //             <div style={{ fontSize: 14, color: "#aaccbb", lineHeight: 1.6 }}>{q.explanation}</div>
// //           </div>
// //         )}

// //         {/* Navigation */}
// //         <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center" }}>
// //           {!isLast && answered && (
// //             <button className="btn btn-primary" onClick={handleNext}>Next →</button>
// //           )}
// //           {isLast && answered && (
// //             <>
// //               <input value={userName} onChange={e => setUserName(e.target.value)}
// //                 placeholder="Your name (optional)"
// //                 style={{ flex: 1, background: "#0a0a0f", border: "1.5px solid #2a2a3a", borderRadius: 10, padding: "12px 14px", color: "#f0f0ff", fontSize: 14, outline: "none" }} />
// //               <button className="btn btn-accent" onClick={handleSubmit}>Submit ✓</button>
// //             </>
// //           )}
// //           <button className="btn btn-outline" style={{ marginLeft: "auto" }} onClick={onBack}>← Back</button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Timer Ring ────────────────────────────────────────────────────────────────
// // function TimerRing({ duration = 30, onExpire, stopped = false }) {
// //   const [t, setT] = useState(duration);
// //   const ref       = React.useRef(null);

// //   React.useEffect(() => {
// //     if (stopped) { clearInterval(ref.current); return; }
// //     ref.current = setInterval(() => {
// //       setT(prev => {
// //         if (prev <= 1) { clearInterval(ref.current); onExpire?.(); return 0; }
// //         return prev - 1;
// //       });
// //     }, 1000);
// //     return () => clearInterval(ref.current);
// //   }, [stopped]);

// //   const pct   = t / duration;
// //   const r     = 20;
// //   const circ  = 2 * Math.PI * r;
// //   const dash  = circ * pct;
// //   const color = t > 15 ? "#06d6a0" : t > 7 ? "#ffd166" : "#ff6b6b";

// //   return (
// //     <div style={{ position: "relative", width: 52, height: 52 }}>
// //       <svg width="52" height="52" style={{ transform: "rotate(-90deg)" }}>
// //         <circle cx="26" cy="26" r={r} fill="none" stroke="#2a2a3a" strokeWidth="3.5" />
// //         <circle cx="26" cy="26" r={r} fill="none" stroke={color} strokeWidth="3.5"
// //           strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
// //           style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.3s" }} />
// //       </svg>
// //       <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color }}>
// //         {t}
// //       </div>
// //     </div>
// //   );
// // }

// // // ── Result Page ───────────────────────────────────────────────────────────────
// // function ResultPage({ attempt, quiz, onRetake, onNewQuiz, onHome, API }) {
// //   const [tab,         setTab]         = useState("score");
// //   const [leaderboard, setLeaderboard] = useState([]);
// //   const [expandedIdx, setExpandedIdx] = useState(null);

// //   const pct     = Math.round((attempt.score / attempt.total_questions) * 100);
// //   const emoji   = pct >= 80 ? "🏆" : pct >= 60 ? "🥈" : pct >= 40 ? "👍" : "📚";
// //   const color   = pct >= 80 ? "#06d6a0" : pct >= 60 ? "#7c6af7" : pct >= 40 ? "#ffd166" : "#ff6b6b";
// //   const message = pct >= 80 ? "Excellent!" : pct >= 60 ? "Good job!" : pct >= 40 ? "Keep practicing!" : "Don't give up!";

// //   const answers   = attempt.answers || [];
// //   const questions = quiz?.quiz || [];

// //   React.useEffect(() => {
// //     if (!quiz?.id) return;
// //     fetch(`${API}/api/leaderboard/${quiz.id}`).then(r => r.json()).then(d => setLeaderboard(d.leaderboard || [])).catch(() => {});
// //   }, []);

// //   const tabStyle = (active) => ({
// //     padding: "9px 20px", border: "none", borderRadius: "10px 10px 0 0", cursor: "pointer",
// //     fontWeight: active ? 700 : 400, fontSize: 13,
// //     background: active ? "#7c6af7" : "transparent",
// //     color: active ? "#fff" : "#8888aa", transition: "all 0.2s"
// //   });

// //   return (
// //     <div className="slide-up">
// //       {/* Tabs */}
// //       <div style={{ display: "flex", gap: 4, borderBottom: "1px solid #2a2a3a", marginBottom: 24 }}>
// //         {["score", "answers", "scoreboard"].map(t =>
// //           <button key={t} style={tabStyle(tab===t)} onClick={() => setTab(t)}>
// //             {{ score:"🎯 Score", answers:"📝 Answers", scoreboard:"🏆 Scoreboard" }[t]}
// //           </button>
// //         )}
// //       </div>

// //       {/* ── Score Tab ── */}
// //       {tab === "score" && (
// //         <div className="pop" style={{ textAlign: "center" }}>
// //           <div style={{ fontSize: 80, marginBottom: 8 }}>{emoji}</div>
// //           <div style={{ fontFamily: "Syne, sans-serif", fontSize: 72, fontWeight: 900, color, lineHeight: 1 }}>{pct}%</div>
// //           <div style={{ fontSize: 18, color: "#8888aa", margin: "12px 0 32px" }}>{message}</div>

// //           {/* Stats */}
// //           <div style={{ display: "flex", gap: 16, marginBottom: 36 }}>
// //             {[
// //               { label: "✅ Correct",  value: attempt.score,                               color: "#06d6a0" },
// //               { label: "❌ Wrong",    value: attempt.total_questions - attempt.score,      color: "#ff6b6b" },
// //               { label: "⏱️ Time",     value: `${attempt.time_taken}s`,                     color: "#ffd166" },
// //               { label: "📝 Total",    value: attempt.total_questions,                      color: "#a78bfa" }
// //             ].map((s,i) => (
// //               <div key={i} className="card" style={{ flex: 1, textAlign: "center", padding: "16px 8px" }}>
// //                 <div style={{ fontSize: 24, fontWeight: 900, color: s.color, fontFamily: "Syne, sans-serif" }}>{s.value}</div>
// //                 <div style={{ fontSize: 11, color: "#8888aa", marginTop: 4 }}>{s.label}</div>
// //               </div>
// //             ))}
// //           </div>

// //           <div style={{ color: "#8888aa", fontSize: 13, marginBottom: 28 }}>Attempted by <strong style={{ color: "#f0f0ff" }}>{attempt.user_name}</strong></div>

// //           {/* Buttons */}
// //           <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
// //             <button className="btn btn-primary" onClick={onRetake}>🔀 Retake (Shuffled)</button>
// //             <button className="btn btn-accent"  onClick={onNewQuiz}>✨ New Questions</button>
// //             <button className="btn btn-outline" onClick={onHome}>🏠 Home</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Answers Tab ── */}
// //       {tab === "answers" && (
// //         <div className="fade-in">
// //           <div style={{ fontSize: 12, color: "#8888aa", marginBottom: 16 }}>
// //             Click any question to expand explanation
// //           </div>
// //           {answers.map((a, i) => {
// //             const explanation = a.explanation || questions[i]?.explanation || "";
// //             const isOpen      = expandedIdx === i;
// //             return (
// //               <div key={i}
// //                 onClick={() => setExpandedIdx(isOpen ? null : i)}
// //                 style={{ background: a.correct ? "#0d1f17" : "#1f0d0d", border: `1.5px solid ${a.correct ? "#06d6a040" : "#ff6b6b40"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", transition: "all 0.2s" }}>
// //                 {/* Header */}
// //                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
// //                   <div style={{ flex: 1 }}>
// //                     <div style={{ fontSize: 11, color: "#8888aa", marginBottom: 4 }}>Q{i+1}</div>
// //                     <div style={{ fontSize: 14, fontWeight: 600 }}>{a.question}</div>
// //                   </div>
// //                   <span style={{ fontSize: 20, flexShrink: 0 }}>{a.correct ? "✅" : "❌"}</span>
// //                 </div>

// //                 {/* Answer info */}
// //                 <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, flexWrap: "wrap" }}>
// //                   <span style={{ color: "#8888aa" }}>Your answer: <strong style={{ color: a.correct ? "#06d6a0" : "#ff6b6b" }}>{a.selected || "⏰ Not answered"}</strong></span>
// //                   {!a.correct && <span style={{ color: "#8888aa" }}>Correct: <strong style={{ color: "#06d6a0" }}>{a.correct_answer}</strong></span>}
// //                 </div>

// //                 {/* Expandable explanation */}
// //                 {isOpen && explanation && (
// //                   <div className="slide-up" style={{ marginTop: 12, padding: "12px 14px", background: "#0a0a0f", border: "1px solid #2a2a3a", borderRadius: 10 }}>
// //                     <div style={{ fontSize: 11, color: "#ffd166", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>💡 Explanation</div>
// //                     <div style={{ fontSize: 13, color: "#aaaacc", lineHeight: 1.6 }}>{explanation}</div>
// //                   </div>
// //                 )}
// //                 {isOpen && !explanation && (
// //                   <div style={{ marginTop: 10, fontSize: 12, color: "#555577" }}>No explanation available.</div>
// //                 )}
// //                 {!isOpen && <div style={{ fontSize: 11, color: "#555577", marginTop: 8 }}>▼ {a.correct ? "See explanation" : "See explanation & correct answer"}</div>}
// //               </div>
// //             );
// //           })}

// //           <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
// //             <button className="btn btn-primary" onClick={onRetake}>🔀 Retake (Shuffled)</button>
// //             <button className="btn btn-accent"  onClick={onNewQuiz}>✨ New Questions</button>
// //             <button className="btn btn-outline" onClick={onHome}>🏠 Home</button>
// //           </div>
// //         </div>
// //       )}

// //       {/* ── Scoreboard Tab ── */}
// //       {tab === "scoreboard" && (
// //         <div className="fade-in">
// //           <div style={{ fontSize: 14, color: "#8888aa", marginBottom: 20 }}>
// //             Top scores for <strong style={{ color: "#f0f0ff" }}>{quiz?.title}</strong>
// //           </div>
// //           {leaderboard.length === 0 ? (
// //             <div style={{ textAlign: "center", padding: "60px 0", color: "#555577" }}>
// //               <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
// //               No entries yet. Be the first!
// //             </div>
// //           ) : leaderboard.map((e, i) => (
// //             <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 10, padding: "14px 20px", border: i === 0 ? "1px solid #ffd16640" : "1px solid #2a2a3a", background: i === 0 ? "#1a1710" : "#13131a" }}>
// //               <div style={{ fontSize: 24, width: 36, textAlign: "center" }}>
// //                 {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${e.rank}`}
// //               </div>
// //               <div style={{ flex: 1 }}>
// //                 <div style={{ fontWeight: 700, fontSize: 15 }}>{e.user_name}</div>
// //                 <div style={{ fontSize: 12, color: "#8888aa" }}>{e.time_taken}s</div>
// //               </div>
// //               <div style={{ textAlign: "right" }}>
// //                 <div style={{ fontFamily: "Syne, sans-serif", fontSize: 20, fontWeight: 800, color: i === 0 ? "#ffd166" : "#a78bfa" }}>
// //                   {e.score}/{e.total_questions}
// //                 </div>
// //                 <div style={{ fontSize: 12, color: "#8888aa" }}>{Math.round((e.score/e.total_questions)*100)}%</div>
// //               </div>
// //             </div>
// //           ))}

// //           <div style={{ display: "flex", gap: 12, marginTop: 24, flexWrap: "wrap" }}>
// //             <button className="btn btn-primary" onClick={onRetake}>🔀 Retake (Shuffled)</button>
// //             <button className="btn btn-accent"  onClick={onNewQuiz}>✨ New Questions</button>
// //             <button className="btn btn-outline" onClick={onHome}>🏠 Home</button>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // // ── History Page ──────────────────────────────────────────────────────────────
// // function HistoryPage({ API, onSelect }) {
// //   const [history, setHistory] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [search,  setSearch]  = useState("");
// //   const [page,    setPage]    = useState(0);
// //   const PER = 10;

// //   React.useEffect(() => {
// //     fetch(`${API}/api/history?limit=100`)
// //       .then(r => r.json())
// //       .then(d => { setHistory(d.history || []); setLoading(false); })
// //       .catch(() => setLoading(false));
// //   }, []);

// //   const filtered   = history.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));
// //   const paginated  = filtered.slice(page * PER, (page+1) * PER);
// //   const totalPages = Math.ceil(filtered.length / PER);

// //   const handleClick = async (item) => {
// //     try {
// //       const res  = await fetch(`${API}/api/quiz/${item.quiz_id}`);
// //       const data = await res.json();
// //       onSelect(data);
// //     } catch {}
// //   };

// //   if (loading) return (
// //     <div style={{ textAlign: "center", padding: "80px 0" }}>
// //       <div className="spin" style={{ width: 36, height: 36, border: "3px solid #2a2a3a", borderTopColor: "#7c6af7", borderRadius: "50%", margin: "0 auto 16px" }} />
// //       <div style={{ color: "#8888aa" }}>Loading history...</div>
// //     </div>
// //   );

// //   return (
// //     <div className="slide-up">
// //       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
// //         <h2 style={{ fontFamily: "Syne, sans-serif", fontSize: 24, fontWeight: 800 }}>📋 Quiz History</h2>
// //         <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
// //           placeholder="🔍 Search..."
// //           style={{ background: "#13131a", border: "1.5px solid #2a2a3a", borderRadius: 10, padding: "9px 14px", color: "#f0f0ff", fontSize: 13, width: 200, outline: "none" }} />
// //       </div>

// //       {paginated.length === 0 ? (
// //         <div style={{ textAlign: "center", padding: "80px 0", color: "#555577" }}>
// //           <div style={{ fontSize: 48, marginBottom: 12 }}>🗂️</div>
// //           {search ? "No results found." : "No quizzes yet. Generate your first one!"}
// //         </div>
// //       ) : (
// //         <>
// //           {paginated.map((item, i) => (
// //             <div key={item.id}
// //               className="card"
// //               onClick={() => handleClick(item)}
// //               style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, cursor: "pointer", transition: "all 0.2s", animationDelay: `${i * 0.04}s` }}
// //               onMouseEnter={e => { e.currentTarget.style.borderColor = "#7c6af7"; e.currentTarget.style.transform = "translateX(4px)"; }}
// //               onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a3a"; e.currentTarget.style.transform = "translateX(0)"; }}>
// //               <div>
// //                 <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
// //                 <div style={{ fontSize: 12, color: "#8888aa" }}>
// //                   {item.total_questions} questions &nbsp;·&nbsp; v{item.version} &nbsp;·&nbsp;
// //                   {new Date(item.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
// //                 </div>
// //               </div>
// //               <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
// //                 <span className="tag" style={{ background: "#7c6af720", color: "#a78bfa" }}>v{item.version}</span>
// //                 <span className="tag" style={{ background: "#06d6a020", color: "#06d6a0" }}>{item.total_questions}Q</span>
// //                 <span style={{ color: "#7c6af7", fontSize: 18 }}>→</span>
// //               </div>
// //             </div>
// //           ))}

// //           {totalPages > 1 && (
// //             <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
// //               {Array.from({ length: totalPages }, (_, i) => (
// //                 <button key={i} onClick={() => setPage(i)}
// //                   style={{ width: 36, height: 36, borderRadius: 8, border: "none", cursor: "pointer", background: i === page ? "#7c6af7" : "#1c1c28", color: i === page ? "#fff" : "#8888aa", fontWeight: i === page ? 700 : 400 }}>
// //                   {i+1}
// //                 </button>
// //               ))}
// //             </div>
// //           )}
// //         </>
// //       )}
// //     </div>
// //   );
// // }


// import React, { useState, useCallback } from "react";

// const API = "http://localhost:8000";

// const PAGES = { HOME: "home", PREVIEW: "preview", QUIZ: "quiz", RESULT: "result", HISTORY: "history" };

// const css = `
//   @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Lora:wght@400;500;600;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   :root {
//     --bg:        #f0f4ff;
//     --surface:   #ffffff;
//     --surface2:  #f7f8fc;
//     --border:    #e2e6f0;
//     --primary:   #4f46e5;
//     --primary-light: #ede9fe;
//     --primary-dark:  #3730a3;
//     --accent:    #10b981;
//     --accent-light: #d1fae5;
//     --danger:    #ef4444;
//     --danger-light: #fee2e2;
//     --warn:      #f59e0b;
//     --warn-light:#fef3c7;
//     --text:      #1e1b4b;
//     --text2:     #4b5563;
//     --muted:     #9ca3af;
//     --shadow:    0 1px 3px rgba(79,70,229,0.08), 0 4px 16px rgba(79,70,229,0.06);
//     --shadow-md: 0 4px 12px rgba(79,70,229,0.12), 0 8px 32px rgba(79,70,229,0.08);
//     --shadow-lg: 0 8px 24px rgba(79,70,229,0.15), 0 16px 48px rgba(79,70,229,0.1);
//     --radius:    16px;
//     --radius-sm: 10px;
//     --radius-xs: 6px;
//   }

//   body {
//     background: var(--bg);
//     color: var(--text);
//     font-family: 'Nunito', sans-serif;
//     min-height: 100vh;
//     overflow-x: hidden;
//   }

//   .page-enter { animation: pageEnter 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
//   @keyframes pageEnter {
//     from { opacity: 0; transform: translateY(20px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .fade-in { animation: fadeIn 0.3s ease forwards; }
//   @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

//   .slide-up { animation: slideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
//   @keyframes slideUp {
//     from { opacity: 0; transform: translateY(24px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }

//   .pop { animation: pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
//   @keyframes pop {
//     from { opacity: 0; transform: scale(0.9); }
//     to   { opacity: 1; transform: scale(1); }
//   }

//   .shake { animation: shake 0.4s ease; }
//   @keyframes shake {
//     0%,100% { transform: translateX(0); }
//     20%     { transform: translateX(-8px); }
//     40%     { transform: translateX(8px); }
//     60%     { transform: translateX(-5px); }
//     80%     { transform: translateX(5px); }
//   }

//   .pulse { animation: pulse 1.6s ease infinite; }
//   @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

//   .spin { animation: spin 1s linear infinite; }
//   @keyframes spin { to { transform: rotate(360deg); } }

//   /* Buttons */
//   .btn {
//     display: inline-flex; align-items: center; justify-content: center; gap: 7px;
//     padding: 11px 24px; border-radius: var(--radius-sm); border: none; cursor: pointer;
//     font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700;
//     transition: all 0.18s cubic-bezier(0.22,1,0.36,1);
//     position: relative; white-space: nowrap; letter-spacing: 0.01em;
//   }
//   .btn:hover  { transform: translateY(-1px); }
//   .btn:active { transform: translateY(0) scale(0.98); }

//   .btn-primary {
//     background: var(--primary);
//     color: #fff;
//     box-shadow: 0 2px 8px rgba(79,70,229,0.3);
//   }
//   .btn-primary:hover { background: var(--primary-dark); box-shadow: 0 4px 16px rgba(79,70,229,0.4); }

//   .btn-outline {
//     background: var(--surface);
//     border: 1.5px solid var(--border);
//     color: var(--text2);
//     box-shadow: var(--shadow);
//   }
//   .btn-outline:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }

//   .btn-accent {
//     background: var(--accent);
//     color: #fff;
//     box-shadow: 0 2px 8px rgba(16,185,129,0.3);
//   }
//   .btn-accent:hover { background: #059669; box-shadow: 0 4px 16px rgba(16,185,129,0.4); }

//   .btn-danger {
//     background: var(--danger);
//     color: #fff;
//     box-shadow: 0 2px 8px rgba(239,68,68,0.25);
//   }

//   /* Card */
//   .card {
//     background: var(--surface);
//     border: 1px solid var(--border);
//     border-radius: var(--radius);
//     padding: 24px;
//     box-shadow: var(--shadow);
//   }

//   /* Tag */
//   .tag {
//     display: inline-flex; align-items: center; gap: 4px;
//     padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 700;
//     letter-spacing: 0.02em;
//   }

//   /* Inputs */
//   input, select, textarea {
//     font-family: 'Nunito', sans-serif;
//     color: var(--text);
//   }

//   input::placeholder { color: var(--muted); }

//   /* Scrollbar */
//   ::-webkit-scrollbar { width: 5px; }
//   ::-webkit-scrollbar-track { background: var(--bg); }
//   ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
// `;

// export default function App() {
//   const [page,       setPage]       = useState(PAGES.HOME);
//   const [quiz,       setQuiz]       = useState(null);
//   const [attempt,    setAttempt]    = useState(null);
//   const [loading,    setLoading]    = useState(false);
//   const [loadingMsg, setLoadingMsg] = useState("");
//   const [error,      setError]      = useState("");
//   const [retakeQ,    setRetakeQ]    = useState(null);

//   const navigate = (p) => { setError(""); setPage(p); };

//   const handleGenerate = async ({ url, num_questions, difficulty }) => {
//     setLoading(true);
//     setError("");
//     const msgs = [
//       "Scraping Wikipedia article...",
//       "Reading the content...",
//       "Crafting your questions...",
//       "Finalizing quiz..."
//     ];
//     let mi = 0;
//     setLoadingMsg(msgs[0]);
//     const interval = setInterval(() => {
//       mi = (mi + 1) % msgs.length;
//       setLoadingMsg(msgs[mi]);
//     }, 2000);
//     try {
//       const res = await fetch(`${API}/api/quiz/generate`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url, num_questions, difficulty })
//       });
//       if (!res.ok) { const e = await res.json(); throw new Error(e.detail || "Failed"); }
//       const data = await res.json();
//       setQuiz(data);
//       setRetakeQ(null);
//       navigate(PAGES.PREVIEW);
//     } catch (e) { setError(e.message); }
//     finally { clearInterval(interval); setLoading(false); }
//   };

//   const handleRegenerate = async () => {
//     if (!quiz) return;
//     setLoading(true);
//     setLoadingMsg("Generating fresh questions...");
//     setError("");
//     try {
//       const res = await fetch(`${API}/api/quiz/${quiz.id}/regenerate`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url: quiz.url, num_questions: quiz.quiz?.length || 7, difficulty: "mixed" })
//       });
//       if (!res.ok) throw new Error("Regeneration failed");
//       const data = await res.json();
//       setQuiz(data);
//       setRetakeQ(null);
//       navigate(PAGES.PREVIEW);
//     } catch (e) { setError(e.message); }
//     finally { setLoading(false); }
//   };

//   const handleSubmit = async (attemptData) => {
//     try {
//       const res = await fetch(`${API}/api/quiz/attempt`, {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ quiz_id: quiz.id, ...attemptData })
//       });
//       const data = await res.json();
//       setAttempt({ ...attemptData, id: data.id });
//       navigate(PAGES.RESULT);
//     } catch { setAttempt(attemptData); navigate(PAGES.RESULT); }
//   };

//   const handleRetake = () => {
//     const shuffled = [...(quiz.quiz || [])].sort(() => Math.random() - 0.5);
//     setRetakeQ(shuffled);
//     navigate(PAGES.QUIZ);
//   };

//   if (loading) return (
//     <>
//       <style>{css}</style>
//       <LoadingScreen message={loadingMsg} />
//     </>
//   );

//   return (
//     <>
//       <style>{css}</style>
//       <Navbar onHome={() => navigate(PAGES.HOME)} onHistory={() => navigate(PAGES.HISTORY)} page={page} />
//       <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 16px 64px" }}>
//         {error && <ErrorBanner msg={error} onClose={() => setError("")} />}
//         <div className="page-enter" key={page}>
//           {page === PAGES.HOME    && <HomePage onGenerate={handleGenerate} API={API} />}
//           {page === PAGES.PREVIEW && quiz && <PreviewPage quiz={quiz} onTake={() => navigate(PAGES.QUIZ)} onBack={() => navigate(PAGES.HOME)} />}
//           {page === PAGES.QUIZ    && quiz && <QuizPage questions={retakeQ || quiz.quiz || []} onSubmit={handleSubmit} onBack={() => navigate(PAGES.PREVIEW)} />}
//           {page === PAGES.RESULT  && attempt && quiz && <ResultPage attempt={attempt} quiz={quiz} onRetake={handleRetake} onNewQuiz={handleRegenerate} onHome={() => navigate(PAGES.HOME)} API={API} />}
//           {page === PAGES.HISTORY && <HistoryPage API={API} onSelect={(q) => { setQuiz(q); setRetakeQ(null); navigate(PAGES.PREVIEW); }} />}
//         </div>
//       </div>
//     </>
//   );
// }

// // ── Loading Screen ────────────────────────────────────────────────────────────
// function LoadingScreen({ message }) {
//   return (
//     <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
//       <div style={{ width: 72, height: 72, background: "var(--primary-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
//         📚
//       </div>
//       <div style={{ textAlign: "center" }}>
//         <div style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>WikiQuiz AI</div>
//         <div className="pulse" style={{ color: "var(--text2)", fontSize: 14 }}>{message}</div>
//       </div>
//       <div style={{ display: "flex", gap: 6 }}>
//         {[0,1,2].map(i => (
//           <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />
//         ))}
//       </div>
//     </div>
//   );
// }

// // ── Navbar ────────────────────────────────────────────────────────────────────
// function Navbar({ onHome, onHistory, page }) {
//   return (
//     <nav style={{
//       background: "#ffffff",
//       borderBottom: "1px solid var(--border)",
//       padding: "0 32px",
//       display: "flex", alignItems: "center", justifyContent: "space-between",
//       height: 60,
//       position: "sticky", top: 0, zIndex: 100,
//       boxShadow: "0 1px 0 var(--border)"
//     }}>
//       <div onClick={onHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
//         <div style={{ width: 32, height: 32, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
//           📚
//         </div>
//         <span style={{ fontFamily: "Lora, serif", fontSize: 17, fontWeight: 700, color: "var(--text)" }}>WikiQuiz AI</span>
//       </div>
//       <div style={{ display: "flex", gap: 8 }}>
//         <button className="btn btn-outline" style={{ padding: "7px 16px", fontSize: 13 }} onClick={onHome}>Home</button>
//         <button className="btn btn-outline" style={{
//           padding: "7px 16px", fontSize: 13,
//           borderColor: page === "history" ? "var(--primary)" : undefined,
//           color: page === "history" ? "var(--primary)" : undefined,
//           background: page === "history" ? "var(--primary-light)" : undefined
//         }} onClick={onHistory}>History</button>
//       </div>
//     </nav>
//   );
// }

// // ── Error Banner ──────────────────────────────────────────────────────────────
// function ErrorBanner({ msg, onClose }) {
//   return (
//     <div className="slide-up" style={{ background: "var(--danger-light)", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <span style={{ color: "var(--danger)", fontSize: 14, fontWeight: 600 }}>⚠ {msg}</span>
//       <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
//     </div>
//   );
// }

// // ── Home Page ─────────────────────────────────────────────────────────────────
// function HomePage({ onGenerate, API }) {
//   const [url,        setUrl]        = useState("");
//   const [numQ,       setNumQ]       = useState(7);
//   const [difficulty, setDifficulty] = useState("mixed");
//   const [preview,    setPreview]    = useState(null);
//   const [previewing, setPreviewing] = useState(false);
//   const [urlError,   setUrlError]   = useState("");

//   const isWiki = (u) => u.includes("wikipedia.org/wiki/");

//   const fetchPreview = async () => {
//     if (!isWiki(url)) { if (url) setUrlError("Please enter a valid Wikipedia URL"); return; }
//     setUrlError(""); setPreviewing(true);
//     try {
//       const res = await fetch(`${API}/api/quiz/preview?url=${encodeURIComponent(url)}`);
//       const d   = await res.json();
//       setPreview(d);
//     } catch { setPreview(null); }
//     finally { setPreviewing(false); }
//   };

//   const handleSubmit = () => {
//     if (!isWiki(url)) { setUrlError("Please enter a valid Wikipedia URL"); return; }
//     onGenerate({ url, num_questions: numQ, difficulty });
//   };

//   const inputStyle = {
//     width: "100%", background: "var(--surface2)",
//     border: `1.5px solid ${urlError ? "var(--danger)" : "var(--border)"}`,
//     borderRadius: 10, padding: "12px 44px 12px 14px",
//     color: "var(--text)", fontSize: 14, outline: "none",
//     transition: "border-color 0.2s, box-shadow 0.2s",
//     fontFamily: "Nunito, sans-serif"
//   };

//   return (
//     <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 32 }}>
//       {/* Hero */}
//       <div className="slide-up" style={{ textAlign: "center", marginBottom: 40 }}>
//         <div style={{ width: 64, height: 64, background: "var(--primary-light)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 20px" }}>
//           📚
//         </div>
//         <h1 style={{ fontFamily: "Lora, serif", fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 10, color: "var(--text)" }}>
//           Turn Wikipedia into<br />
//           <span style={{ color: "var(--primary)" }}>instant quizzes</span>
//         </h1>
//         <p style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.6 }}>
//           Paste any Wikipedia URL, AI generates your quiz instantly
//         </p>
//       </div>

//       {/* Card */}
//       <div className="card slide-up" style={{ animationDelay: "0.08s", borderRadius: 20, padding: 28 }}>

//         {/* URL input */}
//         <div style={{ marginBottom: 20 }}>
//           <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>Wikipedia URL</label>
//           <div style={{ position: "relative" }}>
//             <input
//               value={url}
//               onChange={e => { setUrl(e.target.value); setPreview(null); setUrlError(""); }}
//               onBlur={fetchPreview}
//               onKeyDown={e => e.key === "Enter" && fetchPreview()}
//               placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
//               style={inputStyle}
//               onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.1)"; }}
//             />
//             {previewing && (
//               <div className="spin" style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, border: "2px solid var(--primary)", borderTopColor: "transparent", borderRadius: "50%" }} />
//             )}
//           </div>
//           {urlError && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 5, fontWeight: 600 }}>{urlError}</div>}
//         </div>

//         {/* Article preview */}
//         {preview && (
//           <div className="slide-up" style={{ background: "var(--primary-light)", border: "1px solid #c4b5fd", borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
//             <div style={{ fontWeight: 700, fontSize: 13, color: "var(--primary)", marginBottom: 4 }}>
//               📄 {preview.title}
//             </div>
//             <div style={{ color: "var(--text2)", fontSize: 12, lineHeight: 1.6 }}>{preview.summary?.slice(0, 180)}...</div>
//           </div>
//         )}

//         {/* Settings */}
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
//           <div>
//             <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>Questions</label>
//             <select value={numQ} onChange={e => setNumQ(Number(e.target.value))}
//               style={{ width: "100%", background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 12px", color: "var(--text)", fontSize: 14, outline: "none", cursor: "pointer" }}>
//               {[5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Questions</option>)}
//             </select>
//           </div>
//           <div>
//             <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>Difficulty</label>
//             <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
//               style={{ width: "100%", background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 12px", color: "var(--text)", fontSize: 14, outline: "none", cursor: "pointer" }}>
//               <option value="mixed">Mixed</option>
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>
//           </div>
//         </div>

//         <button className="btn btn-primary" style={{ width: "100%", fontSize: 15, padding: "13px" }} onClick={handleSubmit}>
//           Generate Quiz
//         </button>

//         <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 11, marginTop: 12, fontWeight: 600 }}>
//           Powered by Gemini 2.5 Flash · BeautifulSoup · PostgreSQL
//         </div>
//       </div>

//       {/* Example chips */}
//       <div className="slide-up" style={{ marginTop: 24, animationDelay: "0.15s" }}>
//         <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, textAlign: "center", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Try these</div>
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
//           {["Alan_Turing", "Black_hole", "Python_(programming_language)"].map(t => (
//             <button key={t} onClick={() => { setUrl(`https://en.wikipedia.org/wiki/${t}`); setPreview(null); }}
//               style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "6px 14px", color: "var(--text2)", fontSize: 12, cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 600, boxShadow: "var(--shadow)", transition: "all 0.15s" }}
//               onMouseEnter={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.color = "var(--primary)"; }}
//               onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}>
//               {t.replace(/_/g, " ")}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Preview Page ──────────────────────────────────────────────────────────────
// function PreviewPage({ quiz, onTake, onBack }) {
//   const [tab, setTab] = useState("overview");
//   const questions     = quiz.quiz || [];
//   const topics        = quiz.related_topics || [];
//   const entities      = quiz.key_entities || {};

//   const diffBadge = { easy: { bg: "var(--accent-light)", color: "var(--accent)" }, medium: { bg: "var(--warn-light)", color: "#b45309" }, hard: { bg: "var(--danger-light)", color: "var(--danger)" } };
//   const tabs = ["overview", "questions", "topics", "entities"];
//   const tabLabels = { overview: "Overview", questions: "Questions", topics: "Topics", entities: "Entities" };

//   return (
//     <div className="slide-up">
//       {/* Header */}
//       <div className="card" style={{ marginBottom: 20, borderRadius: 20 }}>
//         <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
//           <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{questions.length} Questions</span>
//           <span className="tag" style={{ background: "#f0fdf4", color: "#15803d" }}>v{quiz.version}</span>
//           {Object.entries(questions.reduce((a,q) => { a[q.difficulty] = (a[q.difficulty]||0)+1; return a; }, {})).map(([d,c]) =>
//             <span key={d} className="tag" style={{ background: diffBadge[d]?.bg || "#f3f4f6", color: diffBadge[d]?.color || "var(--text2)" }}>{c} {d}</span>
//           )}
//         </div>
//         <h2 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>{quiz.title}</h2>
//         <div style={{ fontSize: 12, color: "var(--primary)", wordBreak: "break-all" }}>{quiz.url}</div>
//       </div>

//       {/* Tabs */}
//       {/* <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "var(--surface2)", borderRadius: 12, padding: 4, border: "1px solid var(--border)" }}>
//         {tabs.map(t => (
//           <button key={t} onClick={() => setTab(t)}
//             style={{ flex: 1, padding: "8px 4px", background: tab===t ? "var(--surface)" : "transparent", color: tab===t ? "var(--primary)" : "var(--text2)", border: "none", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: tab===t ? 700 : 500, transition: "all 0.15s", boxShadow: tab===t ? "var(--shadow)" : "none", fontFamily: "Nunito, sans-serif" }}>
//             {tabLabels[t]}
//           </button>
//         ))}
//       </div> */}

//       {/* Tab content */}
//       {/* <div className="card" style={{ minHeight: 160, borderRadius: 20 }}>
//         {tab === "overview" && (
//           <div className="fade-in">
//             <p style={{ color: "var(--text2)", lineHeight: 1.75, fontSize: 14 }}>{quiz.summary}</p>
//             {quiz.sections?.length > 0 && (
//               <div style={{ marginTop: 18 }}>
//                 <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Sections Covered</div>
//                 <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
//                   {quiz.sections.map((s,i) => <span key={i} className="tag" style={{ background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border)" }}>{s}</span>)}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {tab === "questions" && (
//           <div className="fade-in">
//             {questions.map((q, i) => (
//               <div key={i} style={{ padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, marginBottom: 8, background: "var(--surface2)" }}>
//                 <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 700, marginBottom: 4 }}>Q{i+1} · {q.section}</div>
//                 <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{q.question}</div>
//                 <span className="tag" style={{ background: diffBadge[q.difficulty]?.bg || "#f3f4f6", color: diffBadge[q.difficulty]?.color || "var(--text2)", fontSize: 10 }}>{q.difficulty?.toUpperCase()}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {tab === "topics" && (
//           <div className="fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
//             {topics.length ? topics.map((t,i) =>
//               <span key={i} className="tag" style={{ background: "var(--primary-light)", border: "1px solid #c4b5fd", color: "var(--primary)", padding: "7px 14px", fontSize: 13, fontWeight: 600 }}>{t}</span>
//             ) : <div style={{ color: "var(--muted)", fontSize: 14 }}>No related topics.</div>}
//           </div>
//         )}

//         {tab === "entities" && (
//           <div className="fade-in">
//             {entities.people?.length > 0 && <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>People</div><div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{entities.people.join(", ")}</div></div>}
//             {entities.organizations?.length > 0 && <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>Organizations</div><div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{entities.organizations.join(", ")}</div></div>}
//             {entities.locations?.length > 0 && <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>Locations</div><div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{entities.locations.join(", ")}</div></div>}
//             {!entities.people?.length && !entities.organizations?.length && !entities.locations?.length && <div style={{ color: "var(--muted)", fontSize: 14 }}>No entities found.</div>}
//           </div>
//         )}
//       </div> */}

//       {/* Actions */}
//       <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
//         <button className="btn btn-primary" style={{ flex: 1, minWidth: 140, fontSize: 15, padding: "13px" }} onClick={onTake}>Start Quiz</button>
//         <button className="btn btn-outline" onClick={onBack}>Back</button>
//       </div>
//     </div>
//   );
// }

// // ── Quiz Page ─────────────────────────────────────────────────────────────────
// function QuizPage({ questions, onSubmit, onBack }) {
//   const [current,  setCurrent]  = useState(0);
//   const [answers,  setAnswers]  = useState({});
//   const [selected, setSelected] = useState(null);
//   const [timerKey, setTimerKey] = useState(0);
//   const [expired,  setExpired]  = useState(false);
//   const [userName, setUserName] = useState("");
//   const [shakeKey, setShakeKey] = useState(0);
//   const startRef               = React.useRef(Date.now());

//   const q         = questions[current];
//   const answered  = answers[current] !== undefined;
//   const isLast    = current === questions.length - 1;

//   const diffBadge = {
//     easy:   { bg: "var(--accent-light)",   color: "var(--accent)" },
//     medium: { bg: "var(--warn-light)",     color: "#b45309" },
//     hard:   { bg: "var(--danger-light)",   color: "var(--danger)" }
//   };

//   const handleSelect = (opt) => {
//     if (answered) return;
//     setSelected(opt);
//     setAnswers(a => ({ ...a, [current]: opt }));
//     if (opt !== q.answer) setShakeKey(k => k + 1);
//   };

//   const handleExpire = () => {
//     if (!answered) { setAnswers(a => ({ ...a, [current]: "" })); setExpired(true); }
//   };

//   const handleNext = () => {
//     setSelected(null); setExpired(false);
//     setCurrent(c => c + 1);
//     setTimerKey(k => k + 1);
//   };

//   const handleSubmit = () => {
//     const elapsed = Math.round((Date.now() - startRef.current) / 1000);
//     let score = 0;
//     const ans = questions.map((q, i) => {
//       const sel     = answers[i] || "";
//       const correct = sel === q.answer;
//       if (correct) score++;
//       return { question: q.question, selected: sel, correct_answer: q.answer, correct, explanation: q.explanation || "" };
//     });
//     onSubmit({ user_name: userName.trim() || "Anonymous", score, total_questions: questions.length, time_taken: elapsed, answers: ans });
//   };

//   // const optStyle = (opt) => {
//   //   if (!answered) return { border: "var(--border)", bg: "var(--surface2)", color: "var(--text)", hover: true };
//   //   if (opt === q.answer) return { border: "var(--accent)", bg: "var(--accent-light)", color: "#065f46" };
//   //   if (opt === answers[current] && opt !== q.answer) return { border: "var(--danger)", bg: "var(--danger-light)", color: "#7f1d1d" };
//   //   return { border: "var(--border)", bg: "var(--surface2)", color: "var(--muted)" };
//   // };

//   // const optIcon = (opt) => {
//   //   if (!answered) return null;
//   //   if (opt === q.answer) return "✓";
//   //   if (opt === answers[current] && opt !== q.answer) return "✗";
//   //   return null;
//   // };
// const optStyle = (opt) => {
//     if (answers[current] === opt) return { border: "var(--primary)", bg: "var(--primary-light)", color: "var(--primary)" };
//     return { border: "var(--border)", bg: "var(--surface2)", color: "var(--text)" };
//   };

//   const optIcon = (opt) => null;
//   return (
//     <div className="slide-up" style={{ maxWidth: 620, margin: "0 auto" }}>
//       {/* Progress bar + meta */}
//       <div style={{ marginBottom: 24 }}>
//         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
//           <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 700 }}>
//             Question {current + 1} <span style={{ color: "var(--muted)", fontWeight: 500 }}>of {questions.length}</span>
//           </span>
//           <TimerRing key={timerKey} duration={30} onExpire={handleExpire} stopped={answered} />
//         </div>
//         <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
//           <div style={{ height: "100%", width: `${((current + 1) / questions.length) * 100}%`, background: "var(--primary)", borderRadius: 3, transition: "width 0.4s ease" }} />
//         </div>
//       </div>

//       {/* Question card */}
//       <div key={current} className="slide-up">
//         <div className="card" style={{ borderRadius: 20, marginBottom: 16 }}>
//           <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
//             <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>Q{current + 1}</span>
//             <span className="tag" style={{ background: diffBadge[q?.difficulty]?.bg || "#f3f4f6", color: diffBadge[q?.difficulty]?.color || "var(--text2)" }}>{q?.difficulty?.toUpperCase()}</span>
//             {q?.section && <span className="tag" style={{ background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border)" }}>{q.section}</span>}
//           </div>
//           <h3 style={{ fontFamily: "Lora, serif", fontSize: 19, fontWeight: 600, lineHeight: 1.5, color: "var(--text)" }}>{q?.question}</h3>
//         </div>

//         {/* Options */}
//         <div key={shakeKey} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//           {q?.options?.map((opt, i) => {
//             const s    = optStyle(opt);
//             const icon = optIcon(opt);
//             const isWrong = answered && opt === answers[current] && opt !== q.answer;
//             return (
//               <div key={i}
//                 className={isWrong ? "shake" : answered && opt === q.answer ? "pop" : ""}
//                 onClick={() => handleSelect(opt)}
//                 style={{
//                   padding: "13px 16px",
//                   borderRadius: 12,
//                   border: `2px solid ${s.border}`,
//                   background: s.bg,
//                   color: s.color,
//                   cursor: answered ? "default" : "pointer",
//                   display: "flex", alignItems: "center", justifyContent: "space-between",
//                   transition: "all 0.2s",
//                   fontSize: 14, fontWeight: 600,
//                   boxShadow: !answered ? "var(--shadow)" : "none"
//                 }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <span style={{ width: 24, height: 24, borderRadius: 6, background: !answered ? "var(--surface)" : "transparent", border: !answered ? "1.5px solid var(--border)" : "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "var(--muted)", flexShrink: 0 }}>
//                     {!answered ? String.fromCharCode(65 + i) : ""}
//                   </span>
//                   {opt}
//                 </div>
//                 {icon && (
//                   <span style={{ width: 24, height: 24, borderRadius: "50%", background: opt === q.answer ? "var(--accent)" : "var(--danger)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>
//                     {icon}
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Time expired */}
//         {expired && (
//           <div className="slide-up" style={{ background: "var(--danger-light)", border: "1px solid #fca5a5", borderRadius: 10, padding: "11px 14px", marginTop: 14, color: "var(--danger)", fontSize: 13, fontWeight: 600 }}>
//             Time's up! Correct answer: <strong>{q?.answer}</strong>
//           </div>
//         )}

//         {/* Explanation */}
//         {/* {answered && q?.explanation && (
//           <div className="slide-up" style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 12, padding: "14px 16px", marginTop: 14 }}>
//             <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.06em" }}>Explanation</div>
//             <div style={{ fontSize: 13, color: "#166534", lineHeight: 1.65, fontWeight: 500 }}>{q.explanation}</div>
//           </div>
//         )} */}

//         {/* Navigation */}
//         <div style={{ display: "flex", gap: 10, marginTop: 20, alignItems: "center" }}>
//           {!isLast && answered && (
//             <button className="btn btn-primary" onClick={handleNext}>Next</button>
//           )}
//           {isLast && answered && (
//             <>
//               <input value={userName} onChange={e => setUserName(e.target.value)}
//                 placeholder="Your name (optional)"
//                 style={{ flex: 1, background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "Nunito, sans-serif", fontWeight: 500 }} />
//               <button className="btn btn-accent" onClick={handleSubmit}>Submit</button>
//             </>
//           )}
//           <button className="btn btn-outline" style={{ marginLeft: "auto" }} onClick={onBack}>Back</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Timer Ring ────────────────────────────────────────────────────────────────
// function TimerRing({ duration = 30, onExpire, stopped = false }) {
//   const [t, setT] = useState(duration);
//   const ref       = React.useRef(null);

//   React.useEffect(() => {
//     if (stopped) { clearInterval(ref.current); return; }
//     ref.current = setInterval(() => {
//       setT(prev => {
//         if (prev <= 1) { clearInterval(ref.current); onExpire?.(); return 0; }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(ref.current);
//   }, [stopped]);

//   const pct   = t / duration;
//   const r     = 18;
//   const circ  = 2 * Math.PI * r;
//   const dash  = circ * pct;
//   const color = t > 15 ? "var(--accent)" : t > 7 ? "var(--warn)" : "var(--danger)";
//   const bg    = t > 15 ? "var(--accent-light)" : t > 7 ? "var(--warn-light)" : "var(--danger-light)";

//   return (
//     <div style={{ position: "relative", width: 48, height: 48, background: bg, borderRadius: "50%", border: "1.5px solid var(--border)" }}>
//       <svg width="48" height="48" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
//         <circle cx="24" cy="24" r={r} fill="none" stroke="var(--border)" strokeWidth="3" />
//         <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3"
//           strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
//           style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.3s" }} />
//       </svg>
//       <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color }}>
//         {t}
//       </div>
//     </div>
//   );
// }

// // ── Result Page ───────────────────────────────────────────────────────────────
// function ResultPage({ attempt, quiz, onRetake, onNewQuiz, onHome, API }) {
//   const [tab,         setTab]         = useState("score");
//   const [leaderboard, setLeaderboard] = useState([]);
//   const [expandedIdx, setExpandedIdx] = useState(null);

//   const pct     = Math.round((attempt.score / attempt.total_questions) * 100);
//   const grade   = pct >= 80 ? { label: "Excellent!", color: "var(--accent)", bg: "var(--accent-light)" }
//                 : pct >= 60 ? { label: "Good job!",   color: "var(--primary)", bg: "var(--primary-light)" }
//                 : pct >= 40 ? { label: "Keep going!",  color: "var(--warn)",    bg: "var(--warn-light)" }
//                 :             { label: "Keep trying!", color: "var(--danger)",  bg: "var(--danger-light)" };

//   const answers   = attempt.answers || [];
//   const questions = quiz?.quiz || [];

//   React.useEffect(() => {
//     if (!quiz?.id) return;
//     fetch(`${API}/api/leaderboard/${quiz.id}`).then(r => r.json()).then(d => setLeaderboard(d.leaderboard || [])).catch(() => {});
//   }, []);

//   const tabLabels = { score: "Score", answers: "Review", scoreboard: "Leaderboard" };

//   return (
//     <div className="slide-up" style={{ maxWidth: 620, margin: "0 auto" }}>
//       {/* Tab bar */}
//       <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 4, boxShadow: "var(--shadow)" }}>
//         {["score", "answers", "scoreboard"].map(t =>
//           <button key={t} onClick={() => setTab(t)}
//             style={{ flex: 1, padding: "9px", border: "none", borderRadius: 9, cursor: "pointer", fontWeight: tab===t ? 700 : 500, fontSize: 13, background: tab===t ? "var(--primary)" : "transparent", color: tab===t ? "#fff" : "var(--text2)", transition: "all 0.15s", fontFamily: "Nunito, sans-serif" }}>
//             {tabLabels[t]}
//           </button>
//         )}
//       </div>

//       {/* Score tab */}
//       {tab === "score" && (
//         <div className="pop" style={{ textAlign: "center" }}>
//           <div style={{ background: grade.bg, border: `2px solid ${grade.color}30`, borderRadius: 24, padding: "40px 24px", marginBottom: 24 }}>
//             <div style={{ fontSize: 64, fontWeight: 900, color: grade.color, fontFamily: "Lora, serif", lineHeight: 1 }}>{pct}%</div>
//             <div style={{ fontSize: 18, fontWeight: 700, color: grade.color, marginTop: 8 }}>{grade.label}</div>
//             <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 6 }}>Attempted by <strong>{attempt.user_name}</strong></div>
//           </div>

//           <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
//             {[
//               { label: "Correct",  value: attempt.score,                          color: "var(--accent)" },
//               { label: "Wrong",    value: attempt.total_questions - attempt.score, color: "var(--danger)" },
//               { label: "Time",     value: `${attempt.time_taken}s`,               color: "var(--warn)" },
//               { label: "Total",    value: attempt.total_questions,                color: "var(--primary)" }
//             ].map((s, i) => (
//               <div key={i} className="card" style={{ padding: "16px 8px", textAlign: "center" }}>
//                 <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "Lora, serif" }}>{s.value}</div>
//                 <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3, fontWeight: 600 }}>{s.label}</div>
//               </div>
//             ))}
//           </div>

//           <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
//             <button className="btn btn-primary" onClick={onRetake}>Retake (Shuffled)</button>
//             <button className="btn btn-accent"  onClick={onNewQuiz}>New Questions</button>
//             <button className="btn btn-outline" onClick={onHome}>Home</button>
//           </div>
//         </div>
//       )}

//       {/* Answers tab */}
//       {tab === "answers" && (
//         <div className="fade-in">
//           <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, fontWeight: 600 }}>Click any question to see explanation</div>
//           {answers.map((a, i) => {
//             const explanation = a.explanation || questions[i]?.explanation || "";
//             const isOpen      = expandedIdx === i;
//             return (
//               <div key={i} onClick={() => setExpandedIdx(isOpen ? null : i)}
//                 style={{ background: "var(--surface)", border: `1.5px solid ${a.correct ? "#86efac" : "#fca5a5"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", transition: "box-shadow 0.15s", boxShadow: "var(--shadow)" }}>
//                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, fontWeight: 700 }}>Q{i+1}</div>
//                     <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{a.question}</div>
//                   </div>
//                   <div style={{ width: 28, height: 28, borderRadius: "50%", background: a.correct ? "var(--accent)" : "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>
//                     {a.correct ? "✓" : "✗"}
//                   </div>
//                 </div>

//                 <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, flexWrap: "wrap" }}>
//                   <span style={{ color: "var(--text2)", fontWeight: 500 }}>Your answer: <strong style={{ color: a.correct ? "var(--accent)" : "var(--danger)" }}>{a.selected || "Not answered"}</strong></span>
//                   {!a.correct && <span style={{ color: "var(--text2)", fontWeight: 500 }}>Correct: <strong style={{ color: "var(--accent)" }}>{a.correct_answer}</strong></span>}
//                 </div>

//                 {isOpen && explanation && (
//                   <div className="slide-up" style={{ marginTop: 12, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10 }}>
//                     <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, marginBottom: 5, textTransform: "uppercase" }}>Explanation</div>
//                     <div style={{ fontSize: 13, color: "#166534", lineHeight: 1.65, fontWeight: 500 }}>{explanation}</div>
//                   </div>
//                 )}
//                 {isOpen && !explanation && <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)" }}>No explanation available.</div>}
//                 {!isOpen && <div style={{ fontSize: 11, color: "var(--primary)", marginTop: 8, fontWeight: 600 }}>▼ See explanation</div>}
//               </div>
//             );
//           })}

//           <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
//             <button className="btn btn-primary" onClick={onRetake}>Retake (Shuffled)</button>
//             <button className="btn btn-accent"  onClick={onNewQuiz}>New Questions</button>
//             <button className="btn btn-outline" onClick={onHome}>Home</button>
//           </div>
//         </div>
//       )}

//       {/* Scoreboard tab */}
//       {tab === "scoreboard" && (
//         <div className="fade-in">
//           <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 20, fontWeight: 500 }}>
//             Top scores for <strong style={{ color: "var(--text)" }}>{quiz?.title}</strong>
//           </div>
//           {leaderboard.length === 0 ? (
//             <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
//               <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
//               <div style={{ fontWeight: 600 }}>No entries yet. Be the first!</div>
//             </div>
//           ) : leaderboard.map((e, i) => (
//             <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, padding: "14px 18px", border: i === 0 ? "1.5px solid #fde68a" : "1px solid var(--border)", background: i === 0 ? "#fffbeb" : "var(--surface)" }}>
//               <div style={{ fontSize: 22, width: 32, textAlign: "center" }}>
//                 {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span style={{ fontWeight: 800, color: "var(--muted)", fontSize: 14 }}>#{e.rank}</span>}
//               </div>
//               <div style={{ flex: 1 }}>
//                 <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{e.user_name}</div>
//                 <div style={{ fontSize: 12, color: "var(--muted)" }}>{e.time_taken}s</div>
//               </div>
//               <div style={{ textAlign: "right" }}>
//                 <div style={{ fontFamily: "Lora, serif", fontSize: 18, fontWeight: 700, color: i === 0 ? "#b45309" : "var(--primary)" }}>{e.score}/{e.total_questions}</div>
//                 <div style={{ fontSize: 12, color: "var(--muted)" }}>{Math.round((e.score/e.total_questions)*100)}%</div>
//               </div>
//             </div>
//           ))}

//           <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
//             <button className="btn btn-primary" onClick={onRetake}>Retake (Shuffled)</button>
//             <button className="btn btn-accent"  onClick={onNewQuiz}>New Questions</button>
//             <button className="btn btn-outline" onClick={onHome}>Home</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ── History Page ──────────────────────────────────────────────────────────────
// function HistoryPage({ API, onSelect }) {
//   const [history, setHistory] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search,  setSearch]  = useState("");
//   const [page,    setPage]    = useState(0);
//   const PER = 10;

//   React.useEffect(() => {
//     fetch(`${API}/api/history?limit=100`)
//       .then(r => r.json())
//       .then(d => { setHistory(d.history || []); setLoading(false); })
//       .catch(() => setLoading(false));
//   }, []);

//   const filtered   = history.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));
//   const paginated  = filtered.slice(page * PER, (page+1) * PER);
//   const totalPages = Math.ceil(filtered.length / PER);

//   const handleClick = async (item) => {
//     try {
//       const res  = await fetch(`${API}/api/quiz/${item.quiz_id}`);
//       const data = await res.json();
//       onSelect(data);
//     } catch {}
//   };

//   if (loading) return (
//     <div style={{ textAlign: "center", padding: "80px 0" }}>
//       <div className="spin" style={{ width: 32, height: 32, border: "3px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px" }} />
//       <div style={{ color: "var(--muted)", fontWeight: 600 }}>Loading history...</div>
//     </div>
//   );

//   return (
//     <div className="slide-up">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
//         <h2 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Quiz History</h2>
//         <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
//           placeholder="Search..."
//           style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "9px 14px", color: "var(--text)", fontSize: 13, width: 200, outline: "none", fontFamily: "Nunito, sans-serif", fontWeight: 500, boxShadow: "var(--shadow)" }} />
//       </div>

//       {paginated.length === 0 ? (
//         <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
//           <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
//           <div style={{ fontWeight: 600 }}>{search ? "No results found." : "No quizzes yet. Generate your first one!"}</div>
//         </div>
//       ) : (
//         <>
//           {paginated.map((item, i) => (
//             <div key={item.id} className="card"
//               onClick={() => handleClick(item)}
//               style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, cursor: "pointer", transition: "all 0.18s", animationDelay: `${i * 0.04}s` }}
//               onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateX(4px)"; }}
//               onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.transform = "translateX(0)"; }}>
//               <div>
//                 <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "var(--text)" }}>{item.title}</div>
//                 <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
//                   {item.total_questions} questions &nbsp;·&nbsp; v{item.version} &nbsp;·&nbsp;
//                   {new Date(item.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
//                 </div>
//               </div>
//               <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//                 <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>v{item.version}</span>
//                 <span className="tag" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{item.total_questions}Q</span>
//                 <span style={{ color: "var(--primary)", fontSize: 18, fontWeight: 900 }}>→</span>
//               </div>
//             </div>
//           ))}

//           {totalPages > 1 && (
//             <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
//               {Array.from({ length: totalPages }, (_, i) => (
//                 <button key={i} onClick={() => setPage(i)}
//                   style={{ width: 36, height: 36, borderRadius: 8, border: "1.5px solid var(--border)", cursor: "pointer", background: i === page ? "var(--primary)" : "var(--surface)", color: i === page ? "#fff" : "var(--text2)", fontWeight: i === page ? 700 : 500, fontFamily: "Nunito, sans-serif", boxShadow: "var(--shadow)" }}>
//                   {i + 1}
//                 </button>
//               ))}
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// }


import React, { useState, useCallback } from "react";

const API = "http://localhost:8000";

const PAGES = { HOME: "home", PREVIEW: "preview", QUIZ: "quiz", RESULT: "result", HISTORY: "history" };

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Lora:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg:        #f0f4ff;
    --surface:   #ffffff;
    --surface2:  #f7f8fc;
    --border:    #e2e6f0;
    --primary:   #4f46e5;
    --primary-light: #ede9fe;
    --primary-dark:  #3730a3;
    --accent:    #10b981;
    --accent-light: #d1fae5;
    --danger:    #ef4444;
    --danger-light: #fee2e2;
    --warn:      #f59e0b;
    --warn-light:#fef3c7;
    --text:      #1e1b4b;
    --text2:     #4b5563;
    --muted:     #9ca3af;
    --shadow:    0 1px 3px rgba(79,70,229,0.08), 0 4px 16px rgba(79,70,229,0.06);
    --shadow-md: 0 4px 12px rgba(79,70,229,0.12), 0 8px 32px rgba(79,70,229,0.08);
    --shadow-lg: 0 8px 24px rgba(79,70,229,0.15), 0 16px 48px rgba(79,70,229,0.1);
    --radius:    16px;
    --radius-sm: 10px;
    --radius-xs: 6px;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Nunito', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
  }

  .page-enter { animation: pageEnter 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes pageEnter {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fade-in { animation: fadeIn 0.3s ease forwards; }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

  .slide-up { animation: slideUp 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .pop { animation: pop 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  @keyframes pop {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }

  .shake { animation: shake 0.4s ease; }
  @keyframes shake {
    0%,100% { transform: translateX(0); }
    20%     { transform: translateX(-8px); }
    40%     { transform: translateX(8px); }
    60%     { transform: translateX(-5px); }
    80%     { transform: translateX(5px); }
  }

  .pulse { animation: pulse 1.6s ease infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.5; } }

  .spin { animation: spin 1s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    padding: 11px 24px; border-radius: var(--radius-sm); border: none; cursor: pointer;
    font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700;
    transition: all 0.18s cubic-bezier(0.22,1,0.36,1);
    position: relative; white-space: nowrap; letter-spacing: 0.01em;
  }
  .btn:hover  { transform: translateY(-1px); }
  .btn:active { transform: translateY(0) scale(0.98); }

  .btn-primary {
    background: var(--primary);
    color: #fff;
    box-shadow: 0 2px 8px rgba(79,70,229,0.3);
  }
  .btn-primary:hover { background: var(--primary-dark); box-shadow: 0 4px 16px rgba(79,70,229,0.4); }

  .btn-outline {
    background: var(--surface);
    border: 1.5px solid var(--border);
    color: var(--text2);
    box-shadow: var(--shadow);
  }
  .btn-outline:hover { border-color: var(--primary); color: var(--primary); background: var(--primary-light); }

  .btn-accent {
    background: var(--accent);
    color: #fff;
    box-shadow: 0 2px 8px rgba(16,185,129,0.3);
  }
  .btn-accent:hover { background: #059669; box-shadow: 0 4px 16px rgba(16,185,129,0.4); }

  .btn-danger {
    background: var(--danger);
    color: #fff;
    box-shadow: 0 2px 8px rgba(239,68,68,0.25);
  }

  /* Card */
  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 24px;
    box-shadow: var(--shadow);
  }

  /* Tag */
  .tag {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 700;
    letter-spacing: 0.02em;
  }

  /* Inputs */
  input, select, textarea {
    font-family: 'Nunito', sans-serif;
    color: var(--text);
  }

  input::placeholder { color: var(--muted); }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
`;

export default function App() {
  const [page,       setPage]       = useState(PAGES.HOME);
  const [quiz,       setQuiz]       = useState(null);
  const [attempt,    setAttempt]    = useState(null);
  const [loading,    setLoading]    = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error,      setError]      = useState("");
  const [retakeQ,    setRetakeQ]    = useState(null);

  const navigate = (p) => { setError(""); setPage(p); };

  const handleGenerate = async ({ url, num_questions, difficulty }) => {
    setLoading(true);
    setError("");
    const msgs = [
      "Scraping Wikipedia article...",
      "Reading the content...",
      "Crafting your questions...",
      "Finalizing quiz..."
    ];
    let mi = 0;
    setLoadingMsg(msgs[0]);
    const interval = setInterval(() => {
      mi = (mi + 1) % msgs.length;
      setLoadingMsg(msgs[mi]);
    }, 2000);
    try {
      const res = await fetch(`${API}/api/quiz/generate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, num_questions, difficulty })
      });
      if (!res.ok) { const e = await res.json(); throw new Error(e.detail || "Failed"); }
      const data = await res.json();
      setQuiz(data);
      setRetakeQ(null);
      navigate(PAGES.PREVIEW);
    } catch (e) { setError(e.message); }
    finally { clearInterval(interval); setLoading(false); }
  };

  const handleRegenerate = async () => {
    if (!quiz) return;
    setLoading(true);
    setLoadingMsg("Generating fresh questions...");
    setError("");
    try {
      const res = await fetch(`${API}/api/quiz/${quiz.id}/regenerate`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: quiz.url, num_questions: quiz.quiz?.length || 7, difficulty: "mixed" })
      });
      if (!res.ok) throw new Error("Regeneration failed");
      const data = await res.json();
      setQuiz(data);
      setRetakeQ(null);
      navigate(PAGES.PREVIEW);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (attemptData) => {
    try {
      const res = await fetch(`${API}/api/quiz/attempt`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz_id: quiz.id, ...attemptData })
      });
      const data = await res.json();
      setAttempt({ ...attemptData, id: data.id });
      navigate(PAGES.RESULT);
    } catch { setAttempt(attemptData); navigate(PAGES.RESULT); }
  };

  const handleRetake = () => {
    const shuffled = [...(quiz.quiz || [])].sort(() => Math.random() - 0.5);
    setRetakeQ(shuffled);
    navigate(PAGES.QUIZ);
  };

  if (loading) return (
    <>
      <style>{css}</style>
      <LoadingScreen message={loadingMsg} />
    </>
  );

  return (
    <>
      <style>{css}</style>
      <Navbar onHome={() => navigate(PAGES.HOME)} onHistory={() => navigate(PAGES.HISTORY)} page={page} />
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "32px 16px 64px" }}>
        {error && <ErrorBanner msg={error} onClose={() => setError("")} />}
        <div className="page-enter" key={page}>
          {page === PAGES.HOME    && <HomePage onGenerate={handleGenerate} API={API} />}
          {page === PAGES.PREVIEW && quiz && <PreviewPage quiz={quiz} onTake={() => navigate(PAGES.QUIZ)} onBack={() => navigate(PAGES.HOME)} />}
          {page === PAGES.QUIZ    && quiz && <QuizPage questions={retakeQ || quiz.quiz || []} onSubmit={handleSubmit} onBack={() => navigate(PAGES.PREVIEW)} />}
          {page === PAGES.RESULT  && attempt && quiz && <ResultPage attempt={attempt} quiz={quiz} onRetake={handleRetake} onNewQuiz={handleRegenerate} onHome={() => navigate(PAGES.HOME)} API={API} />}
          {page === PAGES.HISTORY && <HistoryPage API={API} onSelect={(q) => { setQuiz(q); setRetakeQ(null); navigate(PAGES.PREVIEW); }} />}
        </div>
      </div>
    </>
  );
}

// ── Loading Screen ────────────────────────────────────────────────────────────
function LoadingScreen({ message }) {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28 }}>
      <div style={{ width: 72, height: 72, background: "var(--primary-light)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
        📚
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>WikiQuiz AI</div>
        <div className="pulse" style={{ color: "var(--text2)", fontSize: 14 }}>{message}</div>
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", animation: `pulse 1.2s ease ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onHome, onHistory, page }) {
  return (
    <nav style={{
      background: "#ffffff",
      borderBottom: "1px solid var(--border)",
      padding: "0 32px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 60,
      position: "sticky", top: 0, zIndex: 100,
      boxShadow: "0 1px 0 var(--border)"
    }}>
      <div onClick={onHome} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <div style={{ width: 32, height: 32, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
          📚
        </div>
        <span style={{ fontFamily: "Lora, serif", fontSize: 17, fontWeight: 700, color: "var(--text)" }}>WikiQuiz AI</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-outline" style={{ padding: "7px 16px", fontSize: 13 }} onClick={onHome}>Home</button>
        <button className="btn btn-outline" style={{
          padding: "7px 16px", fontSize: 13,
          borderColor: page === "history" ? "var(--primary)" : undefined,
          color: page === "history" ? "var(--primary)" : undefined,
          background: page === "history" ? "var(--primary-light)" : undefined
        }} onClick={onHistory}>History</button>
      </div>
    </nav>
  );
}

// ── Error Banner ──────────────────────────────────────────────────────────────
function ErrorBanner({ msg, onClose }) {
  return (
    <div className="slide-up" style={{ background: "var(--danger-light)", border: "1px solid #fca5a5", borderRadius: 10, padding: "12px 16px", marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "var(--danger)", fontSize: 14, fontWeight: 600 }}>⚠ {msg}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--danger)", cursor: "pointer", fontSize: 20, lineHeight: 1 }}>×</button>
    </div>
  );
}

// ── Home Page ─────────────────────────────────────────────────────────────────
function HomePage({ onGenerate, API }) {
  const [url,        setUrl]        = useState("");
  const [numQ,       setNumQ]       = useState(7);
  const [difficulty, setDifficulty] = useState("mixed");
  const [preview,    setPreview]    = useState(null);
  const [previewing, setPreviewing] = useState(false);
  const [urlError,   setUrlError]   = useState("");

  const isWiki = (u) => u.includes("wikipedia.org/wiki/");

  const fetchPreview = async () => {
    if (!isWiki(url)) { if (url) setUrlError("Please enter a valid Wikipedia URL"); return; }
    setUrlError(""); setPreviewing(true);
    try {
      const res = await fetch(`${API}/api/quiz/preview?url=${encodeURIComponent(url)}`);
      const d   = await res.json();
      setPreview(d);
    } catch { setPreview(null); }
    finally { setPreviewing(false); }
  };

  const handleSubmit = () => {
    if (!isWiki(url)) { setUrlError("Please enter a valid Wikipedia URL"); return; }
    onGenerate({ url, num_questions: numQ, difficulty });
  };

  const inputStyle = {
    width: "100%", background: "var(--surface2)",
    border: `1.5px solid ${urlError ? "var(--danger)" : "var(--border)"}`,
    borderRadius: 10, padding: "12px 44px 12px 14px",
    color: "var(--text)", fontSize: 14, outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "Nunito, sans-serif"
  };

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", paddingTop: 32 }}>
      {/* Hero */}
      <div className="slide-up" style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ width: 64, height: 64, background: "var(--primary-light)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, margin: "0 auto 20px" }}>
          📚
        </div>
        <h1 style={{ fontFamily: "Lora, serif", fontSize: 34, fontWeight: 700, lineHeight: 1.2, marginBottom: 10, color: "var(--text)" }}>
          Turn Wikipedia into<br />
          <span style={{ color: "var(--primary)" }}>instant quizzes</span>
        </h1>
        <p style={{ color: "var(--text2)", fontSize: 15, lineHeight: 1.6 }}>
          Paste any Wikipedia URL, AI generates your quiz instantly
        </p>
      </div>

      {/* Card */}
      <div className="card slide-up" style={{ animationDelay: "0.08s", borderRadius: 20, padding: 28 }}>

        {/* URL input */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>Wikipedia URL</label>
          <div style={{ position: "relative" }}>
            <input
              value={url}
              onChange={e => { setUrl(e.target.value); setPreview(null); setUrlError(""); }}
              onBlur={fetchPreview}
              onKeyDown={e => e.key === "Enter" && fetchPreview()}
              placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
              style={inputStyle}
              onFocus={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(79,70,229,0.1)"; }}
            />
            {previewing && (
              <div className="spin" style={{ position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, border: "2px solid var(--primary)", borderTopColor: "transparent", borderRadius: "50%" }} />
            )}
          </div>
          {urlError && <div style={{ color: "var(--danger)", fontSize: 12, marginTop: 5, fontWeight: 600 }}>{urlError}</div>}
        </div>

        {/* Article preview */}
        {preview && (
          <div className="slide-up" style={{ background: "var(--primary-light)", border: "1px solid #c4b5fd", borderRadius: 10, padding: "12px 14px", marginBottom: 18 }}>
            <div style={{ fontWeight: 700, fontSize: 13, color: "var(--primary)", marginBottom: 4 }}>
              📄 {preview.title}
            </div>
            <div style={{ color: "var(--text2)", fontSize: 12, lineHeight: 1.6 }}>{preview.summary?.slice(0, 180)}...</div>
          </div>
        )}

        {/* Settings */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>Questions</label>
            <select value={numQ} onChange={e => setNumQ(Number(e.target.value))}
              style={{ width: "100%", background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 12px", color: "var(--text)", fontSize: 14, outline: "none", cursor: "pointer" }}>
              {[5,6,7,8,9,10].map(n => <option key={n} value={n}>{n} Questions</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", textTransform: "uppercase", letterSpacing: "0.07em", display: "block", marginBottom: 7 }}>Difficulty</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)}
              style={{ width: "100%", background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 12px", color: "var(--text)", fontSize: 14, outline: "none", cursor: "pointer" }}>
              <option value="mixed">Mixed</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <button className="btn btn-primary" style={{ width: "100%", fontSize: 15, padding: "13px" }} onClick={handleSubmit}>
          Generate Quiz
        </button>

        <div style={{ textAlign: "center", color: "var(--muted)", fontSize: 11, marginTop: 12, fontWeight: 600 }}>
          Powered by Gemini 2.5 Flash · BeautifulSoup · PostgreSQL
        </div>
      </div>

      {/* Example chips */}
      <div className="slide-up" style={{ marginTop: 24, animationDelay: "0.15s" }}>
        <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10, textAlign: "center", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Try these</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {["Alan_Turing", "Black_hole", "Python_(programming_language)"].map(t => (
            <button key={t} onClick={() => { setUrl(`https://en.wikipedia.org/wiki/${t}`); setPreview(null); }}
              style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 20, padding: "6px 14px", color: "var(--text2)", fontSize: 12, cursor: "pointer", fontFamily: "Nunito, sans-serif", fontWeight: 600, boxShadow: "var(--shadow)", transition: "all 0.15s" }}
              onMouseEnter={e => { e.target.style.borderColor = "var(--primary)"; e.target.style.color = "var(--primary)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--text2)"; }}>
              {t.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Preview Page ──────────────────────────────────────────────────────────────
function PreviewPage({ quiz, onTake, onBack }) {
  const [tab, setTab] = useState("overview");
  const questions     = quiz.quiz || [];
  const topics        = quiz.related_topics || [];
  const entities      = quiz.key_entities || {};

  const diffBadge = { easy: { bg: "var(--accent-light)", color: "var(--accent)" }, medium: { bg: "var(--warn-light)", color: "#b45309" }, hard: { bg: "var(--danger-light)", color: "var(--danger)" } };
  const tabs = ["overview", "questions", "topics", "entities"];
  const tabLabels = { overview: "Overview", questions: "Questions", topics: "Topics", entities: "Entities" };

  return (
    <div className="slide-up">
      {/* Header */}
      <div className="card" style={{ marginBottom: 20, borderRadius: 20 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
          <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>{questions.length} Questions</span>
          <span className="tag" style={{ background: "#f0fdf4", color: "#15803d" }}>v{quiz.version}</span>
          {Object.entries(questions.reduce((a,q) => { a[q.difficulty] = (a[q.difficulty]||0)+1; return a; }, {})).map(([d,c]) =>
            <span key={d} className="tag" style={{ background: diffBadge[d]?.bg || "#f3f4f6", color: diffBadge[d]?.color || "var(--text2)" }}>{c} {d}</span>
          )}
        </div>
        <h2 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, marginBottom: 6, color: "var(--text)" }}>{quiz.title}</h2>
        <div style={{ fontSize: 12, color: "var(--primary)", wordBreak: "break-all" }}>{quiz.url}</div>
      </div>

      {/* Tabs */}
      {/* <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "var(--surface2)", borderRadius: 12, padding: 4, border: "1px solid var(--border)" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: "8px 4px", background: tab===t ? "var(--surface)" : "transparent", color: tab===t ? "var(--primary)" : "var(--text2)", border: "none", borderRadius: 9, cursor: "pointer", fontSize: 13, fontWeight: tab===t ? 700 : 500, transition: "all 0.15s", boxShadow: tab===t ? "var(--shadow)" : "none", fontFamily: "Nunito, sans-serif" }}>
            {tabLabels[t]}
          </button>
        ))}
      </div> */}

      {/* Tab content */}
      {/* <div className="card" style={{ minHeight: 160, borderRadius: 20 }}>
        {tab === "overview" && (
          <div className="fade-in">
            <p style={{ color: "var(--text2)", lineHeight: 1.75, fontSize: 14 }}>{quiz.summary}</p>
            {quiz.sections?.length > 0 && (
              <div style={{ marginTop: 18 }}>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Sections Covered</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {quiz.sections.map((s,i) => <span key={i} className="tag" style={{ background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border)" }}>{s}</span>)}
                </div>
              </div>
            )}
          </div>
        )}

        {tab === "questions" && (
          <div className="fade-in">
            {questions.map((q, i) => (
              <div key={i} style={{ padding: "12px 14px", border: "1px solid var(--border)", borderRadius: 10, marginBottom: 8, background: "var(--surface2)" }}>
                <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 700, marginBottom: 4 }}>Q{i+1} · {q.section}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{q.question}</div>
                <span className="tag" style={{ background: diffBadge[q.difficulty]?.bg || "#f3f4f6", color: diffBadge[q.difficulty]?.color || "var(--text2)", fontSize: 10 }}>{q.difficulty?.toUpperCase()}</span>
              </div>
            ))}
          </div>
        )}

        {tab === "topics" && (
          <div className="fade-in" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {topics.length ? topics.map((t,i) =>
              <span key={i} className="tag" style={{ background: "var(--primary-light)", border: "1px solid #c4b5fd", color: "var(--primary)", padding: "7px 14px", fontSize: 13, fontWeight: 600 }}>{t}</span>
            ) : <div style={{ color: "var(--muted)", fontSize: 14 }}>No related topics.</div>}
          </div>
        )}

        {tab === "entities" && (
          <div className="fade-in">
            {entities.people?.length > 0 && <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>People</div><div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{entities.people.join(", ")}</div></div>}
            {entities.organizations?.length > 0 && <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>Organizations</div><div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{entities.organizations.join(", ")}</div></div>}
            {entities.locations?.length > 0 && <div style={{ marginBottom: 14 }}><div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 6, textTransform: "uppercase", fontWeight: 700 }}>Locations</div><div style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7 }}>{entities.locations.join(", ")}</div></div>}
            {!entities.people?.length && !entities.organizations?.length && !entities.locations?.length && <div style={{ color: "var(--muted)", fontSize: 14 }}>No entities found.</div>}
          </div>
        )}
      </div> */}

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <button className="btn btn-primary" style={{ flex: 1, minWidth: 140, fontSize: 15, padding: "13px" }} onClick={onTake}>Start Quiz</button>
        <button className="btn btn-outline" onClick={onBack}>Back</button>
      </div>
    </div>
  );
}

// ── Quiz Page ─────────────────────────────────────────────────────────────────
function QuizPage({ questions, onSubmit, onBack }) {
  const [current,  setCurrent]  = useState(0);
  const [answers,  setAnswers]  = useState({});
  const [timerKey, setTimerKey] = useState(0);
  const [expired,  setExpired]  = useState(false);
  const [userName, setUserName] = useState("");
  const startRef                = React.useRef(Date.now());

  const q       = questions[current];
  const hasSelected = answers[current] !== undefined;
  const isLast  = current === questions.length - 1;

  const diffBadge = {
    easy:   { bg: "var(--accent-light)", color: "var(--accent)" },
    medium: { bg: "var(--warn-light)",   color: "#b45309" },
    hard:   { bg: "var(--danger-light)", color: "var(--danger)" }
  };

  const handleSelect = (opt) => {
    if (expired) return;
    setAnswers(a => ({ ...a, [current]: opt }));
  };

  const handleExpire = () => {
    if (!hasSelected) { setAnswers(a => ({ ...a, [current]: "" })); setExpired(true); }
  };

  const handleNext = () => {
    setExpired(false);
    setCurrent(c => c + 1);
    setTimerKey(k => k + 1);
  };

  const handleSubmit = () => {
    const elapsed = Math.round((Date.now() - startRef.current) / 1000);
    let score = 0;
    const ans = questions.map((q, i) => {
      const sel     = answers[i] || "";
      const correct = sel === q.answer;
      if (correct) score++;
      return { question: q.question, selected: sel, correct_answer: q.answer, correct, explanation: q.explanation || "" };
    });
    onSubmit({ user_name: userName.trim() || "Anonymous", score, total_questions: questions.length, time_taken: elapsed, answers: ans });
  };

  return (
    <div className="slide-up" style={{ maxWidth: 620, margin: "0 auto" }}>
      {/* Progress bar + meta */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <span style={{ fontSize: 13, color: "var(--text2)", fontWeight: 700 }}>
            Question {current + 1} <span style={{ color: "var(--muted)", fontWeight: 500 }}>of {questions.length}</span>
          </span>
          <TimerRing key={timerKey} duration={30} onExpire={handleExpire} stopped={expired} />
        </div>
        <div style={{ height: 6, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${((current + 1) / questions.length) * 100}%`, background: "var(--primary)", borderRadius: 3, transition: "width 0.4s ease" }} />
        </div>
      </div>

      {/* Question card */}
      <div key={current} className="slide-up">
        <div className="card" style={{ borderRadius: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
            <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>Q{current + 1}</span>
            <span className="tag" style={{ background: diffBadge[q?.difficulty]?.bg || "#f3f4f6", color: diffBadge[q?.difficulty]?.color || "var(--text2)" }}>{q?.difficulty?.toUpperCase()}</span>
            {q?.section && <span className="tag" style={{ background: "var(--surface2)", color: "var(--text2)", border: "1px solid var(--border)" }}>{q.section}</span>}
          </div>
          <h3 style={{ fontFamily: "Lora, serif", fontSize: 19, fontWeight: 600, lineHeight: 1.5, color: "var(--text)" }}>{q?.question}</h3>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q?.options?.map((opt, i) => {
            const isSelected = answers[current] === opt;
            return (
              <div key={i}
                onClick={() => handleSelect(opt)}
                style={{
                  padding: "13px 16px", borderRadius: 12,
                  border: `2px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                  background: isSelected ? "var(--primary-light)" : "var(--surface2)",
                  color: isSelected ? "var(--primary)" : "var(--text)",
                  cursor: expired ? "default" : "pointer",
                  display: "flex", alignItems: "center", gap: 10,
                  transition: "all 0.2s", fontSize: 14, fontWeight: 600,
                  boxShadow: "var(--shadow)"
                }}>
                <span style={{
                  width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                  background: isSelected ? "var(--primary)" : "var(--surface)",
                  border: `1.5px solid ${isSelected ? "var(--primary)" : "var(--border)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 800,
                  color: isSelected ? "#fff" : "var(--muted)"
                }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </div>
            );
          })}
        </div>

        {/* Time expired */}
        {expired && (
          <div className="slide-up" style={{ background: "var(--danger-light)", border: "1px solid #fca5a5", borderRadius: 10, padding: "11px 14px", marginTop: 14, color: "var(--danger)", fontSize: 13, fontWeight: 600 }}>
            Time's up! Correct answer: <strong>{q?.answer}</strong>
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", gap: 10, marginTop: 20, alignItems: "center" }}>
          {!isLast && (hasSelected || expired) && (
            <button className="btn btn-primary" onClick={handleNext}>Next</button>
          )}
          {isLast && (hasSelected || expired) && (
            <>
              <input value={userName} onChange={e => setUserName(e.target.value)}
                placeholder="Your name (optional)"
                style={{ flex: 1, background: "var(--surface2)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "11px 14px", color: "var(--text)", fontSize: 14, outline: "none", fontFamily: "Nunito, sans-serif", fontWeight: 500 }} />
              <button className="btn btn-accent" onClick={handleSubmit}>Submit</button>
            </>
          )}
          <button className="btn btn-outline" style={{ marginLeft: "auto" }} onClick={onBack}>Back</button>
        </div>
      </div>
    </div>
  );
}

// ── Timer Ring ────────────────────────────────────────────────────────────────
function TimerRing({ duration = 30, onExpire, stopped = false }) {
  const [t, setT] = useState(duration);
  const ref       = React.useRef(null);

  React.useEffect(() => {
    if (stopped) { clearInterval(ref.current); return; }
    ref.current = setInterval(() => {
      setT(prev => {
        if (prev <= 1) { clearInterval(ref.current); onExpire?.(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(ref.current);
  }, [stopped]);

  const pct   = t / duration;
  const r     = 18;
  const circ  = 2 * Math.PI * r;
  const dash  = circ * pct;
  const color = t > 15 ? "var(--accent)" : t > 7 ? "var(--warn)" : "var(--danger)";
  const bg    = t > 15 ? "var(--accent-light)" : t > 7 ? "var(--warn-light)" : "var(--danger-light)";

  return (
    <div style={{ position: "relative", width: 48, height: 48, background: bg, borderRadius: "50%", border: "1.5px solid var(--border)" }}>
      <svg width="48" height="48" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
        <circle cx="24" cy="24" r={r} fill="none" stroke="var(--border)" strokeWidth="3" />
        <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="3"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.3s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color }}>
        {t}
      </div>
    </div>
  );
}

// ── Result Page ───────────────────────────────────────────────────────────────
function ResultPage({ attempt, quiz, onRetake, onNewQuiz, onHome, API }) {
  const [tab,         setTab]         = useState("score");
  const [leaderboard, setLeaderboard] = useState([]);
  const [expandedIdx, setExpandedIdx] = useState(null);

  const pct     = Math.round((attempt.score / attempt.total_questions) * 100);
  const grade   = pct >= 80 ? { label: "Excellent!", color: "var(--accent)", bg: "var(--accent-light)" }
                : pct >= 60 ? { label: "Good job!",   color: "var(--primary)", bg: "var(--primary-light)" }
                : pct >= 40 ? { label: "Keep going!",  color: "var(--warn)",    bg: "var(--warn-light)" }
                :             { label: "Keep trying!", color: "var(--danger)",  bg: "var(--danger-light)" };

  const answers   = attempt.answers || [];
  const questions = quiz?.quiz || [];

  React.useEffect(() => {
    if (!quiz?.id) return;
    fetch(`${API}/api/leaderboard/${quiz.id}`).then(r => r.json()).then(d => setLeaderboard(d.leaderboard || [])).catch(() => {});
  }, []);

  const tabLabels = { score: "Score", answers: "Review", scoreboard: "Leaderboard" };

  return (
    <div className="slide-up" style={{ maxWidth: 620, margin: "0 auto" }}>
      {/* Tab bar */}
      <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 4, boxShadow: "var(--shadow)" }}>
        {["score", "answers", "scoreboard"].map(t =>
          <button key={t} onClick={() => setTab(t)}
            style={{ flex: 1, padding: "9px", border: "none", borderRadius: 9, cursor: "pointer", fontWeight: tab===t ? 700 : 500, fontSize: 13, background: tab===t ? "var(--primary)" : "transparent", color: tab===t ? "#fff" : "var(--text2)", transition: "all 0.15s", fontFamily: "Nunito, sans-serif" }}>
            {tabLabels[t]}
          </button>
        )}
      </div>

      {/* Score tab */}
      {tab === "score" && (
        <div className="pop" style={{ textAlign: "center" }}>
          <div style={{ background: grade.bg, border: `2px solid ${grade.color}30`, borderRadius: 24, padding: "40px 24px", marginBottom: 24 }}>
            <div style={{ fontSize: 64, fontWeight: 900, color: grade.color, fontFamily: "Lora, serif", lineHeight: 1 }}>{pct}%</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: grade.color, marginTop: 8 }}>{grade.label}</div>
            <div style={{ fontSize: 13, color: "var(--text2)", marginTop: 6 }}>Attempted by <strong>{attempt.user_name}</strong></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
            {[
              { label: "Correct",  value: attempt.score,                          color: "var(--accent)" },
              { label: "Wrong",    value: attempt.total_questions - attempt.score, color: "var(--danger)" },
              { label: "Time",     value: `${attempt.time_taken}s`,               color: "var(--warn)" },
              { label: "Total",    value: attempt.total_questions,                color: "var(--primary)" }
            ].map((s, i) => (
              <div key={i} className="card" style={{ padding: "16px 8px", textAlign: "center" }}>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "Lora, serif" }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onRetake}>Retake (Shuffled)</button>
            <button className="btn btn-accent"  onClick={onNewQuiz}>New Questions</button>
            <button className="btn btn-outline" onClick={onHome}>Home</button>
          </div>
        </div>
      )}

      {/* Answers tab */}
      {tab === "answers" && (
        <div className="fade-in">
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 14, fontWeight: 600 }}>Click any question to see explanation</div>
          {answers.map((a, i) => {
            const explanation = a.explanation || questions[i]?.explanation || "";
            const isOpen      = expandedIdx === i;
            return (
              <div key={i} onClick={() => setExpandedIdx(isOpen ? null : i)}
                style={{ background: "var(--surface)", border: `1.5px solid ${a.correct ? "#86efac" : "#fca5a5"}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10, cursor: "pointer", transition: "box-shadow 0.15s", boxShadow: "var(--shadow)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 4, fontWeight: 700 }}>Q{i+1}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", lineHeight: 1.4 }}>{a.question}</div>
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: a.correct ? "var(--accent)" : "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, fontWeight: 900, flexShrink: 0 }}>
                    {a.correct ? "✓" : "✗"}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12, flexWrap: "wrap" }}>
                  <span style={{ color: "var(--text2)", fontWeight: 500 }}>Your answer: <strong style={{ color: a.correct ? "var(--accent)" : "var(--danger)" }}>{a.selected || "Not answered"}</strong></span>
                  {!a.correct && <span style={{ color: "var(--text2)", fontWeight: 500 }}>Correct: <strong style={{ color: "var(--accent)" }}>{a.correct_answer}</strong></span>}
                </div>

                {isOpen && explanation && (
                  <div className="slide-up" style={{ marginTop: 12, padding: "12px 14px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 700, marginBottom: 5, textTransform: "uppercase" }}>Explanation</div>
                    <div style={{ fontSize: 13, color: "#166534", lineHeight: 1.65, fontWeight: 500 }}>{explanation}</div>
                  </div>
                )}
                {isOpen && !explanation && <div style={{ marginTop: 8, fontSize: 12, color: "var(--muted)" }}>No explanation available.</div>}
                {!isOpen && <div style={{ fontSize: 11, color: "var(--primary)", marginTop: 8, fontWeight: 600 }}>▼ See explanation</div>}
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onRetake}>Retake (Shuffled)</button>
            <button className="btn btn-accent"  onClick={onNewQuiz}>New Questions</button>
            <button className="btn btn-outline" onClick={onHome}>Home</button>
          </div>
        </div>
      )}

      {/* Scoreboard tab */}
      {tab === "scoreboard" && (
        <div className="fade-in">
          <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 20, fontWeight: 500 }}>
            Top scores for <strong style={{ color: "var(--text)" }}>{quiz?.title}</strong>
          </div>
          {leaderboard.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
              <div style={{ fontWeight: 600 }}>No entries yet. Be the first!</div>
            </div>
          ) : leaderboard.map((e, i) => (
            <div key={i} className="card" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 10, padding: "14px 18px", border: i === 0 ? "1.5px solid #fde68a" : "1px solid var(--border)", background: i === 0 ? "#fffbeb" : "var(--surface)" }}>
              <div style={{ fontSize: 22, width: 32, textAlign: "center" }}>
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : <span style={{ fontWeight: 800, color: "var(--muted)", fontSize: 14 }}>#{e.rank}</span>}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text)" }}>{e.user_name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{e.time_taken}s</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "Lora, serif", fontSize: 18, fontWeight: 700, color: i === 0 ? "#b45309" : "var(--primary)" }}>{e.score}/{e.total_questions}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{Math.round((e.score/e.total_questions)*100)}%</div>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", gap: 10, marginTop: 24, flexWrap: "wrap" }}>
            <button className="btn btn-primary" onClick={onRetake}>Retake (Shuffled)</button>
            <button className="btn btn-accent"  onClick={onNewQuiz}>New Questions</button>
            <button className="btn btn-outline" onClick={onHome}>Home</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── History Page ──────────────────────────────────────────────────────────────
function HistoryPage({ API, onSelect }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search,  setSearch]  = useState("");
  const [page,    setPage]    = useState(0);
  const PER = 10;

  React.useEffect(() => {
    fetch(`${API}/api/history?limit=100`)
      .then(r => r.json())
      .then(d => { setHistory(d.history || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered   = history.filter(h => h.title.toLowerCase().includes(search.toLowerCase()));
  const paginated  = filtered.slice(page * PER, (page+1) * PER);
  const totalPages = Math.ceil(filtered.length / PER);

  const handleClick = async (item) => {
    try {
      const res  = await fetch(`${API}/api/quiz/${item.quiz_id}`);
      const data = await res.json();
      onSelect(data);
    } catch {}
  };

  if (loading) return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div className="spin" style={{ width: 32, height: 32, border: "3px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "50%", margin: "0 auto 16px" }} />
      <div style={{ color: "var(--muted)", fontWeight: 600 }}>Loading history...</div>
    </div>
  );

  return (
    <div className="slide-up">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontFamily: "Lora, serif", fontSize: 22, fontWeight: 700, color: "var(--text)" }}>Quiz History</h2>
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(0); }}
          placeholder="Search..."
          style={{ background: "var(--surface)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "9px 14px", color: "var(--text)", fontSize: 13, width: 200, outline: "none", fontFamily: "Nunito, sans-serif", fontWeight: 500, boxShadow: "var(--shadow)" }} />
      </div>

      {paginated.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📂</div>
          <div style={{ fontWeight: 600 }}>{search ? "No results found." : "No quizzes yet. Generate your first one!"}</div>
        </div>
      ) : (
        <>
          {paginated.map((item, i) => (
            <div key={item.id} className="card"
              onClick={() => handleClick(item)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, cursor: "pointer", transition: "all 0.18s", animationDelay: `${i * 0.04}s` }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--primary)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "var(--shadow)"; e.currentTarget.style.transform = "translateX(0)"; }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4, color: "var(--text)" }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>
                  {item.total_questions} questions &nbsp;·&nbsp; v{item.version} &nbsp;·&nbsp;
                  {new Date(item.created_at).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="tag" style={{ background: "var(--primary-light)", color: "var(--primary)" }}>v{item.version}</span>
                <span className="tag" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>{item.total_questions}Q</span>
                <span style={{ color: "var(--primary)", fontSize: 18, fontWeight: 900 }}>→</span>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i} onClick={() => setPage(i)}
                  style={{ width: 36, height: 36, borderRadius: 8, border: "1.5px solid var(--border)", cursor: "pointer", background: i === page ? "var(--primary)" : "var(--surface)", color: i === page ? "#fff" : "var(--text2)", fontWeight: i === page ? 700 : 500, fontFamily: "Nunito, sans-serif", boxShadow: "var(--shadow)" }}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}