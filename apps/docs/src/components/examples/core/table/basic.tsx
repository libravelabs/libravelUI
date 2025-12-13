"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/core/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/core/dropdown-menu";
import { MoreVertical } from "lucide-react";

export default function BasicTable() {
  return (
    <Table aria-label="Movies" className="rounded-lg border p-4">
      <TableHeader>
        <TableColumn className="w-0">#</TableColumn>
        <TableColumn isRowHeader>Title</TableColumn>
        <TableColumn>Director</TableColumn>
        <TableColumn>Genre</TableColumn>
        <TableColumn allowsSorting>Year</TableColumn>
        <TableColumn allowsSorting>Rating</TableColumn>
        <TableColumn />
      </TableHeader>
      <TableBody items={movies}>
        {(item) => (
          <TableRow id={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{item.director}</TableCell>
            <TableCell>{item.genre}</TableCell>
            <TableCell>{item.year}</TableCell>
            <TableCell>{item.rating}</TableCell>
            <TableCell>
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger tone="ghost" iconOnly>
                    <MoreVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem tone="destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
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
