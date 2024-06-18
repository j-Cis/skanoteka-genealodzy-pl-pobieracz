// -------------------------------------------------------------------------

export interface Dokument {
  address: string;
  title: string;
  category?: string;
  href: string;
  file: string;
}
export type Dokumenty = Record<string, Record<string, Dokument>>;

// -------------------------------------------------------------------------

export interface Kategoria {
  title: string;
  href: string;
}
export interface KategoriaPlus extends Kategoria{
  entries?: KategoriaPlus[];
}
export interface KategoriaPlus2 extends Kategoria{
  entries?: Record<string, KategoriaPlus2>;
}
export type KategoriaT = ({
  title: string;
  href: string;
  entries?: KategoriaT[] | undefined;
});
export type Kategorie = Record<string, KategoriaT[]>;
export type Kategorie2 = Record<string, KategoriaPlus2>;

// -------------------------------------------------------------------------

export interface maxPoziomKategoria{
  max: number;
}
export interface GenerKategori1 extends maxPoziomKategoria {
  K: string[][];
}
export interface GenerKategori2 extends maxPoziomKategoria {
  K: Map<number, string[][]>;
}

// -------------------------------------------------------------------------

export interface Wersje {
  label: string;
  href: string;
  value: string;
}

export interface NavEntry {
  title: string;
  category?: string;
  href: string;
}