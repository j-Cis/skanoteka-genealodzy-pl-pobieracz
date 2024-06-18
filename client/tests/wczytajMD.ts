import PlikiMarkdown from "$utils/classes/PlikiMarkdown.ts";
import * as C from "@std/fmt/colors";

console.log(C.bgRed(`Now date is: ${new Date()}`));
const plikiMD = new PlikiMarkdown("../docs");
const TAB_KATEGORIE = plikiMD.kategorie;
const TAB_DOKUMENTY = plikiMD.dokumenty;

