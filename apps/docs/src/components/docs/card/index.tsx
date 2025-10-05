"use client";

import { Playground } from "@/components/playground";
import BasicCardBase, { BasicCardCode } from "./basic-card";
import { ActionableCardBase, ActionableCardCode } from "./actionable-card";
import { InteractiveCardBase, InteractiveCardCode } from "./interactive-card";

export function BasicCard() {
  return <Playground preview={<BasicCardBase />} code={BasicCardCode} />;
}

export function ActionableCard() {
  return (
    <Playground preview={<ActionableCardBase />} code={ActionableCardCode} />
  );
}

export function InteractiveCard() {
  return (
    <Playground preview={<InteractiveCardBase />} code={InteractiveCardCode} />
  );
}
