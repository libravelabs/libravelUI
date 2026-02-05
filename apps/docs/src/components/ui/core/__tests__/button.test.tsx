import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("renders correctly with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("calls onPress when clicked", async () => {
    const onPress = vi.fn();
    render(<Button onPress={onPress}>Click me</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isDisabled prop is true", () => {
    render(<Button isDisabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows loading state when isLoading is true", () => {
    render(<Button isLoading>Action</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(
      screen.getByRole("button").querySelector('[data-slot="loader"]'),
    ).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Custom</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("renders differently when tone is unstyled", () => {
    render(<Button tone="unstyled">Unstyled</Button>);
    // Unstyled should not have the default buttonVariants classes
    expect(screen.getByRole("button")).not.toHaveClass("bg-primary");
  });
});
