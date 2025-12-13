"use client";

import React, { useState } from "react";
import {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
  StepperContent,
  type StepProps,
  StepperItems,
} from "@/components/ui/core/stepper";
import { Button } from "@/components/ui/core/button";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/core/card";
import { cn } from "@/lib/utils";

const steps: StepProps[] & { content?: React.ReactNode }[] = [
  { title: "Step 1", description: "Create your account", content: <></> },
  { title: "Step 2", description: "Verify your email" },
  { title: "Step 3", description: "Add your details" },
  { title: "Step 4", description: "Confirm and finish" },
];

export default function AnimatedStepper() {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <StepperRoot value={step} onValueChange={setStep} className="w-full">
      <Card className="gap-6 w-full">
        <CardHeader>
          <StepperItems>
            {steps.map((st, i) => (
              <StepperItem key={i} step={i}>
                <StepperTrigger
                  onClick={() => setStep(i)}
                  className={cn(
                    "flex flex-col items-center gap-2",
                    step === i && "text-primary"
                  )}
                >
                  <StepperIndicator />
                  {i < steps.length - 1 && <StepperSeparator />}
                  <StepperTitle>{st.title}</StepperTitle>
                  <StepperDescription>{st.description}</StepperDescription>
                </StepperTrigger>
              </StepperItem>
            ))}
          </StepperItems>
        </CardHeader>

        <CardContent>
          <StepperContent
            step={step}
            className="flex flex-col justify-center items-center text-center p-4"
          >
            <motion.h2
              layoutId={`title-${step}`}
              className="text-xl font-semibold mb-2"
            >
              {steps[step]?.title}
            </motion.h2>

            <motion.div>
              <motion.p
                layoutId={`description-${step}`}
                className="text-muted-foreground"
              >
                {steps[step]?.description}
              </motion.p>
            </motion.div>
          </StepperContent>
        </CardContent>

        <CardFooter>
          {step === steps.length ? (
            <Button onClick={() => setStep(0)} className="mx-auto">
              Reset
            </Button>
          ) : (
            <div className="flex justify-between w-full">
              <Button onClick={prevStep} isDisabled={step === 0} tone="outline">
                Previous
              </Button>
              <Button onClick={nextStep}>
                {step === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </StepperRoot>
  );
}
