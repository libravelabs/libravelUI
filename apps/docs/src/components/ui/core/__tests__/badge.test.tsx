import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders correctly with children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders as a span by default", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New").tagName).toBe("SPAN");
  });

  it("applies custom className", () => {
    render(<Badge className="custom-class">New</Badge>);
    expect(screen.getByText("New")).toHaveClass("custom-class");
  });

  it("renders with different tones", () => {
    const { rerender } = render(<Badge tone="primary">Primary</Badge>);
    expect(screen.getByText("Primary")).toHaveClass("bg-primary");

    rerender(<Badge tone="secondary">Secondary</Badge>);
    expect(screen.getByText("Secondary")).toHaveClass("bg-secondary");
  });
});
