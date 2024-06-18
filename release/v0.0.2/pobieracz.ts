import { Buffer } from "jsr:@std/io";
import { ensureDirSync } from "jsr:@std/fs";
import { stringify } from "jsr:@std/toml";

interface METRYCZKA_PLIKU {
  [rubryka:string]: string | number;
}

export interface PLIK_POBIERZ_JAKO {
  zapiszDo?: string;
  zapiszJako?: string;
  mode?: number;
  metryczka?:METRYCZKA_PLIKU[];
}

interface PLIK_POBRANY {
  //nazwaPliku: string;
  adresFolderu: string;
  adresPliku: string;
  //wagaPliku: number;
  opisPliku: METRYCZKA_PLIKU[];
}


/**
 * Pobieranie pliku z lokalizacji URL i zapisywanie go na dysku
 *
 * @param wsad - albo ciąg adresu URL, albo obiekt żądania pobrania
 * @param pobierzJako
 * @param metodyPobierania
 * @returns
 */
export async function pobieracz(
  wsad: string | Request,
  pobierzJako?: PLIK_POBIERZ_JAKO,
  metodyPobierania?: RequestInit,
): Promise<PLIK_POBRANY> {
  const odzewSerwera = await fetch(wsad, metodyPobierania);
  if (odzewSerwera.status !== 200) {
    throw new Deno.errors.Http(
      `status ${odzewSerwera.status}-'${odzewSerwera.statusText}' received instead of 200`,
    );
  }

  const adresUrlDoPobierania = odzewSerwera.url.replace(/\/$/, "");
  const obiektPOBIERANY = await odzewSerwera.blob();
  /** size in bytes */
  const wagaPliku = obiektPOBIERANY.size;
  const obiektPRZETWARZANY = await obiektPOBIERANY.arrayBuffer();
  const obiektRZECZYWISTY = new Buffer(obiektPRZETWARZANY).bytes();

  // ?. operator - returns undefined, if destination is undefined
  // ?.dir expression - returns undefined, when dir prop is undefined
  // ?? operator -  returns the right side expression, when left side is undefined
  let adresFolderu = pobierzJako?.zapiszDo ?? Deno.makeTempDirSync({ prefix: "deno_dwld" });
  const nazwaPliku = pobierzJako?.zapiszJako ??
    adresUrlDoPobierania.substring(adresUrlDoPobierania.lastIndexOf("/") + 1);
  const mode = (pobierzJako?.mode !== undefined)
    ? { mode: pobierzJako.mode }
    : {};

  adresFolderu = adresFolderu.replace(/\/$/, "");
  ensureDirSync(adresFolderu);

  const adresPliku = `${adresFolderu}/${nazwaPliku}`;
  await Deno.writeFile(adresPliku, obiektRZECZYWISTY, mode);
  const opisPliku:METRYCZKA_PLIKU[] = [ ...pobierzJako?.metryczka ?? [], {BAJTY:wagaPliku} ];
  await Deno.writeTextFile(adresPliku+".txt", stringify(Object.assign({}, ...opisPliku)));
  return { /*nazwaPliku,*/ adresFolderu, adresPliku, /*wagaPliku,*/ opisPliku };
}
