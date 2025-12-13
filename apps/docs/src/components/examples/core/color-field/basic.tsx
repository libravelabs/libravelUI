"use client";

import { ColorField } from "@/components/ui/core/color-field";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";

export default function BasicColorField() {
  return (
    <ColorField>
      <Label>Color</Label>
      <Input placeholder="#155DFC" />
    </ColorField>
  );
}
