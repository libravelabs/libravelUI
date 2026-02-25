import type { ControlsMap, PlaygroundValue } from "./types";

type GeneratedResult = {
  imports: Set<string>;
  props: string[];
  children: string | null;
  handlers: string[];
};

function format(code: string) {
  return code
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function extractImports(code: string) {
  const importRegex = /import\s*\{([\s\S]*?)\}\s*from\s*["'][^"']+["'];/g;

  return (
    code.match(importRegex)?.map((importBlock) => {
      return importBlock.replace(/\{([\s\S]*?)\}/, (match, content) => {
        const items = content
          .split(",")
          .map((i: string) => i.trim())
          .filter((i: string) => i && !i.startsWith("type "));

        const isMultiline = match.includes("\n");

        if (!items.length) return "{}";

        if (!isMultiline) {
          return `{ ${items.join(", ")} }`;
        }

        return `{\n  ${items.join(",\n  ")},\n}`;
      });
    }) ?? []
  );
}

function extractJSXTag(code: string) {
  const m = code.match(/return\s*(?:\(\s*)?(?:<>\s*)?<([A-Z]\w+)/);
  return m?.[1] ?? "";
}

function extractJSXComponentsFromString(input: string) {
  const matches = input.match(/<([A-Z]\w+)/g);
  return new Set(matches?.map((m) => m.slice(1)) ?? []);
}

function extractHandlers(code: string) {
  const matches = code.match(/\s(on[A-Z]\w+)=\{\(\)\s*=>\s*([\s\S]*?)\}/g);
  return matches ?? [];
}

function extractChildren(code: string) {
  if (code.match(/return\s*(?:\(\s*)?(?:<>\s*)?<([A-Z]\w+)[\s\S]*?\/>/)) {
    return null;
  }

  const m = code.match(
    /return\s*(?:\(\s*)?(?:<>\s*)?<[\s\S]*?>\s*([\s\S]*?)\s*<\/[A-Z]\w+>\s*(?:<\/>\s*)?(?:\)\s*)?;?/,
  );
  return m?.[1].trim() ?? "{children}";
}

function buildFromControls(
  values: Record<string, PlaygroundValue>,
  controls: ControlsMap,
): GeneratedResult {
  const imports = new Set<string>();
  const props: string[] = [];
  let children: string | null = null;
  let fallbackChildren: string | null = null;

  for (const [key, schema] of Object.entries(controls)) {
    const value = values[key] ?? schema.defaultValue;

    if (key === "children") {
      fallbackChildren = String(value);
      continue;
    }

    if (schema.type === "boolean") {
      const mappingKey = String(value);
      if (schema.mapping?.[mappingKey]) {
        schema.mapping[mappingKey].imports?.forEach((i) => imports.add(i));
        if (schema.mapping[mappingKey].children) {
          children = schema.mapping[mappingKey].children;
        }
      }

      if (value === true) {
        props.push(key);
      } else if (value === false && schema.showDefault === true) {
        props.push(`${key}={false}`);
      }
      continue;
    }

    const shouldRender = schema.showDefault || value !== schema.defaultValue;

    if (shouldRender) {
      if (typeof value === "string") {
        props.push(`${key}="${value}"`);
      } else {
        props.push(`${key}={${value}}`);
      }
    }
  }

  if (!children) {
    children = fallbackChildren ?? "{children}";
  }

  return { imports, props, children, handlers: [] };
}

function buildComponent(
  tag: string,
  props: string[],
  handlers: string[],
  children: string | null,
  template?: (props: string, children: string | null) => string,
) {
  const allProps = [...props, ...handlers];
  const propLine = allProps.length ? " " + allProps.join(" ") : "";

  let jsx = "";

  if (template) {
    jsx = template(propLine.trim(), children);
  } else if (children === null) {
    jsx = `<${tag}${propLine} />`;
  } else {
    jsx = `<${tag}${propLine}>\n      ${children}\n    </${tag}>`;
  }

  return `
export function Component() {
  return (
    ${jsx}
  );
}
`.trim();
}

export function playgroundParser(
  code: string,
  values: Record<string, PlaygroundValue>,
  controls: ControlsMap,
  template?: (props: string, children: string | null) => string,
) {
  if (!code) return "";

  const baseImports = extractImports(code);
  const tag = extractJSXTag(code);
  const childrenTemplate = extractChildren(code);
  const handlers = extractHandlers(code);

  const generated = buildFromControls(values, controls);
  generated.handlers = handlers;

  if (generated.children === "{children}") {
    generated.children = childrenTemplate;
  }

  const jsxComponents = new Set<string>([
    tag,
    ...extractJSXComponentsFromString(generated.children ?? ""),
  ]);

  const usedImports = new Set<string>();

  for (const imp of baseImports) {
    for (const comp of jsxComponents) {
      if (imp.includes(comp)) {
        usedImports.add(imp);
        break;
      }
    }
  }

  generated.imports.forEach((i) => usedImports.add(i));

  const output = `
${Array.from(usedImports).join("\n")}

${buildComponent(tag, generated.props, generated.handlers, generated.children, template)}
`;

  return format(output);
}
