"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Slash } from "lucide-react";

export function CustomSeparatorBreadcrumbsBase() {
  return (
    <Breadcrumb separator={<Slash />}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/movies">Movies</BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0361748">
        Inglourious Basterds
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0361748/detail">Detail</BreadcrumbItem>
    </Breadcrumb>
  );
}

export const CustomSeparatorBreadcrumbsCode = `"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Slash } from "lucide-react";

export function CustomSeparatorBreadcrumbs() {
  return (
    <Breadcrumb separator={<Slash />}>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/movies">Movies</BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0361748">
        Inglourious Basterds
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0361748/detail">Detail</BreadcrumbItem>
    </Breadcrumb>
  );
}
`;
