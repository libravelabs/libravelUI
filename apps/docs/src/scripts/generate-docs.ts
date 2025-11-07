import {
  withCustomConfig,
  type ComponentDoc,
  type PropItemType,
} from "react-docgen-typescript";
import fs from "fs";
import path from "path";

const tsconfigPath = path.resolve("tsconfig.docgen.json");
const srcRoot = path.resolve("src");
const userInput = process.argv[2];
let scanTarget = srcRoot;
let outputBase = path.resolve(srcRoot, ".generated/types");

if (userInput) {
  const resolved = path.resolve(srcRoot, userInput);
  if (!fs.existsSync(resolved)) {
    console.error("Input path not found:", userInput);
    process.exit(1);
  }
  scanTarget = resolved;
  const isFile = fs.statSync(resolved).isFile();
  const relBase = path.relative(
    srcRoot,
    isFile ? path.dirname(resolved) : resolved
  );
  outputBase = path.resolve(srcRoot, ".generated/types", relBase);
}

const parser = withCustomConfig(tsconfigPath, {
  savePropValueAsString: true,
  shouldExtractLiteralValuesFromEnum: true,
  shouldExtractValuesFromUnion: true,
  shouldRemoveUndefinedFromOptional: true,
});

if (!fs.existsSync(outputBase)) fs.mkdirSync(outputBase, { recursive: true });

function getComponentFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  if (fs.statSync(dir).isFile()) {
    return dir.endsWith(".tsx") ? [dir] : [];
  }
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const res = path.resolve(dir, entry.name);
    return entry.isDirectory()
      ? getComponentFiles(res)
      : entry.name.endsWith(".tsx")
        ? [res]
        : [];
  });
}

