"use client";

import { useState } from "react";
import { Stepper, type StepProps } from "@/components/ui/core/stepper";
import { Button } from "@/components/ui/core/button";

const steps: StepProps[] = [
  { title: "Step 1", description: "Create your account", href: "/one" },
  { title: "Step 2", description: "Verify your email", href: "/two" },
  { title: "Step 3", description: "Add your details", href: "/three" },
  { title: "Step 4", description: "Confirm and finish", href: "/four" },
];

export default function VerticalStepper() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="grid gap-6">
      <Stepper steps={steps} activeStep={step} orientation="vertical" />
      {step === steps.length ? (
        <Button onClick={() => setStep(0)} className="mx-auto">
          Reset
        </Button>
      ) : (
        <div className="flex justify-between">
          <Button onClick={prevStep} isDisabled={step === 0} variant="outline">
            Previous
          </Button>
          <Button onClick={nextStep}>
            {step === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      )}
    </div>
  );
}
