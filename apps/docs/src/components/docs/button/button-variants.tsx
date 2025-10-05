"use client";

import { Button } from "@/components/ui/button";

export function ButtonVariantsBase() {
  return (
    <div className="space-x-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

export const ButtonVariantsCode = `"use client";

import { Button } from "@/components/ui/button";

export function ButtonVariants() {
  return (
    <div className="space-x-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}
`;
