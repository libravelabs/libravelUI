"use client";

import { Alert } from "@/components/ui/core/alert";

export default function BasicAlert() {
  return (
    <section>
      <Alert
        title="Heads Up"
        message="Please review the information carefully before proceeding"
      />
    </section>
  );
}
