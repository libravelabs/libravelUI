"use client";

import {
  AlertDescription,
  AlertTitle,
  AlertRoot,
  Alert,
} from "@/components/ui/alert";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Bell,
  Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

export function CustomBuildAlert() {
  return (
    <section>
      <AlertRoot className="flex flex-col gap-4 w-full">
        <div className="flex gap-2">
          <Cog />
          <div>
            <AlertTitle>Pulled Marcellus? Time to Choose</AlertTitle>
            <AlertDescription>
              You’re staring down the barrel — “Kill Bill” or “Save Marcellus”?
              No turning back once you hit that button
            </AlertDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button size="sm" variant="outline">
            Kill Bill
          </Button>
          <Button size="sm">Save Marcellus</Button>
        </div>
      </AlertRoot>
    </section>
  );
}

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

export function AlertVariants() {
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

export function CustomAlert() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Custom Alert</h2>

      <AlertRoot className="flex flex-col gap-4 w-full">
        <div className="flex gap-2">
          <Cog />
          <div>
            <AlertTitle>Pulled Marcellus? Time to Choose</AlertTitle>
            <AlertDescription>
              You’re staring down the barrel — “Kill Bill” or “Save Marcellus”?
              No turning back once you hit that button
            </AlertDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button size="sm" variant="outline">
            Kill Bill
          </Button>
          <Button size="sm">Save Marcellus</Button>
        </div>
      </AlertRoot>
    </section>
  );
}
