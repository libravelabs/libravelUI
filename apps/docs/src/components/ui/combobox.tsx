"use client";

import * as React from "react";
import {
  ListBox,
  ListBoxItem,
  ListBoxSection,
  ComboBox as ComboBoxPrimitive,
  Header,
  Collection,
} from "react-aria-components";
import type {
  Key,
  ComboBoxProps as ComboBoxPrimitiveProps,
  PopoverProps,
  ListBoxProps,
} from "react-aria-components";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PopoverContent,
  PopoverTrigger,
  type PopoverContentProps,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Label, FieldProps, Input, InputProps } from "@/components/ui/field";

interface ComboBoxContextType {
  value: Key;
  setValue: (val: Key) => void;
  clear: () => void;
  isOpen: PopoverProps["isOpen"];
  setIsOpen: PopoverProps["onOpenChange"];
  error?: FieldProps["error"];
  triggerRef: React.RefObject<HTMLElement>;
}

const ComboBoxContext = React.createContext<ComboBoxContextType | null>(null);

function useComboBoxContext() {
  const ctx = React.useContext(ComboBoxContext);
  if (!ctx)
    throw new Error("ComboBox components must be used within ComboBoxRoot");
  return ctx;
}

type ComboBoxRootProps<T extends object> = ComboBoxPrimitiveProps<T> & {
  defaultValue?: string;
  label?: string;
  error?: FieldProps["error"];
};

function ComboBoxRoot<T extends object>({
  defaultValue = "",
  error,
  ...props
}: ComboBoxRootProps<T>) {
  const [value, setValue] = React.useState<Key>(defaultValue);
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<ComboBoxContextType["triggerRef"]>(null);

  const clear = () => setValue("");

  return (
    <ComboBoxContext.Provider
      value={{ value, setValue, clear, isOpen, setIsOpen, error, triggerRef }}
    >
      <div>
        <ComboBoxPrimitive
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          aria-label={props["aria-label"] ?? "combobox"}
          selectedKey={value}
          onSelectionChange={setValue}
          {...props}
        >
          {props.children}
        </ComboBoxPrimitive>
      </div>
    </ComboBoxContext.Provider>
  );
}

interface ComboBoxInputProps extends InputProps {
  label?: string;
  placeholder?: string;
}

function ComboBoxInput({
  className,
  label,
  placeholder,
  hideClear = false,
  ...props
}: ComboBoxInputProps & {
  hideClear?: boolean;
}) {
  const { value, clear, error, triggerRef } = useComboBoxContext();

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      className="flex items-center gap-2"
    >
      <Input
        {...props}
        placeholder={placeholder}
        label={label}
        error={error}
        className={cn("w-full min-w-3xs", className)}
        endContent={
          <div className="flex items-center gap-2 shrink-0">
            {value !== "" && !hideClear && (
              <span
                onPointerDownCapture={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  clear();
                }}
                className="rounded p-1 hover:bg-muted focus:outline-none"
                tabIndex={-1}
                aria-label="Clear selected item"
                role="button"
              >
                <X className="size-3" />
              </span>
            )}

            <PopoverTrigger plain>
              <ChevronsUpDown
                data-slot="chevron"
                className="-me-1 shrink-0 text-muted-foreground group-open/select:text-foreground group-disabled/select:opacity-50 sm:me-0 size-4"
              />
            </PopoverTrigger>
          </div>
        }
      />
    </div>
  );
}

interface ComboBoxContentProps<T extends object> extends ListBoxProps<T> {
  popover?: PopoverContentProps;
}

function ComboBoxContent<T extends object>({
  children,
  popover,
  className,
  ...props
}: ComboBoxContentProps<T>) {
  const { triggerRef } = useComboBoxContext();

  return (
    <PopoverContent {...popover} triggerRef={triggerRef} className="p-0">
      <ListBox
        {...props}
        className={cn(
          "bg-popover text-popover-foreground z-50 w-[calc(var(--trigger-width)+24px)] max-h-[30rem] overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md outline-hidden",
          className
        )}
      >
        {children}
      </ListBox>
    </PopoverContent>
  );
}

function ComboBoxGroup({
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

function ComboBoxItem({
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

function ComboBoxLabel({
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

function ComboBoxSeparator({
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

function ComboBoxHeader({
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

type ComboBoxProps<T extends object> = ComboBoxPrimitiveProps<T> & {
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

function ComboBox<T extends object>({
  items,
  placeholder,
  hideClear = false,
  classNames,
  ...props
}: ComboBoxProps<T>) {
  return (
    <ComboBoxRoot {...props} className={cn(classNames?.root)}>
      <ComboBoxInput
        placeholder={placeholder}
        hideClear={hideClear}
        className={cn(classNames?.trigger)}
      />
      <ComboBoxContent items={items} className={cn(classNames?.content)}>
        {items.map((item) => (
          <ComboBoxItem
            key={item.id as ComboBoxProps<T>["id"]}
            className={cn(classNames?.item)}
            textValue={item.label}
          >
            {item.label}
          </ComboBoxItem>
        ))}
      </ComboBoxContent>
    </ComboBoxRoot>
  );
}

export {
  ComboBox,
  ComboBoxRoot,
  ComboBoxInput,
  ComboBoxContent,
  ComboBoxItem,
  ComboBoxGroup,
  ComboBoxLabel,
  ComboBoxSeparator,
  ComboBoxHeader,
};
