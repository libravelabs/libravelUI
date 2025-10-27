"use client";

import { NumberField } from "@/components/ui/number-field";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export default function WithFormNumberField() {
  return (
    <Form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <NumberField isRequired label="Quantity" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
