"use client";

import { Avatar, type AvatarProps } from "@/components/ui/core/avatar";
import type { NotebookConfig } from "@/components/app/notebook/types";

type AvatarNoteArgs = {
  variant: "image" | "initials";
  src: string;
  initials: string;
  shape: AvatarProps["shape"];
  size: AvatarProps["size"];
};

const AvatarExample = ({
  variant,
  src,
  initials,
  shape,
  size,
}: AvatarNoteArgs) => (
  <Avatar
    {...(variant === "image" ? { src } : { initials })}
    shape={shape}
    size={size}
    alt={variant === "image" ? "Avatar Example" : initials}
  />
);

export const avatar = {
  title: "Avatar",

  layout: {
    control: {
      columns: 2,
    },
  },

  args: {
    variant: {
      defaultValue: "image",
      style: {
        colSpan: 1,
      },
      control: {
        type: "toggle-group",
        options: [
          { value: "image", label: "Image" },
          { value: "initials", label: "Initials" },
        ],
      },
    },

    shape: {
      defaultValue: "circle",
      style: {
        colSpan: 1,
      },
      control: {
        type: "toggle-group",
        options: [
          { value: "circle", label: "Circle" },
          { value: "square", label: "Square" },
        ],
      },
    },

    src: {
      defaultValue: "https://i.pravatar.cc/100?img=3",
      showDefault: true,
      visible: (args) => args.variant === "image",
      style: {
        colSpan: 1,
      },
      control: {
        type: "text",
        label: "Image URL",
      },
    },

    initials: {
      defaultValue: "DT",
      showDefault: true,
      visible: (args) => args.variant === "initials",
      style: {
        colSpan: 1,
      },
      control: {
        type: "text",
      },
    },

    size: {
      defaultValue: "md",
      style: {
        colSpan: 1,
      },
      control: {
        type: "select",
        options: [
          { value: "xs", label: "XS" },
          { value: "sm", label: "SM" },
          { value: "md", label: "MD" },
          { value: "lg", label: "LG" },
          { value: "xl", label: "XL" },
          { value: "2xl", label: "2XL" },
          { value: "3xl", label: "3XL" },
          { value: "4xl", label: "4XL" },
          { value: "5xl", label: "5XL" },
          { value: "6xl", label: "6XL" },
          { value: "7xl", label: "7XL" },
          { value: "8xl", label: "8XL" },
          { value: "9xl", label: "9XL" },
          { value: "10xl", label: "10XL" },
        ],
      },
    },
  },

  render: AvatarExample,

  code: (args) => ({
    imports: ['import { Avatar } from "@/components/ui/core/avatar";'],
    element: AvatarExample(args),
  }),
} satisfies NotebookConfig<AvatarNoteArgs>;
