"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks a resend cooldown that doubles each time it's used
 * (e.g. 15s, then 30s, then 60s, ...).
 */
export function useResendCooldown(initialSeconds = 15) {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const nextWaitRef = useRef(initialSeconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const start = () => {
    const wait = nextWaitRef.current;
    nextWaitRef.current = wait * 2;
    setSecondsLeft(wait);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return current - 1;
      });
    }, 1000);
  };

  return { secondsLeft, canResend: secondsLeft === 0, start };
}
