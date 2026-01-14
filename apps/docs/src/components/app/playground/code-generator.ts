import type { ControlsMap, PlaygroundProps } from "./types";

export function generateCode(
  componentPath: string,
  values: Record<string, React.ReactNode>,
  controls: ControlsMap,
  section: PlaygroundProps["section"]
) {
  const componentName = componentPath.split("/")[0];
  const capitalizedComponentName = componentName
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");

  const imports = new Set<string>();
  imports.add(
    `import { ${capitalizedComponentName} } from "@/components/ui/${section}/${componentName}";`
  );

  let children =
    typeof values.children === "string"
      ? values.children
      : values.children
        ? `{${String(values.children)}}`
        : "";

  const props = Object.entries(values)
    .filter(([key, value]) => {
      if (key === "children") return false;

      const schema = controls[key];
      if (!schema) return false;

      const mappingKey = String(value);
      if (schema.mapping && schema.mapping[mappingKey]) {
        const { imports: mappedImports, children: mappedChildren } =
          schema.mapping[mappingKey];

        if (mappedImports) {
          mappedImports.forEach((imp) => imports.add(imp));
        }

        if (mappedChildren) {
          children = mappedChildren;
        }
      }

      if (value === schema.defaultValue) return false;
      return true;
    })
    .map(([key, value]) => {
      const schema = controls[key];

      if (schema?.type === "boolean") {
        return value ? key : null;
      }

      if (typeof value === "string") {
        return `${key}="${value}"`;
      }

      if (typeof value === "number") {
        return `${key}={${value}}`;
      }

      return `${key}={${JSON.stringify(value)}}`;
    })
    .filter(Boolean)
    .join(" ");

  const importStatements = Array.from(imports).join("\n");

  return `${importStatements}

export function Component() {
  return (
    <${capitalizedComponentName}${props ? " " + props : ""}>
      ${children}
    </${capitalizedComponentName}>
  );
}`;
}
