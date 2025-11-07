"use client";

import { useState } from "react";
import type { Selection } from "react-aria-components";
import { Description } from "@/components/ui/field";
import { Tag, TagGroup, TagList } from "@/components/ui/tag-group";

export default function ControlledTagGroup() {
  const [selected, setSelected] = useState<Selection>(new Set([]));
  return (
    <div>
      <TagGroup
        label="Programming Languages"
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <TagList items={programmingLanguages}>
          {(item) => <Tag>{item.name}</Tag>}
        </TagList>
      </TagGroup>

      <Description className="mt-2 block text-muted-fg [&>strong]:text-fg">
        You have selected: <strong>{Array.from(selected).join(", ")}</strong>
      </Description>
    </div>
  );
}

const programmingLanguages = [
  { id: "1", name: "JavaScript", popular: true },
  { id: "2", name: "Python", popular: true },
  { id: "3", name: "Ruby", popular: false },
  { id: "4", name: "Go", popular: true },
  { id: "5", name: "Perl", popular: false },
];
