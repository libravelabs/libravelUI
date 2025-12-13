"use client";

import React from "react";
import {
  MorphingCard,
  MorphingCardTrigger,
  MorphingCardContainer,
  MorphingCardContent,
  MorphingCardTitle,
  MorphingCardSubtitle,
  MorphingCardDescription,
  MorphingCardImage,
  MorphingCardClose,
} from "@/components/ui/motion/morphing-card";
import { Play, Bluetooth } from "lucide-react";
import { Button } from "@/components/ui/core/button";
import { motion } from "motion/react";

export default function BasicMorphingCard() {
  return (
    <MorphingCard>
      <MorphingCardTrigger className="w-[360px] h-[70px] rounded-2xl flex items-center px-3 gap-3 overflow-hidden shadow-md hover:shadow-lg transition-shadow">
        <MorphingCardImage
          src="https://upload.wikimedia.org/wikipedia/en/9/9f/Led_Zeppelin_-_Houses_of_the_Holy.jpg"
          alt="Houses of the Holy Album Cover"
          className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex flex-col flex-grow text-start">
          <MorphingCardTitle className="text-sm font-semibold">
            No Quarter •{" "}
            <motion.span layoutId="title">Led Zeppelin</motion.span>
          </MorphingCardTitle>
          <MorphingCardSubtitle className="text-xs text-primary">
            <Bluetooth className="inline size-3" /> Pleinhaus Studio
          </MorphingCardSubtitle>
        </div>
        <motion.div layoutId="play">
          <motion.svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {[10, 6, 3, 8, 5, 10].map((height, i) => (
              <motion.path
                key={i}
                d={`M${2 + i * 4} ${height}v${24 - (2 * height) / 1.5}`}
                initial={{ scaleY: 0.6, y: 0 }}
                animate={{
                  scaleY: [0.6, 1, 0.7, 1],
                  y: [0, -1, 0.5, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.svg>
        </motion.div>
      </MorphingCardTrigger>

      <MorphingCardContainer>
        <MorphingCardContent className="relative w-[460px] rounded-3xl overflow-hidden border shadow-2xl">
          <MorphingCardImage
            src="https://upload.wikimedia.org/wikipedia/en/9/9f/Led_Zeppelin_-_Houses_of_the_Holy.jpg"
            alt="Houses of the Holy Album Cover"
            className="w-full h-[280px] object-cover"
          />

          <div className="grid p-6 gap-4">
            <MorphingCardTitle className="text-2xl font-bold">
              No Quarter
            </MorphingCardTitle>
            <MorphingCardSubtitle className="text-sm text-foreground/60">
              <motion.span layoutId="title">Led Zeppelin</motion.span> • Houses
              of the Holy (1973)
            </MorphingCardSubtitle>

            <MorphingCardDescription className="text-sm text-foreground/70 leading-relaxed">
              A haunting, atmospheric journey blending rock, jazz, and
              psychedelic textures. John Paul Jones’ keyboards and Jimmy Page’s
              guitar create a chilling, timeless masterpiece.
            </MorphingCardDescription>

            <div className="flex items-center justify-between pt-2">
              <Button size="lg" radius="full">
                <motion.div layoutId="play">
                  <Play className="size-5" />
                </motion.div>{" "}
                Play
              </Button>
              <p className="text-sm text-foreground/50">Duration: 7:00</p>
            </div>
          </div>

          <MorphingCardClose />
        </MorphingCardContent>
      </MorphingCardContainer>
    </MorphingCard>
  );
}
