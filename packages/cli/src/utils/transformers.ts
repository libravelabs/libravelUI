import { ProjectPaths } from "../scanners/project-scanner";

export function transformImports(
  content: string,
  config: ProjectPaths,
): string {
  // If it's a Laravel or Vite project, we want to use the local theme provider
  // instead of next-themes
  if (config.isLaravel || config.isVite) {
    return content.replace(
      /from\s+['"]next-themes['"]/g,
      'from "@/components/theme/theme-provider"',
    );
  }

  // For Next.js (or other defaults), keep next-themes
  return content;
}
