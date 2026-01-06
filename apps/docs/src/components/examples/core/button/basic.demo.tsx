import { useState } from "react";
import { type ButtonProps } from "@/components/ui/core/button";
import { Select } from "@/components/ui/core/select";
import { Switch } from "@/components/ui/core/switch";
import { useDynamicCode } from "@/components/playground-context";

export default function ButtonDemo() {
  const [tone, setTone] = useState<ButtonProps["tone"]>("default");
  const [size, setSize] = useState<ButtonProps["size"]>("default");
  const [radius, setRadius] = useState<ButtonProps["radius"]>("md");
  const [iconOnly, setIconOnly] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useDynamicCode({ tone, size, radius, iconOnly, isDisabled, isLoading });

  const tones: { id: string; label: string }[] = [
    { id: "default", label: "Default" },
    { id: "destructive", label: "Destructive" },
    { id: "outline", label: "Outline" },
    { id: "secondary", label: "Secondary" },
    { id: "ghost", label: "Ghost" },
    { id: "link", label: "Link" },
    { id: "unstyled", label: "Unstyled" },
  ];

  const sizes: { id: string; label: string }[] = [
    { id: "xs", label: "Extra Small" },
    { id: "sm", label: "Small" },
    { id: "default", label: "Default" },
    { id: "lg", label: "Large" },
    { id: "xl", label: "Extra Large" },
    { id: "2xl", label: "2XL" },
  ];

  const radiuses: { id: string; label: string }[] = [
    { id: "none", label: "None" },
    { id: "sm", label: "Small" },
    { id: "md", label: "Medium" },
    { id: "lg", label: "Large" },
    { id: "full", label: "Full" },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <Select
        label="Tone"
        items={tones}
        selectedKey={tone}
        onSelectionChange={(key) => setTone(key as ButtonProps["tone"])}
      />
      <Select
        label="Size"
        items={sizes}
        selectedKey={size}
        onSelectionChange={(key) => setSize(key as ButtonProps["size"])}
      />
      <Select
        label="Radius"
        items={radiuses}
        selectedKey={radius}
        onSelectionChange={(key) => setRadius(key as ButtonProps["radius"])}
      />
      <Switch isSelected={iconOnly} onChange={setIconOnly} label="Icon Only" />
      <div className="flex items-center justify-between">
        <Switch
          isSelected={isDisabled}
          onChange={setIsDisabled}
          label="Is Disabled"
        />
        <Switch
          isSelected={isLoading}
          onChange={setIsLoading}
          label="Is Loading"
        />
      </div>
    </div>
  );
}
