"use client";

import { Alert } from "@/components/ui/alert";

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
