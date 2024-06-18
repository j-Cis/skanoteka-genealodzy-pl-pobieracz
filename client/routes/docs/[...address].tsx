import { HttpError, page } from "@fresh/core";
import { asset, Partial } from "@fresh/core/runtime"; 
import { h } from "@preact";
import * as C from "@std/fmt/colors";
import define from "$utils/fresh.ts";
import { frontMatter, renderMarkdown } from "$utils/markdown.ts";
import Layout from "$components/Layout.tsx";
import SidebarCategory from "$components/NavRoutesDocs.tsx";
import { TAB_KATEGORIE, TAB_DOKUMENTY, urlPierwszegoDokumentu } from "$data/NavDocs.ts";
import { Wersje, NavEntry } from "$utils/types/PlikiMarkdown.d.ts";
import AccordionForDocs from "$islands/AccordionForDocs.tsx";

const pattern = new URLPattern({ pathname: "/:lang/:page*" });

export const handler = define.handlers<Data>({
  async GET(ctx) {
    const address = ctx.params.address;
    // TODO dodać obsługę języków
    if (TAB_DOKUMENTY["pl"][address]) {
      const href = urlPierwszegoDokumentu(address);
      return new Response("", {
        status: 307,
        headers: { location: href },
      });      
    }
    const match = pattern.exec("https://localhost/" /* + 'pl/' */ + address);

    if (!match) {
      throw new HttpError(404);
    }

    let { lang, page: path = "" } = match.pathname.groups;
    if (!lang) {
      throw new HttpError(404);
    }

    if (!TAB_DOKUMENTY[lang]) {
      path = lang + (path ? "/" + path : "");
      lang = "pl";
    }
    const wybranaWersja = TAB_DOKUMENTY[lang];
    const wsad = wybranaWersja[path];
    if (!wsad) {
      throw new HttpError(404);
    }

    const wersje: Wersje[] = [];
    for (const wersja in TAB_DOKUMENTY) {
      const label = wersja;
      const opcjonalnyWsad = TAB_DOKUMENTY[wersja][path]
      wersje.push({
        label,
        value: wersja,
        href: opcjonalnyWsad ? opcjonalnyWsad.href : urlPierwszegoDokumentu(wersja),
      });
    }



    const entryKeys = Object.keys(wybranaWersja);
    const idx = entryKeys.findIndex((name) => name === wsad.address);

    
    let nextNav: NavEntry | undefined;
    let prevNav: NavEntry | undefined;
    const prevEntry = wybranaWersja[entryKeys[idx - 1]];
    const nextEntry = wybranaWersja[entryKeys[idx + 1]];

    if (prevEntry) {
      let category = prevEntry.category;
      category = category ? wybranaWersja[category].title : "";
      prevNav = { title: prevEntry.title, category, href: prevEntry.href };
    }

    if (nextEntry) {
      let category = nextEntry.category;
      category = category ? wybranaWersja[category].title : "";
      nextNav = { title: nextEntry.title, category, href: nextEntry.href };
    }



    // & PRASOWANIE PLIKÓW MARKDOWN PRZEZ FRON-MATTER

    const url = new URL(`../../${wsad.file}`, import.meta.url);
    const fileContent = await Deno.readTextFile(url);
    const { body, attrs } = frontMatter<Record<string, unknown>>(fileContent);

    ctx.state.title = `${wsad.title ?? "Not Found"} | docs`;
    ctx.state.description = attrs?.description
      ? String(attrs.description)
      : "Document";
    //ctx.state.ogImage = new URL(asset("/og-image.webp"), ctx.url).href;

    return page({
      page: {
        ...wsad,
        markdown: body,
        data: attrs ?? {},
        wersje,
        lang,
        prevNav,
        nextNav,
      },
    });
  },
});

export default define.page<typeof handler>(function DocsPage(props) {
  const { page } = props.data;
  const { html, headings } = renderMarkdown(page.markdown);
  const LINK: string = "/docs";
  return (
    <Layout
      navShow={true}
      navActive={LINK}
      asideShow={true}
      aside={<AccordionForDocs />}
      footShow={false}
      foot={
        <span class="bg-black text-white">
          {`${props.url.protocol}//${props.url.host}`}
        </span>
      }
    >
      <Partial name="docs-main">
        <div class="w-full min-w-0">
          <main class=" mt-4 min-w-0 mx-auto">
            <div class="flex gap-6 md:gap-8 xl:gap-[8%] flex-col xl:flex-row md:mx-8 lg:mx-10 2xl:mx-0 lg:justify-center">
              {/*<TableOfContents headings={headings} />*/}
              <div class="lg:order-1 min-w-0 max-w-3xl w-full">
                {/*<h1 class="text-4xl text-gray-900 tracking-tight font-bold md:mt-0 px-4 md:px-0 mb-4"> {page.title} </h1>*/}
                <div
                  class="markdown-body mb-8 p-6"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                <div class="mb-8">
                  <ForwardBackButtons
                    address={page.address}
                    version={page.version}
                    prev={page.prevNav}
                    next={page.nextNav}
                  />
                </div>
                <hr />
                {
                  /*<div class="px-4 md:px-0 flex justify-between my-6">
                        <a
                          href={`https://github.com/denoland/fresh/edit/main/${page.file}`}
                          class="text-green-600 underline flex items-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg class="w-4 h-4 inline-block mr-1">
                            <use href="/icons.svg#external" />
                          </svg>
                          Edit this page on GitHub
                        </a>
                      </div>*/
                }
              </div>
            </div>
            <div class="xl:ml-[3.75rem]">
              {/*<Footer />*/}
            </div>
          </main>
        </div>
      </Partial>
    </Layout>
  );
});


function ForwardBackButtons(props: {
  address: string;
  version: string;
  prev?: NavEntry;
  next?: NavEntry;
}): h.JSX.Element {
  const { prev, next } = props;

  return (
    <div class="px-4 md:px-0 mt-8 flex flex-col sm:flex-row gap-4 justify-between">
      {prev
        ? (
          <a
            href={prev.href}
            class="px-4 py-2 text-left rounded border border-gray-200 grid border-solid w-full hover:border-green-600 transition-colors"
          >
            <span class="text-sm text-gray-600">
              Previous page
            </span>
            <span class="text-green-600 font-medium">
              {prev.title}
            </span>
          </a>
        )
        : <div class="w-full" />}
      {next
        ? (
          <a
            href={next.href}
            class="px-4 py-2 text-right rounded border border-gray-200 border-solid grid w-full hover:border-green-600 transition-colors"
          >
            <span class="text-sm text-gray-600">
              Next page
            </span>
            <span class="text-green-600 font-medium">
              {next.title}
            </span>
          </a>
        )
        : <div class="w-full" />}
    </div>
  );
}