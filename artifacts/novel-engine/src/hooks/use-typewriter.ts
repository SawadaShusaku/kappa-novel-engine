import { useState, useEffect, useRef } from "react";

export function useTypewriter(text: string | null, speed: number = 40) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!text) {
      setDisplayedText("");
      setIsComplete(true);
      return;
    }

    setDisplayedText("");
    setIsComplete(false);
    let i = 0;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsComplete(true);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, speed]);

  const skipTypewriter = () => {
    if (!isComplete && text) {
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(text);
      setIsComplete(true);
    }
  };

  return { displayedText, isComplete, skipTypewriter };
}
