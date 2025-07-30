
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function Confetti({ duration = 3000 }) {
  const [windowSize, setWindowSize] = useState({ 
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    const timeout = setTimeout(() => {
      setIsActive(false);
    }, duration);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [duration]);

  if (!isActive) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
    />
  );
}
