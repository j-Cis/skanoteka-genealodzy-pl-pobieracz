//import { type RouteHandler } from "@fresh/core";
import define from "$utils/fresh.ts";
//import { toc,  VERSIONS } from "$data/NavDocs.ts";
//import { TAB_KATEGORIE, TAB_DOKUMENTY, urlPierwszegoDokumentu } from "$data/NavDocs.ts";
//const LINK: string = "/docs";

export const handler = define.handlers({
  GET: (ctx) => {
    //const address = ctx.params.address;

    //if (address === "concepts/architechture") {
    //  return new Response("", {
    //    status: 307,
    //    headers: { location: "/docs/concepts/architecture" },
    //  });
    //}

    return new Response("", {
      status: 307,
      headers: { location: `/docs/skanoteka-pobieracz` },
    });
  },
});
