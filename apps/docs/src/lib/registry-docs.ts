import { withCustomConfig } from "react-docgen-typescript";
import path from "path";

const tsconfigPath = path.resolve("tsconfig.json");

const parser = withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) => {
    if (prop.parent) {
      return !prop.parent.fileName.includes("node_modules");
    }
    return true;
  },
});

export interface RegistryComponentDocs {
  displayName: string;
  description: string;
  props: Record<string, RegistryProp>;
}

export interface RegistryProp {
  type: string;
  required: boolean;
  description: string;
  defaultValue: string | null;
}

export function getComponentDocs(filePath: string): RegistryComponentDocs[] {
  try {
    const docs = parser.parse(filePath);

    return docs.map((doc) => {
      const props: Record<string, RegistryProp> = {};

      Object.entries(doc.props).forEach(([key, prop]) => {
        let typeName = prop.type.name;

        if (prop.type.name === "enum") {
          if (prop.type.raw === "boolean") {
            typeName = "boolean";
          } else if (
            Array.isArray(prop.type.value) &&
            prop.type.value.length > 0 &&
            prop.type.value.length < 20 &&
            !prop.type.raw?.includes("IntrinsicElements") &&
            !prop.type.raw?.includes("ReactNode") &&
            !prop.type.raw?.includes("ReactElement")
          ) {
            typeName = prop.type.value
              .map((v: { value: string }) => v.value)
              .join(" | ");
          } else if (prop.type.raw && prop.type.raw !== "enum") {
            typeName = prop.type.raw;
          }
        }

        props[key] = {
          type: typeName,
          required: prop.required,
          description: prop.description,
          defaultValue: prop.defaultValue
            ? String(prop.defaultValue.value)
            : null,
        };
      });

      return {
        displayName: doc.displayName,
        description: doc.description,
        props,
      };
    });
  } catch (error) {
    console.warn(`Warning: Could not parse docs for ${filePath}`, error);
    return [];
  }
}