function extractDefaultVariants(source: string): Record<string, string> {
  const defaults: Record<string, string> = {};
  if (!source || typeof source !== "string") return defaults;
  const match = source.match(/defaultVariants\s*:\s*{([\s\S]*?)}/);
  if (!match) return defaults;
  const block = match[1] || "";
  const regex = /(\w+)\s*:\s*(["'`])([^"'`]+)\2/g;
  let m;
  while ((m = regex.exec(block))) {
    if (m[1] && m[3]) defaults[m[1]] = m[3];
  }
  return defaults;
}

function cleanTypeStr(s: unknown): string {
  const str = typeof s === "string" ? s : String(s ?? "");
  return str
    .replace(/\bnull\s*\|\s*/g, "")
    .replace(/\|\s*\bnull\b/g, "")
    .replace(/\s+as\s+const\b/g, "")
    .trim();
}

function tryParseInlineObjectLiteral(
  typeStr: unknown
): Record<string, string> | null {
  if (typeof typeStr !== "string") return null;
  const s = typeStr.trim();
  if (!s.startsWith("{") || !s.endsWith("}")) return null;
  const body = s.slice(1, -1).trim();
  const entries = body
    .split(/[;,]/)
    .map((e) => e.trim())
    .filter(Boolean);
  const out: Record<string, string> = {};
  for (const entry of entries) {
    const m = entry.match(/^(\[?\w+\]?)(\?)?\s*:\s*(.+)$/);
    if (!m || !m[1] || !m[3]) continue;
    const key = m[1].replace(/^\[|\]$/g, "");
    out[key] = cleanTypeStr(m[3]);
  }
  return Object.keys(out).length > 0 ? out : null;
}

function tryParseJsonLikeString(s: unknown): Record<string, string> | null {
  if (typeof s !== "string") return null;
  const trimmed = s.trim();
  const parseIfObject = (input: unknown): Record<string, string> | null => {
    if (typeof input !== "object" || input === null || Array.isArray(input))
      return null;
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(input as Record<string, unknown>))
      out[k] = typeof v === "string" ? v : String(v);
    return out;
  };
  try {
    if (
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
      const inner = trimmed.slice(1, -1);
      const parsed = JSON.parse(inner);
      return parseIfObject(parsed);
    }
    const parsed = JSON.parse(trimmed);
    return parseIfObject(parsed);
  } catch {
    return null;
  }
}

const allFiles = getComponentFiles(srcRoot);
const variantDefaultsCache: Record<string, Record<string, string>> = {};
const typeAliasCache: Record<string, Record<string, string> | null> = {};

function findFileWithIdentifier(identifier: string): string | null {
  if (!identifier) return null;
  const idPattern = new RegExp(
    `(?:export\\s+)?(?:const|let|var|function|type|interface)\\s+${identifier}\\b|\\b${identifier}\\s*=`,
    "m"
  );
  for (const f of allFiles) {
    try {
      const txt = fs.readFileSync(f, "utf8");
      if (idPattern.test(txt)) return f;
    } catch {
      continue;
    }
  }
  return null;
}

function getVariantDefaultsFromExpr(expr: string): Record<string, string> {
  if (!expr || typeof expr !== "string") return {};
  const match = expr.match(/VariantProps<\s*typeof\s+([A-Za-z0-9_]+)/);
  if (!match || !match[1]) return {};
  const base = match[1];
  if (variantDefaultsCache[base]) return variantDefaultsCache[base];
  const src = findFileWithIdentifier(base);
  if (!src) {
    variantDefaultsCache[base] = {};
    return {};
  }
  try {
    const txt = fs.readFileSync(src, "utf8");
    const defs = extractDefaultVariants(txt);
    variantDefaultsCache[base] = defs;
    return defs;
  } catch {
    variantDefaultsCache[base] = {};
    return {};
  }
}

function resolveTypeAlias(typeName: string): Record<string, string> | null {
  if (!typeName) return null;
  if (Object.hasOwn(typeAliasCache, typeName)) return typeAliasCache[typeName];
  const patternType = new RegExp(
    `(?:export\\s+)?type\\s+${typeName}\\s*=\\s*({[\\s\\S]*?});?`,
    "m"
  );
  const patternInterface = new RegExp(
    `(?:export\\s+)?interface\\s+${typeName}\\s*{([\\s\\S]*?)};?`,
    "m"
  );
  for (const f of allFiles) {
    try {
      const txt = fs.readFileSync(f, "utf8");
      const m1 = txt.match(patternType);
      if (m1 && m1[1]) {
        const parsed = tryParseInlineObjectLiteral(m1[1].trim());
        typeAliasCache[typeName] = parsed;
        return parsed;
      }
      const m2 = txt.match(patternInterface);
      if (m2 && m2[1]) {
        const parsed = tryParseInlineObjectLiteral(`{${m2[1].trim()}}`);
        typeAliasCache[typeName] = parsed;
        return parsed;
      }
    } catch {
      continue;
    }
  }
  typeAliasCache[typeName] = null;
  return null;
}

function resolveTypePath(typeExpr: string): Record<string, string> | null {
  if (!typeExpr || typeof typeExpr !== "string") return null;
  const match = typeExpr.match(
    /^([A-Za-z0-9_]+)\s*\[\s*['"]([^'"]+)['"]\s*\]$/
  );
  if (!match || !match[1] || !match[2]) return null;
  const [, base, key] = match;
  const baseAlias = resolveTypeAlias(base);
  if (!baseAlias) return null;
  return baseAlias[key] ? { [key]: baseAlias[key] } : null;
}

function isWrappedGeneric(typeStr: string): boolean {
  if (!typeStr || typeof typeStr !== "string") return false;
  return /^\s*(?:Omit|Pick|Partial|Required|Readonly|Exclude|Extract)\s*<\s*[A-Za-z0-9_]+/.test(
    typeStr
  );
}

function getOmittedBasesFromSource(sourceText: string): Set<string> {
  const bases = new Set<string>();
  if (!sourceText || typeof sourceText !== "string") return bases;
  const regex = /\b(?:Omit|Pick)\s*<\s*([A-Za-z0-9_]+)\s*,/g;
  let m;
  while ((m = regex.exec(sourceText))) {
    if (m[1]) bases.add(m[1]);
  }
  const regex2 = /\bextends\s+(?:Omit|Pick)\s*<\s*([A-Za-z0-9_]+)\s*,/g;
  while ((m = regex2.exec(sourceText))) {
    if (m[1]) bases.add(m[1]);
  }
  const regex3 = /=\s*(?:Omit|Pick)\s*<\s*([A-Za-z0-9_]+)\s*,/g;
  while ((m = regex3.exec(sourceText))) {
    if (m[1]) bases.add(m[1]);
  }
  return bases;
}

function extractIdentifiersFromDestructure(str: string): string[] {
  if (!str || typeof str !== "string") return [];
  const parts = str
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    if (p.startsWith("...")) {
      const name = p.slice(3).split("=")[0].split(":")[0].trim();
      if (name) out.push(name);
      continue;
    }
    const left = p.split("=")[0].split(":")[0].trim();
    const match = left.match(/^([A-Za-z0-9_]+)/);
    if (match && match[1]) out.push(match[1]);
  }
  return out;
}

