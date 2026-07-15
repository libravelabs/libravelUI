import Link from "next/link";
import type { Metadata } from "next";
import { legalSource } from "@/lib/source";
import { removeExtension } from "@/lib/utils";
import { LegalCardHeader } from "./card-header";
import { AppName } from "@/components/app/logo";
import { LuArrowRight } from "react-icons/lu";

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
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-16 sm:px-8 lg:px-12">
      <LegalCardHeader
        circleGradient={false}
        header={
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-8">
              <AppName variant="text" className="text-sm my-0" />
              <span className="text-[10px] font-mono uppercase tracking-wider opacity-50">
                Official Directory
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight mt-0 mb-4">
              Legal Information
            </h1>

            <p className="max-w-3xl text-sm leading-relaxed text-justify opacity-80 font-serif my-0">
              These pages describe how LibravelUI and Libravelabs operate the
              product, how information is handled, and the rules for using the
              open-source components and any premium resources.
            </p>
          </div>
        }
      >
        <div className="flex flex-col border-t divide-y">
          {sections.map((item) => (
            <Link
              key={item.$id}
              href={`/legal/${removeExtension(item.$id as string)}`}
              className="flex justify-between items-center py-4 hover:underline group"
            >
              <span className="font-serif font-medium tracking-wide">
                {item.name}
              </span>

              <span className="inline-flex items-center gap-2 text-xs font-mono opacity-40 group-hover:opacity-100 transition-opacity">
                Review Document <LuArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </LegalCardHeader>
    </div>
  );
}
