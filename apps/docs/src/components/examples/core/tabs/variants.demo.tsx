import { useState } from "react";
import { type TabsProps } from "@/components/ui/core/tabs";
import { Heading } from "@/components/ui/core/heading";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import TabsVariants from "./variants";

export default function TabsVariantsDemo() {
  const [tone, setTone] = useState<TabsProps["tone"]>("default");
  const [size, setSize] = useState<TabsProps["size"]>("default");
  const [radius, setRadius] = useState<TabsProps["radius"]>("md");
  const [width, setWidth] = useState<TabsProps["width"]>("xl");
  const [orientation, setOrientation] =
    useState<TabsProps["orientation"]>("horizontal");

  const tones: NonNullable<TabsProps["tone"]>[] = [
    "default",
    "ghost",
    "underline",
    "outline",
  ];
  const sizes: NonNullable<TabsProps["size"]>[] = ["sm", "default", "lg"];
  const radii: NonNullable<TabsProps["radius"]>[] = [
    "none",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "3xl",
  ];
  const widths: NonNullable<TabsProps["width"]>[] = [
    "sm",
    "md",
    "lg",
    "xl",
    "2xl",
    "full",
  ];
  const orientations: NonNullable<TabsProps["orientation"]>[] = [
    "horizontal",
    "vertical",
  ];

  return (
    <div className="grid gap-8">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Heading size={3}>Tone</Heading>
          <RadioGroup
            value={tone}
            onChange={(v) => setTone(v as TabsProps["tone"])}
            className="flex flex-wrap gap-2"
          >
            {tones.map((t) => (
              <Radio key={t} value={t}>
                {t}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Heading size={3}>Size</Heading>
          <RadioGroup
            value={size}
            onChange={(v) => setSize(v as TabsProps["size"])}
            className="flex flex-wrap gap-2"
          >
            {sizes.map((s) => (
              <Radio key={s} value={s}>
                {s}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Heading size={3}>Radius</Heading>
          <RadioGroup
            value={radius}
            onChange={(v) => setRadius(v as TabsProps["radius"])}
            className="flex flex-wrap gap-2"
          >
            {radii.map((r) => (
              <Radio key={r} value={r}>
                {r}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Heading size={3}>Width</Heading>
          <RadioGroup
            value={width}
            onChange={(v) => setWidth(v as TabsProps["width"])}
            className="flex flex-wrap gap-2"
          >
            {widths.map((w) => (
              <Radio key={w} value={w}>
                {w}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Heading size={3}>Orientation</Heading>
          <RadioGroup
            value={orientation}
            onChange={(v) => setOrientation(v as TabsProps["orientation"])}
            className="flex flex-wrap gap-2"
          >
            {orientations.map((o) => (
              <Radio key={o} value={o}>
                {o}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <TabsVariants
        tone={tone}
        size={size}
        radius={radius}
        width={width}
        orientation={orientation}
      />
    </div>
  );
}
