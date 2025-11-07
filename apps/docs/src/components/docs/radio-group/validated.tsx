"use client";

import { Form } from "react-aria-components";
import { Button } from "@/components/ui/button";
import { Radio, RadioGroup } from "@/components/ui/radio-group";
import { toast } from "sonner";

export default function ValidatedRadio() {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        toast.success("Shipping method selected successfully!", {
          description:
            "You can review your choice on the next step before confirming your order.",
        });
      }}
      className="space-y-4"
    >
      <RadioGroup
        isRequired
        name="shipping"
        label="Shipping Method"
        description="Select how you’d like your order to be delivered."
      >
        <Radio
          value="standard"
          label="Standard Shipping"
          description="3–5 business days — Free on orders over $50."
        />

        <Radio
          value="express"
          label="Express Shipping"
          description="1–2 business days — $9.99 flat rate."
        />

        <Radio
          value="overnight"
          label="Overnight Shipping"
          description="Next-day delivery — $19.99, fastest option available."
        />
      </RadioGroup>

      <Button type="submit" variant="secondary">
        Continue
      </Button>
    </Form>
  );
}
