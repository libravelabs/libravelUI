import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Dock,
  DockTrigger,
  DockContent,
  DockHeader,
  DockTitle,
  DockBody,
} from "../dock";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Dock", () => {
  it("renders correctly", () => {
    render(
      <Dock>
        <DockTrigger>Open Dock</DockTrigger>
        <DockContent>
          <DockHeader>
            <DockTitle>Dock Title</DockTitle>
          </DockHeader>
          <DockBody>Content</DockBody>
        </DockContent>
      </Dock>,
    );
    expect(
      screen.getByRole("button", { name: "Open Dock" }),
    ).toBeInTheDocument();
  });

  it("opens when trigger is clicked", async () => {
    const user = userEvent.setup();
    render(
      <Dock>
        <DockTrigger>Open Dock</DockTrigger>
        <DockContent>
          <DockHeader>
            <DockTitle>Dock Title</DockTitle>
          </DockHeader>
          <DockBody>Content</DockBody>
        </DockContent>
      </Dock>,
    );

    const trigger = screen.getByRole("button", { name: "Open Dock" });
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
      expect(screen.getByText("Dock Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  it("shows close button by default", async () => {
    const user = userEvent.setup();
    render(
      <Dock>
        <DockTrigger>Open Dock</DockTrigger>
        <DockContent>Content</DockContent>
      </Dock>,
    );

    await user.click(screen.getByRole("button", { name: "Open Dock" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
    });
  });
});
