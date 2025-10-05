"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Film, Home } from "lucide-react";

export function WithIconBreadcrumbsBase() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">
        <Home />
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies">
        <Film />
        Movies
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt7131622">
        Once Upon a Time in Hollywood
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt7131622/detail">Detail</BreadcrumbItem>
    </Breadcrumb>
  );
}

export const WithIconBreadcrumbsCode = `"use client";

import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Film, Home } from "lucide-react";

export function WithIconBreadcrumbs() {
  return (
    <Breadcrumb>
      <BreadcrumbItem href="/">
        <Home />
        Home
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies">
        <Film />
        Movies
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt7131622">
        Once Upon a Time in Hollywood
      </BreadcrumbItem>
      <BreadcrumbItem href="/movies/tt7131622/detail">Detail</BreadcrumbItem>
    </Breadcrumb>
  );
}
`;
