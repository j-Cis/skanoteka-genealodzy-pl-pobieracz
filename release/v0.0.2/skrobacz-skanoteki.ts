import { DOMParser } from "jsr:@b-fuze/deno-dom";

/**
 * Skrobanie adresu zasadniczego z którego można pobrać plik obrazka
 *
 * @param pobranaStronaTekst
 * @returns
 */
export default async function skrobaczSKANOTEKI( pobranaStronaTekst: string ): Promise<string> {
  let linkDoPobierania:string = '';
  const pobranaStrona = new DOMParser().parseFromString(pobranaStronaTekst, 'text/html');
  if (pobranaStrona){
    const sekcjaGuzika = pobranaStrona.getElementById("sideLeft");
    if(sekcjaGuzika){
      const wszystkieGuziki = sekcjaGuzika.getElementsByTagName("a");
      linkDoPobierania = `${wszystkieGuziki[2].outerHTML}`.replace('"><img src="images/navzapisz.gif" width="20" height="20" alt="Pobierz zdjęcie" title="Pobierz zdjęcie" border="0"></a>','').replace('<a href="','').replaceAll(';','&');
    }
  }
  return linkDoPobierania;
}