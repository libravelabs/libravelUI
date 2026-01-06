export function getDocUrl(path?: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const baseUrl = process.env.NEXT_PUBLIC_DOCS_BASE_URL;
  if (!baseUrl) return path;

  let finalPath = path;
  const [basePath, fragment] = path.split("#");

  if (!basePath.endsWith(".html")) {
    finalPath = `${basePath}.html${fragment ? `#${fragment}` : ""}`;
  }

  try {
    let validBaseUrl = baseUrl.startsWith("http")
      ? baseUrl
      : `https://${baseUrl}`;

    if (!validBaseUrl.endsWith("/")) {
      validBaseUrl += "/";
    }

    return new URL(finalPath, validBaseUrl).href;
  } catch (e) {
    console.warn(`Invalid URL construction: ${path} with base ${baseUrl}`);
    return path;
  }
}
