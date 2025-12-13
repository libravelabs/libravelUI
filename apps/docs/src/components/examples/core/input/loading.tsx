"use client";

import { useState } from "react";
import { Input } from "@/components/ui/core/input";
import { Button } from "@/components/ui/core/button";

export default function LoadingInput() {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<string>("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(value);
      setValue("");
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-4 w-72">
      <div className="flex items-center gap-2">
        <Input
          isLoading={loading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write something..."
        />
        <Button onClick={handleSubmit} isLoading={loading}>
          Submit
        </Button>
      </div>

      {submitted && (
        <p className="text-sm text-muted-foreground">
          You submitted:{" "}
          <span className="font-medium text-foreground">{submitted}</span>
        </p>
      )}
    </div>
  );
}
