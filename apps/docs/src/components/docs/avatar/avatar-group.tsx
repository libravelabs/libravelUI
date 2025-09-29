"use client";

import { Avatar } from "@/components/ui/avatar";

export function AvatarGroupBase() {
  return (
    <div className="-space-x-2 flex items-center justify-center">
      <Avatar
        src="https://i.pravatar.cc/100?img=3"
        alt="Dominic Torpedo"
        className="size-8 ring-2 ring-white dark:ring-zinc-900"
      />
      <Avatar
        src="https://i.pravatar.cc/100?img=4"
        alt="Sarah Connor"
        className="size-8 ring-2 ring-white dark:ring-zinc-900"
      />
      <Avatar
        src="https://i.pravatar.cc/100?img=5"
        alt="Liam Harper"
        className="size-8 ring-2 ring-white dark:ring-zinc-900"
      />
      <Avatar
        src="https://i.pravatar.cc/100?img=6"
        alt="Maya Rivera"
        className="size-8 ring-2 ring-white dark:ring-zinc-900"
      />
      <Avatar
        src="https://i.pravatar.cc/100?img=7"
        alt="Jake Stone"
        className="size-8 ring-2 ring-white dark:ring-zinc-900"
      />
      <Avatar
        initials="AC"
        alt="Ava Chen"
        className="size-8 ring-2 ring-white dark:ring-zinc-900"
      />
    </div>
  );
}

export const AvatarGroupCode = `"use client";

import { Avatar } from "@/components/ui/avatar";

export function AvatarGroup() {
  return (
    <div className="-space-x-2 flex items-center justify-center">
      <Avatar src="https://i.pravatar.cc/100?img=3" alt="Dominic Torpedo" className="size-8 ring-2 ring-white dark:ring-zinc-900" />
      <Avatar src="https://i.pravatar.cc/100?img=4" alt="Sarah Connor" className="size-8 ring-2 ring-white dark:ring-zinc-900" />
      <Avatar src="https://i.pravatar.cc/100?img=5" alt="Liam Harper" className="size-8 ring-2 ring-white dark:ring-zinc-900" />
      <Avatar src="https://i.pravatar.cc/100?img=6" alt="Maya Rivera" className="size-8 ring-2 ring-white dark:ring-zinc-900" />
      <Avatar src="https://i.pravatar.cc/100?img=7" alt="Jake Stone" className="size-8 ring-2 ring-white dark:ring-zinc-900" />
      <Avatar initials="AC" alt="Ava Chen" className="size-8 ring-2 ring-white dark:ring-zinc-900" />
    </div>
  );
}
`;
