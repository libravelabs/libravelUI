"use client";

import * as React from "react";
import {
  FileTrigger,
  Button as ButtonPrimitive,
  type FileDropItem,
  isFileDropItem,
} from "react-aria-components";
import { File, Film, Music, Trash2, UploadCloud, X } from "lucide-react";
import { Label, Description } from "@/components/ui/core/field";
import { Badge } from "@/components/ui/core/badge";
import { Button } from "@/components/ui/core/button";
import {
  DropZone,
  dropZoneSizes,
  type DropZoneProps,
} from "@/components/ui/core/drop-zone";
import { motion, AnimatePresence } from "motion/react";
import { ProgressBar } from "@/components/ui/core/progress";
import { cn } from "@/lib/utils";

interface FileState {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: "uploading" | "completed" | "error";
}

interface DragAndDropProps extends DropZoneProps {
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  badge?: string;
  acceptedFileType?: AcceptedFileType | AcceptedFileType[];
  isLoading?: boolean;
  hidePreview?: boolean;
  files?: FileState[];
  errors?: string[];
  maxSize?: number;
  onError?: (error: string) => void;
  onFilesChange?: (files: FileState[]) => void;
  onErrorsChange?: (errors: string[]) => void;
  onFileAdd?: (file: FileState) => void;
  onFileRemove?: (file: FileState) => void;
  onClear?: () => void;
  disableErrorMessage?: boolean;
  isDisabled?: boolean;
  hideClearButton?: boolean;
  multiple?: boolean;
  classNames?: {
    wrapper?: string | string[];
    dropZone?: string | string[];
  };
}

