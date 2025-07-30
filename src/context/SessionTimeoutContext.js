// SessionTimeoutProvider.js
import React, { createContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SessionTimeoutContext = createContext();

export const SessionTimeoutProvider = ({ children, timeout = 10000 }) => {
  const navigate = useNavigate();
  const timeoutId = useRef(null);

  // Reset the timer
  const resetTimer = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      // Clear session storage, localStorage, tokens if needed here!
      navigate("/", { replace: true });
    }, timeout);
  };

  // Set up listeners for activity
  useEffect(() => {
    // Events that count as "activity"
    const activityEvents = [
      "mousemove",
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    // Reset timer on any event
    activityEvents.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Set initial timer
    resetTimer();

    // Cleanup
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(timeoutId.current);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <SessionTimeoutContext.Provider value={{}}>
      {children}
    </SessionTimeoutContext.Provider>
  );
};
