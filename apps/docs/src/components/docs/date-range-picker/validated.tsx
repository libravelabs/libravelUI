"use client";

import { useState } from "react";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";

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
        label="Pause Notifications Between"
        isRequired
        validate={(range) =>
          range?.end.compare(range.start) > 30
            ? "You can pause notifications for up to 30 days only."
            : null
        }
        minValue={today(getLocalTimeZone())}
        className="mb-4"
      />

      <Button type="submit" isLoading={isLoading}>
        {isLoading ? "Saving..." : "Pause Notifications"}
      </Button>
    </Form>
  );
}
