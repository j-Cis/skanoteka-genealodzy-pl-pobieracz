//import { type RouteHandler } from "@fresh/core";
import define from "$utils/fresh.ts";
import { toc } from "$data/NavDocs.ts";

export const handler = define.handlers({
  GET: (ctx) => {
    const slug = ctx.params.slug;

    //if (slug === "concepts/architechture") {
    //  return new Response("", {
    //    status: 307,
    //    headers: { location: "/docs/concepts/architecture" },
    //  });
    //}

    return new Response("", {
      status: 307,
      headers: { location: `/docs${toc[0]}` },
    });
  },
});
