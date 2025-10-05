"use client";

import { Playground } from "@/components/playground";
import { Link } from "@/components/ui/link";
import LinkVariantsBase, { LinkVariantsCode } from "./link-variants";
import { DisabledLinkBase, DisabledLinkCode } from "./disabled-link";

export function BasicLink() {
  return (
    <Playground
      preview={
        <Link href="https://www.imdb.com/title/tt6348138/" target="_blank">
          The Missing Link
        </Link>
      }
      code={`"use client";

import { Link } from "@/components/ui/link";

export function BasicLink() {
  return <Link href="https://www.imdb.com/title/tt6348138/" target="_blank">The Missing Link</Link>;
}
`}
    />
  );
}

export function LinkVariants() {
  return <Playground preview={<LinkVariantsBase />} code={LinkVariantsCode} />;
}

export function DisabledLink() {
  return <Playground preview={<DisabledLinkBase />} code={DisabledLinkCode} />;
}
