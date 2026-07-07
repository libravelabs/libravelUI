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

type Status = "available" | "coming_soon" | "beta" | "deprecated";

export type BaseMeta = {
  title: string;
  slug: string;
  href: string;
  description: string;
};

export type RegistryGroup = Omit<BaseMeta, "slug">;

export type FeaturedMeta = {
  thumbnail?: string;
  featured?: boolean;
};

export type BlockMetaVariant = BaseMeta & FeaturedMeta;

export type BlockMetaItem = BaseMeta & {
  icon?: string;
  status?: Status;
  variants: BlockMetaVariant[];
};

export type BlocksMeta = RegistryGroup & {
  blocks: BlockMetaItem[];
};

export type BlockVariant = BaseMeta &
  FeaturedMeta & {
    type: "registry:block";
    previewEntry?: string;
    docs: ComponentDoc[];
    files: RegistryFile[];
  };

export type BlockCategory = BaseMeta & {
  icon?: string;
  variants: BlockVariant[];
};

export type BlocksRegistry = RegistryGroup & {
  blocks: BlockCategory[];
};

export type Registry = Record<string, RegistryEntry> & {
  blocks?: BlocksRegistry;
};

export type RegistryIndexEntry = {
  path: string;
  name: string;
  url: string;
};

export type RegistryIndex = Record<string, Record<string, RegistryIndexEntry>>;
