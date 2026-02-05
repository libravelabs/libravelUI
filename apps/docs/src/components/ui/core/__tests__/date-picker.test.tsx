import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { DatePicker, DatePickerTrigger } from "../date-picker";
import { Label } from "../field";
import { I18nProvider } from "react-aria-components";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock motion/react
vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("DatePicker", () => {
  it("renders correctly", () => {
    render(
      <I18nProvider locale="en-US">
        <DatePicker>
          <Label>Date</Label>
          <DatePickerTrigger />
        </DatePicker>
      </I18nProvider>,
    );

    expect(screen.getByText("Date")).toBeInTheDocument();
    // DateInput usually renders segments (month, day, year)
    // We can check for the group or specific segments if needed.
    // Or just check that the button (trigger) is there.
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens calendar on click", async () => {
    const user = userEvent.setup();
    render(
      <I18nProvider locale="en-US">
        <DatePicker>
          <Label>Date</Label>
          <DatePickerTrigger />
        </DatePicker>
      </I18nProvider>,
    );

    const button = screen.getByRole("button");
    await user.click(button);

    // Expect dialog/calendar to appear
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("selects a date", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <I18nProvider locale="en-US">
        <DatePicker onChange={onChange}>
          <Label>Date</Label>
          <DatePickerTrigger />
        </DatePicker>
      </I18nProvider>,
    );

    // Open calendar
    await user.click(screen.getByRole("button"));

    // Find a date to click.
    // Calendar usually defaults to today.
    // Let's click a specific day if we can find it.
    // Or just click the "Next" button and then a day to be sure we are picking something valid.
    // But simpler is just to pick a day in the current view.
    // We can use `getAllByText` for a number like '15'.

    const day15 = (await screen.findAllByText("15"))[0];
    await user.click(day15);

    expect(onChange).toHaveBeenCalled();
  });
});
