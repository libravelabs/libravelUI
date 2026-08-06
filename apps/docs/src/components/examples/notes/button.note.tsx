"use client";

import { LuArrowRight } from "react-icons/lu";
import { Button, type ButtonProps } from "@/components/ui/core/button";
import type { StoryBookConfig } from "@/components/app/notebook/types";
import { toast } from "sonner";

type ButtonStoryArgs = {
  children: string;
  tone: ButtonProps["tone"];
  size: ButtonProps["size"];
  radius: ButtonProps["radius"];
  iconOnly: boolean;
  isDisabled: boolean;
  isPending: boolean;
};

const ButtonExample = (args: ButtonStoryArgs) => (
  <Button
    {...args}
    onPress={() =>
      toast.info("Clicked!", {
        position: "top-center",
      })
    }
  >
    {args.iconOnly ? <LuArrowRight /> : args.children}
  </Button>
);

export const button = {
  title: "Button",

  layout: {
    control: {
      columns: 3,
    },
  },

  args: {
    children: {
      defaultValue: "Click Me!",
      style: {
        colSpan: 3,
      },
      control: {
        type: "text",
      },
    },

    tone: {
      defaultValue: "default",
      style: {
        colSpan: 1,
      },
      control: {
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "secondary", label: "Secondary" },
          { value: "destructive", label: "Destructive" },
          { value: "outline", label: "Outline" },
          { value: "ghost", label: "Ghost" },
          { value: "link", label: "Link" },
          { value: "unstyled", label: "Unstyled" },
        ],
      },
    },

    size: {
      defaultValue: "default",
      style: {
        colSpan: 1,
      },
      control: {
        type: "select",
        options: [
          { value: "xs", label: "XS" },
          { value: "sm", label: "SM" },
          { value: "default", label: "Default" },
          { value: "lg", label: "LG" },
          { value: "xl", label: "XL" },
          { value: "2xl", label: "2XL" },
        ],
      },
    },

    radius: {
      defaultValue: "md",
      style: {
        colSpan: 1,
      },
      control: {
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "sm", label: "SM" },
          { value: "md", label: "MD" },
          { value: "lg", label: "LG" },
          { value: "full", label: "Full" },
        ],
      },
    },

    iconOnly: {
      defaultValue: false,
      style: {
        colSpan: 1,
      },
      control: {
        type: "boolean",
      },
    },

    isDisabled: {
      defaultValue: false,
      style: {
        colSpan: 1,
      },
      control: {
        type: "boolean",
      },
    },

    isPending: {
      defaultValue: false,
      style: {
        colSpan: 1,
      },
      control: {
        type: "boolean",
      },
    },
  },

  render: ButtonExample,

  code: (args) => ({
    imports: [
      'import { Button } from "@/components/ui/core/button";',
      'import { toast } from "sonner";',
      args.iconOnly ? 'import { LuArrowRight } from "react-icons/lu";' : "",
    ],
    element: ButtonExample(args),
  }),
} satisfies StoryBookConfig<ButtonStoryArgs>;
