"use client";

import { Tag, TagGroup, TagList } from "@/components/ui/core/tag-group";

export default function BasicTagGroup() {
  return (
    <TagGroup label="Programming Languages" selectionMode="multiple">
      <TagList items={programmingLanguages}>
        {(item) => <Tag>{item.name}</Tag>}
      </TagList>
    </TagGroup>
  );
}

const programmingLanguages = [
  { id: "1", name: "JavaScript", popular: true },
  { id: "2", name: "Python", popular: true },
  { id: "3", name: "Ruby", popular: false },
  { id: "4", name: "Go", popular: true },
  { id: "5", name: "Perl", popular: false },
];
