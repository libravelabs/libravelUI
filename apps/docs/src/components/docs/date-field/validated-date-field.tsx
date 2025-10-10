"use client";

import { Button } from "@/components/ui/button";
import { DateField } from "@/components/ui/date-field";
import { Form } from "@/components/ui/form";

export function ValidatedDateFieldBase() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateField isRequired label="Release date" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}

export const ValidatedDateFieldCode = `"use client";

import { Button } from "@/components/ui/button";
import { DateField } from "@/components/ui/date-field";
import { Form } from "@/components/ui/form";

export function ValidatedDateField() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateField isRequired label="Release date" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
`;
