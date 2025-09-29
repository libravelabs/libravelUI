"use client";

import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";

export function BadgesBase() {
  return (
    <div className="space-y-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
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

export const BadgesCode = `"use client";

import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";

export function BadgesBase() {
  return (
    <div className="space-y-2">
      <div className="flex w-full flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="destructive">Destructive</Badge>
        <Badge variant="outline">Outline</Badge>
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
`;
