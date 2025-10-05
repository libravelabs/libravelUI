"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumbs";

export function BasicBreadcrumbsBase() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/movies">Movies</BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0407887">The Departed</BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0407887/detail">Detail</BreadcrumbItem>
    </Breadcrumb>
  );
}

export const BasicBreadcrumbsCode = `"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumbs";

export function BasicBreadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">Home</BreadcrumbItem>
      <BreadcrumbItem href="/movies">Movies</BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0407887">The Departed</BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt0407887/detail">Detail</BreadcrumbItem>
    </Breadcrumb>
  );
}
`;
