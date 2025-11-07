import { X } from "lucide-react";
import type {
  TagGroupProps as TagGroupPrimitiveProps,
  TagListProps,
  TagProps,
} from "react-aria-components";
import {
  Button,
  composeRenderProps,
  TagGroup as TagGroupPrimitive,
  TagList as TagListPrimitive,
  Tag as TagPrimitive,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/render-props";
import { Description, Label } from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface TagGroupProps extends TagGroupPrimitiveProps {
  errorMessage?: string;
  label?: string;
  description?: string;
  ref?: React.RefObject<HTMLDivElement>;
}

function TagGroup({ children, ref, className, ...props }: TagGroupProps) {
  return (
    <TagGroupPrimitive
      ref={ref}
      className={cn("flex flex-col flex-wrap", className)}
      aria-label={props.label || "tag-group"}
      {...props}
    >
      {props.label && <Label className="mb-1">{props.label}</Label>}
      {children}
      {props.description && <Description>{props.description}</Description>}
    </TagGroupPrimitive>
  );
}

function TagList<T extends object>({ className, ...props }: TagListProps<T>) {
  return (
    <TagListPrimitive
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-wrap gap-1")}
    />
  );
}

function Tag({ className, children, ...props }: TagProps) {
  const textValue = typeof children === "string" ? children : undefined;

  return (
    <TagPrimitive
      textValue={textValue}
      {...props}
      className={composeRenderProps(
        className,
        (
          className,
          { isFocusVisible, isSelected, isDisabled, allowsRemoving }
        ) =>
          cn(
            "inset-ring inset-ring-border inline-flex cursor-default items-center gap-2 rounded-full px-2 py-0.5 font-medium text-sm/5 outline-hidden sm:text-xs/5 forced-colors:outline",
            isSelected &&
              "inset-ring-primary bg-primary/20 border-primary text-primary focus-visible:bg-primary/40",
            isFocusVisible &&
              "inset-ring inset-ring-current/10 bg-secondary text-secondary-foreground",
            isDisabled && "opacity-50",
            allowsRemoving && "pe-2",
            className
          )
      )}
    >
      {({ allowsRemoving, isSelected }) => (
        <>
          {children}
          {allowsRemoving && (
            <Button
              slot="remove"
              className={cn(
                "-mx-0.5 grid size-3.5 shrink-0 place-content-center rounded-full outline-hidden hover:opacity-70 bg-muted",
                isSelected && "bg-primary"
              )}
            >
              <X
                data-slot="close"
                className={cn(
                  "size-3 text-muted-foreground",
                  isSelected && "text-primary-foreground"
                )}
              />
            </Button>
          )}
        </>
      )}
    </TagPrimitive>
  );
}

export type { TagGroupProps, TagListProps };
export { Tag, TagList, TagGroup };
