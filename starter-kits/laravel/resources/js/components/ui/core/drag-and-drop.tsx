import * as React from 'react';
import {
    FileTrigger,
    Button as ButtonPrimitive,
    type FileDropItem,
    isFileDropItem,
} from 'react-aria-components';
import { File, Film, Music, Trash2, UploadCloud, X } from 'lucide-react';
import { Label, Description } from '@/components/ui/core/field';
import { Badge } from '@/components/ui/core/badge';
import { Button } from '@/components/ui/core/button';
import {
    DropZone,
    dropZoneVariants,
    type DropZoneProps,
} from '@/components/ui/core/drop-zone';
import { motion, AnimatePresence } from 'motion/react';
import { ProgressBar } from '@/components/ui/core/progress';
import { cn } from '@/lib/utils';

interface FileState {
    id: string;
    file: File;
    preview: string;
    progress?: number;
    status?: 'uploading' | 'completed' | 'error';
}

interface DragAndDropProps extends DropZoneProps {
    icon?: React.ReactNode;
    label?: string;
    description?: string;
    badge?: string;
    acceptedFileType?: string | string[];
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
    label = 'Upload files',
    description = 'Drag and drop or click to upload',
    badge,
    icon = <UploadCloud size={48} className="mb-4" />,
    acceptedFileType,
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
    const [internalFiles, setInternalFiles] = React.useState<FileState[]>([]);
    const [internalErrors, setInternalErrors] = React.useState<string[]>([]);

    const files = controlledFiles ?? internalFiles;
    const errors =
        controlledErrors ?? (disableErrorMessage ? [] : internalErrors);

    const setFiles = (next: FileState[]) => {
        onFilesChange?.(next);
        if (!controlledFiles) setInternalFiles(next);
    };

    const setErrors = (next: string[]) => {
        onErrorsChange?.(next);
        if (!controlledErrors && !disableErrorMessage) {
            setInternalErrors(next);
        }
    };

    const handleFiles = (selected: File[]) => {
        const nextErrors: string[] = [];
        const validFiles: File[] = [];

        for (const f of selected) {
            if (f.size > maxSize * 1024 * 1024) {
                nextErrors.push(`File "${f.name}" exceeds ${maxSize} MB.`);
                continue;
            }
            validFiles.push(f);
        }

        if (nextErrors.length > 0) {
            setErrors(nextErrors);
            nextErrors.forEach((err) => onError?.(err));
        } else {
            setErrors([]);
        }

        if (validFiles.length === 0) return;

        const next = validFiles.map((file) => {
            const state: FileState = {
                id: crypto.randomUUID(),
                file,
                preview: URL.createObjectURL(file),
            };
            onFileAdd?.(state);
            return state;
        });

        setFiles(multiple ? [...files, ...next] : next);
    };

