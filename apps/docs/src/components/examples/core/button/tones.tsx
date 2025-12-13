"use client";

import { Button } from "@/components/ui/core/button";

export default function ButtonTones() {
  return (
    <div className="space-x-4">
      <Button tone="default">Default</Button>
      <Button tone="secondary">Secondary</Button>
      <Button tone="outline">Outline</Button>
      <Button tone="ghost">Ghost</Button>
      <Button tone="link">Link</Button>
      <Button tone="destructive">Destructive</Button>
    </div>
  );
}
