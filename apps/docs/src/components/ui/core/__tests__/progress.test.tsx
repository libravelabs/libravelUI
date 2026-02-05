import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProgressBar, ProgressSpinner } from "../progress";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("ProgressBar", () => {
  it("renders correctly with value", () => {
    render(<ProgressBar label="Loading..." value={50} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "50",
    );
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders indeterminate state", () => {
    render(<ProgressBar label="Loading..." isIndeterminate />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow",
    );
  });
});

describe("ProgressSpinner", () => {
  it("renders correctly with value", () => {
    render(<ProgressSpinner label="Loading..." value={75} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "75",
    );
    expect(screen.getByText("75%")).toBeInTheDocument();
  });

  it("renders indeterminate state", () => {
    render(<ProgressSpinner label="Loading..." isIndeterminate />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("progressbar")).not.toHaveAttribute(
      "aria-valuenow",
    );
  });
});
