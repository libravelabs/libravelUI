"use client";

import { Avatar, type AvatarProps } from "@/components/ui/core/avatar";

export default function InitialAvatar({ initials }: AvatarProps) {
  return <Avatar initials={initials} alt={initials} />;
}

export const controls = {
  initials: {
    type: "text",
    defaultValue: "DT",
  },
};
