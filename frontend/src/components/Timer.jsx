import React, { useState, useEffect, useRef } from "react";

export default function Timer({ duration = 30, onExpire, running = true }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const intervalRef             = useRef(null);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!running) {
      clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          onExpire && onExpire();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, duration]);

  const pct   = (timeLeft / duration) * 100;
  const color = timeLeft > 15 ? "#10b981" : timeLeft > 5 ? "#f59e0b" : "#ef4444";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{
        width: "44px", height: "44px", borderRadius: "50%",
        background: `conic-gradient(${color} ${pct}%, #e2e8f0 0%)`,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <div style={{
          width: "34px", height: "34px", borderRadius: "50%",
          background: "inherit", backgroundColor: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "13px", fontWeight: 700, color
        }}>
          {timeLeft}
        </div>
      </div>
      <span style={{ fontSize: "13px", color: "#64748b" }}>seconds left</span>
    </div>
  );
}