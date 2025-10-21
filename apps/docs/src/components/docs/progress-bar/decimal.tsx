"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "@/components/ui/progress-bar";

export default function DecimalProgressBar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <ProgressBar
      formatOptions={{
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }}
      label="Progress"
      value={value / 1.5}
    />
  );
}
