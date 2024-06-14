import { useSignal } from "@preact/signals";
import define from "../utils/fresh.ts";
//import { asset } from "@fresh/core/runtime";
//import { page } from "@fresh/core";
import Layout from "../components/Layout.tsx";

//import Header from "../components/layouts/Header.tsx";

export default define.page(function MainPage(props) {
  console.log(`${props.url.protocol}//${props.url.host}`);
  const count = useSignal(3);

  return (
    <Layout navShow={true} navActive="/" asideShow={false}>
      <h1>aa</h1>
    </Layout>
  );
});
