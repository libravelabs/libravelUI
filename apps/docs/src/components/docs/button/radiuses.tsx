"use client";

import { Button } from "@/components/ui/button";

export default function ButtonRadiuses() {
  return (
    <div className="flex items-center gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium (default)</Button>
      <Button radius="lg">Large</Button>
      <Button radius="full">Full</Button>
    </div>
  );
}
