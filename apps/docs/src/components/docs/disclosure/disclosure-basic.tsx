"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "@/components/ui/disclosure";

export function DisclosureBasicBase() {
  return (
    <Disclosure>
      <DisclosureTrigger>What’s included in the Pro plan?</DisclosureTrigger>
      <DisclosureContent>
        <p>
          The Pro plan includes unlimited projects, advanced analytics, priority
          support, and integrations with third-party tools like Slack and Google
          Drive.
        </p>
      </DisclosureContent>
    </Disclosure>
  );
}

export const DisclosureBasicCode = `"use client";

import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "@/components/ui/disclosure";

export function DisclosureBasic() {
  return (
    <Disclosure>
      <DisclosureTrigger>What’s included in the Pro plan?</DisclosureTrigger>
      <DisclosureContent>
        <p>
          The Pro plan includes unlimited projects, advanced analytics, priority
          support, and integrations with third-party tools like Slack and Google
          Drive.
        </p>
      </DisclosureContent>
    </Disclosure>
  );
}
`;
