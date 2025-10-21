export async function fetchSource(key: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/source/${key}`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.files?.[0]?.content ?? null;
  } catch (err) {
    console.error("Error fetching source:", err);
    return null;
  }
}
