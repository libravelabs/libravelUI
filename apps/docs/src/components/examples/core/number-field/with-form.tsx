"use client";

import { NumberField } from "@/components/ui/core/number-field";
import { Form } from "@/components/ui/core/form";
import { Button } from "@/components/ui/core/button";

export default function WithFormNumberField() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <NumberField isRequired label="Quantity" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
