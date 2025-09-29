"use client";

import { Playground } from "@/components/playground";
import { Loader } from "@/components/ui/loader";
import { LoaderVariantsBase, LoaderVariantsCode } from "./loader-variants";
import { LoaderSizesBase, LoaderSizesCode } from "./loader-size";
import { LoaderColorsBase, LoaderColorsCode } from "./loader-colors";

export function BasicLoader() {
  return (
    <Playground
      preview={<Loader />}
      code={`"use client"

import { Loader } from "@/components/ui/loader"

export function BasicLoader() {
    return <Loader />
}`}
    />
  );
}

export function LoaderVariants() {
  return (
    <Playground preview={<LoaderVariantsBase />} code={LoaderVariantsCode} />
  );
}

export function LoaderSizes() {
  return <Playground preview={<LoaderSizesBase />} code={LoaderSizesCode} />;
}

export function LoaderColors() {
  return <Playground preview={<LoaderColorsBase />} code={LoaderColorsCode} />;
}
