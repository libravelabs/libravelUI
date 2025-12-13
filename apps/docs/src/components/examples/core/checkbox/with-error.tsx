"use client";

import { Button } from "@/components/ui/core/button";
import { Checkbox } from "@/components/ui/core/checkbox";
import { useState } from "react";
import { toast } from "sonner";

export default function WithErrorCheckbox() {
  const [agreed, setAgreed] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const handleSubmit = () => {
    setAttempted(true);

    if (agreed) {
      toast.success("Form submitted!");
      setAttempted(false);
    } else {
      toast.error("You must agree to the terms");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Checkbox
        label="I agree to the terms and conditions"
        isSelected={agreed}
        onChange={(checked) => setAgreed(!!checked)}
        error={attempted && !agreed}
      />
      <Button onClick={handleSubmit} className="w-full">
        Submit
      </Button>
    </div>
  );
}
