"use client";

import type { ReactNode } from "react";
import Markdown from "react-markdown";

type Props = {
  children?: ReactNode;
};

export function DefaultRenderer({ children }: Props) {
  if (typeof children === "string") {
    return <Markdown>{children}</Markdown>;
  }

  return <>{children}</>;
}
