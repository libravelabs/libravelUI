"use client";

import { Button } from "@/components/ui/core/button";
import {
  MorphingCard,
  MorphingCardTrigger,
  MorphingCardContent,
  MorphingCardImage,
  MorphingCardTitle,
  MorphingCardClose,
  MorphingCardDescription,
  MorphingCardContainer,
} from "@/components/ui/motion/morphing-card";
import { Play } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

interface MovieDetail {
  label: string;
  value: string | string[];
  layoutId?: string;
}

interface Movie {
  title: string;
  logo: string;
  image: string;
  airDate: string;
  genres: string;
  ageRating: string;
  tagline: string;
  description: string;
  details: MovieDetail[];
}

const movies: Movie[] = [
  {
    title: "Better Call Saul",
    logo: "/hwxBWyoeTefjafeqkIONxl0mXUV.png",
    image: "/hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg",
    airDate: "2015 — 2022",
    genres: "Crime, Drama",
    ageRating: "TV‑MA",
    tagline: 'Putting the "criminal" in "criminal lawyer"',
    description:
      "The story of Jimmy McGill, a struggling lawyer whose moral compromises and ambition transform him into Saul Goodman — the infamous attorney we later meet in Breaking Bad.",
    details: [
      { label: "Air Date", value: "2015 — 2022", layoutId: "air-date" },
      { label: "Genre", value: "Crime, Drama", layoutId: "genres" },
      { label: "Creator", value: ["Vince Gilligan", "Peter Gould"] },
      {
        label: "Casts",
        value: [
          "Bob Odenkirk",
          "Rhea Seehorn",
          "Jonathan Banks",
          "Giancarlo Esposito",
        ],
      },
      { label: "Country", value: "United States" },
      { label: "Language", value: "English" },
      { label: "Seasons", value: "6" },
      { label: "Episodes", value: "63" },
      { label: "Content Rating", value: "TV‑MA (Mature Audiences)" },
      {
        label: "Production Companies",
        value: [
          "Sony Pictures Television",
          "AMC Studios",
          "Gran Via Productions",
          "High Bridge Productions",
          "Crystal Diner Productions",
        ],
      },
    ],
  },
  {
    title: "Breaking Bad",
    logo: "/chw44B2VnLha8iiTdyZcIW0ZELC.png",
    image: "/63FA8vwSZnXkGxedrDQwni4JuZN.jpg",
    airDate: "2008 — 2013",
    genres: "Crime, Drama, Thriller",
    ageRating: "TV‑14",
    tagline: "All bad things must come to an end.",
    description:
      "Set in Albuquerque, New Mexico, high‑school chemistry teacher Walter White discovers he has lung cancer and turns to manufacturing methamphetamine to secure his family’s future.",
    details: [
      { label: "Air Date", value: "2008 — 2013", layoutId: "air-date" },
      { label: "Genre", value: "Crime, Drama, Thriller", layoutId: "genres" },
      { label: "Creator", value: ["Vince Gilligan"] },
      {
        label: "Casts",
        value: [
          "Bryan Cranston",
          "Aaron Paul",
          "Anna Gunn",
          "Dean Norris",
          "RJ Mitte",
          "Bob Odenkirk",
          "Jonathan Banks",
          "Giancarlo Esposito",
        ],
      },
      { label: "Country", value: "United States" },
      { label: "Language", value: "English" },
      { label: "Seasons", value: "5" },
      { label: "Episodes", value: "62" },
      { label: "Content Rating", value: "TV‑14 (Mature Audiences)" },
      {
        label: "Production Companies",
        value: [
          "Sony Pictures Television",
          "High Bridge Productions",
          "Gran Via Productions",
          "Cherry Pie Productions",
        ],
      },
    ],
  },
  {
    title: "The Boys",
    logo: "/xawDgfkBQaocXR9CljBMjkYpXNK.png",
    image: "/2y7BDpZEFeMOJ7PHhozjAbxFfef.jpg",
    airDate: "2019 — present",
    genres: "Action, Black Comedy, Drama, Superhero",
    ageRating: "TV‑MA",
    tagline: "Never meet your heroes.",
    description:
      "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes who abuse their powers for personal gain and work for a powerful company (Vought International).",
    details: [
      { label: "Air Date", value: "2019 — present", layoutId: "air-date" },
      {
        label: "Genre",
        value: "Action, Black Comedy, Drama, Superhero",
        layoutId: "genres",
      },
      { label: "Developer", value: ["Eric Kripke"] },
      {
        label: "Casts",
        value: [
          "Karl Urban",
          "Jack Quaid",
          "Antony Starr",
          "Erin Moriarty",
          "Jessie T. Usher",
        ],
      },
      { label: "Country", value: "United States" },
      { label: "Language", value: "English" },
      { label: "Seasons", value: "4 (as of 2025)" },
      { label: "Episodes", value: "32 (as of 2025)" },
      { label: "Content Rating", value: "TV‑MA (Mature Audiences)" },
      {
        label: "Production Companies",
        value: [
          "Amazon Studios",
          "Original Film",
          "Point Grey Pictures",
          "Sony Pictures Television",
          "Kripke Enterprises",
        ],
      },
    ],
  },
  {
    title: "True Detective",
    logo: "/6q4KzOcM2eEE1IbhFTadUsQkphl.png",
    image: "/bPLRjO2pcBx0WL73WUPzuNzQ3YN.jpg",
    airDate: "2014 — present",
    genres: "Anthology, Crime Drama, Mystery‑Thriller",
    ageRating: "TV‑MA",
    tagline: "The truth lies in the dark.",
    description:
      "An anthology crime drama series in which police investigations unearth the personal and professional secrets of those involved, both within and outside the law.",
    details: [
      { label: "Air Date", value: "2014 — present", layoutId: "air-date" },
      {
        label: "Genre",
        value: "Anthology, Crime Drama, Mystery‑Thriller",
        layoutId: "genres",
      },
      { label: "Creator", value: ["Nic Pizzolatto"] },
      {
        label: "Casts",
        value: [
          "Matthew McConaughey",
          "Woody Harrelson",
          "Mahershala Ali",
          "Jodie Foster",
        ],
      },
      { label: "Country", value: "United States" },
      { label: "Language", value: "English" },
      { label: "Seasons", value: "4 (as of 2024)" },
      { label: "Episodes", value: "32 (as of 2024)" },
      { label: "Content Rating", value: "TV‑MA (Mature Audiences)" },
      {
        label: "Production Companies",
        value: ["HBO Entertainment", "Anonymous Content", "Passenger"],
      },
    ],
  },
];

