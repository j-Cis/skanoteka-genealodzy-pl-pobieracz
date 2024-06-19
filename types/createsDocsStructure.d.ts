import  type { WalkEntry } from "@std/fs";
/**
 * Typ zwracanych informacji dla funkcji {@linkcode filesInDocs}
 * 
 * ```ts
 *  interface FilesInDocs {
 *    lang: string;   // język np.: pl, en;
 *    text: string;   // tytuł pliku;
 *    name: string;   // nazwa pliku;
 *    path: string[]; // ścieżka do pliku;
 *    file: string;   // nazwa pliku;
 *    tier: number;   // poziom zagnieżdżenia
 *    host: boolean;  // jest to kategoria? 
 *  };
 * ```
 */
interface FilesInDocs {
  lang: string; 
  text: string;
  name: string;
  path: string[];
  file: string;
  tier: number;
  host: boolean;
}

type FilesAsTree = {
  [lang: string]: Record<string, FileOnTreeWithNestedTree>;
}
interface FileOnTree {
  file: string;
  href: string;
  name: string;
}  
interface FileOnTreeWithNestedTree extends FileOnTree {
  page?: Record<string, FileOnTreeWithNestedTree>;
}

type CallbackFilesByTier = (f: FilesInDocs) => void;
type QueryResult = () => void;

interface TableOfFilesEntry {
  address: string;
  title: string;
  category?: string;
  href: string;
  file: string;
}

type TableOfFiles = Record<string, Record<string, TableOfFilesEntry>>;

export type {
  FilesInDocs, 
  FilesAsTree,
  FileOnTree,
  FileOnTreeWithNestedTree,
  CallbackFilesByTier,
  QueryResult,
  TableOfFiles,
  TableOfFilesEntry,
};