function DragAndDrop({
  children,
  label = "Upload files",
  description = "Drag and drop or click to upload",
  badge,
  icon = <UploadCloud size={48} className="mb-4" />,
  acceptedFileType,
  isLoading,
  hidePreview = false,
  maxSize = Infinity,
  onError,
  files: controlledFiles,
  errors: controlledErrors,
  onFilesChange,
  onErrorsChange,
  onFileAdd,
  onFileRemove,
  onClear,
  disableErrorMessage = false,
  isDisabled = false,
  hideClearButton = false,
  size,
  className,
  classNames,
  multiple = false,
  ...props
}: DragAndDropProps) {
  const isAllTypes =
    !acceptedFileType ||
    (Array.isArray(acceptedFileType) && acceptedFileType.length === 0);
  const acceptedTypes = isAllTypes
    ? []
    : Array.isArray(acceptedFileType)
      ? acceptedFileType
      : [acceptedFileType];

  const [internalFiles, setInternalFiles] = React.useState<FileState[]>([]);
  const [internalErrors, setInternalErrors] = React.useState<string[]>([]);

  const files = controlledFiles ?? internalFiles;
  const errors =
    controlledErrors ?? (disableErrorMessage ? [] : internalErrors);

  const setFiles = (newFiles: FileState[]) => {
    onFilesChange?.(newFiles);
    if (!controlledFiles) setInternalFiles(newFiles);
  };

  const updateFiles = (updater: (prev: FileState[]) => FileState[]) => {
    if (controlledFiles) {
      const updated = updater(controlledFiles);
      onFilesChange?.(updated);
    } else {
      setInternalFiles((prev) => {
        const updated = updater(prev);
        onFilesChange?.(updated);
        return updated;
      });
    }
  };

  const setErrors = (newErrors: string[]) => {
    onErrorsChange?.(newErrors);
    if (!controlledErrors && !disableErrorMessage) setInternalErrors(newErrors);
  };

  const handleFiles = async (selected: File[]) => {
    const newErrors: string[] = [];
    const validFiles: File[] = [];

    for (const f of selected) {
      if (!isAllTypes && !acceptedTypes.includes(f.type as MimeType)) {
        newErrors.push(`Unsupported file format: ${f.name}`);
        continue;
      }
      if (f.size > maxSize * 1024 * 1024) {
        newErrors.push(`File "${f.name}" exceeds ${maxSize} MB.`);
        continue;
      }
      validFiles.push(f);
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      newErrors.forEach((err) => onError?.(err));
    } else {
      setErrors([]);
    }

    if (validFiles.length === 0) return;

    const newFileStates = validFiles.map((file) => {
      const fs: FileState = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
        status: "uploading",
      };
      onFileAdd?.(fs);
      return fs;
    });

    setFiles(multiple ? [...files, ...newFileStates] : newFileStates);

    newFileStates.forEach((fileState) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        updateFiles((prev) =>
          prev.map((f) =>
            f.id === fileState.id
              ? {
                  ...f,
                  progress: Math.min(progress, 100),
                  status: progress >= 100 ? "completed" : "uploading",
                }
              : f
          )
        );
        if (progress >= 100) clearInterval(interval);
      }, 300);
    });
  };

  return (
    <div className={cn("space-y-4", className, classNames?.wrapper)}>
      <DropZone
        {...props}
        isDisabled={isDisabled}
        getDropOperation={(types) =>
          isAllTypes
            ? "copy"
            : acceptedTypes.some((t) => types.has(t))
              ? "copy"
              : "cancel"
        }
        onDrop={async (e) => {
          const dropped = e.items.filter(isFileDropItem) as FileDropItem[];
          const selectedFiles = await Promise.all(
            dropped.map((f) => f.getFile())
          );
          handleFiles(multiple ? selectedFiles : selectedFiles.slice(0, 1));
        }}
        className="p-0"
      >
        {({ isDropTarget }) => (
          <FileTrigger
            allowsMultiple={multiple}
            {...(!isAllTypes && { acceptedFileTypes: acceptedTypes })}
            onSelect={(e) => {
              const selected = e ? Array.from(e) : [];
              handleFiles(multiple ? selected : selected.slice(0, 1));
            }}
          >
            <ButtonPrimitive
              isDisabled={isDisabled}
              className={cn(
                dropZoneSizes({ size }),
                "w-full p-6 rounded-lg",
                classNames?.dropZone
              )}
            >
              {(values) =>
                typeof children === "function" ? (
                  children(values)
                ) : children ? (
                  children
                ) : (
                  <div className="grid items-center justify-center">
                    <div className="mx-auto">{icon}</div>
                    <Label className="mx-auto text-lg">
                      {isDropTarget
                        ? multiple
                          ? "Drop files here"
                          : "Drop a file here"
                        : multiple
                          ? label
                          : label.replace(/files/i, "file")}
                    </Label>
                    {isDropTarget && (
                      <Label className="mx-auto mb-2">Release to upload</Label>
                    )}
                    <Description className="text-foreground/60">
                      {description}
                    </Description>
                    {badge && (
                      <Badge variant="outline" className="mx-auto mt-2">
                        {badge}
                      </Badge>
                    )}
                  </div>
                )
              }
            </ButtonPrimitive>
          </FileTrigger>
        )}
      </DropZone>

      {errors.length > 0 && !disableErrorMessage && (
        <div className="text-sm text-destructive font-medium">
          {errors.map((err, idx) => (
            <p key={idx}>{err}</p>
          ))}
        </div>
      )}

      {files.length > 0 && !hidePreview && (
        <>
          {!hideClearButton && (
            <div className="flex w-full items-center justify-between [&_button]:text-destructive">
              <span>{`File${multiple ? "s" : ""} (${files.length})`}</span>
              <Button
                onClick={() => {
                  setFiles([]);
                  setErrors([]);
                  onClear?.();
                }}
                variant="link"
              >
                <Trash2 className="size-3" />
                Clear all
              </Button>
            </div>
          )}

          <FilesPreview
            files={multiple ? files : files.slice(0, 1)}
            isLoading={isLoading}
            size={size}
            onRemove={(f) => {
              setFiles(files.filter((ff) => ff.file !== f.file));
              onFileRemove?.(f);
            }}
          />
        </>
      )}
    </div>
  );
}

interface FilesPreviewProps {
  files: FileState[];
  isLoading?: boolean;
  onRemove?: (file: FileState) => void;
  size?: DropZoneProps["size"];
}

