"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/core/card";
import { Button } from "@/components/ui/core/button";
import { RocketIcon } from "lucide-react";
import { TiltingCard } from "@/components/ui/motion/tilting-card";

export default function InteractiveCard() {
  return (
    <TiltingCard>
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <RocketIcon className="w-5 h-5 text-primary" />
            Launch New Campaign
          </CardTitle>
          <CardDescription>
            Ready to grow your audience? Start a new marketing campaign in just
            a few clicks.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="list-disc px-4 text-sm text-muted-foreground space-y-1">
            <li>Email segmentation tools</li>
            <li>Custom design templates</li>
            <li>Real-time analytics dashboard</li>
          </ul>
        </CardContent>

        <CardFooter className="justify-end">
          <Button>Get Started</Button>
        </CardFooter>
      </Card>
    </TiltingCard>
  );
}
