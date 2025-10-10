"use client";

import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectLabel,
  SelectHeader,
} from "@/components/ui/select";

export function GroupedSelectBase() {
  return (
    <SelectRoot label="Select your favorite fruit">
      <SelectTrigger placeholder="Choose a fruit..." />

      <SelectContent>
        <SelectHeader separator>Fruits Catalog</SelectHeader>

        <SelectGroup title="Tropical Fruits">
          <SelectItem key="mango">Mango</SelectItem>
          <SelectItem key="pineapple">Pineapple</SelectItem>
          <SelectItem key="banana">Banana</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup title="Citrus Fruits">
          <SelectItem key="orange">Orange</SelectItem>
          <SelectItem key="lemon">Lemon</SelectItem>
          <SelectItem key="lime">Lime</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel inset>Other Options</SelectLabel>
          <SelectItem key="apple">Apple</SelectItem>
          <SelectItem key="grape">Grape</SelectItem>
          <SelectItem key="watermelon">Watermelon</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}

export const GroupedSelectCode = `"use client";

import {
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectSeparator,
  SelectLabel,
  SelectHeader,
} from "@/components/ui/select";

export function GroupedSelect() {
  return (
    <SelectRoot label="Select your favorite fruit">
      <SelectTrigger placeholder="Choose a fruit..." />

      <SelectContent>
        <SelectHeader separator>Fruits Catalog</SelectHeader>

        <SelectGroup title="Tropical Fruits">
          <SelectItem key="mango">Mango</SelectItem>
          <SelectItem key="pineapple">Pineapple</SelectItem>
          <SelectItem key="banana">Banana</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup title="Citrus Fruits">
          <SelectItem key="orange">Orange</SelectItem>
          <SelectItem key="lemon">Lemon</SelectItem>
          <SelectItem key="lime">Lime</SelectItem>
        </SelectGroup>

        <SelectSeparator />

        <SelectGroup>
          <SelectLabel inset>Other Options</SelectLabel>
          <SelectItem key="apple">Apple</SelectItem>
          <SelectItem key="grape">Grape</SelectItem>
          <SelectItem key="watermelon">Watermelon</SelectItem>
        </SelectGroup>
      </SelectContent>
    </SelectRoot>
  );
}
`;
