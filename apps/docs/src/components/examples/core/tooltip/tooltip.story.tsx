"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";
import type {
  TooltipContentProps,
  TooltipProps,
} from "@/components/ui/core/tooltip";
import type { StoryBookConfig } from "@/components/app/storybook/types";
import { serializeComponent } from "@/components/app/storybook/serialize";

type TooltipStoryArgs = {
  placement: TooltipContentProps["placement"];
  delay: TooltipProps["delay"];
  tone: TooltipContentProps["tone"];
  showArrow: TooltipContentProps["showArrow"];
};

export const basicTooltip: StoryBookConfig<TooltipStoryArgs> = {
  title: "Tooltip",
  component: Tooltip,

  args: {
    placement: {
      defaultValue: "top",
      control: {
        type: "select",
        options: [
          { value: "bottom", label: "Bottom" },
          { value: "bottom left", label: "Bottom Left" },
          { value: "bottom right", label: "Bottom Right" },
          { value: "bottom start", label: "Bottom Start" },
          { value: "bottom end", label: "Bottom End" },
          { value: "top", label: "Top" },
          { value: "top left", label: "Top Left" },
          { value: "top right", label: "Top Right" },
          { value: "top start", label: "Top Start" },
          { value: "top end", label: "Top End" },
          { value: "left", label: "Left" },
          { value: "left top", label: "Left Top" },
          { value: "left bottom", label: "Left Bottom" },
          { value: "start", label: "Start" },
          { value: "start top", label: "Start Top" },
          { value: "start bottom", label: "Start Bottom" },
          { value: "right", label: "Right" },
          { value: "right top", label: "Right Top" },
          { value: "right bottom", label: "Right Bottom" },
          { value: "end", label: "End" },
          { value: "end top", label: "End Top" },
          { value: "end bottom", label: "End Bottom" },
        ],
      },
    },

    delay: {
      defaultValue: 0,
      control: {
        type: "select",
        options: [
          { value: 0, label: "0ms" },
          { value: 100, label: "100ms" },
          { value: 300, label: "300ms" },
          { value: 500, label: "500ms" },
        ],
      },
    },

    tone: {
      defaultValue: "default",
      control: {
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "inverse", label: "Inverse" },
          { value: "info", label: "Info" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "destructive", label: "Destructive" },
        ],
      },
    },

    showArrow: {
      defaultValue: true,
      control: {
        type: "boolean",
      },
    },
  },

  render: (args) => (
    <div className="flex items-center justify-center p-12">
      <Tooltip delay={args.delay}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent
          placement={args.placement}
          tone={args.tone}
          showArrow={args.showArrow}
        >
          This is a tooltip
        </TooltipContent>
      </Tooltip>
    </div>
  ),

  code: (args) => ({
    imports: [
      'import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/core/tooltip";',
    ],
    code: serializeComponent({
      name: "Tooltip",
      props: {
        delay: args.delay,
      },
      defaults: {
        delay: 0,
      },
      children: `
<TooltipTrigger>Hover me</TooltipTrigger>
${serializeComponent({
  name: "TooltipContent",
  props: {
    placement: args.placement,
    tone: args.tone,
    showArrow: args.showArrow,
  },
  defaults: {
    placement: "top",
    tone: "default",
    showArrow: true,
  },
  children: "This is a tooltip",
})}
`,
    }),
  }),
};
