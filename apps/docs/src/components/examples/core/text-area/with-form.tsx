"use client";

import { Button } from "@/components/ui/core/button";
import { FieldError, Label } from "@/components/ui/core/field";
import { Form } from "@/components/ui/core/form";
import { Textarea } from "@/components/ui/core/text-area";
import { TextField } from "@/components/ui/core/text-field";

export default function WithFormTextArea() {
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="w-72 space-y-2">
      <TextField isRequired>
        <Label>Synopsis</Label>
        <Textarea placeholder="Once upon a time..." />
        <FieldError />
      </TextField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
