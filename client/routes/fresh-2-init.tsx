import { useSignal } from "@preact/signals";
import { asset } from "@fresh/core/runtime";
import define from "$utils/fresh.ts";
import Layout from "$components/Layout.tsx";
import Counter from "$islands/Counter.tsx";

export default define.page(function Home() {
  const count = useSignal(3);

  return (
    <Layout navShow={true} navActive="/" asideShow={false}>
      <div class="px-4 py-8 mx-auto fresh-gradient-2">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src={asset("/svgs/logo.svg")}
            width="128"
            height="128"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
          <p class="my-4">
            Try updating this message in the
            <code class="mx-2">./routes/index.tsx</code> file, and refresh.
          </p>
          <Counter count={count} />
        </div>
      </div>
    </Layout>
  );
})
