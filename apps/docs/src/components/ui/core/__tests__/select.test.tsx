import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Select } from "../select";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock pointer capture methods
Element.prototype.setPointerCapture = vi.fn();
Element.prototype.releasePointerCapture = vi.fn();
Element.prototype.hasPointerCapture = vi.fn();

describe("Select", () => {
  const items = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];

  it("renders correctly with placeholder", () => {
    render(<Select items={items} placeholder="Select an option" />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("opens the menu when clicked", async () => {
    const user = userEvent.setup();
    render(<Select items={items} placeholder="Select an option" />);
    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeInTheDocument();
    expect(within(listbox).getByText("Option 1")).toBeInTheDocument();
  });

  it("selects an option", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(<Select items={items} onSelectionChange={onSelectionChange} />);

    const trigger = screen.getByRole("button");
    await user.click(trigger);

    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("Option 2");
    await user.click(option);

    expect(onSelectionChange).toHaveBeenCalledWith(2);
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  it("shows label if provided", () => {
    render(<Select items={items} label="Choose Item" />);
    expect(screen.getByText("Choose Item")).toBeInTheDocument();
  });
});
