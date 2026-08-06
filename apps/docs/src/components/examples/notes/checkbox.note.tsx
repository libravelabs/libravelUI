"use client";

import { Checkbox, type CheckboxProps } from "@/components/ui/core/checkbox";
import type { NotebookConfig } from "@/components/app/notebook/types";

type CheckboxNoteArgs = {
  label: string;
  description: string;
  size: CheckboxProps["size"];
  isDisabled: boolean;
};

const CheckboxExample = ({
  label,
  description,
  size,
  isDisabled,
}: CheckboxNoteArgs) => (
  <Checkbox
    label={label}
    description={description}
    size={size}
    isDisabled={isDisabled}
  />
);

export const checkbox = {
  title: "Checkbox",

  layout: {
    control: {
      columns: 2,
    },
  },

  args: {
    label: {
      defaultValue: "Subscribe newsletter",
      showDefault: true,
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
          { value: "sm", label: "Small" },
          { value: "md", label: "Medium" },
          { value: "lg", label: "Large" },
          { value: "xl", label: "Extra Large" },
        ],
      },
    },

    description: {
      defaultValue: "Get the latest updates and news delivered to your inbox.",
      showDefault: true,
      style: {
        colSpan: 2,
      },
      control: {
        type: "textarea",
      },
    },

    isDisabled: {
      defaultValue: false,
      style: {
        colSpan: 1,
      },
      control: {
        type: "boolean",
        label: "Disabled",
      },
    },
  },

  render: CheckboxExample,

  code: (args) => ({
    imports: ['import { Checkbox } from "@/components/ui/core/checkbox";'],
    element: CheckboxExample(args),
  }),
} satisfies NotebookConfig<CheckboxNoteArgs>;
