import { useState } from "react";
import { type PaginationVariantProps } from "@/components/ui/core/pagination";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import { Heading } from "@/components/ui/core/heading";
import PaginationTones from "./tones";

export default function PaginationTonesDemo() {
  const [tone, setTone] = useState<PaginationVariantProps["tone"]>("default");
  const [size, setSize] = useState<PaginationVariantProps["size"]>("default");
  const [radius, setRadius] = useState<PaginationVariantProps["radius"]>("md");
  const [spacing, setSpacing] =
    useState<PaginationVariantProps["spacing"]>("default");

  const tones: NonNullable<PaginationVariantProps["tone"]>[] = [
    "default",
    "outline",
    "ghost",
    "secondary",
    "link",
    "underline",
  ];
  const sizes: NonNullable<PaginationVariantProps["size"]>[] = [
    "sm",
    "default",
    "lg",
  ];
  const radii: NonNullable<PaginationVariantProps["radius"]>[] = [
    "none",
    "sm",
    "md",
    "lg",
    "full",
  ];
  const spacings: NonNullable<PaginationVariantProps["spacing"]>[] = [
    "default",
    "compact",
  ];

  return (
    <div className="space-y-6 w-full min-h-72">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Heading size={3}>Tone</Heading>
          <RadioGroup
            value={tone}
            onChange={(v) => setTone(v as PaginationVariantProps["tone"])}
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
            onChange={(v) => setSize(v as PaginationVariantProps["size"])}
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
            onChange={(v) => setRadius(v as PaginationVariantProps["radius"])}
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
          <Heading size={3}>Spacing</Heading>
          <RadioGroup
            value={spacing}
            onChange={(v) => setSpacing(v as PaginationVariantProps["spacing"])}
            className="flex flex-wrap gap-2"
          >
            {spacings.map((s) => (
              <Radio key={s} value={s}>
                {s}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <PaginationTones
        tone={tone}
        size={size}
        radius={radius}
        spacing={spacing}
      />
    </div>
  );
}
