"use client";

import { Input, InputGroup } from "@/components/ui/core/input";
import { Sparkles, Globe } from "lucide-react";
import { TextField } from "@/components/ui/core/text-field";
import { Label } from "@/components/ui/core/field";

export default function StartEndContentTextField() {
  return (
    <div className="grid gap-4 w-72">
      <TextField>
        <Input placeholder="Ask AI..." startContent={<Sparkles />} />
      </TextField>

      <TextField>
        <Label>Domain</Label>
        <InputGroup>
          <span data-fullsize-ele>https://</span>
          <Input />
          <div data-fullsize-ele>
            <Globe />
          </div>
        </InputGroup>
      </TextField>
    </div>
  );
}
