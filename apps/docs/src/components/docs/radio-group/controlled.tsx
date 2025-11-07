"use client";

import { useState } from "react";
import { RadioGroup, Radio } from "@/components/ui/radio-group";
import { Label, Description } from "@/components/ui/field";

export default function ControlledRadio() {
  const [plan, setPlan] = useState("pro");

  return (
    <div className="grid gap-4">
      <RadioGroup
        label="Subscription Plans"
        description="Select the plan that fits your needs. You can upgrade or downgrade anytime."
        value={plan}
        onChange={setPlan}
      >
        <Radio value="basic">
          <Label>Basic</Label>
          <Description>
            $9/month — Great for individuals who need essential tools.
          </Description>
        </Radio>

        <Radio value="pro">
          <Label>Pro</Label>
          <Description>
            $29/month — Perfect for teams and growing businesses with
            collaboration features.
          </Description>
        </Radio>

        <Radio value="enterprise">
          <Label>Enterprise</Label>
          <Description>
            Custom pricing — Advanced security, dedicated support, and custom
            integrations.
          </Description>
        </Radio>
      </RadioGroup>

      <div className="text-sm">
        <strong>Selected plan:</strong> {plan}
      </div>
    </div>
  );
}
