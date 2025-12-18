"use client";

import { Shortcut } from "@/components/ui/core/shortcut";
import { Input, InputGroup } from "@/components/ui/core/input";
import { Globe, Search, Sparkles } from "lucide-react";

export default function StartEndContentInput() {
  return (
    <div className="grid gap-4 w-72">
      <Input type="text" placeholder="Ask AI..." startContent={<Sparkles />} />

      <Input
        type="text"
        placeholder="Search..."
        startContent={<Search />}
        endContent={<Shortcut keys="CTRL+K" />}
      />

      <InputGroup>
        <span data-fullsize-ele>https://</span>
        <Input type="text" />
        <div data-fullsize-ele>
          <Globe />
        </div>
      </InputGroup>
    </div>
  );
}
