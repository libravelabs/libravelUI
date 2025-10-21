"use client";

import { Alert } from "@/components/ui/alert";
import { Info, CheckCircle, AlertTriangle, XCircle, Bell } from "lucide-react";

export default function AlertVariants() {
  return (
    <section className="space-y-4">
      <Alert
        title="Default Alert"
        message="This is a neutral notification"
        icon={<Bell className="size-5" data-slot="icon" />}
      />

      <Alert
        variant="info"
        title="Info Alert"
        message="Heads up! You should know about this"
        icon={<Info className="size-5" data-slot="icon" />}
      />

      <Alert
        variant="success"
        title="Success Alert"
        message="Your operation was successful"
        icon={<CheckCircle className="size-5" data-slot="icon" />}
      />

      <Alert
        variant="warning"
        title="Warning Alert"
        message="Be careful! Something may not be right"
        icon={<AlertTriangle className="size-5" data-slot="icon" />}
      />

      <Alert
        variant="destructive"
        title="Error Alert"
        message="Something went terribly wrong"
        icon={<XCircle className="size-5" data-slot="icon" />}
      />
    </section>
  );
}
