"use client";

import * as React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Autocomplete,
  AutocompleteStateContext,
  useFilter,
} from "react-aria-components";
import { SearchBar } from "@/components/ui/search-bar";
import { Heading } from "@/components/ui/heading";
import { Description } from "@/components/ui/field";

export default function WithSearch() {
  const { contains } = useFilter({
    sensitivity: "base",
  });

  function AutocompleteHighlight({ children }: { children: string }) {
    const state = React.use(AutocompleteStateContext)!;
    const index = React.useMemo(() => {
      return children.toLowerCase().indexOf(state.inputValue.toLowerCase());
    }, [children, state.inputValue]);

    if (index >= 0) {
      return (
        <>
          {children.slice(0, index)}
          <mark className="bg-primary text-primary-foreground">
            {children.slice(index, index + state.inputValue.length)}
          </mark>
          {children.slice(index + state.inputValue.length)}
        </>
      );
    }

    return children;
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4">
        <Heading size={4}>Movies</Heading>
        <Description>
          A comprehensive list of movies with details such as title, genre,
          release date, and rating.
        </Description>
      </div>
      <Autocomplete filter={contains}>
        <div className="flex justify-end">
          <SearchBar aria-label="Search" />
        </div>
        <Table className="mt-4" aria-label="Users">
          <TableHeader>
            <TableColumn className="w-0">#</TableColumn>
            <TableColumn isRowHeader>Title</TableColumn>
            <TableColumn>Director</TableColumn>
            <TableColumn>Genre</TableColumn>
            <TableColumn>Year</TableColumn>
            <TableColumn>Rating</TableColumn>
            <TableColumn />
          </TableHeader>
          <TableBody items={movies}>
            {(item) => (
              <TableRow id={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell textValue={item.title}>
                  <AutocompleteHighlight>{item.title}</AutocompleteHighlight>
                </TableCell>
                <TableCell textValue={item.director}>
                  <AutocompleteHighlight>{item.director}</AutocompleteHighlight>
                </TableCell>
                <TableCell textValue={item.genre}>
                  <AutocompleteHighlight>{item.genre}</AutocompleteHighlight>
                </TableCell>
                <TableCell>{item.year}</TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell>
                  <div className="flex justify-end"></div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Autocomplete>
    </div>
  );
}

type Movie = {
  id: string;
  title: string;
  director: string;
  genre: string;
  year: number;
  rating: number;
};

const movies: Movie[] = [
  {
    id: "1",
    title: "Goodfellas",
    director: "Martin Scorsese",
    genre: "Crime",
    year: 1990,
    rating: 8.7,
  },
  {
    id: "2",
    title: "Taxi Driver",
    director: "Martin Scorsese",
    genre: "Drama",
    year: 1976,
    rating: 8.2,
  },
  {
    id: "3",
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    genre: "Crime",
    year: 1994,
    rating: 8.9,
  },
  {
    id: "4",
    title: "Inglourious Basterds",
    director: "Quentin Tarantino",
    genre: "War",
    year: 2009,
    rating: 8.3,
  },
  {
    id: "5",
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2010,
    rating: 8.8,
  },
  {
    id: "6",
    title: "Interstellar",
    director: "Christopher Nolan",
    genre: "Sci-Fi",
    year: 2014,
    rating: 8.6,
  },
  {
    id: "7",
    title: "The Godfather",
    director: "Francis Ford Coppola",
    genre: "Crime",
    year: 1972,
    rating: 9.2,
  },
  {
    id: "8",
    title: "Apocalypse Now",
    director: "Francis Ford Coppola",
    genre: "War",
    year: 1979,
    rating: 8.4,
  },
  {
    id: "9",
    title: "2001: A Space Odyssey",
    director: "Stanley Kubrick",
    genre: "Sci-Fi",
    year: 1968,
    rating: 8.3,
  },
  {
    id: "10",
    title: "Schindler's List",
    director: "Steven Spielberg",
    genre: "Biography",
    year: 1993,
    rating: 9.0,
  },
];
