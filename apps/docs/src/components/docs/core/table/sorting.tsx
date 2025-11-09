"use client";

import { useAsyncList } from "@react-stately/data";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/core/table";

export default function SortingTable() {
  const list = useAsyncList<Movie>({
    async load() {
      return {
        items: movies,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          const first = a[sortDescriptor.column as keyof Movie];
          const second = b[sortDescriptor.column as keyof Movie];
          let cmp =
            (Number(first) || first) < (Number(second) || second) ? -1 : 1;
          if (sortDescriptor.direction === "descending") cmp *= -1;
          return cmp;
        }),
      };
    },
  });

  return (
    <div className="rounded-lg border p-4">
      <Table
        aria-label="Movies"
        sortDescriptor={list.sortDescriptor}
        onSortChange={list.sort}
      >
        <TableHeader>
          <TableColumn id="id" className="w-0">
            #
          </TableColumn>
          <TableColumn id="title" isRowHeader allowsSorting>
            Title
          </TableColumn>
          <TableColumn id="director">Director</TableColumn>
          <TableColumn id="genre">Genre</TableColumn>
          <TableColumn id="year" allowsSorting>
            Year
          </TableColumn>
          <TableColumn id="rating" allowsSorting>
            Rating
          </TableColumn>
        </TableHeader>
        <TableBody items={list.items}>
          {(item) => (
            <TableRow id={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.director}</TableCell>
              <TableCell>{item.genre}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell>{item.rating}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
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
