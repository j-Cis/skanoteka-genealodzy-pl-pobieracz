import { HttpError, page } from "@fresh/core";
import { asset, Partial } from "@fresh/core/runtime";
import { h } from "@preact";
import * as C from "@std/fmt/colors";
import define from "$utils/fresh.ts";
import Layout from "$components/Layout.tsx";
import AccordionForDocs from "$islands/AccordionForDocs.tsx";

//###
import {
  DOCS_MD_ROUTES,
  DOCS_MD_TREE,
  type RouteMarkdownDoc,
} from "../../batch/NavDocs.ts";

import { frontMatter, renderMarkdown } from "$utils/markdown.ts";

const pattern = new URLPattern({ pathname: "/:page*" });

export const handler = define.handlers<Data>({
  async GET(ctx) {
    const address = ctx.params.address;
    console.log(C.bgBlue(`ctx.url.hostname: ${ctx.url.hostname}`));

    const match = pattern.exec("https://localhost/" + address);
    if (!match) throw new HttpError(404);
    let { page: path = "" } = match.pathname.groups;

    const wsad = DOCS_MD_ROUTES[path];
    if (!wsad) throw new HttpError(404);

    const entryKeys = Object.keys(DOCS_MD_ROUTES);
    const idx = entryKeys.findIndex((name) => name === wsad.address);

    let nextNav: RouteMarkdownDoc | undefined;
    let prevNav: RouteMarkdownDoc | undefined;
    const prevEntry = DOCS_MD_ROUTES[entryKeys[idx - 1]];
    const nextEntry = DOCS_MD_ROUTES[entryKeys[idx + 1]];

    if (prevEntry) {
      let category = prevEntry.category;
      category = category ? DOCS_MD_ROUTES[category].title : "";
      prevNav = { title: prevEntry.title, category, href: prevEntry.href };
    }

    if (nextEntry) {
      let category = nextEntry.category;
      category = category ? DOCS_MD_ROUTES[category].title : "";
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
      aside={<AccordionForDocs tree={DOCS_MD_TREE} />}
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
                  <div class="px-4 md:px-0 flex justify-between my-6">
                    <a
                      href={`https://github.com/j-Cis/skanoteka-pobieracz/edit/main/${page.file}`}
                      class="text-black underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg class="w-4 h-4 inline-block mr-1">
                        <use href={asset("/svgs/icons.svg#external")} />
                      </svg>
                      Edytuj tę stronę na GitHub
                    </a>
                  </div>
                }
              </div>
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
  prev?: RouteMarkdownDoc;
  next?: RouteMarkdownDoc;
}): h.JSX.Element {
  const { prev, next } = props;

  function SeqPage(props: {
    href?: string;
    title?: string;
    label?: string;
  }): h.JSX.Element {
    return (
      <a
        href={props.href}
        class="px-4 py-2 text-left bg-white rounded border border-gray-200 grid border-solid w-full hover:border-green-600 transition-colors"
      >
        <span class="text-sm text-gray-600">
          {props.label}
        </span>
        <span class="text-green-600 font-medium">
          {props.title}
        </span>
      </a>
    );
  }

  return (
    <div class="px-4 md:px-0 mt-8 flex flex-col sm:flex-row gap-4 justify-between">
      {prev
        ? (
          <SeqPage
            href={prev.href}
            label="Poprzednia strona"
            title={prev.title}
          />
        )
        : <div class="w-full" />}
      {next
        ? (
          <SeqPage
            href={next.href}
            label="Następna strona"
            title={next.title}
          />
        )
        : <div class="w-full" />}
    </div>
  );
}
