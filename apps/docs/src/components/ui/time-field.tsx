import type {
  TimeFieldProps as TimeFieldPrimitiveProps,
  DateValue,
  ValidationResult,
} from "react-aria-components";
import {
  TimeField as TimeFieldPrimitive,
  DateInput,
  DateSegment,
} from "react-aria-components";
import {
  Input,
  type InputProps as InputPrimitiveProps,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type InputProps = Pick<
  InputPrimitiveProps,
  | "error"
  | "description"
  | "startContent"
  | "endContent"
  | "label"
  | "labelExtra"
  | "required"
  | "variant"
  | "size"
  | "classNames"
>;

interface TimeFieldProps<T extends DateValue>
  extends TimeFieldPrimitiveProps<T>,
    InputProps {
  errorMessage?: string | ((validation: ValidationResult) => string);
}

function TimeField<T extends DateValue>({
  errorMessage,
  ...props
}: TimeFieldProps<T>) {
  const {
    error,
    description,
    startContent,
    endContent,
    label,
    labelExtra,
    required,
    variant,
    size,
    classNames,
  } = props;

  const inputProps: InputProps = {
    error,
    description,
    startContent,
    endContent,
    label,
    labelExtra,
    required,
    variant,
    size,
    classNames,
  };

  return (
    <TimeFieldPrimitive
      aria-label={props["aria-label"] ?? "date-field"}
      {...props}
    >
      <Input
        as={DateInput}
        error={typeof errorMessage === "string" ? errorMessage : undefined}
        description={description}
        {...inputProps}
      >
        {(segment) => (
          <DateSegment
            segment={segment}
            className={cn(
              "inline shrink-0 rounded px-1.5 type-literal:px-0 text-foreground tracking-wider caret-transparent outline-0 forced-color-adjust-none data-placeholder:not-data-focused:text-muted-foreground sm:p-0.5 sm:py-0.5 sm:text-sm forced-colors:text-[ButtonText]",
              "focus:bg-accent focus:text-accent-foreground focus:data-invalid:bg-destructive focus:data-invalid:text-destructive-foreground forced-colors:focus:bg-[Highlight] forced-colors:focus:text-[HighlightText]",
              "disabled:opacity-50 forced-colors:disabled:text-[GrayText]"
            )}
          />
        )}
      </Input>
    </TimeFieldPrimitive>
  );
}

export { TimeField };
