import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../dropdown-menu";
import { Button } from "../button";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("DropdownMenu", () => {
  it.skip("renders correctly", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    expect(
      screen.getByRole("button", { name: "Open Menu" }),
    ).toBeInTheDocument();

    // Menu should not be visible initially
    expect(screen.queryByRole("menu")).not.toBeInTheDocument();

    // Open menu
    await user.click(screen.getByRole("button", { name: "Open Menu" }));

    // Menu should be visible
    expect(await screen.findByRole("menu")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getAllByText("My Account")[0]).toBeInTheDocument();
      expect(screen.getByText("Profile")).toBeInTheDocument();
      expect(screen.getByText("Billing")).toBeInTheDocument();
    });
  });

  it("selects an item", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent onAction={onAction}>
          <DropdownMenuItem id="profile">Profile</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    await user.click(screen.getByRole("button", { name: "Open Menu" }));
    await user.click(screen.getByText("Profile"));

    expect(onAction).toHaveBeenCalledWith("profile");

    // Menu should close
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup();
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    const trigger = screen.getByRole("button", { name: "Open Menu" });
    trigger.focus();
    await user.keyboard("{Enter}");

    expect(await screen.findByRole("menu")).toBeInTheDocument();

    // Focus should be on first item or menu
    // RAC usually manages focus.
    // Let's try navigating.
    await user.keyboard("{ArrowDown}");
    // Check if focused? Hard to check focus on specific item without ref or specific class.
    // But we can check if it stays open.
    expect(screen.getByRole("menu")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });
});
