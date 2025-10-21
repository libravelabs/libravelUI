"use client";

import { Playground } from "@/components/playground";
import {
  BasicDescriptionListBase,
  BasicDescriptionListCode,
} from "./basic-description-list";
import {
  CardDescriptionListBase,
  CardDescriptionListCode,
} from "./card-description-list";

export function BasicDescriptionList() {
  return (
    <Playground
      preview={<BasicDescriptionListBase />}
      code={BasicDescriptionListCode}
    />
  );
}

export function CardDescriptionList() {
  return (
    <Playground
      preview={<CardDescriptionListBase />}
      code={CardDescriptionListCode}
    />
  );
}
