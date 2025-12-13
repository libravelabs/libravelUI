export function cleanCode(code: string): string {
  let cleaned = code.trim();
  cleaned = cleaned.replace(/^["']use client["'];?\s*\n+/m, "");
  cleaned = cleaned.replace(/export\s+default\s+[a-zA-Z0-9_$]+;?$/gm, "");
  cleaned = cleaned.replace(
    /export\s+default\s+function\s+([a-zA-Z0-9_$]+)?\s*\(/,
    "export function Component("
  );
  cleaned = cleaned.replace(/export\s+default\s+[a-zA-Z0-9_$]+/g, "");
  return cleaned;
}
