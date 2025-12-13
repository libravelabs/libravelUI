"use client";

import { useState, useEffect } from "react";
import { ProgressBar } from "@/components/ui/core/progress";

export default function BasicProgress() {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-16">
      <ProgressBar
        label={loading ? "Uploading..." : "Uploaded"}
        value={value}
      />
    </div>
  );
}
