"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/core/card";
import { TiltingCard } from "@/components/ui/motion/tilting-card";

export default function BasicTiltingCard() {
  return (
    <TiltingCard>
      <Card className="flex flex-col justify-between overflow-hidden pt-0">
        <img
          src="https://image.tmdb.org/t/p/original/j1ZflwIiSSkw6cTbim0HpVy1JtI.jpg"
          alt="Ocean View"
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            {`"You talkin' to me?"`}
          </CardTitle>
          <CardDescription>
            ~ Travis Bickle - Taxi Driver (1976)
          </CardDescription>
        </CardHeader>
      </Card>
    </TiltingCard>
  );
}
