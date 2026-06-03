export type RegistryFile = {
  path: string;
  code: string;
};

export type RegistryEntry = {
  name: string;
  type: "registry:file" | "registry:block";
  docs: unknown[];
  files: RegistryFile[];
  preview?: string;
  previewEntry?: string;
};

export async function fetchSource(key: string): Promise<RegistryEntry | null> {
  try {
    const response = await fetch(`/api/source/${key}`);

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error(error);

    return null;
  }
}
