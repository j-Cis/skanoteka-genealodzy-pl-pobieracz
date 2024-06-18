import { parseArgs } from "jsr:@std/cli";
import { ensureDirSync, ensureFileSync } from "jsr:@std/fs";
import { parse } from "jsr:@std/toml";
import { pobieracz, type PLIK_POBIERZ_JAKO } from "./pobieracz.ts";
import spowalniacz from "./spowalniacz.ts";
import skrobaczSKANOTEKI from "./skrobacz-skanoteki.ts";
import { OPERACJE_NA_MINUTE } from './ustawienia.ts';

const zadania = "./tasks";
const zadanieURL = `${zadania}/${parseArgs(Deno.args).zadanie ?? "test"}.txt`;
ensureDirSync(zadania);
ensureFileSync(zadanieURL);

interface ZADANIE_METRYCZKA {
  ZESPOL_SYGNATURA: string | number;
  ZESPOL_OPIS?: string;
  SERIA_NAZWA?: string;
  JEDNOSTKA_SYGNATURA: string | number;
  JEDNOSTKA_OPIS?: string;
  JEDNOSTKA_LATA_OD?: number;
  JEDNOSTKA_LATA_DO?: number;
}

interface ZADANIE {
  STRONY: string[];
  METRYCZKA: ZADANIE_METRYCZKA;
}

const zadanie:ZADANIE = parse(Deno.readTextFileSync(zadanieURL));
pobieraczSKANOTEKI(zadanie);


/**
 * Pobieranie obrazków z Skanoteki 
 *
 * @param zlecenie 
 * @returns
 */
async function pobieraczSKANOTEKI(zlecenie: ZADANIE):Promise<void> {  
  for (let i = 0; i < zlecenie.STRONY.length; i++) {
    const stronaURL: string = zlecenie.STRONY[i];
    const nazwaPliku: string = stronaURL.substring(stronaURL.match(/(?!.*=)(.*)/i)?.index ?? 0);
    const pobranaStrona = await fetch(stronaURL).then((res) => res.text());
    await spowalniacz(OPERACJE_NA_MINUTE);
    const pobierzObrazZ = await skrobaczSKANOTEKI(pobranaStrona);
    //pobieranie obrazka         
    try {
      //const nazwaPlikuTab = nazwaPliku.split("_").map(a => a.split("-")[1]);
      const zapiszPlikJako: PLIK_POBIERZ_JAKO = {
        zapiszJako: nazwaPliku,
        zapiszDo: `./download/ZESPOL_${zlecenie.METRYCZKA.ZESPOL_SYGNATURA}/JEDNOSTKA_${zlecenie.METRYCZKA.JEDNOSTKA_SYGNATURA}`,
        metryczka: [
          ...[...Object.entries(zlecenie.METRYCZKA)].map(([key, val]) => ({[key]: val})),
          {LINK_DO_OBRAZU      : pobierzObrazZ },
          {LINK_DO_STRONY      : stronaURL },
        ]
      };
      const pobranyPlik = await pobieracz(pobierzObrazZ, zapiszPlikJako);
      console.log(pobranyPlik);
    } catch (err) {
        console.log(err);
    }
  }  
}




