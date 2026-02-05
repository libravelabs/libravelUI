import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RangeCalendar } from "../range-calendar";
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
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("RangeCalendar", () => {
  it("renders correctly", () => {
    render(
      <I18nProvider locale="en-US">
        <RangeCalendar />
      </I18nProvider>,
    );
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("selects a date range", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    // Use a fixed date to avoid issues with current month changing
    // But RangeCalendar uses `today` if no value provided.
    // Let's provide an initial year/month to be safe, or just rely on finding dates.
    // RangeCalendar prop: initialYear, initialMonth (custom props in this component)

    render(
      <I18nProvider locale="en-US">
        <RangeCalendar
          onChange={onChange}
          initialYear={2024}
          initialMonth={1}
        />
      </I18nProvider>,
    );

    // Wait for calendar to render
    await waitFor(() => {
      expect(screen.getAllByText("January 2024").length).toBeGreaterThan(0);
    });

    // Click start date (Jan 10)
    const day10 = screen.getAllByText("10")[0];
    await user.click(day10);

    // Click end date (Jan 15)
    const day15 = screen.getAllByText("15")[0];
    await user.click(day15);

    expect(onChange).toHaveBeenCalled();
  });

  it("displays error message", () => {
    render(
      <I18nProvider locale="en-US">
        <RangeCalendar error="Invalid selection" />
      </I18nProvider>,
    );
    expect(screen.getByText("Invalid selection")).toBeInTheDocument();
  });
});
