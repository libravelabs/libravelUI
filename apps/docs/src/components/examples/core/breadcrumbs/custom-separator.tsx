"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/core/breadcrumbs";
import { Slash } from "lucide-react";

export default function CustomSeparatorBreadcrumbs() {
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
