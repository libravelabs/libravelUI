"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/core/pagination";

export default function Elipsis() {
  const [currentPage, setCurrentPage] = useState(5);
  const totalPages = 20;

  const getVisiblePages = () => {
    const delta = 2;
    const rangeWithDots: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    rangeWithDots.push(1);

    let startPage = Math.max(2, currentPage - delta);
    let endPage = Math.min(totalPages - 1, currentPage + delta);

    if (currentPage === 1) {
      endPage = Math.min(totalPages - 1, 1 + delta * 2);
    } else if (currentPage === totalPages) {
      startPage = Math.max(2, totalPages - delta * 2);
    } else {
      startPage = Math.max(2, Math.min(startPage, currentPage));
      endPage = Math.min(totalPages - 1, Math.max(endPage, currentPage));
    }

    if (startPage > 2) {
      rangeWithDots.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        rangeWithDots.push(i);
      }
    }

    if (endPage < totalPages - 1) {
      rangeWithDots.push("...");
    }

    if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <Pagination className="flex-wrap min-w-fit">
      <PaginationPrevious
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />

      {getVisiblePages().map((page, index) =>
        page === "..." ? (
          <PaginationEllipsis key={`ellipsis-${index}`} />
        ) : (
          <PaginationItem
            key={page}
            isActive={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PaginationItem>
        )
      )}

      <PaginationNext
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
