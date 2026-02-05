import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { RadioGroup, Radio } from "../radio-group";
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

describe("RadioGroup", () => {
  it("renders correctly", () => {
    render(
      <RadioGroup label="Favorite Pet">
        <Radio value="dogs">Dogs</Radio>
        <Radio value="cats">Cats</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup")).toBeInTheDocument();
    // Label is rendered inside RadioGroup, usually accessible via aria-labelledby
    // But we can check for text presence.
    expect(screen.getByText("Favorite Pet")).toBeInTheDocument();
    expect(screen.getByLabelText("Dogs")).toBeInTheDocument();
    expect(screen.getByLabelText("Cats")).toBeInTheDocument();
  });

  it("selects an option", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <RadioGroup label="Favorite Pet" onChange={onChange}>
        <Radio value="dogs">Dogs</Radio>
        <Radio value="cats">Cats</Radio>
      </RadioGroup>,
    );

    await user.click(screen.getByLabelText("Cats"));
    expect(onChange).toHaveBeenCalledWith("cats");
    expect(screen.getByLabelText("Cats")).toBeChecked();
    expect(screen.getByLabelText("Dogs")).not.toBeChecked();
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Favorite Pet" defaultValue="dogs">
        <Radio value="dogs">Dogs</Radio>
        <Radio value="cats">Cats</Radio>
      </RadioGroup>,
    );

    const dogs = screen.getByLabelText("Dogs");
    dogs.focus();
    expect(dogs).toBeChecked();

    await user.keyboard("{ArrowDown}");
    expect(screen.getByLabelText("Cats")).toBeChecked();

    await user.keyboard("{ArrowUp}");
    expect(screen.getByLabelText("Dogs")).toBeChecked();
  });
});
