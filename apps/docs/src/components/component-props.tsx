"use client";

import { TypeTable } from "fumadocs-ui/components/type-table";
import {
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
} from "./ui/disclosure";

export function ComponentProps({
  type,
}: React.ComponentProps<typeof TypeTable>) {
  return (
    <>
      <Disclosure>
        <DisclosureTrigger>
          <h3>Props</h3>
        </DisclosureTrigger>
        <DisclosureContent>
          <TypeTable type={type} />
        </DisclosureContent>
      </Disclosure>
    </>
  );
}
