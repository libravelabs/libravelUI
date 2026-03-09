"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
  PaginationInfo,
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
      <div
        className={cn(
          "flex items-center",
          spacing === "default" ? "sm:hidden gap-1" : "gap-0.5",
        )}
      >
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
        <PaginationInfo currentPage={currentPage} totalPages={totalPages} />
        <PaginationNext
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <span className="sr-only">Next</span>
        </PaginationNext>
        <PaginationLast
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        />
      </div>

      <div
        className={cn(
          "hidden items-center gap-1",
          spacing === "default" ? "sm:flex" : "hidden",
        )}
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
      </div>
    </Pagination>
  );
}
