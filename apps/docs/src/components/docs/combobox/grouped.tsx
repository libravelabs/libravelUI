"use client";

import {
  ComboBoxRoot,
  ComboBoxInput,
  ComboBoxContent,
  ComboBoxGroup,
  ComboBoxItem,
} from "@/components/ui/combobox";

export default function GroupedComboBoxBasic() {
  return (
    <ComboBoxRoot label="Grouped Options">
      <ComboBoxInput placeholder="Select something..." />
      <ComboBoxContent>
        <ComboBoxGroup title="Fruits">
          <ComboBoxItem textValue="apple">Apple</ComboBoxItem>
          <ComboBoxItem textValue="banana">Banana</ComboBoxItem>
        </ComboBoxGroup>
        <ComboBoxGroup title="Vegetables">
          <ComboBoxItem textValue="carrot">Carrot</ComboBoxItem>
          <ComboBoxItem textValue="broccoli">Broccoli</ComboBoxItem>
        </ComboBoxGroup>
      </ComboBoxContent>
    </ComboBoxRoot>
  );
}
