"use client";

import * as React from "react";
import {
  Button,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Select as SelectPrimitive,
  SelectValue,
  Header,
  Collection,
} from "react-aria-components";
import type {
  ButtonProps,
  Key,
  SelectProps as SelectPrimitiveProps,
  PopoverProps,
  ListBoxProps,
} from "react-aria-components";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  PopoverContent,
  type PopoverContentProps,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { FieldError, type FieldErrorProps } from "@/components/ui/field";

interface SelectContextType {
  value: Key;
  setValue: (val: Key) => void;
  clear: () => void;
  isOpen: PopoverProps["isOpen"];
  setIsOpen: PopoverProps["onOpenChange"];
  error?: FieldErrorProps;
}

const SelectContext = React.createContext<SelectContextType | null>(null);

function useSelectContext() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used within SelectRoot");
  return ctx;
}

type SelectRootProps = SelectPrimitiveProps & {
  defaultValue?: string;
  label?: string;
  error?: FieldErrorProps;
};

function SelectRoot({
  defaultValue = "",
  label,
  error,
  ...props
}: SelectRootProps) {
  const [value, setValue] = React.useState<Key>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);

  const clear = () => setValue("");

  return (
    <SelectContext.Provider
      value={{ value, setValue, clear, isOpen, setIsOpen, error }}
    >
      <div>
        {label && <Label className="mb-1">{label}</Label>}
        <SelectPrimitive
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          aria-label={props["aria-label"] ?? "select"}
          selectedKey={value}
          onSelectionChange={setValue}
          {...props}
        >
          {props.children}
        </SelectPrimitive>
      </div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps extends ButtonProps {
  label?: string;
  placeholder?: string;
}

function SelectTrigger({
  className,
  label,
  placeholder,
  hideClear = false,
  ...props
}: SelectTriggerProps & {
  hideClear?: boolean;
}) {
  const { isOpen, value, setValue, error } = useSelectContext();

  return (
    <>
      {label && <Label>{label}</Label>}

      <Button
        {...props}
        data-state={isOpen}
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground hover:opacity-70 transition ease-linear [&_svg:not([class*='text-'])]:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs outline-none disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 truncate",
          error
            ? "border border-destructive inset-ring-destructive ring-3 ring-destructive/20 focus-within:inset-ring-destructive focus-within:ring-3 focus-within:ring-destructive/20"
            : "inset-ring inset-ring-input outline-hidden focus:inset-ring-ring/70 focus:ring-3 focus:ring-ring/20 data-[state=true]:inset-ring-ring/70 data-[state=true]:ring-3 data-[state=true]:ring-ring/20",
          "cursor-pointer disabled:cursor-not-allowed",
          className
        )}
      >
        <SelectValue
          data-slot="select-value"
          className="flex-1 truncate text-start data-placeholder:text-muted-foreground"
        >
          {({ defaultChildren, isPlaceholder }) =>
            isPlaceholder ? placeholder : defaultChildren
          }
        </SelectValue>

        <div className="flex items-center gap-2 shrink-0">
          {value !== "" && !hideClear && (
            <span
              onPointerDownCapture={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setValue("");
              }}
              className="rounded p-1 hover:bg-muted focus:outline-none"
              tabIndex={-1}
              aria-label="Clear selected item"
              role="button"
            >
              <X className="size-3" />
            </span>
          )}

          <ChevronsUpDown
            data-slot="chevron"
            className="-me-1 shrink-0 text-muted-foreground group-open/select:text-foreground group-disabled/select:opacity-50 sm:me-0"
          />
        </div>
      </Button>
      <FieldError message={error} className="mt-1" />
    </>
  );
}

interface SelectContentProps<T extends object> extends ListBoxProps<T> {
  popover?: PopoverContentProps;
}

function SelectContent<T extends object>({
  children,
  popover,
  className,
  ...props
}: SelectContentProps<T>) {
  return (
    <PopoverContent {...popover}>
      <ListBox
        className={cn(
          "bg-popover text-popover-foreground z-50 w-full max-h-96 overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md outline-hidden",
          className
        )}
        {...props}
      >
        {children}
      </ListBox>
    </PopoverContent>
  );
}

function SelectGroup({
  title,
  children,
  ...props
}: React.ComponentProps<typeof ListBoxSection> & {
  title?: string;
}) {
  return (
    <ListBoxSection data-slot="dropdown-menu-group" {...props}>
      {title && (
        <Header className="col-span-full px-2 py-2 font-medium text-muted-foreground/70 text-sm/6 sm:py-1.5 sm:text-xs/5">
          {title}
        </Header>
      )}
      <Collection>{children}</Collection>
    </ListBoxSection>
  );
}

function SelectItem({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof ListBoxItem> & {
  inset?: boolean;
  href?: string;
}) {
  const textValue =
    props.textValue || (typeof children === "string" ? children : undefined);

  return (
    <ListBoxItem
      data-slot="dropdown-menu-item"
      textValue={textValue}
      className={({ isDisabled, isSelected }) =>
        cn(
          "hover:bg-accent hover:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          isDisabled && "pointer-events-none opacity-50",
          isSelected && "[&_svg:not([data-slot='indicator'])]:hidden",
          inset && "ps-8",
          className
        )
      }
      {...props}
    >
      {(values) => (
        <>
          {values.isSelected && (
            <Check className="size-4" data-slot="indicator" />
          )}

          {typeof children === "function" ? children(values) : children}
        </>
      )}
    </ListBoxItem>
  );
}

function SelectLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof Label> & {
  inset?: boolean;
}) {
  return (
    <Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn("text-sm font-medium data-[inset]:ps-8", className)}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border shrink-0 h-px w-full -mx-1 my-1", className)}
      {...props}
    />
  );
}

function SelectHeader({
  className,
  separator = false,
  ...props
}: React.ComponentProps<typeof Header> & {
  separator?: boolean;
}) {
  return (
    <Header
      className={cn(
        "col-span-full px-2.5 py-2 font-semibold text-base sm:text-sm",
        separator && "-mx-1 mb-1 border-b sm:px-3 sm:pb-[0.625rem]",
        className
      )}
      {...props}
    />
  );
}

type SelectProps = SelectPrimitiveProps & {
  placeholder?: string;
  label?: string;
  id?: string | number;
  hideClear?: boolean;
  classNames?: {
    root?: string | string[];
    trigger?: string | string[];
    content?: string | string[];
    item?: string | string[];
  };
  items: {
    label: string;
    id: string | number | boolean;
  }[];
};

function Select({
  items,
  placeholder,
  hideClear = false,
  classNames,
  ...props
}: SelectProps) {
  return (
    <SelectRoot {...props} className={cn(classNames?.root)}>
      <SelectTrigger
        placeholder={placeholder}
        hideClear={hideClear}
        className={cn(classNames?.trigger)}
      />
      <SelectContent items={items} className={cn(classNames?.content)}>
        {(item) => (
          <SelectItem key={item.id} className={cn(classNames?.item)}>
            {item.label}
          </SelectItem>
        )}
      </SelectContent>
    </SelectRoot>
  );
}

export {
  Select,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
  SelectHeader,
};
