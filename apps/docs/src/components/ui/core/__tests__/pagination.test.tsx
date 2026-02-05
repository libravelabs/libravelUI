import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../pagination";
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
  LayoutGroup: ({ children }: any) => <>{children}</>,
}));

describe("Pagination", () => {
  it("renders correctly", () => {
    render(
      <Pagination>
        <PaginationPrevious />
        <PaginationItem>1</PaginationItem>
        <PaginationItem isActive>2</PaginationItem>
        <PaginationItem>3</PaginationItem>
        <PaginationEllipsis />
        <PaginationNext />
      </Pagination>,
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("More pages")).toBeInTheDocument(); // sr-only text
  });

  it("highlights active item", () => {
    render(
      <Pagination>
        <PaginationItem isActive>1</PaginationItem>
        <PaginationItem>2</PaginationItem>
      </Pagination>,
    );

    const item1 = screen.getByText("1").closest("button");
    expect(item1).toHaveAttribute("aria-current", "page");
    expect(item1).toHaveAttribute("data-active", "true");

    const item2 = screen.getByText("2").closest("button");
    expect(item2).not.toHaveAttribute("aria-current");
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Pagination>
        <PaginationItem onClick={onClick}>1</PaginationItem>
      </Pagination>,
    );

    await user.click(screen.getByText("1"));
    expect(onClick).toHaveBeenCalled();
  });
});
