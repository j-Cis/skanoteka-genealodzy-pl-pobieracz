//NavApp.ts

const NAVIGATION_LINK: NavigationLink[] = [
  {
    name: "Wprowadzenie",
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

interface NavigationLink {
  name: string;
  href: string;
}


export { NAVIGATION_LINK };
export type { NavigationLink };
