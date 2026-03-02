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
      div: ({ children, ...props }: unknown) => (
        <div {...props}>{children}</div>
      ),
      span: ({ children, ...props }: unknown) => (
        <span {...props}>{children}</span>
      ),
      create: (Component: unknown) => (props: unknown) => (
        <Component {...props} />
      ),
    },
    useMotionValue: (v: unknown) => ({ get: () => v, set: () => {} }),
    animate: () => ({ stop: () => {} }),
  };
});
