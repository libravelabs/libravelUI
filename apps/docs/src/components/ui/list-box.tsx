"use client";

import { Check } from "lucide-react";
import {
  Collection as CollectionPrimitive,
  Header as HeaderPrimitive,
  ListBox as ListBoxPrimitive,
  ListBoxItem as ListBoxItemPrimitive,
  type ListBoxItemProps as ListBoxItemPrimitiveProps,
  type ListBoxProps as ListBoxPrimitiveProps,
  ListBoxSection as ListBoxPrimitiveSection,
  composeRenderProps,
} from "react-aria-components";

import { cn } from "@/lib/utils";

const ListBoxSection = ListBoxPrimitiveSection;

const ListBoxCollection = CollectionPrimitive;

function ListBox<T extends object>({
  className,
  ...props
}: ListBoxPrimitiveProps<T>) {
  return (
    <ListBoxPrimitive
      className={composeRenderProps(className, (className) =>
        cn(
          className,
          "group overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md outline-none",
          /* Empty */
          "data-[empty]:p-6 data-[empty]:text-center data-[empty]:text-sm"
        )
      )}
      {...props}
    />
  );
}

function ListBoxItem<T extends object>({
  className,
  children,
  ...props
}: ListBoxItemPrimitiveProps<T>) {
  return (
    <ListBoxItemPrimitive
      textValue={
        props.textValue || (typeof children === "string" ? children : undefined)
      }
      className={composeRenderProps(className, (className) =>
        cn(
          "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
          "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          "data-[focused]:bg-accent data-[focused]:text-accent-foreground",
          "data-[hovered]:bg-accent data-[hovered]:text-accent-foreground",
          "data-[selection-mode]:pl-8",
          className
        )
      )}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {renderProps.isSelected && (
            <span className="absolute left-2 flex size-4 items-center justify-center">
              <Check className="size-4" />
            </span>
          )}
          {children}
        </>
      ))}
    </ListBoxItemPrimitive>
  );
}

function ListBoxHeader({
  className,
  ...props
}: React.ComponentProps<typeof HeaderPrimitive>) {
  return (
    <HeaderPrimitive
      className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
      {...props}
    />
  );
}

export {
  ListBox,
  ListBoxItem,
  ListBoxHeader,
  ListBoxSection,
  ListBoxCollection,
};
