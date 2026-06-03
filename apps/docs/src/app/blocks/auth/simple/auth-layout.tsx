import Link from "next/link";
import { LibraryBig } from "lucide-react";
import type { PropsWithChildren } from "react";

export function AuthLayout({
  children,
  title,
  description,
}: PropsWithChildren<{
  title?: string;
  description?: string;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-md">
                <LibraryBig className="size-6" />
              </div>

              <span className="sr-only">{title}</span>
            </Link>

            <div className="space-y-2 text-center">
              <h1 className="text-xl font-medium">{title}</h1>

              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
