"use client";

import { NumberField, NumberInput } from "@/components/ui/core/number-field";
import { Form } from "@/components/ui/core/form";
import { Button } from "@/components/ui/core/button";
import { Label } from "@/components/ui/core/field";

export default function WithFormNumberField() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <NumberField isRequired>
        <Label>Quantity</Label>
        <NumberInput />
      </NumberField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
