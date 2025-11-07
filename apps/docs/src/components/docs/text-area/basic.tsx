"use client";

import { Textarea } from "@/components/ui/text-area";

export default function BasicTextarea() {
  return (
    <Textarea
      label="Synopsis"
      description="Write a short summary of the story, including key themes or plot points without giving away spoilers."
      className="max-w-72"
    />
  );
}
