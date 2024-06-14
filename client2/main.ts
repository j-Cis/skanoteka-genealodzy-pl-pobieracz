import { App, fsRoutes, staticFiles, trailingSlashes } from "@fresh/core";
//import { State } from "./utils/fresh.ts";

export const app = new App({ root: import.meta.url })
  .use(staticFiles())
  .use(trailingSlashes("never"));

//app.get("/api/:joke", () => new Response("Hello World"));

await fsRoutes(app, {
  //dir: "./",
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
