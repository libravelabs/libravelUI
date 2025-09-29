"use client";

import { Avatar } from "@/components/ui/avatar";

export function BasicAvatarBase() {
  return <Avatar src="https://i.pravatar.cc/100?img=3" alt="Dominic Torpedo" />;
}

export const BasicAvatarCode = `"use client"

import { Avatar } from "@/components/ui/avatar";

export function BasicAvatar() {
  return <Avatar src="https://i.pravatar.cc/100?img=3" alt="Dominic Torpedo" />;
}`;
