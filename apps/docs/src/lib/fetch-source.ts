export interface SourceFile {
  name: string;
  content: string;
  path: string;
  code?: string;
}

export interface SourceResponse {
  files: SourceFile[];
  error?: string;
}

export async function fetchSource(key: string): Promise<SourceResponse | null> {
  try {
    const res = await fetch(`/api/source/${key}`);
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error("Error fetching source:", err);
    return null;
  }
}
