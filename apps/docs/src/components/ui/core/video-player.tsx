import React from "react";
// import ReactPlayer from "react-player";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
// import type { ReactPlayerProps } from "react-player/types";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
} from "lucide-react";

const videoPlayerVariants = cva(
  "group relative w-full bg-popover/50 backdrop-blur-sm rounded-card overflow-hidden aspect-video rounded-xl",
  {
    variants: {
      size: {
        sm: "max-w-md",
        default: "max-w-2xl",
        lg: "max-w-4xl",
        full: "w-full",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface VideoPlayerProps
  // extends ReactPlayerProps,
  extends VariantProps<typeof videoPlayerVariants> {
  src: string;
  poster?: string;
  showControls?: boolean;
  autoHide?: boolean;
  className?: string;
}

function VideoPlayer({
  src,
  size,
  className,
  poster,
  showControls = true,
  ...props
}: VideoPlayerProps) {
  return (
    <div className={cn(videoPlayerVariants({ size }), className)}>
      {/* <ReactPlayer
        className="object-cover"
        src={src}
        light={poster}
        controls={false}
        width="100%"
        height="100%"
        {...props}
      /> */}

      {showControls && <Controls />}
    </div>
  );
}

function Controls() {
  const duration = 100;
  const currentTime = 70;

  return (
    <div className="absolute bottom-10 w-full bg-popover/50 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="px-4 py-3 flex items-center gap-3">
        <input
          type="range"
          min={0}
          max={duration || 0}
          value={currentTime}
          className="w-full h-1 bg-primary/30 rounded-full appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary 
                        [&::-webkit-slider-thumb]: [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200
                        group-hover/progress:[&::-webkit-slider-thumb]:scale-125"
          style={{
            background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${
              (currentTime / duration) * 100
            }%, rgba(255,255,255,0.3) ${
              (currentTime / duration) * 100
            }%, rgba(255,255,255,0.3) 100%)`,
          }}
        />
      </div>
    </div>
  );
}

export { VideoPlayer };
export type { VideoPlayerProps };
