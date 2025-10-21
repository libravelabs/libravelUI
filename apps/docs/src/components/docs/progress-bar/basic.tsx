"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function BasicProgressBar() {
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return <ProgressBar label="Memory usage" value={value} />;
}
