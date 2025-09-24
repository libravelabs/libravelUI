"use client";

import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon, X } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FieldError, type FieldErrorProps } from "./field";

interface ComboboxProps {
  items: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  hideClear?: boolean;
  value?: string;
  onSelect?: (value: string) => void;
  classNames?: {
    trigger?: string;
    popover?: string;
  };
  error?: FieldErrorProps;
}

function Combobox({
  items,
  placeholder = "Select item...",
  hideClear = false,
  error,
  ...props
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState<string>("");

  const selectedValue = props.value ?? value;

  const handleSelect = (key: React.Key) => {
    const newValue = key === selectedValue ? "" : String(key);
    props.onSelect?.(newValue);
    setValue(newValue);
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
      <div className="grid gap-1">
        <PopoverTrigger asButton>
          <div
            role="combobox"
            data-state={isOpen}
            className={cn(
              "min-w-72 border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              "hover:bg-muted/50",
              error
                ? "border border-destructive inset-ring-destructive ring-3 ring-destructive/20 focus-within:inset-ring-destructive focus-within:ring-3 focus-within:ring-destructive/20"
                : "inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 data-[state=true]:inset-ring-ring/70 data-[state=true]:ring-3 data-[state=true]:ring-ring/20",
              "cursor-pointer disabled:cursor-not-allowed",
              props.classNames?.trigger
            )}
          >
            {selectedValue ? (
              items.find((item) => item.value === selectedValue)?.label
            ) : (
              <span className="opacity-60">{placeholder}</span>
            )}

            {selectedValue !== "" && !hideClear && (
              <span
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  props.onSelect?.("");
                  setValue("");
                }}
                className="ms-auto rounded p-1 hover:bg-muted"
                tabIndex={-1}
                aria-label="Clear selected item"
              >
                <X className="size-3" />
              </span>
            )}
            <ChevronsUpDownIcon className="h-4 w-4 shrink-0 opacity-50" />
          </div>
        </PopoverTrigger>
        <FieldError message={error} />
      </div>

      <PopoverContent className={cn("w-72 p-0", props.classNames?.popover)}>
        <Command items={items} onAction={handleSelect}>
          <CommandInput placeholder="Search item..." autoFocus />
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  id={item.value}
                  textValue={item.label || item.value}
                >
                  <CheckIcon
                    className={cn(
                      "me-2 h-4 w-4",
                      value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };

export type { ComboboxProps };