function getDestructuredPropsFromSource(
  sourceText: string,
  displayName: string
): Set<string> {
  const set = new Set<string>();
  if (!sourceText || !displayName) return set;
  const fnRegex = new RegExp(
    `function\\s+${displayName}\\s*\\(\\s*{([^}]*)}`,
    "m"
  );
  let m = sourceText.match(fnRegex);
  if (m && m[1]) {
    const ids = extractIdentifiersFromDestructure(m[1]);
    ids.forEach((i) => set.add(i));
    return set;
  }
  const constRegex = new RegExp(
    `${displayName}\\s*[:=][\\s\\S]*?=\\s*\\(?\\s*{([^}]*)}\\s*:\\s*[^\\)]*\\)\\s*=>`,
    "m"
  );
  m = sourceText.match(constRegex);
  if (m && m[1]) {
    const ids = extractIdentifiersFromDestructure(m[1]);
    ids.forEach((i) => set.add(i));
    return set;
  }
  const arrowRegex2 = new RegExp(
    `const\\s+${displayName}\\s*=\\s*\\(?\\s*{([^}]*)}\\s*\\)\\s*=>`,
    "m"
  );
  m = sourceText.match(arrowRegex2);
  if (m && m[1]) {
    const ids = extractIdentifiersFromDestructure(m[1]);
    ids.forEach((i) => set.add(i));
    return set;
  }
  const exportFnRegex = new RegExp(
    `export\\s+function\\s+${displayName}\\s*\\(\\s*{([^}]*)}`,
    "m"
  );
  m = sourceText.match(exportFnRegex);
  if (m && m[1]) {
    const ids = extractIdentifiersFromDestructure(m[1]);
    ids.forEach((i) => set.add(i));
    return set;
  }
  return set;
}

function normalizeType(raw: unknown): string | Record<string, string> {
  const cleaned = cleanTypeStr(raw);
  if (
    typeof cleaned === "string" &&
    cleaned.includes("ReactElement") &&
    cleaned.includes("JSXElementConstructor")
  ) {
    return "ReactNode";
  }
  const jsonLike = tryParseJsonLikeString(cleaned);
  if (jsonLike) return jsonLike;
  if (cleaned === "false | true" || cleaned === "true | false") {
    return "boolean";
  }
  const pathResolved = resolveTypePath(cleaned);
  if (pathResolved) return pathResolved;
  if (isWrappedGeneric(cleaned)) {
    return cleaned;
  }
  if (typeof cleaned === "string" && cleaned.endsWith("[]")) {
    const base = cleaned.slice(0, -2).trim();
    const inline = tryParseInlineObjectLiteral(base);
    if (inline) return inline;
    const alias = resolveTypeAlias(base);
    if (alias) return alias;
    const jsonBase = tryParseJsonLikeString(base);
    if (jsonBase) return jsonBase;
    return base;
  }
  const inline = tryParseInlineObjectLiteral(cleaned);
  if (inline) return inline;
  const aliasMatch =
    typeof cleaned === "string" ? cleaned.match(/^([A-Za-z0-9_]+)$/) : null;
  if (aliasMatch && aliasMatch[1]) {
    const alias = resolveTypeAlias(aliasMatch[1]);
    if (alias) return alias;
  }
  return cleaned;
}

interface CleanedProp {
  type: string | Record<string, string>;
  required: boolean;
  description: string;
  defaultValue: boolean | string | null;
}

interface CleanedComponent {
  displayName: string;
  description: string;
  props: Record<string, CleanedProp>;
}

