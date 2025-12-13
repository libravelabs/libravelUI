import {
  Bricolage_Grotesque,
  JetBrains_Mono,
  Domine,
  Afacad_Flux,
  Geist,
  Geist_Mono,
} from "next/font/google";

export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const geist_mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["500", "700"],
  display: "swap",
});

export const bricolage_grotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
  display: "swap",
});

export const jetbrains_mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const domine = Domine({
  subsets: ["latin"],
  variable: "--font-domine",
  display: "swap",
});

export const afacad_flux = Afacad_Flux({
  subsets: ["latin"],
  variable: "--font-afacad-flux",
  display: "swap",
});
