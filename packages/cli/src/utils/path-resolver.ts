import path from "path";
import type { ProjectPaths } from "../scanners/project-scanner";
import { REGISTRY_PATH_PREFIXES } from "../constants";

/**
 * Resolves a registry file path to the actual project path
 * @param registryPath - Path from registry (e.g., "components/ui/button.tsx")
 * @param projectPaths - Project paths from scanner
 * @param cwd - Current working directory
 * @returns Resolved absolute path
 */
export function resolveRegistryPath(
  registryPath: string,
  projectPaths: ProjectPaths,
  cwd: string,
): string {
  let normalizedPath = registryPath.replace(/\\/g, "/");

  if (normalizedPath.startsWith("src/")) {
    normalizedPath = normalizedPath.replace("src/", "");
  } else if (normalizedPath.startsWith("app/")) {
    normalizedPath = normalizedPath.replace("app/", "");
  } else if (normalizedPath.startsWith("resources/js/")) {
    normalizedPath = normalizedPath.replace("resources/js/", "");
  }

  if (normalizedPath.startsWith(REGISTRY_PATH_PREFIXES.COMPONENTS_UI)) {
    normalizedPath = normalizedPath.replace(
      REGISTRY_PATH_PREFIXES.COMPONENTS_UI,
      `${projectPaths.componentsDir}/ui/`,
    );
  } else if (normalizedPath.startsWith(REGISTRY_PATH_PREFIXES.COMPONENTS)) {
    normalizedPath = normalizedPath.replace(
      REGISTRY_PATH_PREFIXES.COMPONENTS,
      `${projectPaths.componentsDir}/`,
    );
  } else if (normalizedPath.startsWith(REGISTRY_PATH_PREFIXES.LIB_UTILS)) {
    const base = projectPaths.utilsDir || `${projectPaths.libDir}/utils`;
    normalizedPath = normalizedPath.replace(
      REGISTRY_PATH_PREFIXES.LIB_UTILS,
      base,
    );
  } else if (normalizedPath.startsWith(REGISTRY_PATH_PREFIXES.LIB)) {
    normalizedPath = normalizedPath.replace(
      REGISTRY_PATH_PREFIXES.LIB,
      `${projectPaths.libDir}/`,
    );
  } else if (normalizedPath.startsWith(REGISTRY_PATH_PREFIXES.HOOKS)) {
    normalizedPath = normalizedPath.replace(
      REGISTRY_PATH_PREFIXES.HOOKS,
      `${projectPaths.hooksDir}/`,
    );
  }

  return path.resolve(cwd, normalizedPath);
}
