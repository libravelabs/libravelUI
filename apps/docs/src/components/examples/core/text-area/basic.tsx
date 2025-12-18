"use client";

import { Description, Label } from "@/components/ui/core/field";
import { Textarea } from "@/components/ui/core/text-area";
import { TextField } from "@/components/ui/core/text-field";

export default function BasicTextarea() {
  return (
    <TextField className="w-72">
      <Label>Overview</Label>
      <Textarea placeholder="Once upon a time..." />
      <Description>Enter a synopsis of the movie.</Description>
    </TextField>
  );
}
