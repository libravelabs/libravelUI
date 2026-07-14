"use client";

import { type JSX, useEffect, useState } from "react";
import { motion, MotionProps } from "motion/react";

type CipherTextProps = {
  children: string;
  duration?: number;
  speed?: number;
  chars?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onDecodeComplete?: () => void;
} & MotionProps;

function CipherText({
  children,
  duration = 0.8,
  speed = 0.04,
  chars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:'",.<>?/\\~\`•√π÷×¶∆£¢€¥₩^°=%©®™✓`,
  className,
  as: Component = "p",
  trigger = true,
  onDecodeComplete,
  ...props
}: CipherTextProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements
  );

  const [displayText, setDisplayText] = useState(children);
  const [isDecoding, setIsDecoding] = useState(false);
  const text = children;

  const decode = async () => {
    if (isDecoding) return;
    setIsDecoding(true);

    const steps = duration / speed;
    let step = 0;

    const interval = setInterval(() => {
      let cipheredText = "";
      const progress = step / steps;

      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          cipheredText += " ";
          continue;
        }

        if (progress * text.length > i) {
          cipheredText += text[i];
        } else {
          cipheredText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(cipheredText);
      step++;

      if (step > steps) {
        clearInterval(interval);
        setDisplayText(text);
        setIsDecoding(false);
        onDecodeComplete?.();
      }
    }, speed * 1000);
  };

  useEffect(() => {
    if (!trigger) return;
    decode();
  }, [trigger]);

  return (
    <MotionComponent className={className} {...props}>
      {displayText}
    </MotionComponent>
  );
}

export { CipherText, type CipherTextProps };
