import { createDefine } from "@fresh/core";

// deno-lint-ignore no-empty-interface
export interface State {
  title?: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const define = createDefine<State>();

export default define;