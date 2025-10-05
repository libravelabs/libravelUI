"use client";

import { Link } from "@/components/ui/link";

export function DisabledLinkBase() {
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

export const DisabledLinkCode = `"use client";

import { Link } from "@/components/ui/link";

export function DisabledLink() {
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
`;
