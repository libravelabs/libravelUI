"use client";

import { CheckboxGroup } from "@/components/ui/checkbox-group";
import { Checkbox } from "@/components/ui/checkbox";

export default function BasicCheckboxGroup() {
  return (
    <CheckboxGroup
      label="Notification Preferences"
      description="Choose how you want to be notified. You can select more than one."
      className="my-20"
    >
      <Checkbox
        value="email"
        label="Email Notifications"
        description="Get updates via email."
      />
      <Checkbox
        value="sms"
        label="SMS Alerts"
        description="Receive important alerts by SMS."
      />
      <Checkbox
        value="push"
        label="Push Notifications"
        description="Allow push notifications from the app."
      />
    </CheckboxGroup>
  );
}
