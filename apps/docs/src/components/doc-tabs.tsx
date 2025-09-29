"use client";

import { Tabs, Tab } from "fumadocs-ui/components/tabs";

interface DocTabsProps {
  items: { label: string; value: string; content: React.ReactNode }[];
}

export function DocTabs({ items, ...props }: DocTabsProps) {
  return (
    <Tabs items={items.map((i) => i.label)} {...props}>
      {items.map((item) => (
        <Tab key={item.value} value={item.label}>
          {item.content}
        </Tab>
      ))}
    </Tabs>
  );
}
