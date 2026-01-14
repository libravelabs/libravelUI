"use client";

import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  type TabsProps,
} from "@/components/ui/core/tabs";
import { Files, Home, Search, Settings } from "lucide-react";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "ghost", label: "Ghost" },
  { value: "underline", label: "Underline" },
  { value: "outline", label: "Outline" },
];

const sizes: { value: string; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
];

const radii: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2XL" },
  { value: "3xl", label: "3XL" },
];

const widths: { value: string; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "xl", label: "Extra Large" },
  { value: "2xl", label: "2XL" },
  { value: "full", label: "Full" },
];

const orientations: { value: string; label: string }[] = [
  { value: "horizontal", label: "Horizontal" },
  { value: "vertical", label: "Vertical" },
];

export default function BasicTabs({
  tone = "default",
  size = "default",
  radius = "md",
  width = "xl",
  orientation = "horizontal",
  isDisabled = false,
}: TabsProps) {
  return (
    <Tabs
      defaultSelectedKey="overview"
      tone={tone}
      size={size}
      radius={radius}
      width={width}
      orientation={orientation}
      isDisabled={isDisabled}
    >
      <TabList className="group-orientation-horizontal:grid group-orientation-horizontal:grid-cols-[repeat(auto-fit,minmax(100px,1fr))]">
        <TabTrigger id="home">
          <Home /> Home
        </TabTrigger>
        <TabTrigger id="files">
          <Files />
          Files
        </TabTrigger>
        <TabTrigger id="search">
          <Search />
          Search
        </TabTrigger>
        <TabTrigger id="settings">
          <Settings />
          Settings
        </TabTrigger>
      </TabList>

      <TabContent
        id="home"
        className="w-full h-full flex items-center justify-center"
      >
        <Home size={70} />
      </TabContent>

      <TabContent
        id="files"
        className="w-full h-full flex items-center justify-center"
      >
        <Files size={70} />
      </TabContent>

      <TabContent
        id="search"
        className="w-full h-full flex items-center justify-center"
      >
        <Search size={70} />
      </TabContent>

      <TabContent
        id="settings"
        className="w-full h-full flex items-center justify-center"
      >
        <Settings size={70} />
      </TabContent>
    </Tabs>
  );
}

export const controls = {
  orientation: {
    type: "toggle-group",
    options: orientations,
    defaultValue: "horizontal",
    label: "Orientation",
  },
  tone: {
    type: "select",
    options: tones,
    defaultValue: "default",
    label: "Tone",
  },
  size: {
    type: "select",
    options: sizes,
    defaultValue: "default",
    label: "Size",
  },
  radius: {
    type: "select",
    options: radii,
    defaultValue: "md",
    label: "Radius",
  },
  width: {
    type: "select",
    options: widths,
    defaultValue: "xl",
    label: "Width",
  },
  isDisabled: {
    type: "boolean",
    defaultValue: false,
    label: "Disabled",
  },
};
