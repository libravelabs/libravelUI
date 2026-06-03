import type { PropsWithChildren, ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { LibraryBig } from "lucide-react";

export function AuthLayout({
  children,
  title,
  description,
  footer,
}: PropsWithChildren<{
  name?: string;
  title?: string;
  description?: string;
  footer?: ReactNode;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <Card radius="xl" className="flex flex-col gap-6">
        <CardHeader className="grid w-full text-center">
          <div className="mx-auto flex">
            <LibraryBig />
          </div>

          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="w-full">{children}</CardContent>
      </Card>

      {footer && (
        <div className="text-center text-xs text-muted-foreground max-w-sm">
          {footer}
        </div>
      )}
    </div>
  );
}
