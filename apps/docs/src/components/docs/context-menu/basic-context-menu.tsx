"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuDescription,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import {
  File,
  Plus,
  Trash2,
  Undo2,
  Redo2,
  Cog,
  SwatchBook,
  Cpu,
  Pencil,
  HelpCircle,
  Info,
  BookOpen,
} from "lucide-react";

export function BasicContextMenuBase() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-36 w-72 border-2 border-dashed rounded-xl flex items-center justify-center text-sm text-muted-foreground">
        Right click anywhere in this box
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuGroup title="File Actions">
          <ContextMenuItem>
            <Plus />
            <div>
              <ContextMenuLabel>New File</ContextMenuLabel>
              <ContextMenuDescription>
                Create a brand new file in the current workspace
              </ContextMenuDescription>
            </div>
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <File />
            Open File
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash2 /> Delete File
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup title="Edit">
          <ContextMenuItem>
            <Undo2 />
            Undo
          </ContextMenuItem>
          <ContextMenuItem>
            <Redo2 />
            Redo
          </ContextMenuItem>

          <ContextMenuSub>
            <ContextMenuSubTrigger>Preferences</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>
                <div>
                  <ContextMenuLabel>
                    <Cog />
                    Settings
                  </ContextMenuLabel>
                  <ContextMenuDescription>
                    Access and customize general application settings
                  </ContextMenuDescription>
                </div>
              </ContextMenuItem>
              <ContextMenuItem>
                <SwatchBook />
                Themes
              </ContextMenuItem>
              <ContextMenuItem isDisabled>
                <Cpu />
                Advanced
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem isDisabled>
            <Pencil />
            Edit Settings
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuItem inset>
          <HelpCircle />
          Help
        </ContextMenuItem>
        <ContextMenuItem>
          <div>
            <ContextMenuLabel>
              <BookOpen />
              Documentation
            </ContextMenuLabel>
            <ContextMenuDescription>
              View comprehensive guides, API references, and examples
            </ContextMenuDescription>
          </div>
        </ContextMenuItem>
        <ContextMenuItem>
          <Info />
          About
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const BasicContextMenuCode = `"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuDescription,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import {
  File,
  Plus,
  Trash2,
  Undo2,
  Redo2,
  Cog,
  SwatchBook,
  Cpu,
  Pencil,
  HelpCircle,
  Info,
  BookOpen,
} from "lucide-react";

export function BasicContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="h-36 w-72 border-2 border-dashed rounded-xl flex items-center justify-center text-sm text-muted-foreground">
        Right click anywhere in this box
      </ContextMenuTrigger>

      <ContextMenuContent className="w-64">
        <ContextMenuGroup title="File Actions">
          <ContextMenuItem>
            <Plus />
            <div>
              <ContextMenuLabel>New File</ContextMenuLabel>
              <ContextMenuDescription>
                Create a brand new file in the current workspace
              </ContextMenuDescription>
            </div>
            <ContextMenuShortcut>⌘N</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem>
            <File />
            Open File
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem variant="destructive">
            <Trash2 /> Delete File
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup title="Edit">
          <ContextMenuItem>
            <Undo2 />
            Undo
          </ContextMenuItem>
          <ContextMenuItem>
            <Redo2 />
            Redo
          </ContextMenuItem>

          <ContextMenuSub>
            <ContextMenuSubTrigger>Preferences</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>
                <div>
                  <ContextMenuLabel>
                    <Cog />
                    Settings
                  </ContextMenuLabel>
                  <ContextMenuDescription>
                    Access and customize general application settings
                  </ContextMenuDescription>
                </div>
              </ContextMenuItem>
              <ContextMenuItem>
                <SwatchBook />
                Themes
              </ContextMenuItem>
              <ContextMenuItem isDisabled>
                <Cpu />
                Advanced
              </ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem isDisabled>
            <Pencil />
            Edit Settings
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuItem inset>
          <HelpCircle />
          Help
        </ContextMenuItem>
        <ContextMenuItem>
          <div>
            <ContextMenuLabel>
              <BookOpen />
              Documentation
            </ContextMenuLabel>
            <ContextMenuDescription>
              View comprehensive guides, API references, and examples
            </ContextMenuDescription>
          </div>
        </ContextMenuItem>
        <ContextMenuItem>
          <Info />
          About
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
`;
