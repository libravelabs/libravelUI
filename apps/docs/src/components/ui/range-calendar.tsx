"use client";

import * as React from "react";
import {
  RangeCalendar as RangeCalendarPrimitive,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  Label,
  useLocale,
  Heading,
  type DateValue,
  type RangeCalendarProps as RangeCalendarPrimitiveProps,
} from "react-aria-components";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/field";
import { CalendarGridHeader } from "@/components/ui/calendar";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { AnimatePresence, motion } from "motion/react";

interface RangeCalendarProps<T extends DateValue>
  extends RangeCalendarPrimitiveProps<T> {
  error?: string;
  className?: string;
  label?: string;
  initialYear?: number;
  initialMonth?: number;
  rangeDate?: { start: string; end: string };
}

function RangeCalendar<T extends DateValue>({
  error,
  className,
  visibleDuration = { months: 1 },
  label,
  initialYear,
  initialMonth,
  rangeDate,
  ...props
}: RangeCalendarProps<T>) {
  const [direction, setDirection] = React.useState<"left" | "right">("right");
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  function navigate(dir: "left" | "right") {
    setDirection(dir);
    setAnimationKey((prev) => prev + 1);
  }

  const initialFocused = React.useMemo(() => {
    if (initialYear && initialMonth) {
      return parseDate(
        `${initialYear}-${String(initialMonth).padStart(2, "0")}-01`
      );
    }
    return today(getLocalTimeZone());
  }, [initialYear, initialMonth]);

  const initialValue = React.useMemo(() => {
    if (rangeDate) {
      return {
        start: parseDate(rangeDate.start),
        end: parseDate(rangeDate.end),
      };
    }
    return undefined;
  }, [rangeDate]);

  const now = today(getLocalTimeZone());

  const slideVariants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      zIndex: 0,
      x: direction === "right" ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <RangeCalendarPrimitive
      {...props}
      defaultFocusedValue={initialFocused}
      defaultValue={initialValue}
      visibleDuration={visibleDuration}
      className={cn("grid gap-4", className)}
    >
      {label && <Label className="mx-auto text-sm font-medium">{label}</Label>}

      <RangeCalendarHeader
        navigate={navigate}
        animationKey={animationKey}
        isRange
      />

      <div className="relative overflow-hidden mx-auto">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={animationKey}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 500, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex snap-x items-start justify-stretch gap-6 overflow-auto sm:gap-10"
          >
            {Array.from({ length: visibleDuration.months ?? 1 }).map(
              (_, index) => (
                <CalendarGrid
                  key={index}
                  offset={index >= 1 ? { months: index } : undefined}
                  weekdayStyle="short"
                  className="mx-auto snap-start [&_td]:border-collapse [&_td]:px-0 [&_td]:py-0.5"
                >
                  <CalendarGridHeader />
                  <CalendarGridBody>
                    {(date) => {
                      const isToday = date.compare(now) === 0;

                      return (
                        <CalendarCell
                          date={date}
                          className={({
                            isSelected,
                            isDisabled,
                            isUnavailable,
                          }) =>
                            cn(
                              "inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-md text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer m-0.5",
                              "text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
                              isToday &&
                                "bg-accent text-accent-foreground font-semibold hover:bg-accent/80 focus-visible:ring-ring",
                              isSelected &&
                                "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring font-semibold",
                              isDisabled &&
                                "text-muted-foreground opacity-30 cursor-not-allowed",
                              isUnavailable &&
                                "text-destructive line-through pointer-events-none"
                            )
                          }
                        >
                          {({
                            formattedDate,
                            isSelected,
                            isSelectionStart,
                            isSelectionEnd,
                            isDisabled,
                          }) => (
                            <span
                              className={cn(
                                "flex size-full items-center justify-center rounded-lg tabular-nums forced-color-adjust-none transition-all duration-200",
                                isSelected &&
                                  (isSelectionStart || isSelectionEnd)
                                  ? "bg-primary text-primary-foreground group-invalid/calendar-cell:bg-destructive group-invalid/calendar-cell:text-destructive-foreground forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:group-invalid/calendar-cell:bg-[Mark]"
                                  : isSelected
                                  ? [
                                      "group-hover/calendar-cell:bg-primary/15 dark:group-hover/calendar-cell:bg-primary/20 forced-colors:group-hover/calendar-cell:bg-[Highlight]",
                                      "group-pressed/calendar-cell:bg-(--cell) forced-colors:text-[HighlightText] forced-colors:group-pressed/calendar-cell:bg-[Highlight]",
                                      "group-invalid/calendar-cell:group-hover/calendar-cell:bg-destructive/20 group-invalid/calendar-cell:group-pressed/calendar-cell:bg-destructive/30 forced-colors:group-invalid/calendar-cell:group-pressed/calendar-cell:bg-[Mark]",
                                      "group-invalid/calendar-cell:text-destructive forced-colors:group-invalid:group-hover/calendar-cell:bg-[Mark]",
                                    ]
                                  : "group-hover/calendar-cell:bg-secondary-foreground/15 group-pressed/calendar-cell:bg-secondary-foreground/20 forced-colors:group-pressed/calendar-cell:bg-[Highlight]",
                                isDisabled &&
                                  "opacity-50 forced-colors:text-[GrayText]"
                              )}
                            >
                              {formattedDate}
                            </span>
                          )}
                        </CalendarCell>
                      );
                    }}
                  </CalendarGridBody>
                </CalendarGrid>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {error && <FieldError slot="error" message={error} />}
    </RangeCalendarPrimitive>
  );
}

function RangeCalendarHeader({
  className,
  navigate,
  animationKey,
}: React.ComponentProps<"header"> & {
  canPick?: boolean;
  isRange?: boolean;
  animationKey: number;
  navigate: (direction: "left" | "right") => void;
}) {
  const { direction } = useLocale();

  return (
    <header
      className={cn(
        "flex w-full items-center justify-between gap-2",
        className
      )}
    >
      <Button
        size="icon"
        variant="ghost"
        slot="previous"
        onClick={() => navigate("left")}
        className="me-1"
      >
        {direction === "rtl" ? (
          <ChevronRight className="size-6" />
        ) : (
          <ChevronLeft className="size-6" />
        )}
      </Button>

      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          y: { type: "spring", stiffness: 500, damping: 30 },
          opacity: { duration: 1 },
        }}
        className="text-base sm:text-lg font-semibold text-foreground text-center px-2"
      >
        <Heading />
      </motion.div>

      <Button
        size="icon"
        variant="ghost"
        slot="next"
        onClick={() => navigate("right")}
        className="ms-1"
      >
        {direction === "rtl" ? (
          <ChevronLeft className="size-6" />
        ) : (
          <ChevronRight className="size-6" />
        )}
      </Button>
    </header>
  );
}

export type { RangeCalendarProps };
export { RangeCalendar };
