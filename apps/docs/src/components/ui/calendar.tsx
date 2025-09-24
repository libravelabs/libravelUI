"use client";

import * as React from "react";
import {
  Calendar as CalendarPrimitive,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader as CalendarGridHeaderPrimitive,
  CalendarHeaderCell,
  CalendarStateContext,
  Heading,
  Text,
  useLocale,
} from "react-aria-components";
import type {
  CalendarProps as CalendarPrimitiveProps,
  CalendarState,
  DateValue,
} from "react-aria-components";
import { use, type ComponentProps } from "react";
import {
  today,
  getLocalTimeZone,
  type CalendarDate,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "./select";
import { AnimatePresence, motion } from "motion/react";

interface CalendarProps<T extends DateValue>
  extends Omit<CalendarPrimitiveProps<T>, "visibleDuration"> {
  errorMessage?: string;
  className?: string;
  canPick?: boolean;
}

function Calendar<T extends DateValue>({
  errorMessage,
  className,
  canPick = false,
  ...props
}: CalendarProps<T>) {
  const now = today(getLocalTimeZone());
  const [direction, setDirection] = React.useState<"left" | "right">("right");
  const [animationKey, setAnimationKey] = React.useState<number>(0);

  function navigate(dir: "left" | "right") {
    setDirection(dir);
    setAnimationKey((prev) => prev + 1);
  }

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
    <CalendarPrimitive
      data-slot="calendar"
      defaultValue={now}
      className={cn("grid gap-4 max-w-fit", className)}
      {...props}
    >
      <CalendarHeader navigate={navigate} canPick={canPick} />
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
            className="w-fit"
          >
            <CalendarGrid weekdayStyle="short">
              <CalendarGridHeader />
              <CalendarGridBody>
                {(date) => {
                  const isToday = date.compare(now) === 0;

                  return (
                    <CalendarCell
                      date={date}
                      className={({ isSelected, isDisabled, isUnavailable }) =>
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
                    />
                  );
                }}
              </CalendarGridBody>
            </CalendarGrid>
          </motion.div>
        </AnimatePresence>
      </div>

      {errorMessage && (
        <Text slot="errorMessage" className="text-destructive text-sm">
          {errorMessage}
        </Text>
      )}
    </CalendarPrimitive>
  );
}

function CalendarHeader({
  canPick,
  isRange,
  className,
  navigate,
}: ComponentProps<"header"> & {
  canPick?: boolean;
  isRange?: boolean;
  navigate: (direction: "left" | "right") => void;
}) {
  const { direction } = useLocale();
  const state = use(CalendarStateContext)!;

  const formatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const currentLabel = formatter.format(
    state.focusedDate.toDate(state.timeZone)
  );

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
      {canPick ? (
        <div className="flex items-center gap-1">
          <SelectMonth state={state} />
          <SelectYear state={state} />
        </div>
      ) : isRange ? (
        <Heading className="flex-1 text-center font-medium" />
      ) : (
        <motion.h2
          key={currentLabel}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            y: { type: "spring", stiffness: 500, damping: 30 },
            opacity: { duration: 1 },
          }}
          className="text-base sm:text-lg font-semibold text-foreground text-center px-2"
        >
          {currentLabel}
        </motion.h2>
      )}

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

function SelectMonth({ state }: { state: CalendarState }) {
  const formatter = useDateFormatter({
    month: "long",
    timeZone: state.timeZone,
  });

  const months = Array.from(
    { length: state.focusedDate.calendar.getMonthsInYear(state.focusedDate) },
    (_, i) => {
      const date = state.focusedDate.set({ month: i + 1 });
      return {
        key: String(i + 1),
        label: formatter.format(date.toDate(state.timeZone)),
      };
    }
  );

  return (
    <SelectRoot
      aria-label="Select month"
      selectedKey={String(state.focusedDate.month)}
      onSelectionChange={(key) => {
        state.setFocusedDate(state.focusedDate.set({ month: Number(key) }));
      }}
    >
      <SelectTrigger hideClear className="min-w-32 max-w-32" />
      <SelectContent>
        {months.map((month) => (
          <SelectItem key={month.key} id={month.key} textValue={month.label}>
            <SelectLabel>{month.label}</SelectLabel>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

function SelectYear({ state }: { state: CalendarState }) {
  const formatter = useDateFormatter({
    year: "numeric",
    timeZone: state.timeZone,
  });

  const selectedYear = state.focusedDate.year;
  const startYear = selectedYear - 100;
  const endYear = selectedYear + 100;

  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = startYear + i;
    const date = state.focusedDate.set({ year });
    return {
      key: String(year),
      value: date,
      label: formatter.format(date.toDate(state.timeZone)),
    };
  });

  return (
    <SelectRoot
      aria-label="Select year"
      selectedKey={String(selectedYear)}
      onSelectionChange={(key) => {
        const selected = years.find((y) => y.key === key);
        if (selected) {
          state.setFocusedDate(selected.value as CalendarDate);
        }
      }}
    >
      <SelectTrigger hideClear className="min-w-20" />
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year.key} id={year.key} textValue={year.label}>
            <SelectLabel>{year.label}</SelectLabel>
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}

function CalendarGridHeader() {
  return (
    <CalendarGridHeaderPrimitive>
      {(day) => (
        <CalendarHeaderCell className="text-center text-sm font-medium text-muted-foreground">
          {day.slice(0, 2)}
        </CalendarHeaderCell>
      )}
    </CalendarGridHeaderPrimitive>
  );
}

export type { CalendarProps };
export { Calendar, CalendarHeader, CalendarGridHeader };
