import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "../table";

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe("Table", () => {
  const columns = [
    { name: "Name", id: "name", isRowHeader: true },
    { name: "Type", id: "type" },
    { name: "Date", id: "date" },
  ];

  const rows = [
    { id: 1, name: "Games", type: "File folder", date: "6/7/2020" },
    { id: 2, name: "Program Files", type: "File folder", date: "4/7/2021" },
    { id: 3, name: "bootmgr", type: "System file", date: "11/20/2010" },
  ];

  it("renders correctly with data", () => {
    render(
      <Table aria-label="Files">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn isRowHeader={column.isRowHeader}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow columns={columns}>
              {(column) => <TableCell>{(item as any)[column.id]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("grid")).toBeInTheDocument();
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("Program Files")).toBeInTheDocument();
    expect(screen.getByText("bootmgr")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(4); // 3 rows + 1 header
  });

  it("supports selection", async () => {
    const user = userEvent.setup();
    const onSelectionChange = vi.fn();

    render(
      <Table
        aria-label="Files"
        selectionMode="multiple"
        onSelectionChange={onSelectionChange}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn>{column.name}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow columns={columns}>
              {(column) => <TableCell>{(item as any)[column.id]}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>,
    );

    // Find checkboxes
    const checkboxes = screen.getAllByRole("checkbox");
    // First checkbox is usually "Select All" in header if implemented, or just row checkboxes.
    // RAC Table with selectionMode="multiple" usually adds checkboxes.
    // In table.tsx:
    // {selectionBehavior === "toggle" && ( ... <Checkbox slot="selection" /> ... )}
    // Default selectionBehavior is "toggle" for "multiple" selectionMode?
    // Let's check if checkboxes are present.

    expect(checkboxes.length).toBeGreaterThan(0);

    // Click first row checkbox
    // The first checkbox might be "Select All" in header.
    // Let's click the one in the first row.
    // We can scope to the row.
    const firstRow = screen.getAllByRole("row")[1]; // Index 1 is first data row
    const checkbox = within(firstRow).getByRole("checkbox");
    await user.click(checkbox);

    expect(onSelectionChange).toHaveBeenCalled();
  });
});
