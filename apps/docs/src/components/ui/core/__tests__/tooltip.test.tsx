import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tooltip, TooltipTrigger, TooltipContent } from "../tooltip";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Tooltip", () => {
  it.skip("renders correctly", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    expect(
      screen.getByRole("button", { name: "Hover me" }),
    ).toBeInTheDocument();
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    await user.hover(screen.getByRole("button", { name: "Hover me" }));

    // Tooltip might have a delay
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
    expect(screen.getByText("Tooltip text")).toBeInTheDocument();
  });

  it.skip("closes on unhover", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Hover me" });
    await user.hover(trigger);
    expect(await screen.findByRole("tooltip")).toBeInTheDocument();

    await user.unhover(trigger);
    await waitFor(() => {
      expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
  });

  it.skip("opens on focus", async () => {
    const user = userEvent.setup();
    render(
      <Tooltip delay={0}>
        <TooltipTrigger>Focus me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Focus me" });
    trigger.focus();

    expect(await screen.findByRole("tooltip")).toBeInTheDocument();
  });
});
