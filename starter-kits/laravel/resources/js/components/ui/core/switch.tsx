import {
  Switch as SwitchPrimitive,
  type SwitchProps as SwitchPrimitiveProps,
} from "react-aria-components";
import { composeTailwindRenderProps } from "@/lib/render-props";
import {
  Label,
  Description,
  type FieldProps,
} from "@/components/ui/core/field";
import { cn } from "@/lib/utils";

interface SwitchProps extends SwitchPrimitiveProps {
  ref?: React.RefObject<HTMLLabelElement>;
  label?: FieldProps["label"];
  description?: FieldProps["description"];
}

function Switch({
  children,
  className,
  ref,
  label,
  description,
  ...props
}: SwitchProps) {
  const hasChildren = !!children;

  return (
    <SwitchPrimitive
      data-slot="switch"
      ref={ref}
      {...props}
      className={composeTailwindRenderProps(
        className,
        cn(
          "group relative grid cursor-pointer grid-cols-[1fr_auto] gap-1 disabled:opacity-50",
          "*:data-[slot=indicator]:col-start-2",
          "*:data-[slot=label]:col-start-1 *:data-[slot=label]:row-start-1",
          "*:data-[slot=indicator]:self-start",
          "has-[[slot=description]]:**:data-[slot=label]:font-medium",
          "sm:*:data-[slot=indicator]:mt-0.5",
          "*:[[slot=description]]:col-start-1 *:[[slot=description]]:row-start-2",
          "*:cursor-pointer"
        )
      )}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {(values) => (
        <>
          <span
            data-slot="indicator"
            className={cn(
              "relative isolate inline-flex h-6 w-10 rounded-full p-[3px] sm:h-5 sm:w-8 transition duration-200 ease-in-out",
              "bg-secondary",
              "inset-ring inset-ring-foreground/5",
              "forced-colors:outline forced-colors:bg-[Highlight]",
              values.isHovered &&
                "inset-ring-foreground/15 dark:inset-ring-foreground/25",
              values.isFocusVisible &&
                "inset-ring-primary/70 selected:inset-ring-primary/30 bg-primary/20 ring-2 ring-primary/20",
              values.isSelected && "inset-ring-primary bg-primary",
              values.isDisabled &&
                "dark:group-disabled:bg-muted dark:group-disabled:group-selected:inset-ring-muted dark:group-disabled:group-selected:bg-primary"
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none relative inline-block size-4.5 translate-x-0 rounded-full border border-transparent bg-white shadow-sm ring ring-foreground/5 transition duration-200 ease-in-out sm:size-3.5",
                values.isSelected &&
                  "translate-x-4 shadow shadow-primary ring ring-primary group-disabled:shadow-sm group-disabled:ring-muted-foreground sm:translate-x-3"
              )}
            />
          </span>

          {hasChildren ? (
            typeof children === "function" ? (
              children(values)
            ) : typeof children === "string" ? (
              <Label>{children}</Label>
            ) : (
              children
            )
          ) : (
            <>
              {label && <Label>{label}</Label>}
              {description && <Description>{description}</Description>}
            </>
          )}
        </>
      )}
    </SwitchPrimitive>
  );
}

export type { SwitchProps };
export { Switch };
