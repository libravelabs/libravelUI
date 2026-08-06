import type { ReactNode } from "react";

type NotebookPreviewProps = {
  children: ReactNode;
};

export function NotebookPreview({ children }: NotebookPreviewProps) {
  return (
    <div className="relative flex min-h-60 items-center justify-center px-6 py-10 sm:px-10">
      <div className="relative flex w-full items-center justify-center">
        {children}
      </div>
    </div>
  );
}
