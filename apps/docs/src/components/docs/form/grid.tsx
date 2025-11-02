"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CalendarDate } from "@internationalized/date";
import { Form } from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { MultipleSelect } from "@/components/ui/multiple-select";
import { Textarea } from "@/components/ui/text-area";
import { TextField } from "@/components/ui/text-field";
import { DatePicker } from "@/components/ui/date-picker";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type MovieFormData = {
  title: string;
  slug: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: CalendarDate | null;
  language: string;
  genres: (string | number)[];
};

function getValue(
  e: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) {
  return typeof e === "string" ? e : e.target.value;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function GridForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<MovieFormData>({
    title: "The Boys",
    slug: "",
    overview:
      "A group of vigilantes known informally as “The Boys” set out to take down corrupt superheroes with no more than blue-collar grit and a willingness to fight dirty.",
    poster_path:
      "https://image.tmdb.org/t/p/w1280/2zmTngn1tYC1AvfnrFLhxeD82hz.jpg",
    backdrop_path:
      "https://image.tmdb.org/t/p/original/b4NSwuakKuasGl6C16JqI4jZgZd.jpg",
    release_date: new CalendarDate(2019, 6, 26),
    language: "en",
    genres: [
      "action",
      "drama",
      "thriller",
      "science-fiction",
      "satire",
      "superhero",
    ],
  });

  useEffect(() => {
    if (formData.title.trim().length > 0) {
      setFormData((prev) => ({
        ...prev,
        slug: slugify(prev.title),
      }));
    } else {
      setFormData((prev) => ({ ...prev, slug: "" }));
    }
  }, [formData.title]);

  const handleChange = <K extends keyof MovieFormData>(
    field: K,
    value: MovieFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="grid gap-4 w-full max-w-lg">
      <Heading>Add Movie</Heading>
      <Form onSubmit={handleSubmit} className="grid gap-4">
        <div className="flex items-center gap-2">
          <TextField
            label="Title"
            placeholder="Movie title"
            value={formData.title}
            onChange={(e) => handleChange("title", getValue(e))}
          />
          <TextField
            label="Slug"
            placeholder="movie-slug"
            value={formData.slug}
            isReadOnly
            isDisabled
          />
        </div>

        <Textarea
          label="Overview"
          placeholder="Movie overview"
          value={formData.overview}
          onChange={(e) => handleChange("overview", getValue(e as string))}
        />

        <div className="flex items-center gap-2">
          <TextField
            label="Poster Path"
            placeholder="/poster.jpg"
            value={formData.poster_path}
            onChange={(e) => handleChange("poster_path", getValue(e))}
          />
          <TextField
            label="Backdrop Path"
            placeholder="/backdrop.jpg"
            value={formData.backdrop_path}
            onChange={(e) => handleChange("backdrop_path", getValue(e))}
          />
        </div>

        <div className="flex items-center gap-2">
          <DatePicker
            label="Release Date"
            className="w-full"
            value={formData.release_date}
            onChange={(date) => handleChange("release_date", date)}
          />
          <Select
            label="Language"
            placeholder="English"
            items={[
              { id: "en", label: "English" },
              { id: "fr", label: "French" },
              { id: "es", label: "Spanish" },
            ]}
            selectedKey={formData.language}
            onSelectionChange={(value) =>
              handleChange("language", value as string)
            }
            classNames={{ trigger: "min-w-48" }}
          />
        </div>

        <MultipleSelect
          label="Genres"
          placeholder="Select genres"
          items={genres}
          value={formData.genres}
          onChange={(values) => handleChange("genres", values)}
        />

        <Button type="submit" className="w-fit">
          Submit
        </Button>
      </Form>

      <Dialog isOpen={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Preview Movie Data</DialogTitle>
          </DialogHeader>
          <pre className="bg-muted text-sm p-4 rounded-md overflow-auto max-h-96">
            {JSON.stringify(
              {
                ...formData,
                release_date: formData.release_date
                  ? formData.release_date.toString()
                  : null,
              },
              null,
              2
            )}
          </pre>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button>Confirm Submit</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const genres = [
  { id: "action", label: "Action" },
  { id: "adventure", label: "Adventure" },
  { id: "animation", label: "Animation" },
  { id: "comedy", label: "Comedy" },
  { id: "crime", label: "Crime" },
  { id: "documentary", label: "Documentary" },
  { id: "drama", label: "Drama" },
  { id: "family", label: "Family" },
  { id: "fantasy", label: "Fantasy" },
  { id: "history", label: "History" },
  { id: "horror", label: "Horror" },
  { id: "music", label: "Music" },
  { id: "mystery", label: "Mystery" },
  { id: "romance", label: "Romance" },
  { id: "science-fiction", label: "Science Fiction" },
  { id: "superhero", label: "Superhero" },
  { id: "satire", label: "Satire" },
  { id: "political", label: "Political" },
  { id: "dark-comedy", label: "Dark Comedy" },
  { id: "spy", label: "Spy" },
  { id: "psychological", label: "Psychological" },
  { id: "tv-movie", label: "TV Movie" },
  { id: "thriller", label: "Thriller" },
  { id: "war", label: "War" },
  { id: "western", label: "Western" },
] as const;
