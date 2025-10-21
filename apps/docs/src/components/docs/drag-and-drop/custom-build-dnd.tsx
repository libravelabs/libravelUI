"use client";

import { useState } from "react";
import { DragAndDrop, type FileState } from "@/components/ui/drag-and-drop";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CustomBuildDragAndDropBase() {
  const defaultImage: string =
    "https://image.tmdb.org/t/p/original/5MVSXJieOhbyZudCnV1H4YJpfPV.jpg";
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);

  const handleFilesChange = (files: FileState[]) => {
    if (
      files.length > 0 &&
      files[0] &&
      "file" in files[0] &&
      files[0].file instanceof File
    ) {
      const url = URL.createObjectURL(files[0].file);
      setPreviewUrl(url);
    } else {
      return;
    }
  };

  return (
    <div className="grid gap-2">
      <DragAndDrop
        acceptedFileType={[
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/gif",
          "image/webp",
          "image/svg+xml",
          "image/bmp",
          "image/tiff",
          "image/x-icon",
        ]}
        hidePreview
        onFilesChange={handleFilesChange}
        classNames={{ dropZone: "p-4" }}
      >
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            className="object-cover w-auto h-auto pointer-events-none rounded-lg"
            width={1280}
            height={720}
          />
        )}
        <div className="z-10 text-center space-y-1 mt-3 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-primary">
            Drop or Click to Replace Image
          </p>
          <p className="text-sm text-muted-foreground">
            Click or drag an image file here to change this image.
          </p>
        </div>
      </DragAndDrop>
      {previewUrl !== defaultImage && (
        <Button variant="outline" onClick={() => setPreviewUrl(defaultImage)}>
          Clear Image
        </Button>
      )}
    </div>
  );
}

export const CustomBuildDragAndDropCode = `"use client";

import { useState } from "react";
import { DragAndDrop, type FileState } from "@/components/ui/drag-and-drop";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CustomBuildDragAndDropBase() {
  const defaultImage: string =
    "https://image.tmdb.org/t/p/original/5MVSXJieOhbyZudCnV1H4YJpfPV.jpg";
  const [previewUrl, setPreviewUrl] = useState<string | null>(defaultImage);

  const handleFilesChange = (files: FileState[]) => {
    if (
      files.length > 0 &&
      files[0] &&
      "file" in files[0] &&
      files[0].file instanceof File
    ) {
      const url = URL.createObjectURL(files[0].file);
      setPreviewUrl(url);
    } else {
      return;
    }
  };

  return (
    <div className="grid gap-2">
      <DragAndDrop
        acceptedFileType={[
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/gif",
          "image/webp",
          "image/svg+xml",
          "image/bmp",
          "image/tiff",
          "image/x-icon",
        ]}
        hidePreview
        onFilesChange={handleFilesChange}
        classNames={{ dropZone: "p-4" }}
      >
        {previewUrl && (
          <Image
            src={previewUrl}
            alt="Preview"
            className="object-cover w-auto h-auto pointer-events-none rounded-lg"
            width={1280}
            height={720}
          />
        )}
        <div className="z-10 text-center space-y-1 mt-3 flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-primary">
            Drop or Click to Replace Image
          </p>
          <p className="text-sm text-muted-foreground">
            Click or drag an image file here to change this image.
          </p>
        </div>
      </DragAndDrop>
      {previewUrl !== defaultImage && (
        <Button variant="outline" onClick={() => setPreviewUrl(defaultImage)}>
          Clear Image
        </Button>
      )}
    </div>
  );
}`;
