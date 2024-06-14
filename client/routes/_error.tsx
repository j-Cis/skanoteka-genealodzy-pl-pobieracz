import { HttpError, type PageProps } from "@fresh/core";
//import define from "$utils/fresh.ts";
import Layout from "$components/Layout.tsx";

export function ServerCodePage(
  props: { serverCode: number; codeDescription: string },
) {
  return (
    <>
      <Layout navShow={true} navActive="/_" asideShow={false}>
        <section>
          <div class="text-center">
            <h1 class="text-6xl md:text-9xl font-extrabold">
              {props.serverCode}
            </h1>

            <p class="p-4 text-2xl md:text-3xl">
              {props.codeDescription}
            </p>

            <p class="p-4">
              <a href="/" class="hover:underline">Back to the Homepage</a>
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default function PageNotFound(props: PageProps) {
  const error = props.error;
  if (error instanceof HttpError) {
    if (error.status === 404) {
      return ServerCodePage({
        serverCode: 404,
        codeDescription: "Couldn’t find what you’re looking for.",
      });
    }
  }

  return ServerCodePage({
    serverCode: 500,
    codeDescription: "Oops! Something went wrong.",
  });
}
