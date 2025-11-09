"use client";

import { Badge } from "@/components/ui/core/badge";
import { BadgeCheckIcon } from "lucide-react";

export default function BasicBadges() {
  return (
    <div className="space-y-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="info">Info</Badge>
      </div>
      <div className="flex w-full flex-wrap gap-2">
        <Badge variant="secondary">
          <BadgeCheckIcon />
          Verified
        </Badge>
        <Badge>8</Badge>
        <Badge variant="destructive">99</Badge>
        <Badge variant="outline">20+</Badge>
      </div>
    </div>
  );
}
