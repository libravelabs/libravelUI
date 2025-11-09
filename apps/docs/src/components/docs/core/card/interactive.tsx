"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

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

export default function InteractiveCard() {
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const rotateX = useTransform(cardY, [-300, 300], [10, -10]);
  const rotateY = useTransform(cardX, [-300, 300], [-10, 10]);

  const cardRotateX = useTransform(cardY, [-300, 300], [25, -25]);
  const cardRotateY = useTransform(cardX, [-300, 300], [-25, 25]);

  const handleMouseMove = (event: React.MouseEvent) => {
    const offsetX = event.clientX - window.innerWidth / 2;
    const offsetY = event.clientY - window.innerHeight / 2;

    cardX.set(offsetX);
    cardY.set(offsetY);
  };

  const handleMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  return (
    <motion.div
      className="flex justify-center items-center h-[480px] w-full perspective-800"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
    >
      <motion.div
        className="m-auto w-[420px] h-[280px] transform-style-preserve-3d"
        style={{ rotateX, rotateY }}
        transition={{ velocity: 0 }}
      >
        <motion.div
          className="shadow-lg rounded-lg bg-transparent w-full h-full transform-style-preserve-3d border border-primary"
          style={{ rotateX: cardRotateX, rotateY: cardRotateY }}
          transition={{ velocity: 0 }}
        >
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <RocketIcon className="w-5 h-5 text-primary" />
                Launch New Campaign
              </CardTitle>
              <CardDescription>
                Ready to grow your audience? Start a new marketing campaign in
                just a few clicks.
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
