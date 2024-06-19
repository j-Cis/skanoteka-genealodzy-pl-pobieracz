// import { type PageProps } from "@fresh/core";
import { asset } from "@fresh/core/runtime";
import define from "$utils/fresh.ts";

// export default function App({ Component }: PageProps) {
export default define.page(function App({ Component, state, url }) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/*<title>fresh-project</title>*/}
        {state.title ? <title>{state.title}</title> : null}
        {state.title
          ? <meta property="og:title" content={state.title} />
          : null}
        {state.description
          ? <meta name="description" content={state.description} />
          : null}
        {state.description
          ? <meta property="og:description" content={state.description} />
          : null}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url.href} />
        {state.ogImage
          ? <meta property="og:image" content={state.ogImage} />
          : null}
        {state.noIndex ? <meta name="robots" content="noindex" /> : null}
        <link
          rel="preload"
          href={asset("/fonts/NovaRound.woff2")}
          as="font"
          type="font/woff2"
          crossorigin="true"
        />
        <link rel="stylesheet" href={asset("/styles.css")} />
        {url.pathname === "/"
          ? <link rel="stylesheet" href={asset("/prism.css")} />
          : null}
        {url.pathname.startsWith("/docs/")
          ? (
            <>
              <link rel="stylesheet" href={asset("/docsearch.css")} />
              <link rel="stylesheet" href={asset("/markdown.css")} />
            </>
          )
          : null}
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
});
