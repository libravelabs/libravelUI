"use client";

import {
  MultipleSelect,
  MultipleSelectItem,
} from "@/components/ui/multiple-select";

export function BasicMultipleSelectBase() {
  return (
    <MultipleSelect items={items}>
      {(item) => (
        <MultipleSelectItem id={item.id}>{item.name}</MultipleSelectItem>
      )}
    </MultipleSelect>
  );
}

const items = [
  { name: "Billy Butcher", id: "billy-butcher" },
  { name: "Hughie Campbell", id: "hughie-campbell" },
  { name: "Mother's Milk", id: "mothers-milk" },
  { name: "Frenchie", id: "frenchie" },
  { name: "Kimiko Miyashiro", id: "kimiko" },

  { name: "Homelander", id: "homelander" },
  { name: "Starlight (Annie January)", id: "starlight" },
  { name: "Queen Maeve", id: "queen-maeve" },
  { name: "A-Train", id: "a-train" },
  { name: "The Deep", id: "the-deep" },
  { name: "Black Noir", id: "black-noir" },
  { name: "Translucent", id: "translucent" },
  { name: "Stormfront", id: "stormfront" },
  { name: "Soldier Boy", id: "soldier-boy" },
  { name: "Firecracker", id: "firecracker" },
  { name: "Sister Sage", id: "sister-sage" },

  { name: "Stan Edgar", id: "stan-edgar" },
  { name: "Ashley Barrett", id: "ashley-barrett" },
  { name: "Victoria Neuman", id: "victoria-neuman" },
  { name: "Madelyn Stillwell", id: "madelyn-stillwell" },

  { name: "Ryan Butcher", id: "ryan-butcher" },
  { name: "The Legend", id: "the-legend" },
  { name: "Lamplighter", id: "lamplighter" },
  { name: "Popclaw", id: "popclaw" },
  { name: "Mesmer", id: "mesmer" },
  { name: "Doppelgänger", id: "doppelganger" },
  { name: "Cindy", id: "cindy" },
  { name: "Tek Knight", id: "tek-knight" },
  { name: "Joe Kessler", id: "joe-kessler" },

  { name: "Marie Moreau", id: "marie-moreau" },
  { name: "Jordan Li", id: "jordan-li" },
  { name: "Andre Anderson", id: "andre-anderson" },
  { name: "Emma Meyer (Little Cricket)", id: "emma-meyer" },
  { name: "Cate Dunlap", id: "cate-dunlap" },
  { name: "Sam Riordan", id: "sam-riordan" },
  { name: "Luke Riordan (Golden Boy)", id: "golden-boy" },

  { name: "Dean Indira Shetty", id: "indira-shetty" },
  { name: "Dr. Edison Cardosa", id: "dr-cardosa" },
  { name: "Dr. Rich Brinkerhoff", id: "dr-brinkerhoff" },
  { name: "Polarity (Andre’s Father)", id: "polarity" },
];

export const BasicMultipleSelectCode = `"use client";

import { MultipleSelect } from "@/components/ui/multiple-select";

export function BasicMultipleSelect() {
  return <MultipleSelect items={items} />;
}

const items = [
  { name: "Billy Butcher", id: "billy-butcher" },
  { name: "Hughie Campbell", id: "hughie-campbell" },
  { name: "Mother's Milk", id: "mothers-milk" },
  { name: "Frenchie", id: "frenchie" },
  { name: "Kimiko Miyashiro", id: "kimiko" },

  { name: "Homelander", id: "homelander" },
  { name: "Starlight (Annie January)", id: "starlight" },
  { name: "Queen Maeve", id: "queen-maeve" },
  { name: "A-Train", id: "a-train" },
  { name: "The Deep", id: "the-deep" },
  { name: "Black Noir", id: "black-noir" },
  { name: "Translucent", id: "translucent" },
  { name: "Stormfront", id: "stormfront" },
  { name: "Soldier Boy", id: "soldier-boy" },
  { name: "Firecracker", id: "firecracker" },
  { name: "Sister Sage", id: "sister-sage" },

  { name: "Stan Edgar", id: "stan-edgar" },
  { name: "Ashley Barrett", id: "ashley-barrett" },
  { name: "Victoria Neuman", id: "victoria-neuman" },
  { name: "Madelyn Stillwell", id: "madelyn-stillwell" },

  { name: "Ryan Butcher", id: "ryan-butcher" },
  { name: "The Legend", id: "the-legend" },
  { name: "Lamplighter", id: "lamplighter" },
  { name: "Popclaw", id: "popclaw" },
  { name: "Mesmer", id: "mesmer" },
  { name: "Doppelgänger", id: "doppelganger" },
  { name: "Cindy", id: "cindy" },
  { name: "Tek Knight", id: "tek-knight" },
  { name: "Joe Kessler", id: "joe-kessler" },

  { name: "Marie Moreau", id: "marie-moreau" },
  { name: "Jordan Li", id: "jordan-li" },
  { name: "Andre Anderson", id: "andre-anderson" },
  { name: "Emma Meyer (Little Cricket)", id: "emma-meyer" },
  { name: "Cate Dunlap", id: "cate-dunlap" },
  { name: "Sam Riordan", id: "sam-riordan" },
  { name: "Luke Riordan (Golden Boy)", id: "golden-boy" },

  { name: "Dean Indira Shetty", id: "indira-shetty" },
  { name: "Dr. Edison Cardosa", id: "dr-cardosa" },
  { name: "Dr. Rich Brinkerhoff", id: "dr-brinkerhoff" },
  { name: "Polarity (Andre’s Father)", id: "polarity" },
];
`;
