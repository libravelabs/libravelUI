"use client";

import { Alert } from "@/components/ui/alert";
import { Bell } from "lucide-react";

export function CanClosedAlert() {
  return (
    <section>
      <Alert
        title="Notification"
        message="You have a new update. Dismiss this alert if it's no longer relevant"
        canClosed
        icon={<Bell className="size-5" data-slot="icon" />}
      />
    </section>
  );
}

export const CanClosedAlertCode = `"use client";

import { Alert } from "@/components/ui/alert";
import { Bell } from "lucide-react";

export function CanClosedAlert() {
  return (
    <section>
      <Alert
        title="Notification"
        message="You have a new update. Dismiss this alert if it's no longer relevant"
        canClosed
        icon={<Bell className="size-5" data-slot="icon" />}
      />
    </section>
  );
}
`;
