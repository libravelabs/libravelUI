import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock motion/react
vi.mock("motion/react", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
  MotionConfig: ({ children }: any) => <>{children}</>,
}));

describe("Accordion", () => {
  it("renders correctly", () => {
    render(
      <Accordion>
        <AccordionItem id="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    // Content should be hidden initially
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();
  });

  it("expands and collapses items", async () => {
    const user = userEvent.setup();
    render(
      <Accordion>
        <AccordionItem id="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByRole("button", { name: "Item 1" });

    // Initially collapsed
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Content 1")).not.toBeInTheDocument();

    await user.click(trigger);

    // Expanded
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    await user.click(trigger);

    // Collapsed
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    // Wait for animation/unmount?
    // With mocked AnimatePresence, it should unmount immediately.
    await waitFor(() => {
      expect(screen.queryByText("Content 1")).not.toBeInTheDocument();
    });
  });

  it("supports multiple expansion", async () => {
    const user = userEvent.setup();
    render(
      <Accordion multiple>
        <AccordionItem id="item-1">
          <AccordionTrigger>Item 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem id="item-2">
          <AccordionTrigger>Item 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger1 = screen.getByRole("button", { name: "Item 1" });
    const trigger2 = screen.getByRole("button", { name: "Item 2" });

    await user.click(trigger1);
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    await user.click(trigger2);
    expect(screen.getByText("Content 2")).toBeInTheDocument();
    // Content 1 should still be visible
    expect(screen.getByText("Content 1")).toBeInTheDocument();
  });
});
