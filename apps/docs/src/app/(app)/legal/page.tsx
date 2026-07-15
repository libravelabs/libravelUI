import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/core/button";
import { legalSource } from "@/lib/source";
import { removeExtension } from "@/lib/utils";
import { LegalCardHeader } from "./card-header";
import { AppName } from "@/components/app/logo";

export const metadata: Metadata = {
  title: {
    default: "Legal | LibravelUI",
    template: "%s | LibravelUI",
  },
  description:
    "Privacy policy and terms of service for LibravelUI, operated by Libravelabs.",
};

export default function LegalLayout() {
  const sections = legalSource.pageTree.children;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-16 sm:px-8 lg:px-12">
      <LegalCardHeader
        header={
          <>
            <AppName variant="text" className="text-lg" />
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Legal information
            </h1>
            <p className="max-w-3xl text-base leading-7">
              These pages describe how LibravelUI and Libravelabs operate the
              product, how information is handled, and the rules for using the
              open-source components and any premium resources.
            </p>
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          {sections.map((item) => (
            <Link
              key={item.$id}
              href={`/legal/${removeExtension(item.$id as string)}`}
              className="w-full sm:w-auto"
            >
              <Button radius="full" tone="secondary">
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </LegalCardHeader>
    </div>
  );
}
