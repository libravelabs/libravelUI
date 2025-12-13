"use client";

import { Link } from "@/components/ui/core/link";

export default function DisabledLink() {
  return (
    <div className="space-x-4">
      <Link isDisabled href="#" tone="default">
        Label
      </Link>

      <Link isDisabled href="#" tone="primary">
        Label
      </Link>

      <Link isDisabled href="#" tone="secondary">
        Label
      </Link>

      <Link isDisabled href="#" tone="underline">
        Label
      </Link>
    </div>
  );
}
