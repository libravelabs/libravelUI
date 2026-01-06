"use client";

import { Button } from "@/components/ui/core/button";
import { DateField, DateInput } from "@/components/ui/core/date-field";
import { Form } from "@/components/ui/core/form";
import { FieldError, Label } from "@/components/ui/core/field";

export default function ValidatedDateField() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateField isRequired className="mb-2">
        <Label>Release date</Label>
        <DateInput />
        <FieldError />
      </DateField>
      <Button type="submit">Submit</Button>
    </Form>
  );
}
