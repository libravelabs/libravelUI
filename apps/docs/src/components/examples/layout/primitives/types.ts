import type { ReactNode } from "react";

export type SectionType =
  | "hero"
  | "example"
  | "features"
  | "installation"
  | "anatomy"
  | "props"
  | "warning"
  | "related";

export type FeatureItem = {
  title: string;
  description: string;
  icon?: ReactNode;
};

export type CompProps = {
  name?: string;
  section?: string;
  packages?: string | string[];
};

export type SectionData = {
  type: SectionType;
  title?: string;
  description?: string;
  children?: ReactNode;
  features?: FeatureItem[];
  headerAction?: ReactNode;
  comp?: CompProps;
};
