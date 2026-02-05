import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { NumberField } from "../number-field";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("NumberField", () => {
  it("renders correctly", () => {
    render(<NumberField aria-label="Quantity" defaultValue={10} />);
    expect(screen.getByRole("textbox")).toHaveValue("10");
  });

  it.skip("increments and decrements", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <NumberField
        aria-label="Quantity"
        defaultValue={10}
        onChange={onChange}
      />,
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);

    // buttons[0] is decrement (startContent), buttons[1] is increment (endContent)
    const decrementBtn = buttons[0];
    const incrementBtn = buttons[1];

    await fireEvent.click(incrementBtn);
    expect(screen.getByRole("textbox")).toHaveValue("11");
    expect(onChange).toHaveBeenCalledWith(11);

    await fireEvent.click(decrementBtn);
    expect(screen.getByRole("textbox")).toHaveValue("10");
    expect(onChange).toHaveBeenCalledWith(10);
  });

  it("updates value on typing", async () => {
    const user = userEvent.setup();
    render(<NumberField aria-label="Quantity" defaultValue={10} />);

    const input = screen.getByRole("textbox");
    await user.clear(input);
    await user.type(input, "25");
    await user.keyboard("{Enter}"); // Commit value

    expect(input).toHaveValue("25");
  });
});
