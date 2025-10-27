"use client";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/components/ui/link";

export default function AsChildBadgeBase() {
  return (
    <Badge>
      <Link href="#">Click Me!</Link>
    </Badge>
  );
}
