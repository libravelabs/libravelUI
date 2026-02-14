export function cleanCode(code: string): string {
  let cleaned = code.trim();
  // We keep "use client" as it's needed for Next.js components
  cleaned = cleaned.replace(/export\s+default\s+[a-zA-Z0-9_$]+;?$/gm, "");
  cleaned = cleaned.replace(
    /export\s+default\s+function\s+([a-zA-Z0-9_$]+)?\s*\(/,
    "export function Component(",
  );
  cleaned = cleaned.replace(/export\s+default\s+[a-zA-Z0-9_$]+/g, "");
  return cleaned;
}
