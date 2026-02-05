import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { FileTrigger } from "../file-trigger";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("FileTrigger", () => {
  it("renders correctly", () => {
    render(<FileTrigger>Upload</FileTrigger>);
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument();
    // FileTrigger renders a hidden input
    // We can't easily select it by role, but we can check if it exists in the container
    // or trust that FileTriggerPrimitive works.
  });

  it("handles file selection", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    const { container } = render(
      <FileTrigger onSelect={onSelect}>Upload</FileTrigger>,
    );

    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const input = container.querySelector('input[type="file"]');

    expect(input).toBeInTheDocument();
    if (input) {
      await user.upload(input, file);
      // onSelect should be called.
      // Note: react-aria might wrap the event.
      expect(onSelect).toHaveBeenCalled();
    }
  });
});
