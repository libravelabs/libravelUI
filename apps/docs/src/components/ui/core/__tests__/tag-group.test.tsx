import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { TagGroup, TagList, Tag } from "../tag-group";
import React from "react";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("TagGroup", () => {
  it("renders tags", () => {
    render(
      <TagGroup label="Categories">
        <TagList>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagList>
      </TagGroup>,
    );

    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("News")).toBeInTheDocument();
    expect(screen.getByText("Travel")).toBeInTheDocument();
  });

  it("supports selection", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <TagGroup
        label="Categories"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <TagList>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagList>
      </TagGroup>,
    );

    await user.click(screen.getByText("News"));
    // Set is a collection, so we check if it contains the id
    // The mock function receives a Set
    // expect(onSelectionChange).toHaveBeenCalledWith(new Set(['news']));
    // Vitest might have trouble comparing Sets directly if not careful.
    // Let's check the first call argument.
    const call = onSelectionChange.mock.calls[0][0];
    expect(call.has("news")).toBe(true);
  });

  it("supports removal", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    render(
      <TagGroup label="Categories" onRemove={onRemove}>
        <TagList>
          <Tag id="news">News</Tag>
          <Tag id="travel">Travel</Tag>
        </TagList>
      </TagGroup>,
    );

    // Find remove button for News
    // The remove button is inside the Tag.
    // We can look for the button inside the tag.
    // Or look for the X icon.
    // The button has slot="remove".

    // Let's try to find the button within the tag.
    // Since we don't have easy access to the tag container by role (it's a grid cell or similar),
    // we can try to find the remove button by class or icon.
    // The code uses <X data-slot="close" />

    // Let's try to click the first button found, which should be the remove button for News.
    const removeButtons = screen.getAllByRole("button");
    await user.click(removeButtons[0]);

    expect(onRemove).toHaveBeenCalledWith(new Set(["news"]));
  });
});
