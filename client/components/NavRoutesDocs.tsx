import { h } from "preact";
import type {
  TableOfContentsCategory,
  TableOfContentsCategoryEntry,
} from "../types/NavDocs.d.ts";
import type { KategoriaT } from "$utils/types/PlikiMarkdown.d.ts"

function SidebarCategory(props: {
  category: KategoriaT; // TableOfContentsCategory;
}): h.JSX.Element {
  const { title, href, entries } = props.category;
  const hasEntries = typeof entries !== "undefined";

  return (
    <li class="my-2 block">
      <a
        href={href}
        class="text-gray-900 hover:text-gray-600 aria-[current]:text-green-700 aria-[current]:hover:underline font-bold"
      >
        {title}
      </a>
      {hasEntries && <>{
        entries.length > 0 && (
          <ul class="py-2 nested list-outside">
            {entries.map((entry) => (
              <>                
                <SidebarEntry key={entry.href} entry={entry} />
                {entry.entries && <>{
                  <ul class="list-inside font-semibold nested ml-2.5">
                    {entry.entries.map((kategoria2) => (
                      <SidebarCategory
                        key={kategoria2.href}
                        category={kategoria2}
                      />
                    ))}
                  </ul>
                }</>}                
              </>
            ))}
          </ul>
        )
      }</>}
    </li>
  );
}

function SidebarEntry(props: {
  entry: KategoriaT;
}): h.JSX.Element {
  const { title, href, entries } = props.entry;
  const hasEntries = typeof entries !== "undefined";

  return (
    <li class="py-[1px]">
      <a
        href={href}
        class="aria-[current]:text-green-700 aria-[current]:border-green-600 aria-[current]:bg-green-50 border-l-4 border-transparent px-4 py-0.5 transition-colors hover:text-green-500 font-normal block"
      >
        {title}
      </a>
      {hasEntries && <>{
        entries.length > 0 && (
          <ul class="py-2 nested list-outside">
            {entries.map((entry) => (
              <>                
                <SidebarEntry key={entry.href} entry={entry} />
              </>
            ))}
          </ul>
        )
      }</>}
    </li>
  );
}

export default SidebarCategory;
