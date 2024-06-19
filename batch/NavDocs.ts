interface NavDocsEntry {
  title: string;
  category?: string;
  href: string;
}

interface DocMD {
  address: string;
  title: string;
  category?: string;
  href: string;
  file: string;
}

type DocsMD = Record<string, DocMD>;

const DOCS_MD: DocsMD = {
  "skanoteka-pobieracz": {
    address: "skanoteka-pobieracz",
    title: "skanoteka - pobieracz",
    href: "/docs/skanoteka-pobieracz",
    file: "docs/pl/skanoteka-pobieracz/index.md",
  },
  "skanoteka-pobieracz/v0.0.2": {
    address: "skanoteka-pobieracz/v0.0.2",
    title: "skanoteka-pobieracz@0.0.x",
    href: "/docs/skanoteka-pobieracz/v0.0.2",
    file: "docs/pl/skanoteka-pobieracz/v0.0.2/index.md",
  },
  "skanoteka-pobieracz/v0.0.2/instalacja": {
    address: "skanoteka-pobieracz/v0.0.2/instalacja",
    title: "skanoteka-pobieracz@0.0.x > instalacja",
    href: "/docs/skanoteka-pobieracz/v0.0.2/instalacja",
    file: "docs/pl/skanoteka-pobieracz/v0.0.2/instalacja.md",
  },
  "skanoteka-pobieracz/v0.0.2/instrukcja": {
    address: "skanoteka-pobieracz/v0.0.2/instrukcja",
    title: "skanoteka-pobieracz@0.0.x > instrukcja",
    href: "/docs/skanoteka-pobieracz/v0.0.2/instrukcja",
    file: "docs/pl/skanoteka-pobieracz/v0.0.2/instrukcja.md",
  },
  "skanoteka-pobieracz/v0.0.2/konfiguracja": {
    address: "skanoteka-pobieracz/v0.0.2/konfiguracja",
    title: "skanoteka-pobieracz@0.0.x > konfiguracja",
    href: "/docs/skanoteka-pobieracz/v0.0.2/konfiguracja",
    file: "docs/pl/skanoteka-pobieracz/v0.0.2/konfiguracja.md",
  },
  "skanoteka-pobieracz/v0.0.2/nowe-zadanie": {
    address: "skanoteka-pobieracz/v0.0.2/nowe-zadanie",
    title: "skanoteka-pobieracz@0.0.x > nowe - zadanie",
    href: "/docs/skanoteka-pobieracz/v0.0.2/nowe-zadanie",
    file: "docs/pl/skanoteka-pobieracz/v0.0.2/nowe-zadanie.md",
  },
  "skanoteka-pobieracz/v0.1.0": {
    address: "skanoteka-pobieracz/v0.1.0",
    title: "skanoteka-pobieracz@0.1.x",
    href: "/docs/skanoteka-pobieracz/v0.1.0",
    file: "docs/pl/skanoteka-pobieracz/v0.1.0/index.md",
  },
  zanim_zaczniesz: {
    address: "zanim_zaczniesz",
    title: "zanim zaczniesz",
    href: "/docs/zanim_zaczniesz",
    file: "docs/pl/zanim_zaczniesz/index.md",
  },
  "zanim_zaczniesz/srodowisko_deno": {
    address: "zanim_zaczniesz/srodowisko_deno",
    title: "srodowisko deno",
    href: "/docs/zanim_zaczniesz/srodowisko_deno",
    file: "docs/pl/zanim_zaczniesz/srodowisko_deno/index.md",
  },
  "zanim_zaczniesz/srodowisko_deno/instalacja": {
    address: "zanim_zaczniesz/srodowisko_deno/instalacja",
    title: "instalacja",
    href: "/docs/zanim_zaczniesz/srodowisko_deno/instalacja",
    file: "docs/pl/zanim_zaczniesz/srodowisko_deno/instalacja.md",
  },
  "zanim_zaczniesz/edytor_vscode": {
    address: "zanim_zaczniesz/edytor_vscode",
    title: "edytor vscode",
    href: "/docs/zanim_zaczniesz/edytor_vscode",
    file: "docs/pl/zanim_zaczniesz/edytor_vscode/index.md",
  },
  "zanim_zaczniesz/edytor_vscode/instalacja": {
    address: "zanim_zaczniesz/edytor_vscode/instalacja",
    title: "instalacja",
    href: "/docs/zanim_zaczniesz/edytor_vscode/instalacja",
    file: "docs/pl/zanim_zaczniesz/edytor_vscode/instalacja.md",
  },
  "zanim_zaczniesz/przegladarka": {
    address: "zanim_zaczniesz/przegladarka",
    title: "przegladarka",
    href: "/docs/zanim_zaczniesz/przegladarka",
    file: "docs/pl/zanim_zaczniesz/przegladarka/index.md",
  },
  "zanim_zaczniesz/przegladarka/instalacja": {
    address: "zanim_zaczniesz/przegladarka/instalacja",
    title: "instalacja",
    href: "/docs/zanim_zaczniesz/przegladarka/instalacja",
    file: "docs/pl/zanim_zaczniesz/przegladarka/instalacja.md",
  },
  "zanim_zaczniesz/terminal": {
    address: "zanim_zaczniesz/terminal",
    title: "terminal",
    href: "/docs/zanim_zaczniesz/terminal",
    file: "docs/pl/zanim_zaczniesz/terminal/index.md",
  },
  "zanim_zaczniesz/terminal/instalacja": {
    address: "zanim_zaczniesz/terminal/instalacja",
    title: "instalacja",
    href: "/docs/zanim_zaczniesz/terminal/instalacja",
    file: "docs/pl/zanim_zaczniesz/terminal/instalacja.md",
  },
};

export default DOCS_MD;
export type {DocMD, DocsMD, NavDocsEntry};