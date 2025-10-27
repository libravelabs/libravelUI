"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuGroup,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "@/components/ui/context-menu";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import {
  MessageSquare,
  Reply,
  Edit,
  Trash2,
  Smile,
  Copy,
  Pin,
  Flag,
  Share2,
  CheckCircle2,
  Laugh,
  Heart,
  Angry,
  MoreHorizontal,
} from "lucide-react";

export default function WithCardContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="p-2 [&>*]:p-2">
          <CardContent className="flex flex-col gap-2">
            <CardDescription className="text-foreground">
              “Hey, are we still on for tomorrow’s meeting at 10 AM?”
            </CardDescription>
            <span className="text-xs text-muted-foreground self-end">
              10:21 AM
            </span>
          </CardContent>
        </Card>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuGroup title="Message Actions">
          <ContextMenuItem>
            <Reply className="size-4" /> Reply
          </ContextMenuItem>
          <ContextMenuItem>
            <Copy className="size-4" /> Copy Text
          </ContextMenuItem>
          <ContextMenuItem>
            <Pin className="size-4" /> Pin Message
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem>
            <Edit className="size-4" /> Edit Message
          </ContextMenuItem>
          <ContextMenuItem variant="destructive">
            <Trash2 className="size-4" /> Delete Message
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuSub>
          <ContextMenuSubTrigger>
            <Smile className="size-4" /> React
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="grid grid-cols-3 gap-2 p-2">
            <ContextMenuItem className="justify-center">
              <Laugh className="size-5 text-yellow-500" />
            </ContextMenuItem>
            <ContextMenuItem className="justify-center">
              <Heart className="size-5 text-red-500" />
            </ContextMenuItem>
            <ContextMenuItem className="justify-center">
              <CheckCircle2 className="size-5 text-green-500" />
            </ContextMenuItem>
            <ContextMenuItem className="justify-center">
              <Angry className="size-5 text-orange-500" />
            </ContextMenuItem>
            <ContextMenuItem className="justify-center">
              <Flag className="size-5 text-gray-500" />
            </ContextMenuItem>
            <ContextMenuItem className="justify-center">
              <MoreHorizontal className="size-5 text-muted-foreground" />
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSeparator />

        <ContextMenuGroup title="More Options">
          <ContextMenuItem>
            <Share2 className="size-4" /> Share Message
          </ContextMenuItem>
          <ContextMenuItem>
            <MessageSquare className="size-4" /> View Thread
          </ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
