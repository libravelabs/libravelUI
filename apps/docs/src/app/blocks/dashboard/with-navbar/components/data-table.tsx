"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/core/table";
import { Autocomplete, AutocompleteStateContext } from "react-aria-components";
import { SearchBar } from "@/components/ui/core/search-bar";
import { Heading } from "@/components/ui/core/heading";
import { Description, Label } from "@/components/ui/core/field";
import {
  Pagination,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationInfo,
} from "@/components/ui/core/pagination";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/core/select";
import type { Product } from "../products";

const pageSizeOptions = [
  { id: "5", name: "5" },
  { id: "10", name: "10" },
  { id: "20", name: "20" },
  { id: "50", name: "50" },
  { id: "100", name: "100" },
];

function AutocompleteHighlight({ children }: { children: string }) {
  const state = React.useContext(AutocompleteStateContext);

  if (!state?.inputValue) {
    return children;
  }

  const index = children.toLowerCase().indexOf(state.inputValue.toLowerCase());

  if (index >= 0) {
    return (
      <>
        {children.slice(0, index)}
        <mark className="bg-primary text-primary-foreground">
          {children.slice(index, index + state.inputValue.length)}
        </mark>
        {children.slice(index + state.inputValue.length)}
      </>
    );
  }

  return children;
}

export function DataTable({ data }: { data: Product[] }) {
  const [search, setSearch] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const filteredData = React.useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return data;
    }

    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.sku.toLowerCase().includes(query)
      );
    });
  }, [data, search]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / pageSize));

  const paginatedData = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, pageSize]);

  React.useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const startItem =
    filteredData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endItem = Math.min(currentPage * pageSize, filteredData.length);

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4">
        <Heading level={4}>Products</Heading>

        <Description>
          Browse and search products by name, category, or SKU. Track inventory
          levels and pricing information in one place.
        </Description>
      </div>

      <Autocomplete inputValue={search} onInputChange={setSearch}>
        <div className="flex items-center justify-between gap-4">
          <SearchBar
            aria-label="Search products"
            placeholder="Search products..."
            value={search}
            onChange={setSearch}
          />
        </div>

        <Table className="mt-4" aria-label="Products">
          <TableHeader>
            <TableColumn className="w-0">#</TableColumn>
            <TableColumn isRowHeader>Product</TableColumn>
            <TableColumn>Category</TableColumn>
            <TableColumn>SKU</TableColumn>
            <TableColumn>Stock</TableColumn>
            <TableColumn>Price</TableColumn>
          </TableHeader>

          <TableBody items={paginatedData}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.id}</TableCell>

                <TableCell textValue={item.name}>
                  <AutocompleteHighlight>{item.name}</AutocompleteHighlight>
                </TableCell>

                <TableCell textValue={item.category}>
                  <AutocompleteHighlight>{item.category}</AutocompleteHighlight>
                </TableCell>

                <TableCell textValue={item.sku}>
                  <AutocompleteHighlight>{item.sku}</AutocompleteHighlight>
                </TableCell>

                <TableCell>{item.stock}</TableCell>

                <TableCell>${item.price.toFixed(2)}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between gap-4">
          <span className="text-sm text-muted-foreground">
            Showing {startItem}–{endItem} of {filteredData.length}
          </span>

          <div className="flex items-center gap-2">
            <SelectRoot
              aria-label="Rows per page"
              selectedKey={String(pageSize)}
              onSelectionChange={(key) => {
                if (key) {
                  setPageSize(Number(key));
                }
              }}
              className="flex gap-2 w-full min-w-52"
            >
              <Label className="w-full">Rows per page</Label>
              <SelectTrigger className="h-7" />
              <SelectContent items={pageSizeOptions}>
                {(item) => (
                  <SelectItem id={item.id} textValue={item.name}>
                    {item.name}
                  </SelectItem>
                )}
              </SelectContent>
            </SelectRoot>
            <Pagination tone="ghost" spacing="compact">
              <div className="flex items-center gap-0.5">
                <PaginationFirst
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                />

                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <span className="sr-only">Previous</span>
                </PaginationPrevious>

                <PaginationInfo
                  currentPage={currentPage}
                  totalPages={totalPages}
                />

                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  <span className="sr-only">Next</span>
                </PaginationNext>

                <PaginationLast
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </div>
            </Pagination>
          </div>
        </div>
      </Autocomplete>
    </div>
  );
}
