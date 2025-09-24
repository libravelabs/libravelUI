"use client";

import * as React from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Tag, TagGroup, TagList } from "./tag-group";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import type { Key, Selection } from "react-aria-components";
import { FieldError, type FieldErrorProps } from "./field";

interface Item {
  id: Key;
  textValue: string;
}

interface MultipleSelectProps<T extends object> {
  items?: T[];
  children?: React.ReactNode;
  placeholder?: string;
  maxItems?: number;
  isDisabled?: boolean;
  hideClear?: boolean;
  selectedKeys?: Selection;
  onSelectionChange?: (keys: Selection) => void;
  error?: FieldErrorProps;
}

function normalize<T extends object>(items: T[]): Item[] {
  return items.map((it) => {
    const keys = Object.keys(it);
    const idKey = keys.find((k) => k === "id" || k === "key") || keys[0];
    const textKey = keys.find((k) => k !== idKey) || idKey;
    return { id: it[idKey] as Key, textValue: String(it[textKey]) };
  });
}
function toSet(keys?: Selection): Set<Key> {
  if (!keys) return new Set();
  return keys instanceof Set ? keys : new Set(keys as Iterable<Key>);
}

function MultipleSelect<T extends object>({
  items,
  children,
  placeholder = "Select options",
  maxItems = Infinity,
  isDisabled,
  error,
  hideClear = false,
  selectedKeys: selectedKeysProp,
  onSelectionChange,
}: MultipleSelectProps<T>) {
  const parsed = items
    ? normalize(items)
    : (React.Children.map(children, (c) =>
        React.isValidElement(c) ? (c.props as Item) : null
      )?.filter(Boolean) as Item[]);

  const isControlled = selectedKeysProp !== undefined;
  const [isOpen, setIsOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<Set<Key>>(new Set());
  const selected = isControlled ? toSet(selectedKeysProp) : internal;
  const triggerRef = React.useRef<HTMLDivElement>(null);

  const [inputValue, setInputValue] = React.useState("");
  const isMax = selected.size >= maxItems;
  const suppressClose = React.useRef(false);

  const available = parsed.filter(
    (it) =>
      !selected.has(it.id) &&
      it.textValue.toLowerCase().includes(inputValue.toLowerCase())
  );

  function update(next: Set<Key>) {
    if (!isControlled) setInternal(next);
    onSelectionChange?.(next);
  }

  function add(id: Key) {
    if (!isMax) {
      update(new Set([...selected, id]));
      setInputValue("");
      suppressClose.current = true;
      setTimeout(() => {
        suppressClose.current = false;
        setIsOpen(true);
      }, 0);
    }
  }

  function remove(id: Key) {
    suppressClose.current = true;
    update(new Set([...selected].filter((k) => k !== id)));
    setTimeout(() => {
      suppressClose.current = false;
    }, 0);
  }

  return (
    <Popover
      isOpen={isOpen}
      onOpenChange={(open, event) => {
        if (!open && suppressClose.current) {
          return;
        }
        setIsOpen(open);
      }}
    >
      <div className="grid gap-1">
        <PopoverTrigger asButton className="outline-hidden ring-0">
          <div
            ref={triggerRef as React.RefObject<HTMLDivElement>}
            data-state={isOpen}
            role="multi-select"
            className={cn(
              "min-w-72 max-w-72 border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              "hover:bg-muted/50",
              error || isMax
                ? "border border-destructive inset-ring-destructive ring-3 ring-destructive/20 focus-within:inset-ring-destructive focus-within:ring-3 focus-within:ring-destructive/20"
                : "inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 data-[state=true]:inset-ring-ring/70 data-[state=true]:ring-3 data-[state=true]:ring-ring/20",
              "cursor-pointer disabled:cursor-not-allowed"
            )}
          >
            {selected.size > 0 ? (
              <TagGroup onRemove={(keys) => remove(keys.values().next().value)}>
                <TagList
                  items={[...selected].map((id) => ({
                    id,
                    label:
                      parsed.find((i) => i.id === id)?.textValue ?? String(id),
                  }))}
                >
                  {(item: { id: Key; label: string }) => (
                    <Tag key={String(item.id)}>{item.label}</Tag>
                  )}
                </TagList>
              </TagGroup>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}

            {selected.size > 0 && !hideClear && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  update(new Set());
                  setTimeout(() => {
                    suppressClose.current = false;
                  }, 0);
                }}
                className="ms-auto rounded p-1 hover:bg-muted"
                tabIndex={-1}
                aria-label="Clear selected item"
              >
                <X className="size-3" />
              </span>
            )}
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </div>
        </PopoverTrigger>
        <FieldError message={error ? error : isMax && "Maximum reached"} />
      </div>
      {isMax ||
        (available.length > 0 && (
          <PopoverContent
            triggerRef={triggerRef}
            placement="bottom"
            className="min-w-72 max-w-72 p-0"
          >
            <Command items={available} onAction={(id) => add(id)}>
              <CommandInput
                placeholder={isMax ? "Maximum reached" : "Search..."}
                onValueChange={(val) => setInputValue(val)}
                isDisabled={isDisabled || isMax}
                autoFocus
              />
              <CommandList>
                {available.length > 0 ? (
                  available.map((item) => (
                    <CommandItem key={String(item.id)} id={String(item.id)}>
                      {item.textValue}
                    </CommandItem>
                  ))
                ) : (
                  <CommandEmpty>No options</CommandEmpty>
                )}
              </CommandList>
            </Command>
          </PopoverContent>
        ))}
    </Popover>
  );
}

const MultipleSelectItem = CommandItem;
const MultipleSelectSection = CommandGroup;

export { MultipleSelect, MultipleSelectItem, MultipleSelectSection };
