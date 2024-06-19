type RawTableOfContents = Record<string, {
  label: string;
  content: Record<string, RawTableOfContentsEntry>;
}>;

interface RawTableOfContentsEntry {
  title: string;
  link?: string;
  pages?: [string, string, string?][];
}

type TableOfContents = Record<string, Record<string, TableOfContentsEntry>>;
type TableOfCategory = Record<string, TableOfContentsCategory[]>;

interface TableOfContentsEntry {
  slug: string;
  title: string;
  category?: string;
  href: string;
  file: string;
}

interface TableOfContentsCategory {
  title: string;
  href: string;
  entries: TableOfContentsCategoryEntry[];
}

interface TableOfContentsCategoryEntry {
  title: string;
  href: string;
}

interface Data {
  page: Page;
}

interface NavEntry {
  title: string;
  category?: string;
  href: string;
}

interface VersionLink {
  label: string;
  href: string;
  value: string;
}

interface Page extends TableOfContentsEntry {
  markdown: string;
  data: Record<string, unknown>;
  versionLinks: VersionLink[];
  version: string;
  prevNav?: NavEntry;
  nextNav?: NavEntry;
}

export type {
  Data,
  NavEntry,
  Page,
  RawTableOfContents,
  RawTableOfContentsEntry,
  TableOfCategory,
  TableOfContents,
  TableOfContentsCategory,
  TableOfContentsCategoryEntry,
  TableOfContentsEntry,
  VersionLink,
};
