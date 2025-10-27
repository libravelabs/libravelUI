"use client";

import { Tree, TreeItem, TreeContent } from "@/components/ui/tree";

export default function MultipleSelectionTree() {
  return (
    <Tree selectionMode="multiple">
      <TreeItem id="citrus" textValue="Citrus Fruits">
        <TreeContent>Citrus Fruits</TreeContent>
        <TreeItem id="orange" textValue="Orange">
          <TreeContent>Orange</TreeContent>
        </TreeItem>
        <TreeItem id="lemon" textValue="Lemon">
          <TreeContent>Lemon</TreeContent>
        </TreeItem>
        <TreeItem id="lime" textValue="Lime">
          <TreeContent>Lime</TreeContent>
        </TreeItem>
      </TreeItem>

      <TreeItem id="berries" textValue="Berries">
        <TreeContent>Berries</TreeContent>
        <TreeItem id="strawberry" textValue="Strawberry">
          <TreeContent>Strawberry</TreeContent>
        </TreeItem>
        <TreeItem id="blueberry" textValue="Blueberry">
          <TreeContent>Blueberry</TreeContent>
        </TreeItem>
        <TreeItem id="raspberry" textValue="Raspberry">
          <TreeContent>Raspberry</TreeContent>
        </TreeItem>
      </TreeItem>

      <TreeItem id="tropical" textValue="Tropical Fruits">
        <TreeContent>Tropical Fruits</TreeContent>
        <TreeItem id="mango" textValue="Mango">
          <TreeContent>Mango</TreeContent>
        </TreeItem>
        <TreeItem id="pineapple" textValue="Pineapple">
          <TreeContent>Pineapple</TreeContent>
        </TreeItem>
        <TreeItem id="banana" textValue="Banana">
          <TreeContent>Banana</TreeContent>
        </TreeItem>
      </TreeItem>
    </Tree>
  );
}
