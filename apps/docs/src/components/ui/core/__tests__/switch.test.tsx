import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { Switch } from "../switch";

describe("Switch", () => {
  it("renders correctly with label", () => {
    render(<Switch label="Dark Mode" />);
    expect(screen.getByLabelText("Dark Mode")).toBeInTheDocument();
  });

  it("can be toggled", async () => {
    render(<Switch label="Notifications" />);
    const sw = screen.getByLabelText("Notifications");

    expect(sw).not.toBeChecked();

    await userEvent.click(sw);
    expect(sw).toBeChecked();

    await userEvent.click(sw);
    expect(sw).not.toBeChecked();
  });

  it("shows description", () => {
    render(<Switch label="WiFi" description="Connect to wireless networks" />);
    expect(
      screen.getByText("Connect to wireless networks"),
    ).toBeInTheDocument();
  });

  it("is disabled when isDisabled prop is true", () => {
    render(<Switch label="Power" isDisabled />);
    expect(screen.getByLabelText("Power")).toBeDisabled();
  });
});
