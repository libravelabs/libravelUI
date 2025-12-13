"use client";

import { useState } from "react";
import { CipherText } from "@/components/ui/motion/cipher-text";
import { Input } from "@/components/ui/core/input";

export default function TriggerCipherText() {
  const [trigger, setTrigger] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="w-full flex flex-col items-center gap-4">
      <CipherText trigger={trigger}>
        {value || "Type and press Enter"}
      </CipherText>

      <Input
        placeholder="Press Enter to process"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            setTrigger(false);
            setTimeout(() => setTrigger(true), 100);
          }
        }}
        className="w-72"
      />
    </div>
  );
}
