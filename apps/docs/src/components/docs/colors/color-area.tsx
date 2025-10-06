"use client";

import { ColorArea } from "@/components/ui/colors";

export function ColorAreaBase() {
  return (
    <div className="p-4">
      <ColorArea />
    </div>
  );
}

export const ColorAreaCode = `"use client";

import { ColorArea } from "@/components/ui/color-picker";

export function ColorAreaExample() {
  return <ColorArea />;
}
`;
