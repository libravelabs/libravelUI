"use client";

import { useState } from "react";
import { Input } from "@/components/ui/core/input";

export default function ControlledInput() {
  const [text, setText] = useState<string>("");

  return (
    <div className="grid gap-4 w-72">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something here..."
      />
      <pre>Mirrored text: {text}</pre>
    </div>
  );
}
