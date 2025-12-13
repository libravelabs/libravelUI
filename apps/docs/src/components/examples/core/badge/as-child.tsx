"use client";

import { Badge } from "@/components/ui/core/badge";
import { Link } from "@/components/ui/core/link";

export default function AsChildBadgeBase() {
  return (
    <Badge>
      <Link href="#">Click Me!</Link>
    </Badge>
  );
}
