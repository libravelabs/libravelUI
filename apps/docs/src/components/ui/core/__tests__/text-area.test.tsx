import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Textarea } from "../text-area";
import { TextField } from "../text-field";
import { Label } from "../field";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Textarea", () => {
  it("renders correctly", () => {
    render(
      <TextField>
        <Label>Comment</Label>
        <Textarea />
      </TextField>,
    );

    expect(screen.getByLabelText("Comment")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("accepts input", async () => {
    const user = userEvent.setup();
    render(
      <TextField>
        <Label>Comment</Label>
        <Textarea />
      </TextField>,
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello world");
    expect(input).toHaveValue("Hello world");
  });
});