export default function BasicMorphingCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {movies.map((data, id) => (
        <MovieDetailCard key={id} data={data} />
      ))}
    </div>
  );
}

function MovieDetailCard({ data }: { data: Movie }) {
  return (
    <MorphingCard>
      <MorphingCardTrigger className="w-[260px] rounded-xl overflow-hidden border flex flex-col">
        <MorphingCardImage
          src={`https://image.tmdb.org/t/p/w780/${data.image}`}
          alt={`${data.title} image`}
          className="w-full h-full object-cover"
        />
        <div className="grid p-3 text-start">
          <MorphingCardTitle className="text-sm font-semibold">
            {data.title} (
            <motion.span layoutId="air-date">{data.airDate}</motion.span>)
          </MorphingCardTitle>
          <motion.span layoutId="genres" className="text-xs opacity-70">
            {data.genres}
          </motion.span>
        </div>
      </MorphingCardTrigger>

      <MorphingCardContainer>
        <MorphingCardContent className="relative w-md rounded-2xl border overflow-hidden flex flex-col">
          {({ setIsOpen }) => (
            <>
              <MorphingCardImage
                src={`https://image.tmdb.org/t/p/w780/${data.image}`}
                alt={`${data.title} image`}
                className="w-full h-full object-cover"
              />
              <div className="p-4 overflow-auto">
                <MorphingCardTitle className="text-base font-semibold mb-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w92/${data.logo}`}
                    alt={data.title}
                  />
                </MorphingCardTitle>
                <span className="text-sm font-bold">{data.tagline}</span>
                <MorphingCardDescription className="text-sm my-3 leading-relaxed opacity-80">
                  {data.description}
                </MorphingCardDescription>

                <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1 text-xs opacity-70">
                  {data.details.map((item, idx) => {
                    const isMotion = item.layoutId ? true : false;
                    const value = Array.isArray(item.value)
                      ? item.value.join(", ")
                      : item.value;

                    return (
                      <React.Fragment key={idx}>
                        <strong>{item.label}:</strong>
                        {isMotion ? (
                          <motion.span layoutId={item.layoutId}>
                            {value}
                          </motion.span>
                        ) : (
                          <span>{value}</span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>

                <MorphingCardClose />

                <div className="flex gap-2 mt-4 w-full">
                  <Button
                    tone="outline"
                    onClick={() => setIsOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                  <Button className="flex-1">
                    <Play />
                    Play
                  </Button>
                </div>
              </div>
            </>
          )}
        </MorphingCardContent>
      </MorphingCardContainer>
    </MorphingCard>
  );
}
