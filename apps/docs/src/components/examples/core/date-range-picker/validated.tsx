"use client";

import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button } from "@/components/ui/core/button";
import {
  DateRangePicker,
  DateRangePickerTrigger,
} from "@/components/ui/core/date-range-picker";
import { Form } from "@/components/ui/core/form";
import { toast } from "sonner";
import { FieldError, Label } from "@/components/ui/core/field";

export default function ValidatedDateRangePicker() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
          setIsLoading(false);
          toast.success("Notifications paused successfully.");
        }, 1500);
      }}
    >
      <DateRangePicker
        isRequired
        validate={(range) =>
          range?.end.compare(range.start) > 30
            ? "You can pause notifications for up to 30 days only."
            : null
        }
        minValue={today(getLocalTimeZone())}
        className="mb-4"
      >
        <Label>Pause Notifications Between</Label>
        <DateRangePickerTrigger />
        <FieldError />
      </DateRangePicker>

      <Button type="submit" isLoading={isLoading}>
        {isLoading ? "Saving..." : "Pause Notifications"}
      </Button>
    </Form>
  );
}
