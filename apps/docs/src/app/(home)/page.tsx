import Link from "next/link";
import { Button } from "@/components/ui/core/button";
import { ArrowRight } from "lucide-react";
import { meta } from "@/lib/metadata/index";

export const metadata = meta.home();

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center text-center gap-4"></main>
  );
}
