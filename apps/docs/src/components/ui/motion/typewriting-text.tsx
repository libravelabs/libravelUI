"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";

type TypewritingTextProps = {
  children: string;
  speed?: number;
  loop?: boolean;
  className?: string;
};

const LOOP_RESTART_DELAY_MS = 1000;

function TypewritingText({
  children,
  speed = 50,
  loop = false,
  className = "",
}: TypewritingTextProps) {
  const [text, setText] = useState("");
  const index = useRef(0);
  const timeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setText("");
    index.current = 0;
    function type() {
      setText(children.slice(0, index.current + 1));
      if (index.current < children.length - 1) {
        index.current++;
        timeout.current = setTimeout(type, speed);
      } else if (loop) {
        timeout.current = setTimeout(() => {
          setText("");
          index.current = 0;
          type();
        }, LOOP_RESTART_DELAY_MS);
      }
    }
    type();
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [children, speed, loop]);

  return <span className={className}>{text}</span>;
}

export { TypewritingText, type TypewritingTextProps };
