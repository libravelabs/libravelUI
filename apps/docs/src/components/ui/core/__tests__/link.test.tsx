import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { Link } from "../link";

describe("Link", () => {
  it("renders correctly with children", () => {
    render(<Link href="#test">Visit Us</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Visit Us");
    expect(link).toHaveAttribute("href", "#test");
  });

  it("calls onPress when clicked", async () => {
    const onPress = vi.fn();
    render(<Link onPress={onPress}>Click me</Link>);
    await userEvent.click(screen.getByRole("link"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("is disabled when isDisabled prop is true", () => {
    render(<Link isDisabled>Disabled</Link>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("aria-disabled", "true");
    expect(link).toHaveClass("cursor-not-allowed");
  });

  it("applies custom className", () => {
    render(<Link className="custom-link">Link</Link>);
    expect(screen.getByRole("link")).toHaveClass("custom-link");
  });
});
