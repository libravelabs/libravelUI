import { useState } from "react";
import { type InputProps } from "@/components/ui/core/input";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import { Heading } from "@/components/ui/core/heading";
import VariantsInput from "./variants";
import { useDynamicCode } from "@/components/playground-context";

const tones: NonNullable<InputProps["tone"]>[] = [
  "default",
  "destructive",
  "ghost",
  "line",
];
const sizes: NonNullable<InputProps["size"]>[] = ["sm", "default", "lg", "xl"];
const radii: NonNullable<InputProps["radius"]>[] = [
  "none",
  "sm",
  "md",
  "lg",
  "full",
];

export default function VariantsTextFieldDemo() {
  const [tone, setTone] = useState<InputProps["tone"]>("default");
  const [size, setSize] = useState<InputProps["size"]>("default");
  const [radius, setRadius] = useState<InputProps["radius"]>("md");

  useDynamicCode({
    tone,
    size,
    radius,
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <Heading size={3}>Tones</Heading>
          <RadioGroup
            value={tone}
            onChange={(v) => setTone(v as InputProps["tone"])}
            className="flex flex-wrap gap-2"
          >
            {tones.map((v) => (
              <Radio key={v} value={v}>
                {v}
              </Radio>
            ))}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Heading size={3}>Size</Heading>
          <RadioGroup
            value={size}
            onChange={(v) => setSize(v as InputProps["size"])}
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
            onChange={(v) => setRadius(v as InputProps["radius"])}
            className="flex flex-wrap gap-2"
          >
            {radii.map((r) => (
              <Radio key={r} value={r}>
                {r}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      <VariantsInput tone={tone} size={size} radius={radius} />
    </div>
  );
}
