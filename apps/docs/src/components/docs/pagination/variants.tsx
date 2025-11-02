"use client";

import { useState } from "react";
import { Select } from "@/components/ui/select";
import {
  Pagination,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  type PaginationVariantProps,
} from "@/components/ui/pagination";

export default function PaginationVariants() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;
  const [variant, setVariant] =
    useState<PaginationVariantProps["variant"]>("default");
  const [size, setSize] = useState<PaginationVariantProps["size"]>("default");
  const [radius, setRadius] = useState<PaginationVariantProps["radius"]>("md");
  const [spacing, setSpacing] =
    useState<PaginationVariantProps["spacing"]>("default");

  return (
    <div className="space-y-6 w-full min-h-72">
      <div className="flex flex-wrap gap-2">
        <Select
          items={[
            { id: "default", label: "Default" },
            { id: "outline", label: "Outline" },
            { id: "ghost", label: "Ghost" },
            { id: "secondary", label: "Secondary" },
            { id: "link", label: "Link" },
            { id: "underline", label: "Underline" },
          ]}
          selectedKey={variant}
          onSelectionChange={(key) =>
            setVariant(key as PaginationVariantProps["variant"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          label="Variant"
        />

        <Select
          items={[
            { id: "sm", label: "Small" },
            { id: "default", label: "Default" },
            { id: "lg", label: "Large" },
          ]}
          selectedKey={size}
          onSelectionChange={(key) =>
            setSize(key as PaginationVariantProps["size"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          label="Size"
        />

        <Select
          items={[
            { id: "none", label: "None" },
            { id: "sm", label: "Small" },
            { id: "md", label: "Medium" },
            { id: "lg", label: "Large" },
            { id: "full", label: "Full" },
          ]}
          selectedKey={radius}
          onSelectionChange={(key) =>
            setRadius(key as PaginationVariantProps["radius"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          label="Radius"
        />

        <Select
          items={[
            { id: "default", label: "Default" },
            { id: "compact", label: "Compact" },
          ]}
          selectedKey={spacing}
          onSelectionChange={(key) =>
            setSpacing(key as PaginationVariantProps["spacing"])
          }
          classNames={{ trigger: "min-w-32", content: "min-w-32" }}
          label="Spacing"
        />
      </div>

      <Pagination
        variant={variant}
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
    </div>
  );
}
