import Link from "next/link";
import { customMetaDataGenerator } from "@/lib/customMetaDataGenerator";
import { Button } from "@/components/ui/core/button";
import { ArrowRight } from "lucide-react";

export const metadata = customMetaDataGenerator({
  title: "LibravelUI",
});

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center items-center gap-4">
      <h1 className="text-2xl font-bold">LibravelUI</h1>
      <p className="text-fd-muted-foreground">
        Modern, responsive, customizable UI components. Copy, adapt, and
        personalize them.
      </p>
      <div className="flex items-center gap-4">
        <Link href="/docs">
          <Button>
            See Documentation <ArrowRight />
          </Button>
        </Link>
      </div>
    </main>
  );
}
