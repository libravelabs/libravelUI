import registry from "@/../public/registry.json";

export function getBlocks(category: string) {
  return Object.entries(registry)
    .filter(
      ([key, entry]) =>
        entry.type === "registry:block" &&
        key.startsWith(`blocks/${category}/`),
    )
    .map(([key, entry]) => ({
      id: key,
      ...entry,
    }));
}
