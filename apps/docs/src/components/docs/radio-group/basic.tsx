"use client";

import { RadioGroup, Radio } from "@/components/ui/radio-group";

export default function BasicRadioGroup() {
  return (
    <RadioGroup
      label="Notification Settings"
      description="Choose how often you'd like to receive email notifications."
    >
      <Radio
        value="immediately"
        label="Immediately"
        description="Receive an email as soon as activity occurs in your account."
      />
      <Radio
        value="daily"
        label="Daily summary"
        description="Get a daily digest of all activity in your account."
      />
      <Radio
        value="weekly"
        label="Weekly summary"
        description="Receive a summary of all activity once a week."
      />
      <Radio
        value="none"
        label="No emails"
        description="Opt out of email notifications entirely."
      />
    </RadioGroup>
  );
}
