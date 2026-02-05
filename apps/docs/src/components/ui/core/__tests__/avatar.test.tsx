import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Avatar } from "../avatar";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Avatar", () => {
  it("renders image", () => {
    render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByRole("img", { name: "User Avatar" });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("renders initials", () => {
    render(<Avatar initials="JD" alt="John Doe" />);
    expect(screen.getByText("JD")).toBeInTheDocument();
    expect(screen.getByTitle("John Doe")).toBeInTheDocument();
  });

  it("renders both image and initials (image should be on top usually, but both rendered)", () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        initials="JD"
        alt="John Doe"
      />,
    );
    expect(screen.getByRole("img", { name: "John Doe" })).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument();
  });
});
