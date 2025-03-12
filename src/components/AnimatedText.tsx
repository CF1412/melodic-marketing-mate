
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  gradient?: boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  duration = 50,
  tag = "p",
  gradient = false
}: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (displayedText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(text.substring(0, displayedText.length + 1));
      }, duration);
    } else {
      setIsComplete(true);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, text, duration]);

  useEffect(() => {
    const initTimeout = setTimeout(() => {
      setDisplayedText(text.charAt(0));
    }, delay);

    return () => clearTimeout(initTimeout);
  }, [delay, text]);

  const textClasses = cn(
    "inline-block",
    gradient && isComplete && "gradient-text",
    className
  );

  const Tag = tag;
  
  return <Tag className={textClasses}>{displayedText}</Tag>;
}
