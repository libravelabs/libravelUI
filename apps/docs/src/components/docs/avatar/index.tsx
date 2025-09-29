"use client";

import { Playground } from "@/components/playground";
import { BasicAvatarBase, BasicAvatarCode } from "./basic-avatar";
import { InitialAvatarBase, InitialAvatarCode } from "./initial-avatar";
import ShapeAvatarBase, { ShapeAvatarCode } from "./shape-avatar";
import { SizeAvatarBase, SizeAvatarCode } from "./size-avatar";
import { AvatarGroupBase, AvatarGroupCode } from "./avatar-group";

export function AvatarBasic() {
  return <Playground preview={<BasicAvatarBase />} code={BasicAvatarCode} />;
}

export function InitialAvatar() {
  return (
    <Playground preview={<InitialAvatarBase />} code={InitialAvatarCode} />
  );
}

export function ShapeAvatar() {
  return <Playground preview={<ShapeAvatarBase />} code={ShapeAvatarCode} />;
}

export function SizeAvatar() {
  return <Playground preview={<SizeAvatarBase />} code={SizeAvatarCode} />;
}

export function AvatarGroup() {
  return <Playground preview={<AvatarGroupBase />} code={AvatarGroupCode} />;
}
