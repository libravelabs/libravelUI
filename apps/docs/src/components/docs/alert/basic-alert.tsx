"use client";

import { Alert } from "@/components/ui/alert";

export function BasicAlert() {
  return (
    <section>
      <Alert
        title="Heads Up"
        message="Please review the information carefully before proceeding"
      />
    </section>
  );
}

export const BaseAlertCode = `"use client";

import { Alert } from "@/components/ui/alert";

export function BasicAlert() {
  return (
    <section>
      <Alert
        title="Heads Up"
        message="Please review the information carefully before proceeding"
      />
    </section>
  );
}
`;
