import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Tabs, TabList, TabTrigger, TabContent } from "../tabs";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Tabs", () => {
  it("renders correctly", () => {
    render(
      <Tabs>
        <TabList>
          <TabTrigger id="tab1">Tab 1</TabTrigger>
          <TabTrigger id="tab2">Tab 2</TabTrigger>
        </TabList>
        <TabContent id="tab1">Content 1</TabContent>
        <TabContent id="tab2">Content 2</TabContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
  });

  it("switches tabs", async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultSelectedKey="tab1">
        <TabList>
          <TabTrigger id="tab1">Tab 1</TabTrigger>
          <TabTrigger id="tab2">Tab 2</TabTrigger>
        </TabList>
        <TabContent id="tab1">Content 1</TabContent>
        <TabContent id="tab2">Content 2</TabContent>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("Content 1")).toBeInTheDocument();
    // Content 2 might be in the DOM but hidden, or not rendered. RAC usually renders only selected panel.
    expect(screen.queryByText("Content 2")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Tab 2" }));

    await waitFor(() => {
      expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
        "aria-selected",
        "true",
      );
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });
  });

  it("supports vertical orientation", () => {
    render(
      <Tabs orientation="vertical">
        <TabList>
          <TabTrigger id="tab1">Tab 1</TabTrigger>
        </TabList>
        <TabContent id="tab1">Content 1</TabContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist")).toHaveAttribute(
      "aria-orientation",
      "vertical",
    );
  });
});
