"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  type PaginationVariantProps,
} from "@/components/ui/core/pagination";

export default function PaginationTones({
  tone = "default",
  size = "default",
  radius = "md",
  spacing = "default",
}: PaginationVariantProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  return (
    <Pagination
      tone={tone}
      size={size}
      radius={radius}
      spacing={spacing}
      className="mx-auto"
    >
      <PaginationPrevious
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationItem
          key={page}
          isActive={page === currentPage}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </PaginationItem>
      ))}
      <PaginationNext
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
