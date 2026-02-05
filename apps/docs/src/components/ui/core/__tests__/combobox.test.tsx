import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { ComboBox } from "../combobox";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("ComboBox", () => {
  const items = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Cherry" },
  ];

  it("renders correctly", () => {
    render(<ComboBox items={items} placeholder="Select fruit" />);
    expect(screen.getByPlaceholderText("Select fruit")).toBeInTheDocument();
  });

  it("opens menu and filters items", async () => {
    const user = userEvent.setup();
    render(<ComboBox items={items} />);

    const input = screen.getByRole("combobox");
    await user.type(input, "Ban");

    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeInTheDocument();

    // Should show Banana
    expect(within(listbox).getByText("Banana")).toBeInTheDocument();
    // Should not show Apple
    expect(within(listbox).queryByText("Apple")).not.toBeInTheDocument();
  });

  it("selects an item", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();
    render(<ComboBox items={items} onSelectionChange={onSelectionChange} />);

    const input = screen.getByRole("combobox");
    await user.click(input); // Open menu

    // Click chevron to open if clicking input doesn't open it (depends on implementation, RAC usually opens on input click/type)
    // Actually, ComboBoxInput has a PopoverTrigger with ChevronsUpDown.
    // But typing also opens it.
    // Let's try clicking the chevron to be sure.
    const chevron = screen.getByRole("button", { hidden: true }); // Chevron might be hidden or inside a button
    // Wait, the chevron is inside PopoverTrigger which renders a button?
    // In ComboBoxInput: <PopoverTrigger tone="unstyled"><ChevronsUpDown ... /></PopoverTrigger>
    // PopoverTrigger usually renders a button.

    // Let's just type to filter and select, which is the primary use case.
    await user.type(input, "Che");

    const listbox = await screen.findByRole("listbox");
    const option = within(listbox).getByText("Cherry");
    await user.click(option);

    expect(onSelectionChange).toHaveBeenCalledWith("3");
  });

  it("clears selection", async () => {
    const user = userEvent.setup();
    render(<ComboBox items={items} defaultValue="1" />);

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("Apple");

    // Clear button should be visible when value is present
    const clearButton = screen.getByRole("button", { name: /clear/i });
    await user.click(clearButton);

    expect(input).toHaveValue("");
  });
});