    return (
        <div className={cn('space-y-4', className, classNames?.wrapper)}>
            <DropZone
                {...props}
                data-drag-and-drop
                isDisabled={isDisabled}
                onDrop={async (e) => {
                    const dropped = e.items.filter(
                        isFileDropItem,
                    ) as FileDropItem[];
                    const selected = await Promise.all(
                        dropped.map((f) => f.getFile()),
                    );
                    handleFiles(multiple ? selected : selected.slice(0, 1));
                }}
                className="p-0"
            >
                {({ isDropTarget }) => (
                    <FileTrigger
                        allowsMultiple={multiple}
                        acceptedFileTypes={
                            typeof acceptedFileType === 'string'
                                ? acceptedFileType.split(',')
                                : acceptedFileType
                        }
                        onSelect={(e) => {
                            const files = e ? Array.from(e) : [];
                            handleFiles(multiple ? files : files.slice(0, 1));
                        }}
                    >
                        <ButtonPrimitive
                            isDisabled={isDisabled}
                            className={cn(
                                dropZoneVariants({ size }),
                                'w-full rounded-lg p-6',
                                classNames?.dropZone,
                            )}
                        >
                            {(values) =>
                                typeof children === 'function' ? (
                                    children({ ...values, isDropTarget })
                                ) : (
                                    <div className="grid items-center justify-center">
                                        <div className="mx-auto">{icon}</div>
                                        <Label className="mx-auto text-lg">
                                            {isDropTarget
                                                ? multiple
                                                    ? 'Drop files here'
                                                    : 'Drop a file here'
                                                : multiple
                                                  ? label
                                                  : label.replace(
                                                        /files/i,
                                                        'file',
                                                    )}
                                        </Label>
                                        {isDropTarget && (
                                            <Label className="mx-auto mb-2">
                                                Release to upload
                                            </Label>
                                        )}
                                        <Description className="text-foreground/60">
                                            {description}
                                        </Description>
                                        {badge && (
                                            <Badge
                                                tone="outline"
                                                className="mx-auto mt-2"
                                            >
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
                <div className="text-sm font-medium text-destructive">
                    {errors.map((err, idx) => (
                        <p key={idx}>{err}</p>
                    ))}
                </div>
            )}

            {files.length > 0 && !hidePreview && (
                <>
                    {!hideClearButton && (
                        <div className="flex w-full items-center justify-between [&_button]:text-destructive">
                            <span>{`File${multiple ? 's' : ''} (${files.length})`}</span>
                            <Button
                                onClick={() => {
                                    setFiles([]);
                                    setErrors([]);
                                    onClear?.();
                                }}
                                tone="link"
                            >
                                <Trash2 className="size-3" />
                                Clear all
                            </Button>
                        </div>
                    )}

                    <FilesPreview
                        files={multiple ? files : files.slice(0, 1)}
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
    onRemove?: (file: FileState) => void;
}

function FilesPreview({ files, onRemove }: FilesPreviewProps) {
    const getFileType = (file: File) => {
        if (file.type.startsWith('image/')) return 'image';
        if (file.type.startsWith('video/')) return 'video';
        if (file.type.startsWith('audio/')) return 'audio';
        if (
            file.type.startsWith('application/') ||
            file.type.startsWith('text/')
        )
            return 'document';
        return 'other';
    };

    return (
        <div className="max-h-112 w-full space-y-4 overflow-y-auto">
            <AnimatePresence>
                {files.map((f) => {
                    const type = getFileType(f.file);

                    const hasProgress =
                        f.status === 'uploading' &&
                        typeof f.progress === 'number';

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
                            <div className="flex aspect-video max-h-52 w-full items-center justify-center bg-secondary/40">
                                {type === 'image' ? (
                                    <img
                                        src={f.preview}
                                        alt={f.file.name}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <div className="flex w-full flex-col items-center justify-center">
                                        {type === 'video' ? (
                                            <Film className="size-10 opacity-60" />
                                        ) : type === 'audio' ? (
                                            <Music className="size-10 opacity-60" />
                                        ) : type === 'document' ? (
                                            <File className="size-10 opacity-60" />
                                        ) : (
                                            <UploadCloud className="size-10 opacity-60" />
                                        )}
                                        <span className="mt-1 block max-w-40 truncate text-xs">
                                            {f.file.name}
                                        </span>
                                    </div>
                                )}

                                {f.status === 'completed' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: 'easeOut',
                                        }}
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
                                                    <stop
                                                        offset="50%"
                                                        stopColor="#000000"
                                                    ></stop>
                                                    <stop
                                                        offset="56%"
                                                        stopColor="#0a0a0a"
                                                    ></stop>
                                                    <stop
                                                        offset="63%"
                                                        stopColor="#262626"
                                                    ></stop>
                                                    <stop
                                                        offset="69%"
                                                        stopColor="#4f4f4f"
                                                    ></stop>
                                                    <stop
                                                        offset="75%"
                                                        stopColor="#808080"
                                                    ></stop>
                                                    <stop
                                                        offset="81%"
                                                        stopColor="#b1b1b1"
                                                    ></stop>
                                                    <stop
                                                        offset="88%"
                                                        stopColor="#dadada"
                                                    ></stop>
                                                    <stop
                                                        offset="94%"
                                                        stopColor="#f6f6f6"
                                                    ></stop>
                                                    <stop
                                                        offset="100%"
                                                        stopColor="#ffffff"
                                                    ></stop>
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
                                <div className="absolute inset-0 bottom-0 bg-linear-to-t from-muted via-muted/30 to-transparent" />

                                <div className="absolute start-2 bottom-2 text-muted-foreground">
                                    {hasProgress ? (
                                        <ProgressBar value={f.progress} />
                                    ) : (
                                        <>
                                            <p className="max-w-60 truncate text-sm font-medium">
                                                {f.file.name}
                                            </p>
                                            <p className="text-xs opacity-80">
                                                {(
                                                    f.file.size /
                                                    (1024 * 1024)
                                                ).toFixed(2)}{' '}
                                                MB
                                            </p>
                                        </>
                                    )}
                                </div>

                                <div className="absolute end-2 bottom-2">
                                    {f.status === 'uploading' && (
                                        <Badge tone="default">Uploading…</Badge>
                                    )}
                                    {f.status === 'completed' && (
                                        <Badge tone="success">Uploaded</Badge>
                                    )}
                                    {f.status === 'error' && (
                                        <Badge tone="destructive">Error</Badge>
                                    )}
                                </div>

                                <Button
                                    onClick={() => onRemove?.(f)}
                                    iconOnly
                                    tone="secondary"
                                    className="absolute start-2 top-2 size-6"
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

export { DragAndDrop };
export type { FileState, FilesPreviewProps, DragAndDropProps };
