"use client";

import { useState, useEffect } from "react";
import { ProgressBar, ProgressSpinner } from "@/components/ui/progress";

export default function CustomLabelValue() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < 25 ? prev + 1 : 25));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-16">
      <ProgressBar
        valueLabel="25GB of 100GB"
        label="Storage space"
        value={value}
      />

      <ProgressSpinner
        valueLabel="25/100GB"
        label="Storage space"
        value={value}
        className="size-32"
      />
    </div>
  );
}
