import { select, isCancel, cancel } from "@clack/prompts";
import picocolors from "picocolors";
import { STARTERS, Framework } from "../constants/config";

export async function resolveFramework(options: {
  next?: boolean;
  vite?: boolean;
}): Promise<Framework> {
  if (options.next) {
    return STARTERS.next;
  }

  if (options.vite) {
    return STARTERS.vite;
  }

  console.log("");
  const selected = await select({
    message: "Select framework:",
    options: [
      { value: STARTERS.next, label: "Next.js" },
      { value: STARTERS.vite, label: "Vite" },
      { value: "tanstack", label: "TanStack Start (coming soon)" },
    ],
  });

  if (isCancel(selected)) {
    cancel("Operation cancelled");
    process.exit(0);
  }

  if (selected === "tanstack") {
    console.log(picocolors.yellow("\nTanStack Start support is coming soon."));
    process.exit(0);
  }

  return selected as Framework;
}
