"use client";

import { Playground } from "@/components/playground";
import { BadgesBase, BadgesCode } from "./badges";
import { AsChildBadgeBase, AsChildBadgeCode } from "./as-child-badge";

export function Badges() {
  return <Playground preview={<BadgesBase />} code={BadgesCode} />;
}

export function AsChildBadge() {
  return <Playground preview={<AsChildBadgeBase />} code={AsChildBadgeCode} />;
}
