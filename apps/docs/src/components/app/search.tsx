"use client";

import { useState } from "react";
import { useDocsSearch } from "fumadocs-core/search/client";
import {
  SearchDialog as SearchDialogPrimitive,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  SearchDialogFooter,
  type SharedProps,
} from "fumadocs-ui/components/dialog/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { cn } from "@/lib/utils";

const items = [
  {
    name: "All",
    value: undefined,
  },
  {
    name: "Getting Started",
    description: "Only results about base documentation",
    value: "getting-started",
  },
  {
    name: "Core",
    description: "Only results about core components",
    value: "core-components",
  },
  {
    name: "Motion",
    description: "Only results about motion components",
    value: "motion-components",
  },
];

export default function SearchDialog(props: SharedProps) {
  const [open, setOpen] = useState(false);
  const [tag, setTag] = useState<string | undefined>();
  const { search, setSearch, query } = useDocsSearch({
    type: "fetch",
  });

  return (
    <SearchDialogPrimitive
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : null} />
        <SearchDialogFooter className="flex flex-row flex-wrap gap-2 items-center">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
              className={buttonVariants({
                size: "sm",
                color: "ghost",
                className: "-m-1.5 me-auto",
              })}
            >
              <span className="text-fd-muted-foreground/80 me-2">Filter</span>
              {items.find((item) => item.value === tag)?.name}
              <ChevronDown className="size-3.5 text-fd-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-1 gap-1" align="start">
              {items.map((item, i) => {
                const isSelected = item.value === tag;

                return (
                  <button
                    key={i}
                    onClick={() => {
                      setTag(item.value);
                      setOpen(false);
                    }}
                    className={cn(
                      "rounded-lg text-start px-2 py-1.5",
                      isSelected
                        ? "text-fd-primary bg-fd-primary/10"
                        : "hover:text-fd-accent-foreground hover:bg-fd-accent"
                    )}
                  >
                    <p className="font-medium mb-0.5">{item.name}</p>
                    <p className="text-xs opacity-70">{item.description}</p>
                  </button>
                );
              })}
            </PopoverContent>
          </Popover>
          <a
            href="https://orama.com"
            rel="noreferrer noopener"
            className="text-xs text-nowrap text-fd-muted-foreground"
          >
            Powered by Orama
          </a>
        </SearchDialogFooter>
      </SearchDialogContent>
    </SearchDialogPrimitive>
  );
}
