"use client";

import { Select } from "@/components/ui/select";

export default function BasicSelect() {
  return (
    <Select
      multiple
      items={movies}
      label="World's masterpieces"
      placeholder="Select a masterpiece"
    />
  );
}

const movies = [
  { label: "Taxi Driver", id: "taxi-driver" },
  { label: "Raging Bull", id: "raging-bull" },
  { label: "Goodfellas", id: "goodfellas" },
  { label: "Casino", id: "casino" },
  { label: "Gangs of New York", id: "gangs-of-new-york" },
  { label: "The Aviator", id: "the-aviator" },
  { label: "The Departed", id: "the-departed" },
  { label: "Shutter Island", id: "shutter-island" },
  { label: "The Wolf of Wall Street", id: "the-wolf-of-wall-street" },
  { label: "Killers of the Flower Moon", id: "killers-of-the-flower-moon" },

  { label: "Pulp Fiction", id: "pulp-fiction" },
  { label: "Reservoir Dogs", id: "reservoir-dogs" },
  { label: "Kill Bill: Vol. 1", id: "kill-bill-vol-1" },
  { label: "Kill Bill: Vol. 2", id: "kill-bill-vol-2" },
  { label: "Inglourious Basterds", id: "inglourious-basterds" },
  { label: "Django Unchained", id: "django-unchained" },
  { label: "The Hateful Eight", id: "the-hateful-eight" },
  {
    label: "Once Upon a Time in Hollywood",
    id: "once-upon-a-time-in-hollywood",
  },

  { label: "Memento", id: "memento" },
  { label: "The Prestige", id: "the-prestige" },
  { label: "Batman Begins", id: "batman-begins" },
  { label: "The Dark Knight", id: "the-dark-knight" },
  { label: "The Dark Knight Rises", id: "the-dark-knight-rises" },
  { label: "Inception", id: "inception" },
  { label: "Interstellar", id: "interstellar" },
  { label: "Dunkirk", id: "dunkirk" },
  { label: "Tenet", id: "tenet" },
  { label: "Oppenheimer", id: "oppenheimer" },

  { label: "The Godfather", id: "the-godfather" },
  { label: "The Godfather Part II", id: "the-godfather-part-2" },
  { label: "The Godfather Part III", id: "the-godfather-part-3" },
  { label: "Apocalypse Now", id: "apocalypse-now" },
  { label: "The Conversation", id: "the-conversation" },
  { label: "Bram Stoker's Dracula", id: "bram-stokers-dracula" },

  { label: "Jaws", id: "jaws" },
  { label: "E.T. the Extra-Terrestrial", id: "et-the-extra-terrestrial" },
  { label: "Raiders of the Lost Ark", id: "raiders-of-the-lost-ark" },
  {
    label: "Indiana Jones and the Last Crusade",
    id: "indiana-jones-and-the-last-crusade",
  },
  { label: "Jurassic Park", id: "jurassic-park" },
  { label: "Schindler's List", id: "schindlers-list" },
  { label: "Saving Private Ryan", id: "saving-private-ryan" },
  { label: "Catch Me If You Can", id: "catch-me-if-you-can" },
  { label: "Minority Report", id: "minority-report" },

  { label: "Psycho", id: "psycho" },
  { label: "Rear Window", id: "rear-window" },
  { label: "Vertigo", id: "vertigo" },
  { label: "North by Northwest", id: "north-by-northwest" },
  { label: "The Birds", id: "the-birds" },
  { label: "Strangers on a Train", id: "strangers-on-a-train" },

  { label: "2001: A Space Odyssey", id: "2001-a-space-odyssey" },
  { label: "A Clockwork Orange", id: "a-clockwork-orange" },
  { label: "The Shining", id: "the-shining" },
  { label: "Full Metal Jacket", id: "full-metal-jacket" },
  { label: "Eyes Wide Shut", id: "eyes-wide-shut" },
  { label: "Dr. Strangelove", id: "dr-strangelove" },

  { label: "Seven Samurai", id: "seven-samurai" },
  { label: "Rashomon", id: "rashomon" },
  { label: "Yojimbo", id: "yojimbo" },
  { label: "Sanjuro", id: "sanjuro" },
  { label: "Throne of Blood", id: "throne-of-blood" },
  { label: "Ran", id: "ran" },
  { label: "Ikiru", id: "ikiru" },
];
