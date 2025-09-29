"use client";

import { Avatar } from "@/components/ui/avatar";

export function SizeAvatarBase() {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
      <Avatar initials="2X" size="2xl" />
    </div>
  );
}

export const SizeAvatarCode = `"use client";

import { Avatar } from "@/components/ui/avatar";

export function SizeAvatar() {
  return (
    <div className="flex items-center gap-3">
      <Avatar initials="XS" size="xs" />
      <Avatar initials="SM" size="sm" />
      <Avatar initials="MD" size="md" />
      <Avatar initials="LG" size="lg" />
      <Avatar initials="XL" size="xl" />
      <Avatar initials="2X" size="2xl" />
    </div>
  );
}
`;
