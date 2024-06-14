//NavApp.ts
import { NavigationLink } from "../types/NavApp.d.ts";

const NAVIGATION_LINK: NavigationLink[] = [
  {
    name: "Wstęp",
    href: "/",
  },
  {
    name: "Instrukcja",
    href: "/docs",
  },
  {
    name: "Pobierz",
    href: "/wydanie",
  },
  {
    name: "Skanoteka (oficjalna)",
    href: "https://skanoteka.genealodzy.pl/",
  },
  {
    name: "Skanoteka",
    href: "/skanoteka",
  },
];

export { NAVIGATION_LINK };
