import type { PropsWithChildren } from "react";

export function AuthLayout({
  children,
  title,
  description,
  footer,
}: PropsWithChildren<{
  title?: string;
  description?: string;
  footer?: string;
}>) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-4xl">
        <div className="grid overflow-hidden rounded-2xl border bg-card md:grid-cols-2">
          <div className="relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="auth"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>

          <div className="flex flex-col p-6 md:p-8">
            <div className="mb-6 space-y-2 text-center md:text-left">
              {title && <h1 className="text-2xl font-bold">{title}</h1>}

              {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
              )}
            </div>

            {children}
          </div>
        </div>
      </div>
      {footer && (
        <div className="text-center text-xs text-muted-foreground mt-2">
          {footer}
        </div>
      )}
    </div>
  );
}
