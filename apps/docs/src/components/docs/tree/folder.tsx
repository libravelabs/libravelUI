"use client";

import { Tree, TreeItem, TreeContent } from "@/components/ui/tree";
import { Folder, FolderOpen, File } from "lucide-react";

export default function FolderTree() {
  return (
    <Tree aria-label="File Explorer">
      <TreeItem id="src" textValue="src">
        <TreeContent>
          {({ isExpanded }) => (
            <>
              {isExpanded ? (
                <FolderOpen className="text-primary mr-2 size-4" />
              ) : (
                <Folder className="fill-primary text-primary mr-2 size-4" />
              )}
              src
            </>
          )}
        </TreeContent>

        <TreeItem id="components" textValue="components">
          <TreeContent>
            {({ isExpanded }) => (
              <>
                {isExpanded ? (
                  <FolderOpen className="text-primary mr-2 size-4" />
                ) : (
                  <Folder className="fill-primary text-primary mr-2 size-4" />
                )}
                components
              </>
            )}
          </TreeContent>

          <TreeItem id="button" textValue="Button.tsx">
            <TreeContent>
              <File className="mr-2 size-4" />
              button.tsx
            </TreeContent>
          </TreeItem>
          <TreeItem id="tree" textValue="Tree.tsx">
            <TreeContent>
              <File className="mr-2 size-4" />
              tree.tsx
            </TreeContent>
          </TreeItem>
        </TreeItem>

        <TreeItem id="pages" textValue="pages">
          <TreeContent>
            {({ isExpanded }) => (
              <>
                {isExpanded ? (
                  <FolderOpen className="text-primary mr-2 size-4" />
                ) : (
                  <Folder className="fill-primary text-primary mr-2 size-4" />
                )}
                pages
              </>
            )}
          </TreeContent>

          <TreeItem id="index" textValue="index.tsx">
            <TreeContent>
              <File className="mr-2 size-4" />
              index.tsx
            </TreeContent>
          </TreeItem>
          <TreeItem id="about" textValue="about.tsx">
            <TreeContent>
              <File className="mr-2 size-4" />
              about.tsx
            </TreeContent>
          </TreeItem>
        </TreeItem>

        <TreeItem id="utils" textValue="utils">
          <TreeContent>
            {({ isExpanded }) => (
              <>
                {isExpanded ? (
                  <FolderOpen className="text-primary mr-2 size-4" />
                ) : (
                  <Folder className="fill-primary text-primary mr-2 size-4" />
                )}
                utils
              </>
            )}
          </TreeContent>

          <TreeItem id="helpers" textValue="helpers.ts">
            <TreeContent>
              <File className="mr-2 size-4" />
              helpers.ts
            </TreeContent>
          </TreeItem>
        </TreeItem>
      </TreeItem>

      <TreeItem id="public" textValue="public">
        <TreeContent>
          {({ isExpanded }) => (
            <>
              {isExpanded ? (
                <FolderOpen className="text-primary mr-2 size-4" />
              ) : (
                <Folder className="fill-primary text-primary mr-2 size-4" />
              )}
              public
            </>
          )}
        </TreeContent>

        <TreeItem id="favicon" textValue="favicon.ico">
          <TreeContent>
            <File className="mr-2 size-4" />
            favicon.ico
          </TreeContent>
        </TreeItem>
        <TreeItem id="robots" textValue="robots.txt">
          <TreeContent>
            <File className="mr-2 size-4" />
            robots.txt
          </TreeContent>
        </TreeItem>
      </TreeItem>

      <TreeItem id="package-json" textValue="package.json">
        <TreeContent>
          <File className="mr-2 size-4" />
          package.json
        </TreeContent>
      </TreeItem>

      <TreeItem id="readme" textValue="README.md">
        <TreeContent>
          <File className="mr-2 size-4" />
          README.md
        </TreeContent>
      </TreeItem>
    </Tree>
  );
}
