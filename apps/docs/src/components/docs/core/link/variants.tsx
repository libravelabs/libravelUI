"use client";

import { Link } from "@/components/ui/core/link";

export default function LinkVariants() {
  return (
    <div className="space-x-4">
      <Link href="#" variant="default">
        Default Link
      </Link>

      <Link href="#" variant="primary">
        Primary Link
      </Link>

      <Link href="#" variant="secondary">
        Secondary Link
      </Link>

      <Link href="#" variant="underline">
        Underline Link
      </Link>
    </div>
  );
}