function FilesPreview({ files, size, onRemove }: FilesPreviewProps) {
  const getFileType = (file: File) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (file.type.startsWith("application/") || file.type.startsWith("text/"))
      return "document";
    return "other";
  };

  return (
    <div className="w-full space-y-4 max-h-[28rem] overflow-y-auto">
      <AnimatePresence>
        {files.map((f) => {
          const type = getFileType(f.file);
          return (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              layout
              className="relative overflow-hidden rounded-lg border bg-muted shadow-sm"
            >
              <div className="w-full aspect-video bg-secondary/40 flex items-center justify-center max-h-52">
                {type === "image" ? (
                  <img
                    src={f.preview}
                    alt={f.file.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full flex flex-col items-center justify-center">
                    {type === "video" ? (
                      <Film className="size-10 opacity-60" />
                    ) : type === "audio" ? (
                      <Music className="size-10 opacity-60" />
                    ) : type === "document" ? (
                      <File className="size-10 opacity-60" />
                    ) : (
                      <UploadCloud className="size-10 opacity-60" />
                    )}
                    <span className="block text-xs mt-1 truncate max-w-full">
                      {f.file.name}
                    </span>
                  </div>
                )}

                {f.status === "completed" && (
                  <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="absolute inset-0 top-0"
                  >
                    <svg
                      viewBox="0 0 500 200"
                      preserveAspectRatio="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <radialGradient
                          id="gradient-1"
                          cx=".5"
                          cy="1.25"
                          r="1.15"
                        >
                          <stop offset="50%" stopColor="#000000"></stop>
                          <stop offset="56%" stopColor="#0a0a0a"></stop>
                          <stop offset="63%" stopColor="#262626"></stop>
                          <stop offset="69%" stopColor="#4f4f4f"></stop>
                          <stop offset="75%" stopColor="#808080"></stop>
                          <stop offset="81%" stopColor="#b1b1b1"></stop>
                          <stop offset="88%" stopColor="#dadada"></stop>
                          <stop offset="94%" stopColor="#f6f6f6"></stop>
                          <stop offset="100%" stopColor="#ffffff"></stop>
                        </radialGradient>
                        <mask id="mask-1">
                          <rect
                            x="0"
                            y="0"
                            width="500"
                            height="200"
                            fill="url(#gradient-1)"
                          ></rect>
                        </mask>
                      </defs>
                      <rect
                        x="0"
                        y="0"
                        width="500"
                        height="200"
                        fill="#4ade8080"
                        mask="url(#mask-1)"
                      ></rect>
                    </svg>
                  </motion.div>
                )}
                <div className="absolute inset-0 bottom-0 bg-gradient-to-t from-muted via-muted/30 to-transparent" />

                <div className="absolute bottom-2 start-2 text-muted-foreground">
                  {f.status === "uploading" ? (
                    <ProgressBar value={f.progress} />
                  ) : (
                    <>
                      <p className="text-sm font-medium truncate max-w-72 md:max-w-96">
                        {f.file.name}
                      </p>
                      <p className="text-xs opacity-80">
                        {(f.file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </>
                  )}
                </div>

                <div className="absolute bottom-2 end-2">
                  {f.status === "uploading" && (
                    <Badge variant="default">Uploading…</Badge>
                  )}
                  {f.status === "completed" && (
                    <Badge variant="success">Uploaded</Badge>
                  )}
                  {f.status === "error" && (
                    <Badge variant="destructive">Error</Badge>
                  )}
                </div>

                <Button
                  onClick={() => onRemove?.(f)}
                  size="icon"
                  variant="secondary"
                  className="absolute top-2 start-2 size-6"
                >
                  <X size={18} />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

type MimeType =
  | "image/png"
  | "image/jpeg"
  | "image/jpg"
  | "image/gif"
  | "image/webp"
  | "image/svg+xml"
  | "image/bmp"
  | "image/tiff"
  | "image/x-icon"
  | "video/mp4"
  | "video/webm"
  | "video/ogg"
  | "video/quicktime"
  | "video/x-msvideo"
  | "video/x-ms-wmv"
  | "audio/mpeg"
  | "audio/ogg"
  | "audio/wav"
  | "audio/webm"
  | "audio/aac"
  | "audio/flac"
  | "audio/mp4"
  | "application/pdf"
  | "application/msword"
  | "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  | "application/vnd.ms-excel"
  | "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  | "application/vnd.ms-powerpoint"
  | "application/vnd.openxmlformats-officedocument.presentationml.presentation"
  | "application/rtf"
  | "text/plain"
  | "text/csv"
  | "application/json"
  | "application/xml"
  | "text/html"
  | "application/zip"
  | "application/x-7z-compressed"
  | "application/x-rar-compressed"
  | "application/x-tar"
  | "application/gzip"
  | "application/javascript"
  | "application/typescript"
  | "text/javascript"
  | "text/css"
  | "text/markdown"
  | "application/x-sh"
  | "application/x-python-code"
  | "application/java-archive";

type AcceptedFileType = MimeType;

export { DragAndDrop };
export type {
  FileState,
  MimeType,
  AcceptedFileType,
  FilesPreviewProps,
  DragAndDropProps,
};
