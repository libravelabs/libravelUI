"use client";

import { useState, useEffect } from "react";
import { ProgressBar, ProgressSpinner } from "@/components/ui/progress";

export default function DecimalProgressBar() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => (prev < 26.75 ? prev + 1 : 26.75));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-16">
      <ProgressBar
        formatOptions={{
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
        label="Temperature"
        valueLabel={`${value}°C`}
        value={value}
      />

      <ProgressSpinner
        formatOptions={{
          style: "decimal",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }}
        label="Temperature"
        valueLabel={`${value}°C`}
        value={value}
      />
    </div>
  );
}
