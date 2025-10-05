"use client";

import { Button } from "@/components/ui/button";

export function DisabledButtonBase() {
  return <Button isDisabled>I'm just here for show</Button>;
}

export const DisabledButtonCode = `"use client";

import { Button } from "@/components/ui/button";

export function DisabledButton() {
  return <Button isDisabled>I'm just here for show</Button>;
}
`;
