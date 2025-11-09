"use client";

import { Avatar } from "@/components/ui/core/avatar";

export default function ShapeAvatar() {
  return (
    <div className="flex gap-4 items-center">
      <Avatar
        src="https://i.pravatar.cc/100?img=4"
        alt="Alex"
        variant="circle"
      />
      <Avatar
        src="https://i.pravatar.cc/100?img=4"
        alt="Alex"
        variant="square"
      />
    </div>
  );
}
