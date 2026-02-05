import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Calendar } from "../calendar";
import { today, getLocalTimeZone } from "@internationalized/date";
import { I18nProvider } from "react-aria-components";

// Mock ResizeObserver for framer-motion/react-aria
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

vi.mock("motion/react", async () => {
  const actual = await vi.importActual("motion/react");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
      create: (Component: any) => (props: any) => <Component {...props} />,
    },
    useMotionValue: (v: any) => ({ get: () => v, set: () => {} }),
    animate: () => ({ stop: () => {} }),
  };
});

const renderWithLocale = (ui: React.ReactNode) => {
  return render(<I18nProvider locale="en-US">{ui}</I18nProvider>);
};

describe("Calendar", () => {
  it("renders correctly", () => {
    renderWithLocale(<Calendar />);
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("displays the current month by default", async () => {
    renderWithLocale(<Calendar />);
    const now = today(getLocalTimeZone());
    const monthName = now
      .toDate(getLocalTimeZone())
      .toLocaleString("en-US", { month: "long" });
    const year = now.toDate(getLocalTimeZone()).getFullYear().toString();

    await waitFor(() => {
      // There might be multiple elements with the month name (e.g. animation clones), so we check if at least one exists
      const monthElements = screen.getAllByText(new RegExp(monthName, "i"));
      expect(monthElements.length).toBeGreaterThan(0);
      expect(monthElements[0]).toBeInTheDocument();

      const yearElements = screen.getAllByText(new RegExp(year));
      expect(yearElements.length).toBeGreaterThan(0);
      expect(yearElements[0]).toBeInTheDocument();
    });
  });

  it("navigates to the next month", async () => {
    renderWithLocale(<Calendar />);
    // There might be hidden buttons for accessibility, so we get all and pick the first visible one or just the first one
    const nextButtons = screen.getAllByRole("button", { name: /next/i });
    const nextButton = nextButtons[0];
    await userEvent.click(nextButton);

    const now = today(getLocalTimeZone());
    const nextMonth = now.add({ months: 1 });
    const nextMonthName = nextMonth
      .toDate(getLocalTimeZone())
      .toLocaleString("en-US", { month: "long" });

    await waitFor(() => {
      const nextMonthElements = screen.getAllByText(
        new RegExp(nextMonthName, "i"),
      );
      expect(nextMonthElements.length).toBeGreaterThan(0);
      expect(nextMonthElements[0]).toBeInTheDocument();
    });
  });

  it("selects a date", async () => {
    const onChange = vi.fn();
    renderWithLocale(<Calendar onChange={onChange} />);

    // Find a date cell. Let's pick the 15th of the current month to be safe it exists
    const day15 = screen.getByRole("button", { name: /15/i });
    await userEvent.click(day15);

    expect(onChange).toHaveBeenCalled();
  });

  it("renders in select mode", () => {
    renderWithLocale(<Calendar selectMode />);
    // In select mode, we expect dropdowns (comboboxes or buttons) for month/year
    expect(screen.getByLabelText(/select month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/select year/i)).toBeInTheDocument();
  });
});
