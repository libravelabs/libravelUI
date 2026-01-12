"use client";

import { useState } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  type PaginationVariantProps,
} from "@/components/ui/core/pagination";

const tones: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "outline", label: "Outline" },
  { value: "ghost", label: "Ghost" },
  { value: "secondary", label: "Secondary" },
  { value: "link", label: "Link" },
  { value: "underline", label: "Underline" },
];

const sizes: { value: string; label: string }[] = [
  { value: "sm", label: "Small" },
  { value: "default", label: "Default" },
  { value: "lg", label: "Large" },
];

const radius: { value: string; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
];

const spacings: { value: string; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "compact", label: "Compact" },
];

export default function PaginationExample({
  tone = "default",
  size = "default",
  radius = "md",
  spacing = "default",
}: PaginationVariantProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
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

export const controls = {
  tone: {
    type: "select",
    options: tones,
    defaultValue: "default",
  },
  size: {
    type: "select",
    options: sizes,
    defaultValue: "default",
  },
  radius: {
    type: "select",
    options: radius,
    defaultValue: "md",
  },
  spacing: {
    type: "select",
    options: spacings,
    defaultValue: "default",
  },

  _meta: ["imports", tones, sizes, PaginationItem],
};
