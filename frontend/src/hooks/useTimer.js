import { useState, useEffect, useRef, useCallback } from "react";

export default function useTimer(initialSeconds = 30) {
  const [timeLeft,  setTimeLeft]  = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef               = useRef(null);
  const onExpireRef               = useRef(null);

  // ── Clear interval helper ──────────────────────────────────────────────
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // ── Start timer ────────────────────────────────────────────────────────
  const start = useCallback((onExpire) => {
    onExpireRef.current = onExpire;
    setIsExpired(false);
    setIsRunning(true);
  }, []);

  // ── Pause timer ────────────────────────────────────────────────────────
  const pause = useCallback(() => {
    setIsRunning(false);
    clearTimer();
  }, [clearTimer]);

  // ── Reset timer ────────────────────────────────────────────────────────
  const reset = useCallback((seconds) => {
    clearTimer();
    setTimeLeft(seconds ?? initialSeconds);
    setIsRunning(false);
    setIsExpired(false);
  }, [clearTimer, initialSeconds]);

  // ── Restart timer ──────────────────────────────────────────────────────
  const restart = useCallback((seconds, onExpire) => {
    clearTimer();
    setTimeLeft(seconds ?? initialSeconds);
    setIsExpired(false);
    onExpireRef.current = onExpire;
    setIsRunning(true);
  }, [clearTimer, initialSeconds]);

  // ── Tick effect ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearTimer();
          setIsRunning(false);
          setIsExpired(true);
          onExpireRef.current && onExpireRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return clearTimer;
  }, [isRunning, clearTimer]);

  // ── Derived values ─────────────────────────────────────────────────────
  const percentage = Math.round((timeLeft / initialSeconds) * 100);
  const color      = timeLeft > 15 ? "#10b981" : timeLeft > 5 ? "#f59e0b" : "#ef4444";
  const isUrgent   = timeLeft <= 5 && isRunning;

  return {
    timeLeft,
    isRunning,
    isExpired,
    isUrgent,
    percentage,
    color,
    start,
    pause,
    reset,
    restart
  };
}