import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Checkbox } from "../checkbox";

describe("Checkbox", () => {
  it("renders correctly with label", () => {
    render(<Checkbox label="Subscribe" />);
    expect(screen.getByLabelText("Subscribe")).toBeInTheDocument();
  });

  it("can be checked and unchecked", async () => {
    render(<Checkbox label="Terms" />);
    const checkbox = screen.getByLabelText("Terms");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it("shows description", () => {
    render(<Checkbox label="Newsletter" description="Weekly updates" />);
    expect(screen.getByText("Weekly updates")).toBeInTheDocument();
  });

  it("is disabled when isDisabled prop is true", () => {
    render(<Checkbox label="Locked" isDisabled />);
    expect(screen.getByLabelText("Locked")).toBeDisabled();
  });

  it("shows indeterminate state", () => {
    render(<Checkbox label="Partially" isIndeterminate />);
    const checkbox = screen.getByLabelText("Partially");
    expect(checkbox).toBePartiallyChecked();
  });
});
