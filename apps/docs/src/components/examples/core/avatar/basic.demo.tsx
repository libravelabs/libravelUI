"use client";

import { Avatar, type AvatarProps } from "@/components/ui/core/avatar";

export default function AvatarExample({ src, shape }: AvatarProps) {
  return <Avatar src={src} shape={shape} alt="Avatar Example" />;
}

export const controls = {
  src: {
    label: "Image URL",
    type: "text",
    defaultValue: "https://i.pravatar.cc/100?img=3",
  },
  shape: {
    type: "select",
    defaultValue: "circle",
    options: [
      { label: "circle", value: "circle" },
      { label: "square", value: "square" },
    ],
  },
};
