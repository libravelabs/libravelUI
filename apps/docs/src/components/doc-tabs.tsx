"use client";

import * as React from "react";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  type TabsProps,
} from "@/components/ui/core/tabs";
import { cn } from "@/lib/utils";

type DocTabItem = {
  label: React.ReactNode;
  value: string;
  content: React.ReactNode;
};

type DocTabsProps = TabsProps & {
  items: DocTabItem[];
  defaultValue?: string;
  className?: string;
  classNames?: {
    content?: string | string[];
  };
};

export function DocTabs({
  items,
  defaultValue,
  className,
  variant = "underline",
  classNames,
  ...props
}: DocTabsProps) {
  const [selectedKey, setSelectedKey] = React.useState<string>(
    defaultValue ?? items[0]?.value ?? ""
  );

  return (
    <Tabs
      selectedKey={selectedKey}
      onSelectionChange={(key) => setSelectedKey(String(key))}
      className={className}
      width="full"
      variant={variant}
      {...props}
    >
      <TabList>
        {items.map((item) => (
          <TabTrigger key={item.value} id={item.value}>
            {item.label}
          </TabTrigger>
        ))}
      </TabList>

      {items.map((item) => (
        <TabContent
          key={item.value}
          id={item.value}
          className={cn("bg-background", classNames?.content)}
        >
          {item.content}
        </TabContent>
      ))}
    </Tabs>
  );
}
