import "@testing-library/jest-dom";
import React from "react";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Automatically cleanup after each test to avoid memory leaks and flaky tests
afterEach(() => {
  cleanup();
});

vi.mock("motion/react", async () => {
  const actual = await vi.importActual("motion/react");
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    motion: {
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
      span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
      create: (Component: any) => (props: any) => <Component {...props} />,
    },
    useMotionValue: (v: any) => ({ get: () => v, set: () => {} }),
    animate: () => ({ stop: () => {} }),
  };
});
