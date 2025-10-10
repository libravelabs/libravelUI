"use client"

import * as React from "react";
import {
  Autocomplete,
  Input,
  Menu,
  MenuItem,
  SearchField,
  useFilter,
  Text,
  MenuSection,
  Button,
  Header,
  Collection,
  type AutocompleteProps,
  type SeparatorProps,
  type TextProps,
  type MenuSectionProps,
  type MenuItemProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Shortcut, type ShortcutProps } from "@/components/ui/shortcut";

interface CommandContextValue {
  isEmpty: boolean;
  setIsEmpty: (empty: boolean) => void;

  items?: { id: string; label: string }[];
  onAction?: (key: string) => void;
}

const CommandContext = React.createContext<CommandContextValue | undefined>(
  undefined
);

function useCommandContext() {
  const context = React.useContext(CommandContext);
  if (!context)
    throw new Error("useCommandContext must be used within CommandProvider");
  return context;
}

function CommandProvider({
  children,
  items,
  onAction,
}: {
  children: React.ReactNode;
  items?: CommandContextValue["items"];
  onAction?: CommandContextValue["onAction"];
}) {
  const [isEmpty, setIsEmpty] = React.useState(false);

  return (
    <CommandContext.Provider value={{ isEmpty, setIsEmpty, items, onAction }}>
      {children}
    </CommandContext.Provider>
  );
}

interface CommandProps extends AutocompleteProps<object> {
  className?: string;
  items?: CommandContextValue["items"];
  onAction?: CommandContextValue["onAction"];
}

function Command({
  children,
  className,
  items,
  onAction,
  ...props
}: CommandProps) {
  const { contains } = useFilter({ sensitivity: "base" });
  const filter = (textValue: string, inputValue: string) =>
    contains(textValue, inputValue);

  return (
    <CommandProvider items={items} onAction={onAction}>
      <div
        className={cn(
          "bg-popover text-popover-foreground border border-border flex h-full w-full flex-col overflow-hidden rounded-md",
          className
        )}
      >
        <Autocomplete filter={filter} {...props}>
          {children}
        </Autocomplete>
      </div>
    </CommandProvider>
  );
}

interface CommandInputProps extends React.ComponentProps<typeof SearchField> {
  placeholder?: string;
  children?: React.ReactNode;
}

function CommandInput({
  className,
  placeholder = "Search item...",
  ...props
}: CommandInputProps) {
  return (
    <SearchField
      aria-label={props["aria-label"] || "search-field"}
      className="relative flex h-9 items-center gap-2 border-b px-3"
      {...props}
    >
      {({ isEmpty }) => (
        <>
          <Search className="size-4 shrink-0 opacity-50" />
          <Input
            className={cn(
              "placeholder:text-muted-foreground flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
              "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden",
              className
            )}
            placeholder={placeholder}
          />
          {!isEmpty && (
            <Button
              className="ms-auto rounded p-1 hover:bg-muted"
              aria-label="Clear selected item"
            >
              <X size={12} />
            </Button>
          )}
        </>
      )}
    </SearchField>
  );
}

function CommandList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Menu>) {
  const { items, onAction } = useCommandContext();

  return (
    <Menu
      items={items}
      aria-label={props["aria-label"] || "group"}
      onAction={onAction}
      renderEmptyState={() => <CommandEmpty />}
      className={cn(
        "max-h-96 scroll-py-1 overflow-x-hidden overflow-y-auto scrollbar-hidden p-1",
        className
      )}
      {...props}
    >
      {children}
    </Menu>
  );
}

function CommandGroup<T extends object>({
  className,
  ref,
  ...props
}: MenuSectionProps<T> & {
  title?: string;
  ref?: React.RefObject<HTMLDivElement>;
}) {
  return (
    <MenuSection
      ref={ref}
      aria-label={props.title || "group"}
      className={cn(
        "col-span-full flex flex-col content-start gap-y-px",
        className
      )}
      {...props}
    >
      {"title" in props && (
        <Header className="col-span-full my-px block truncate px-2 text-muted-foreground font-semibold text-xs">
          {props.title}
        </Header>
      )}
      <Collection aria-label={props.title || "group"} items={props.items}>
        {props.children}
      </Collection>
    </MenuSection>
  );
}

interface CommandItemProps extends MenuItemProps {
  variant?: "default" | "destructive";
}

function CommandItem({
  className,
  children,
  textValue,
  variant = "default",
  ...props
}: CommandItemProps) {
  const tv = textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <MenuItem
      textValue={tv}
      aria-label={tv || "item"}
      className={cn(
        "[&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "hover:bg-accent hover:text-accent-foreground hover:ps-3 transition-all ease-linear",
        props.isDisabled &&
          "opacity-50 pointer-events-none cursor-not-allowed hover:bg-transparent focus:outline-none",
        variant === "destructive"
          ? "text-destructive [&_svg]:!text-destructive focus:bg-destructive/10 dark:focus:bg-destructive/20 focus:text-destructive"
          : "focus:bg-accent focus:text-accent-foreground",
        className
      )}
      {...props}
    >
      {children}
    </MenuItem>
  );
}

function CommandEmpty({ ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="command-empty"
      className="py-6 text-center text-sm"
      {...props}
    >
      {props.children ?? "No results found."}
    </p>
  );
}

function CommandSeparator({ className, ...props }: SeparatorProps) {
  return (
    <Separator
      data-slot="command-separator"
      className={cn("my-2", className)}
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: ShortcutProps) {
  return (
    <Shortcut
      data-slot="command-shortcut"
      className={cn(
        "text-muted-foreground ms-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

interface CommandDescriptionProps extends TextProps {
  ref?: React.Ref<HTMLDivElement>;
}

function CommandDescription({
  className,
  ref,
  ...props
}: CommandDescriptionProps) {
  return (
    <Text
      slot="description"
      className={cn(
        "text-pretty text-base/6 text-muted-foreground group-disabled:opacity-50 sm:text-sm/6 ms-auto",
        className
      )}
      ref={ref}
      {...props}
    />
  );
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
  CommandShortcut,
  CommandDescription,
};
