"use client";

import { Badge } from "@/components/ui/badge";
import { Link } from "react-aria-components";

export function AsChildBadgeBase() {
  return (
    <Badge>
      <Link href="#">Click Me!</Link>
    </Badge>
  );
}

export const AsChildBadgeCode = `"use client";

import { Badge } from "@/components/ui/badge";
import { Link } from "react-aria-components";

export function AsChildBadgeBase() {
  return (
    <Badge>
      <Link href="#">Click Me!</Link>
    </Badge>
  );
}
`;
