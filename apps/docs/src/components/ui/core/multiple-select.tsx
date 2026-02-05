"use client";

import React, { useMemo, useRef, useState } from "react";
import type { AutocompleteProps } from "react-aria-components";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  type CommandProps,
} from "@/components/ui/core/command";
import { PopoverContent } from "@/components/ui/core/popover";
import { Tag, TagGroup, TagList } from "@/components/ui/core/tag-group";
import { cn } from "@/lib/utils";
import { ChevronsUpDown, X } from "lucide-react";
import {
  FieldError,
  type FieldProps,
  Label,
  Description,
} from "@/components/ui/core/field";

interface OptionBase {
  id: string | number;
  name?: string;
  label?: string;
  textValue?: string;
}

interface MultipleSelectProps<T extends OptionBase> {
  items: Array<T>;
  value?: Array<T["id"]>;
  onChange?: (value: Array<T["id"]>) => void;
  placeholder?: string;
  description?: string;
  className?: string;
  inputPlaceholder?: string;
  renderItem?: (item: T) => React.ReactNode;
  name?: string;
  autocompleteProps?: Partial<AutocompleteProps<object>>;
  error?: FieldProps["error"];
  label?: FieldProps["label"];
  maxItems?: number;
  isDisabled?: boolean;
}

function getLabel<T extends OptionBase>(it: T): string {
  return it?.name ?? it?.label ?? it?.textValue ?? String(it?.id ?? "");
}

function MultipleSelect<T extends OptionBase>({
  items,
  value,
  onChange,
  placeholder = "No selected items",
  description,
  className,
  inputPlaceholder = "Search...",
  renderItem,
  autocompleteProps,
  error,
  label,
  maxItems,
  isDisabled = false,
}: MultipleSelectProps<T>) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState<Array<T["id"]>>(() => value ?? []);
  const [triggerWidth, setTriggerWidth] = useState<number>(0);

  React.useEffect(() => {
    if (open && triggerRef.current) {
      const width = triggerRef.current.getBoundingClientRect().width;
      setTriggerWidth(width);
    }
  }, [open]);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternal(value);
    }
  }, [value]);

  const selectedMap = useMemo(() => {
    const s = new Set<string>();
    internal.forEach((v) => s.add(String(v)));
    return s;
  }, [internal]);

  const availableItems = useMemo(
    () => (items ?? []).filter((it) => !selectedMap.has(String(it.id))),
    [items, selectedMap],
  );

  const handleToggle = (key: string) => {
    const exists = internal.some((v) => String(v) === key);
    const next = exists
      ? internal.filter((v) => String(v) !== key)
      : [...internal, key as T["id"]];

    if (!exists && maxItems && next.length > maxItems) return;

    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleRemove = (keys: Set<React.Key>) => {
    const keyStrings = new Set(Array.from(keys).map(String));
    const next = internal.filter((v) => !keyStrings.has(String(v)));

    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const handleClearAll = () => {
    if (value === undefined) setInternal([]);
    onChange?.([]);
  };

  const selectedItems = useMemo(
    () => (items ?? []).filter((it) => selectedMap.has(String(it.id))),
    [items, selectedMap],
  );

  const atMax = !!maxItems && internal.length >= maxItems;

  return (
    <div className={cn("grid gap-2", className)}>
      {label && (
        <Label onClick={() => triggerRef.current?.focus()}>{label}</Label>
      )}
      <div
        ref={triggerRef}
        role="button"
        data-state={open}
        tabIndex={0}
        onClick={() => {
          if (!isDisabled) setOpen((s) => !s);
        }}
        className={cn(
          "max-w-72 w-full border-input data-placeholder:text-muted-foreground hover:opacity-70 transition ease-linear [&_svg:not([class*='text-'])]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 truncate",
          error
            ? "border border-destructive inset-ring-destructive ring-3 ring-destructive/20 focus-within:inset-ring-destructive focus-within:ring-3 focus-within:ring-destructive/20"
            : "inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 data-[state=true]:inset-ring-ring/70 data-[state=true]:ring-3 data-[state=true]:ring-ring/20",
          "cursor-pointer disabled:cursor-not-allowed",
          isDisabled && "opacity-60 pointer-events-none",
          className,
        )}
      >
        <div className="flex-1 min-w-0">
          <TagGroup aria-label="Selected items" onRemove={handleRemove}>
            <TagList
              items={selectedItems}
              renderEmptyState={() => (
                <i className="pl-1 text-muted-foreground text-sm">
                  {placeholder}
                </i>
              )}
            >
              {(item) => (
                <Tag className="rounded-md flex items-center gap-1 max-w-56">
                  <span className="truncate">{getLabel(item)}</span>
                </Tag>
              )}
            </TagList>
          </TagGroup>
        </div>
        {selectedItems.length > 0 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            className="text-muted-foreground hover:text-destructive transition"
          >
            <X className="size-4" />
          </button>
        )}
        <ChevronsUpDown />
      </div>
      {!error &&
        (() => {
          const text = atMax
            ? maxItems
              ? `Reached maximum items (${maxItems})`
              : ""
            : description || "";

          return text ? <Description>{text}</Description> : null;
        })()}

      {error && <FieldError message={error} />}

      <PopoverContent
        isOpen={open}
        onOpenChange={setOpen}
        triggerRef={triggerRef}
        placement="bottom"
        style={{ width: triggerWidth }}
        className="rounded-md p-0 w-(--trigger-width)"
      >
        <Command
          items={availableItems as CommandProps["items"]}
          onAction={(key) => handleToggle(String(key))}
          {...autocompleteProps}
        >
          <CommandInput placeholder={inputPlaceholder} autoFocus />
          <CommandList className="p-1">
            {availableItems.map((item) => (
              <CommandItem
                key={String(item.id)}
                id={String(item.id)}
                textValue={getLabel(item)}
                isDisabled={isDisabled || atMax}
                className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-sm text-sm hover:bg-accent/10"
              >
                <div className="truncate">
                  {renderItem ? renderItem(item as T) : getLabel(item)}
                </div>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </div>
  );
}

export type { OptionBase, MultipleSelectProps };
export { MultipleSelect };
