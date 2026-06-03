import Link from "next/link";
import type { PropsWithChildren } from "react";
import { LibraryBig } from "lucide-react";

export function AuthLayout({
  children,
  title,
  description,
}: PropsWithChildren<{
  title?: string;
  description?: string;
}>) {
  return (
    <div className="relative grid h-dvh lg:grid-cols-2">
      <div className="relative hidden h-full flex-col p-12 text-foreground lg:flex">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />

        <div className="relative flex w-full items-center">
          <Link href="/">
            <LibraryBig className="size-8" />
          </Link>
        </div>

        <div className="relative mt-auto">
          <blockquote className="space-y-2">
            <p className="text-4xl">
              &ldquo;The future belongs to those who build it.&rdquo;
            </p>

            <footer className="text-xl opacity-70">~ Anonymous</footer>
          </blockquote>
        </div>
      </div>

      <div className="flex h-full w-full flex-col">
        <Link href="/" className="relative mt-8 self-center lg:hidden">
          <LibraryBig className="size-8" />
        </Link>

        <div className="mx-auto flex w-full flex-1 flex-col justify-center space-y-6 px-8 sm:w-md">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-medium tracking-tighter lg:text-4xl">
              {title}
            </h1>

            <p className="text-sm text-balance text-muted-foreground">
              {description}
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
