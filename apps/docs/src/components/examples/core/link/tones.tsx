"use client";

import { Link } from "@/components/ui/core/link";

export default function LinkTones() {
  return (
    <div className="space-x-4">
      <Link href="#" tone="default">
        Default Link
      </Link>

      <Link href="#" tone="primary">
        Primary Link
      </Link>

      <Link href="#" tone="secondary">
        Secondary Link
      </Link>

      <Link href="#" tone="underline">
        Underline Link
      </Link>
    </div>
  );
}
