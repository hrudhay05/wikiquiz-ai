import React, { useState, useEffect } from "react";

export default function HistoryTable({ dark, onSelect, API }) {
  const [history,  setHistory]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [search,   setSearch]   = useState("");
  const [page,     setPage]     = useState(0);
  const PER_PAGE = 10;

  useEffect(() => {
    fetch(`${API}/api/history?limit=100`)
      .then(r => r.json())
      .then(d => { setHistory(d.history || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = history.filter(h =>
    h.title.toLowerCase().includes(search.toLowerCase())
  );
  const paginated = filtered.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const handleSelect = async (item) => {
    try {
      const res  = await fetch(`${API}/api/quiz/${item.quiz_id}`);
      const data = await res.json();
      onSelect(data);
    } catch {}
  };

  const s = {
    wrap:    { },
    header:  { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    title:   { fontSize: "22px", fontWeight: 800 },
    search:  { padding: "10px 14px", borderRadius: "10px", border: `1.5px solid ${dark ? "#475569" : "#e2e8f0"}`, background: dark ? "#1e293b" : "#f8fafc", color: dark ? "#e2e8f0" : "#1e293b", fontSize: "14px", width: "220px" },
    row:     { background: dark ? "#1e293b" : "#fff", borderRadius: "12px", padding: "16px 20px", marginBottom: "8px", cursor: "pointer", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-color 0.2s" },
    rowL:    { },
    title2:  { fontWeight: 700, marginBottom: "4px", fontSize: "15px" },
    meta:    { fontSize: "12px", color: "#64748b" },
    badge:   (color) => ({ background: color + "20", color, padding: "3px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: 600 }),
    arrow:   { color: "#6366f1", fontSize: "18px" },
    empty:   { textAlign: "center", padding: "80px 0", color: "#64748b" },
    pages:   { display: "flex", gap: "8px", justifyContent: "center", marginTop: "16px" },
    pageBtn: (active) => ({ padding: "6px 14px", borderRadius: "8px", border: "none", cursor: "pointer", background: active ? "#6366f1" : (dark ? "#334155" : "#e2e8f0"), color: active ? "#fff" : (dark ? "#e2e8f0" : "#475569"), fontWeight: active ? 700 : 400 })
  };

  if (loading) return (
    <div style={s.empty}>
      <div style={{ fontSize: "32px", marginBottom: "12px" }}>⏳</div>
      Loading history...
    </div>
  );

  return (
    <div style={s.wrap}>
      <div style={s.header}>
        <div style={s.title}>📋 Quiz History</div>
        <input
          style={s.search}
          placeholder="🔍 Search articles..."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
        />
      </div>

      {paginated.length === 0 ? (
        <div style={s.empty}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🗂️</div>
          {search ? "No results found." : "No quizzes yet. Generate your first one!"}
        </div>
      ) : (
        <>
          {paginated.map(item => (
            <div key={item.id} style={s.row} onClick={() => handleSelect(item)}>
              <div style={s.rowL}>
                <div style={s.title2}>{item.title}</div>
                <div style={s.meta}>
                  {item.total_questions} questions &nbsp;·&nbsp;
                  Version {item.version} &nbsp;·&nbsp;
                  {new Date(item.created_at).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <span style={s.badge("#6366f1")}>v{item.version}</span>
                <span style={s.badge("#10b981")}>{item.total_questions}Q</span>
                <span style={s.arrow}>→</span>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div style={s.pages}>
              {Array.from({ length: totalPages }, (_, i) =>
                <button key={i} style={s.pageBtn(i === page)} onClick={() => setPage(i)}>
                  {i + 1}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}