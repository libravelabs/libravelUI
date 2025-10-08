"use client";

import * as React from "react";
import { ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { Tag, TagGroup, TagList } from "@/components/ui/tag-group";
import { FieldError, type FieldProps } from "@/components/ui/field";

import type { Key, Selection } from "react-aria-components";

interface Item {
  id: Key;
  textValue: string;
}

interface MultipleSelectContextType {
  selected: Set<Key>;
  update: (next: Set<Key>) => void;
  add: (id: Key) => void;
  remove: (id: Key) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  inputValue: string;
  setInputValue: (val: string) => void;
  parsed: Item[];
  placeholder?: string;
  isMax: boolean;
  maxItems: number;
  hideClear?: boolean;
  triggerRef: React.RefObject<HTMLElement>;
  error?: FieldProps["error"];
}

const MultipleSelectContext =
  React.createContext<MultipleSelectContextType | null>(null);

function useMultipleSelectContext() {
  const ctx = React.useContext(MultipleSelectContext);
  if (!ctx)
    throw new Error(
      "MultipleSelect components must be used within MultipleSelectRoot"
    );
  return ctx;
}

type MultipleSelectRootProps<T extends object> = {
  items: T[];
  defaultSelectedKeys?: Selection;
  maxItems?: number;
  hideClear?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  error?: FieldErrorProps;
  onSelectionChange?: (keys: Selection) => void;
  children?: React.ReactNode;
};

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

function MultipleSelectRoot<T extends object>({
  items,
  defaultSelectedKeys,
  maxItems = Infinity,
  hideClear,
  placeholder = "Select options",
  error,
  onSelectionChange,
  children,
}: MultipleSelectRootProps<T>) {
  const parsed = normalize(items);
  const [selected, setSelected] = React.useState<Set<Key>>(
    toSet(defaultSelectedKeys)
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const triggerRef = React.useRef<HTMLElement>(null);
  const suppressClose = React.useRef(false);

  const update = (next: Set<Key>) => {
    setSelected(next);
    onSelectionChange?.(next);
  };

  const add = (id: Key) => {
    if (selected.size >= maxItems) return;
    update(new Set([...selected, id]));
    setInputValue("");
    suppressClose.current = true;
    setTimeout(() => {
      suppressClose.current = false;
      setIsOpen(true);
    }, 0);
  };

  const remove = (id: Key) => {
    suppressClose.current = true;
    update(new Set([...selected].filter((k) => k !== id)));
    setTimeout(() => {
      suppressClose.current = false;
    }, 0);
  };

  const value = {
    selected,
    update,
    add,
    remove,
    isOpen,
    setIsOpen,
    inputValue,
    setInputValue,
    parsed,
    placeholder,
    isMax: selected.size >= maxItems,
    maxItems,
    hideClear,
    triggerRef,
    error,
  };

  return (
    <MultipleSelectContext.Provider value={value}>
      <div
        className="relative"
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsOpen(false);
        }}
      >
        {children}
      </div>
    </MultipleSelectContext.Provider>
  );
}

function MultipleSelectTrigger() {
  const {
    selected,
    remove,
    parsed,
    placeholder,
    hideClear,
    update,
    triggerRef,
    isOpen,
    error,
    isMax,
  } = useMultipleSelectContext();

  return (
    <div className="grid gap-1">
      <PopoverTrigger plain className="outline-hidden ring-0">
        <div
          ref={triggerRef as React.RefObject<HTMLDivElement>}
          data-state={isOpen}
          role="multi-select"
          className={cn(
            "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground flex w-fit min-w-72 max-w-72 items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8",
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
  );
}

function MultipleSelectContent() {
  const {
    parsed,
    selected,
    add,
    inputValue,
    setInputValue,
    triggerRef,
    isMax,
    isOpen,
  } = useMultipleSelectContext();

  const available = parsed.filter(
    (it) =>
      !selected.has(it.id) &&
      it.textValue.toLowerCase().includes(inputValue.toLowerCase())
  );

  if (isMax || !isOpen) return null;

  return (
    <PopoverContent
      triggerRef={triggerRef}
      placement="bottom"
      className="p-0 w-[calc(var(--trigger-width)+24px)]"
    >
      <Command items={available} onAction={(id) => add(id)}>
        <CommandInput
          placeholder={isMax ? "Maximum reached" : "Search..."}
          onValueChange={(val) => setInputValue(val)}
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
  );
}

const MultipleSelectItem = CommandItem;
const MultipleSelectSection = CommandGroup;

type MultipleSelectProps<T extends object> = MultipleSelectRootProps<T>;

function MultipleSelect<T extends object>(props: MultipleSelectProps<T>) {
  return (
    <MultipleSelectRoot {...props}>
      <MultipleSelectTrigger />
      <MultipleSelectContent />
    </MultipleSelectRoot>
  );
}

export {
  MultipleSelect,
  MultipleSelectRoot,
  MultipleSelectTrigger,
  MultipleSelectContent,
  MultipleSelectItem,
  MultipleSelectSection,
};
