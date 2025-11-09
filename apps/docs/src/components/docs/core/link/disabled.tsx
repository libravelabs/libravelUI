"use client";

import { Link } from "@/components/ui/core/link";

export default function DisabledLink() {
  return (
    <div className="space-x-4">
      <Link isDisabled href="#" variant="default">
        Label
      </Link>

      <Link isDisabled href="#" variant="primary">
        Label
      </Link>

      <Link isDisabled href="#" variant="secondary">
        Label
      </Link>

      <Link isDisabled href="#" variant="underline">
        Label
      </Link>
    </div>
  );
}
