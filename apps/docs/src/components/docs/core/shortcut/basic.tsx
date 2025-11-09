"use client";

import { Shortcut } from "@/components/ui/core/shortcut";

export default function BasicShortcut() {
  return (
    <div className="grid gap-4">
      <Shortcut keys="Ctrl+S" />
      <Shortcut keys={["Ctrl", "Alt", "Delete"]} />
      <Shortcut>⌘ + C</Shortcut>
    </div>
  );
}
