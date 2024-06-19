import { signal, useSignal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import * as C from "@std/fmt/colors";
import * as TOML from "@std/toml";

export interface RouteMarkdownDoc {
  title: string;
  category?: string;
  href: string;
}

export interface RouteDocMD extends RouteMarkdownDoc{
  address: string;
  file: string;
}

export type RoutesDocsMD = Record<string, RouteDocMD>;

export interface TreeDocsMD {
  path: string[];
  name: string;
  show: Signal<boolean>;
  nest: TreeDocsMD[] | never[];
}

export const DOCS_FILE_DIR: string = "docs/pl/";
export const DOCS_FILE_EXT: [string, string] = ["/index.md", ".md"];
export const DOCS_HREF_DIR: string = "/docs/";
export const VERSION_0_0_x: string = "v0.0.2";
export const VERSION_0_1_x: string = "v0.1.0";

export const DOCS_MD_TREE:TreeDocsMD[] = [
  {
    path: [`zanim_zaczniesz`],
    name: "Zanim zaczniesz!",
    show: signal(false),
    nest: [ 
      {
        path: [`zanim_zaczniesz`, `srodowisko_deno`],
        name: "Środowisko wykonawcze DeNo",
        show: signal(false),
        nest: [ 
          {
            path: [`zanim_zaczniesz`, `srodowisko_deno`,`instalacja`],
            name: "instalacja",
            show: signal(false),
            nest: [ ]
          },
        ],
      },
      {
        path: [`zanim_zaczniesz`, `edytor_vscode`],
        name: "Rozbudowany edytor tekstu vsCODE",
        show: signal(false),
        nest: [ 
          {
            path: [`zanim_zaczniesz`, `edytor_vscode`,`instalacja`],
            name: "instalacja",
            show: signal(false),
            nest: [ ]
          },
        ],
      },
      {
        path: [`zanim_zaczniesz`, `przegladarka`],
        name: "Przeglądarka internetowa",
        show: signal(false),
        nest: [ 
          {
            path: [`zanim_zaczniesz`, `przegladarka`,`instalacja`],
            name: "instalacja",
            show: signal(false),
            nest: [ ]
          },
        ],
      },
      {
        path: [`zanim_zaczniesz`, `terminal`],
        name: "terminal",
        show: signal(false),
        nest: [ 
          {
            path: [`zanim_zaczniesz`, `terminal`,`instalacja`],
            name: "instalacja",
            show: signal(false),
            nest: [ ]
          },
        ],
      },
    ],
  },
  {
    path: [`skanoteka-pobieracz`],
    name: "skanoteka - pobieracz",
    show: signal(true),
    nest: [ 
      {
        path: [`skanoteka-pobieracz`, VERSION_0_0_x],
        name: "v0.0.x",
        show: signal(true),
        nest: [ 
          {
            path: [`skanoteka-pobieracz`, VERSION_0_0_x,`instalacja`],
            name: "instalacja",
            show: signal(false),
            nest: [ ]
          }, 
          {
            path: [`skanoteka-pobieracz`, VERSION_0_0_x,`instrukcja`],
            name: "instrukcja",
            show: signal(false),
            nest: [ ]
          }, 
          {
            path: [`skanoteka-pobieracz`, VERSION_0_0_x,`konfiguracja`],
            name: "konfiguracja",
            show: signal(false),
            nest: [ ]
          }, 
          {
            path: [`skanoteka-pobieracz`, VERSION_0_0_x,`nowe-zadanie`],
            name: "nowe - zadanie",
            show: signal(false),
            nest: [ ]
          },
        ],
      },
      {
        path: [`skanoteka-pobieracz`, VERSION_0_1_x],
        name: "v0.1.x",
        show: signal(false),
        nest: [ ],
      },
    ],
  },
];

export const DOCS_MD_ROUTES: RoutesDocsMD = docsMD_makeRoutes(DOCS_MD_TREE);

export function docsMD_makeAddress(path: string[]): string { return path.join("/"); }
export function docsMD_makeHrefWWW(path: string[] /*, rootHref:string*/ ): string { return DOCS_HREF_DIR + path.join("/"); }
export function docsMD_makeSrcFILE(path: string[] /*, rootDir :string*/  , hasNoNests:boolean /*, lastPath:[string,string]*/ ): string { return `${DOCS_FILE_DIR}${path.join("/")}${hasNoNests ? DOCS_FILE_EXT[0] : DOCS_FILE_EXT[1]}`; }

export function docsMD_makeRoutes(docsMD:TreeDocsMD[]): RoutesDocsMD {
  const out = <RoutesDocsMD> {};
  rekurencyjneCzytanieListyMD(docsMD);
  function rekurencyjneCzytanieListyMD(docsMD:TreeDocsMD[]) {
    for (const L of docsMD) {
      const outIntern = <RouteDocMD> {};
      outIntern.address = docsMD_makeAddress(L.path); 
      outIntern.title = L.name;
      outIntern.href = docsMD_makeHrefWWW(L.path /*, DOCS_HREF_DIR*/ );
      outIntern.file = docsMD_makeSrcFILE(L.path /*, DOCS_FILE_DIR*/ , L.nest.length!==0 /*, DOCS_FILE_EXT*/ );     
      out[outIntern.address] = outIntern;
      if(L.nest.length>0){
        rekurencyjneCzytanieListyMD(L.nest);
      }
    }
  }  
  return out;
}