function cleanProps(
  docs: ComponentDoc[],
  sourceText: string
): CleanedComponent[] {
  const localDefaults = extractDefaultVariants(sourceText);
  const omittedBases = getOmittedBasesFromSource(sourceText);
  return docs.map((doc) => {
    const destructured = getDestructuredPropsFromSource(
      sourceText,
      doc.displayName
    );
    const cleanedProps: Record<string, CleanedProp> = {};
    for (const [name, prop] of Object.entries(doc.props ?? {})) {
      const parentFile = prop.parent?.fileName ?? "";
      const parentName = prop.parent?.name ?? "";
      if (
        parentFile.includes("node_modules") ||
        /HTML|Aria|Ref|DOMAttributes|DetailedHTMLProps/.test(parentName)
      )
        continue;
      if (name.startsWith("aria-") || name.startsWith("data-")) continue;
      if (["as", "ref", "key"].includes(name)) continue;
      if (doc.displayName && destructured.size > 0) {
        if (!destructured.has(name)) {
          const typeRaw =
            typeof prop.type === "object" &&
            prop.type !== null &&
            "raw" in prop.type
              ? (prop.type as any).raw
              : String((prop.type && (prop.type as any).name) || "");
          const isExplicitPath = !!resolveTypePath(typeRaw);
          const declaredInThisFile =
            parentFile &&
            path.resolve(parentFile) ===
              path.resolve(path.join(srcRoot, `${doc.displayName}.tsx`));
          if (!isExplicitPath && !declaredInThisFile) continue;
        }
      } else {
        if (parentName && omittedBases.has(parentName)) continue;
      }
      let typeStr = "unknown";
      const t: PropItemType | undefined = prop.type;
      if (t) {
        if (t.name === "enum" && Array.isArray(t.value)) {
          const vals = (t.value as Array<{ value?: string }>).map(
            (v) => v.value
          );
          const joined = vals.filter(Boolean).join(" | ");
          typeStr =
            joined === "true | false" || joined === "false | true"
              ? "boolean"
              : joined || "enum";
        } else if (
          "raw" in t &&
          typeof t.raw === "string" &&
          t.raw.length > 0
        ) {
          typeStr = t.raw;
        } else if (t.name) {
          typeStr = t.name;
        }
      }
      const normalized = normalizeType(typeStr);
      let defaultValue: boolean | string | null = null;
      if (prop.defaultValue) {
        let val: string = "";
        if (
          typeof prop.defaultValue === "object" &&
          prop.defaultValue !== null &&
          "value" in prop.defaultValue
        ) {
          val = (prop.defaultValue as { value?: string }).value ?? "";
        } else {
          val = String(prop.defaultValue);
        }
        val = val.trim();
        if (val === "true") defaultValue = true;
        else if (val === "false") defaultValue = false;
        else defaultValue = val || null;
      }
      if (defaultValue === null && localDefaults[name]) {
        const raw = localDefaults[name];
        if (raw === "true") defaultValue = true;
        else if (raw === "false") defaultValue = false;
        else defaultValue = raw;
      }
      if (
        defaultValue === null &&
        typeof typeStr === "string" &&
        typeStr.includes("VariantProps")
      ) {
        const variantDefs = getVariantDefaultsFromExpr(typeStr);
        if (variantDefs[name]) {
          const raw = variantDefs[name];
          if (raw === "true") defaultValue = true;
          else if (raw === "false") defaultValue = false;
          else defaultValue = raw;
        }
      }
      cleanedProps[name] = {
        type: normalized,
        required: prop.required ?? false,
        description: prop.description || "",
        defaultValue,
      };
    }
    return {
      displayName: doc.displayName,
      description: doc.description,
      props: cleanedProps,
    };
  });
}

const targetFiles = getComponentFiles(scanTarget);

for (const file of targetFiles) {
  try {
    const sourceText = fs.readFileSync(file, "utf8");
    const docs = parser.parse(file);
    if (docs.length === 0) continue;
    const docsWithProps = docs.filter(
      (d) => Object.keys(d.props ?? {}).length > 0
    );
    let docsToProcess: ComponentDoc[] =
      docsWithProps.length > 0
        ? docsWithProps.filter((d) => !/Props$/.test(d.displayName))
        : docs.filter((d) => !/Props$/.test(d.displayName));
    if (docsToProcess.length === 0) docsToProcess = docs;
    const filteredDocs = cleanProps(docsToProcess, sourceText);
    let relPath = "";
    if (userInput) {
      if (fs.statSync(scanTarget).isFile()) {
        relPath = path.basename(file);
      } else {
        relPath = path.relative(scanTarget, file);
      }
    } else {
      relPath = path.relative(srcRoot, file);
    }
    const jsonPath = path.resolve(
      outputBase,
      relPath.replace(/\.tsx?$/, ".json")
    );
    fs.mkdirSync(path.dirname(jsonPath), { recursive: true });
    fs.writeFileSync(jsonPath, JSON.stringify(filteredDocs, null, 2), "utf8");
    console.log("Parsed:", relPath);
  } catch (err) {
    console.warn(
      "Failed:",
      file,
      err instanceof Error ? err.message : String(err)
    );
  }
}

console.log("Docs generation complete!");
