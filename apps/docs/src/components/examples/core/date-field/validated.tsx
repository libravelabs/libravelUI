"use client";

import { Button } from "@/components/ui/core/button";
import { DateField } from "@/components/ui/core/date-field";
import { Form } from "@/components/ui/core/form";

export default function ValidatedDateField() {
  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <DateField isRequired label="Release date" className="mb-2" />
      <Button type="submit">Submit</Button>
    </Form>
  );
}
