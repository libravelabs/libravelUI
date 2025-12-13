"use client";

import { Badge } from "@/components/ui/core/badge";
import { BadgeCheckIcon } from "lucide-react";

export default function BasicBadges() {
  return (
    <div className="space-y-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge tone="default">Default</Badge>
        <Badge tone="secondary">Secondary</Badge>
        <Badge tone="destructive">Destructive</Badge>
        <Badge tone="outline">Outline</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="info">Info</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge tone="secondary">
          <BadgeCheckIcon />
          Verified
        </Badge>
        <Badge>8</Badge>
        <Badge tone="destructive">99</Badge>
        <Badge tone="outline">20+</Badge>
      </div>
    </div>
  );
}
