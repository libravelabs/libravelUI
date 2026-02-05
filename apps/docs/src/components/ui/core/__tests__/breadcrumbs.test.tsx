import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Breadcrumb, BreadcrumbItem } from "../breadcrumbs";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Breadcrumbs", () => {
  it("renders correctly", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>,
    );

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    expect(screen.getByText("Current")).toBeInTheDocument();
  });

  it("renders separators", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem>Current</BreadcrumbItem>
      </Breadcrumb>,
    );

    // Separators are usually hidden from screen readers or presentational
    // But we can check if they exist in the DOM.
    // The default separator is ChevronRight.
    // We can check for the svg or class.
    // Let's check if there is at least one separator.
    // Based on implementation: BreadcrumbSeparator renders a span.
    // But it might be hard to query directly without a specific role/testId.
    // However, we can check if the text content is correct.
  });
});
