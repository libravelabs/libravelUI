import type { StoryBookCode } from "./types";

type SerializeComponentOptions = {
  name: string;
  props: Record<string, unknown>;
  defaults?: Record<string, unknown>;
  children?: string;
};

function toExampleName(title: string) {
  const words = title
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const normalized = words
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)
    .join("");

  const safe = normalized || "Component";

  return /^[A-Za-z_$]/.test(safe) ? safe : `Component${safe}`;
}

export function serializeComponent({
  name,
  props,
  defaults = {},
  children,
}: SerializeComponentOptions) {
  const serializedProps = Object.entries(props).flatMap(([key, value]) => {
    if (value === undefined || value === null) {
      return [];
    }

    if (value === defaults[key]) {
      return [];
    }

    if (value === true) {
      return [key];
    }

    if (typeof value === "string") {
      return [`${key}="${value}"`];
    }

    if (typeof value === "number" || typeof value === "boolean") {
      return [`${key}={${value}}`];
    }

    return [`${key}={${JSON.stringify(value)}}`];
  });

  const attributes =
    serializedProps.length > 0 ? ` ${serializedProps.join(" ")}` : "";

  if (children === undefined || children === null || children === "") {
    return `<${name}${attributes} />`;
  }

  return `<${name}${attributes}>${children}</${name}>`;
}

export function stringifyStoryBookCode({
  title = "Component",
  imports = [],
  code,
}: StoryBookCode & { title?: string }) {
  const componentName = `${toExampleName(title)}Example`;
  const importsBlock = imports.length > 0 ? `${imports.join("\n")}\n\n` : "";

  const source = `${importsBlock}export default function ${componentName}() {
  return (
    ${code}
  );
}`;

  return source.trim();
}
