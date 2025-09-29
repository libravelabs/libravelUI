"use client";

import { Alert } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { useState } from "react";

export function ControlledAlert() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <section>
      <Alert
        title="Notification"
        message="You have a new update. Dismiss this alert if it's no longer relevant"
        canClosed
        open={isOpen}
        onOpenChange={setIsOpen}
        icon={<Bell className="size-5" data-slot="icon" />}
      />
    </section>
  );
}

export const ControlledAlertCode = `"use client";

import { Alert } from "@/components/ui/alert";
import { Bell } from "lucide-react";
import { useState } from "react";

export function ControlledAlert() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <section>
      <Alert
        title="Notification"
        message="You have a new update. Dismiss this alert if it's no longer relevant"
        canClosed
        open={isOpen}
        onOpenChange={setIsOpen}
        icon={<Bell className="size-5" data-slot="icon" />}
      />
    </section>
  );
}
`;
