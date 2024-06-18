#!/usr/bin/env -S deno run -A --watch=static/,routes/
import { tailwind } from "@fresh/plugin-tailwind";
import { Builder } from "@fresh/core/dev";
import * as C from "@std/fmt/colors";

import { app } from "./main.ts";

const builder = new Builder();
tailwind(builder, app, {});

if (Deno.args.includes("build")) {
  await builder.build(app);
} else {
  await builder.listen(app, {port:8002});
}

console.log(C.bgRed(`Now date is: ${new Date()}`));