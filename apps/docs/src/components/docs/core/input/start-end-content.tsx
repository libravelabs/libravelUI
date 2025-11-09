"use client";

import { Input } from "@/components/ui/core/field";
import { Info, Image } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/core/tooltip";

export default function StartEndContentInput() {
  return (
    <div className="grid gap-4 w-full max-w-md">
      <Input
        id="start-content"
        type="text"
        label="Title"
        placeholder="2001: A Space Odyssey"
        endContent={
          <Tooltip>
            <TooltipTrigger plain>
              <Info />
            </TooltipTrigger>
            <TooltipContent className="max-w-52">
              Enter the official movie title as it appears on posters or
              streaming platforms.
            </TooltipContent>
          </Tooltip>
        }
      />
      <div className="grid grid-cols-2 gap-2 w-full">
        <Input
          id="end-content"
          label="Poster Path"
          placeholder="/poster/2001-a-space-odyssey.jpg"
          startContent={<Image />}
        />
        <Input
          id="start-end-content"
          label="Backdrop"
          placeholder="/backdrop/2001-a-space-odyssey.jpg"
          startContent={<Image />}
          endContent={
            <Tooltip>
              <TooltipTrigger plain>
                <Info />
              </TooltipTrigger>
              <TooltipContent className="max-w-52">
                a large, high-quality image that represents a movie or TV
                show&apos;s atmosphere and content, often extracted from a scene
                itself
              </TooltipContent>
            </Tooltip>
          }
        />
      </div>
    </div>
  );
}
