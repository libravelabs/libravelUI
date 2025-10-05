"use client";

import { Playground } from "@/components/playground";
import {
  BasicBreadcrumbsBase,
  BasicBreadcrumbsCode,
} from "./basic-breadcrumbs";
import {
  WithIconBreadcrumbsBase,
  WithIconBreadcrumbsCode,
} from "./with-icon-breadcrumbs";
import {
  CustomSeparatorBreadcrumbsBase,
  CustomSeparatorBreadcrumbsCode,
} from "./custom-separator-breadcrumbs";

export function BasicBreadcrumbs() {
  return (
    <Playground
      preview={<BasicBreadcrumbsBase />}
      code={BasicBreadcrumbsCode}
    />
  );
}

export function WithIconBreadcrumbs() {
  return (
    <Playground
      preview={<WithIconBreadcrumbsBase />}
      code={WithIconBreadcrumbsCode}
    />
  );
}

export function CustomSeparatorBreadcrumbs() {
  return (
    <Playground
      preview={<CustomSeparatorBreadcrumbsBase />}
      code={CustomSeparatorBreadcrumbsCode}
    />
  );
}
