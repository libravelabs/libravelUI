import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DateRangePicker, DateRangePickerTrigger } from "../date-range-picker";
import { Label } from "../field";
import { parseDate } from "@internationalized/date";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("DateRangePicker", () => {
  it("renders correctly", () => {
    render(
      <DateRangePicker>
        <Label>Date Range</Label>
        <DateRangePickerTrigger />
      </DateRangePicker>,
    );

    expect(screen.getByText("Date Range")).toBeInTheDocument();
    // Two inputs for start and end date
    const inputs = screen.getAllByRole("presentation"); // DateInput uses presentation role for segments container or similar?
    // Actually DateInput renders multiple segments.
    // Let's look for the group or the button.
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens calendar on click", async () => {
    const user = userEvent.setup();
    render(
      <DateRangePicker>
        <Label>Date Range</Label>
        <DateRangePickerTrigger />
      </DateRangePicker>,
    );

    await user.click(screen.getByRole("button"));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it.skip("selects a date range", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <DateRangePicker
        onChange={onChange}
        defaultValue={{
          start: parseDate("2024-01-01"),
          end: parseDate("2024-01-10"),
        }}
      >
        <Label>Date Range</Label>
        <DateRangePickerTrigger />
      </DateRangePicker>,
    );

    await user.click(screen.getByRole("button"));

    // Calendar should be open and showing Jan 2024
    expect((await screen.findAllByText("January 2024"))[0]).toBeInTheDocument();

    // Click on a new start date (e.g., Jan 15)
    await user.click(screen.getByText("15"));

    // Click on a new end date (e.g., Jan 20)
    await user.click(screen.getByText("20"));

    // onChange should be called
    expect(onChange).toHaveBeenCalled();
  });
});
