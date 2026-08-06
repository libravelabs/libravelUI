import {
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

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

function formatPropValue(value: unknown): string {
  if (typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return `{${String(value)}}`;
  }

  if (value == null) {
    return "{null}";
  }

  return `{${JSON.stringify(value)}}`;
}

function getComponentName(type: ReactElement["type"]) {
  if (typeof type === "string") {
    return type;
  }

  return type.displayName || type.name || "Component";
}

function serializeNode(
  node: ReactNode,
  defaults: Record<string, unknown>,
  fields: Record<string, { showDefault?: boolean }>,
): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }

  if (typeof node === "string") {
    return node;
  }

  if (typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node
      .map((child) => serializeNode(child, defaults, fields))
      .join("\n");
  }

  if (!isValidElement(node)) {
    return "";
  }

  if (node.type === Fragment) {
    return serializeNode(node.props.children, defaults, fields);
  }

  const props = node.props as Record<string, unknown>;
  const name = getComponentName(node.type);

  const attributes = Object.entries(props)
    .filter(([key, value]) => key !== "children" && value !== undefined)
    .filter(([key, value]) => {
      const field = fields[key];

      if (field?.showDefault) {
        return true;
      }

      return !Object.is(value, defaults[key]);
    })
    .map(([key, value]) => {
      if (value === true) {
        return key;
      }

      return `${key}=${formatPropValue(value)}`;
    })
    .join(" ");

  const children = serializeNode(props.children, defaults, fields);

  if (!children) {
    return `<${name}${attributes ? ` ${attributes}` : ""} />`;
  }

  return `<${name}${attributes ? ` ${attributes}` : ""}>${children}</${name}>`;
}

export function serializeComponent({
  element,
  defaults,
  fields = {},
}: {
  element: ReactNode;
  defaults: Record<string, unknown>;
  fields?: Record<string, { showDefault?: boolean }>;
}) {
  return serializeNode(element, defaults, fields);
}

export function stringifyNotebookCode({
  title = "Component",
  imports = [],
  element,
  defaults = {},
  fields = {},
}: {
  title?: string;
  imports?: string[];
  element: ReactNode;
  defaults?: Record<string, unknown>;
  fields?: Record<string, { showDefault?: boolean }>;
}) {
  const exampleName = `${toExampleName(title)}Example`;
  const jsx = serializeComponent({ element, defaults, fields });
  const importsBlock = imports.length > 0 ? `${imports.join("\n")}\n\n` : "";

  return `${importsBlock}export default function ${exampleName}() {
  return (
    ${jsx}
  );
}`.trim();
}
