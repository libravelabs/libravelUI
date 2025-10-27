"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";

export default function WithFormTextField() {
  return (
    <Form
      onSubmit={(e) => e.preventDefault()}
      className="w-full max-w-72 space-y-2"
    >
      <TextField label="Username" placeholder="billycostigan_" isRequired />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
