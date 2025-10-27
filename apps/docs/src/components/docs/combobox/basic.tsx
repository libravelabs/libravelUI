"use client";

import { ComboBox } from "@/components/ui/combobox";

export default function BasicComboboxBasic() {
  return <ComboBox items={items} placeholder="Choose your fav..." />;
}

const items = [
  { label: "The Godfather", id: "the-godfather" },
  { label: "The Shawshank Redemption", id: "the-shawshank-redemption" },
  { label: "Pulp Fiction", id: "pulp-fiction" },
  { label: "Schindler's List", id: "schindlers-list" },
  { label: "12 Angry Men", id: "12-angry-men" },
  { label: "Fight Club", id: "fight-club" },
  { label: "Forrest Gump", id: "forrest-gump" },
  { label: "The Dark Knight", id: "the-dark-knight" },
  { label: "Inception", id: "inception" },
  { label: "Parasite", id: "parasite" },
  {
    label: "The Lord of the Rings: The Return of the King",
    id: "the-lord-of-the-rings-the-return-of-the-king",
  },
  { label: "Goodfellas", id: "goodfellas" },
  { label: "The Silence of the Lambs", id: "the-silence-of-the-lambs" },
  {
    label: "One Flew Over the Cuckoo's Nest",
    id: "one-flew-over-the-cuckoos-nest",
  },
  { label: "City of God", id: "city-of-god" },
  { label: "Whiplash", id: "whiplash" },
  { label: "The Pianist", id: "the-pianist" },
  { label: "Seven Samurai", id: "seven-samurai" },
  { label: "There Will Be Blood", id: "there-will-be-blood" },
  {
    label: "Eternal Sunshine of the Spotless Mind",
    id: "eternal-sunshine-of-the-spotless-mind",
  },
];
