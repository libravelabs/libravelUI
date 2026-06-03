export type RegistryFile = {
  path: string;
  code: string;
};

export type ComponentProp = {
  type: string;
  required: boolean;
  description: string;
  defaultValue: string | null;
};

export type ComponentDoc = {
  displayName: string;
  description: string;
  props: Record<string, ComponentProp>;
};

export type RegistryEntry = {
  name: string;
  type: "registry:file";
  docs: ComponentDoc[];
  files: RegistryFile[];
};

export type BlockVariant = {
  name: string;
  preview: string;
  previewEntry?: string;
  docs: ComponentDoc[];
  files: RegistryFile[];
};

export type BlockMeta = {
  title: string;
  description?: string;
  variants: string[];
};

export type BlockCategory = {
  title: string;
  description?: string;
  variants: BlockVariant[];
};

export type BlocksRegistry = Record<string, BlockCategory>;

export type Registry = Record<string, RegistryEntry> & {
  blocks?: BlocksRegistry;
};

export type RegistryIndexEntry = {
  path: string;
  name: string;
  url: string;
};

export type RegistryIndex = Record<string, Record<string, RegistryIndexEntry>>;
