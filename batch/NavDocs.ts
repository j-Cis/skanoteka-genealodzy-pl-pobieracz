import { signal, useSignal } from "@preact/signals";
import type { Signal } from "@preact/signals";
import * as C from "@std/fmt/colors";
import * as TOML from "@std/toml";

interface NavDocsEntry {
  title: string;
  category?: string;
  href: string;
}

interface RouteDocMD {
  address: string;
  title: string;
  category?: string;
  href: string;
  file: string;
}

type RoutesDocsMD = Record<string, RouteDocMD>;

interface TreeDocsMD {
  path: string[];
  name: string;
  show: Signal<boolean>;
  nest: TreeDocsMD[] | never[];
}

const dirHREF: string = "/docs/";
const dirFILE: string = "docs/pl/";
const extFILE: [string, string] = ["/index.md", ".md"];
const v_0_0_x: string = "v0.0.2";
const v_0_1_x: string = "v0.1.0";

const DOCS_MD:TreeDocsMD[] = [
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
        path: [`skanoteka-pobieracz`, v_0_0_x],
        name: "v0.0.x",
        show: signal(true),
        nest: [ 
          {
            path: [`skanoteka-pobieracz`, v_0_0_x,`instalacja`],
            name: "instalacja",
            show: signal(false),
            nest: [ ]
          }, 
          {
            path: [`skanoteka-pobieracz`, v_0_0_x,`instrukcja`],
            name: "instrukcja",
            show: signal(false),
            nest: [ ]
          }, 
          {
            path: [`skanoteka-pobieracz`, v_0_0_x,`konfiguracja`],
            name: "konfiguracja",
            show: signal(false),
            nest: [ ]
          }, 
          {
            path: [`skanoteka-pobieracz`, v_0_0_x,`nowe-zadanie`],
            name: "nowe - zadanie",
            show: signal(false),
            nest: [ ]
          },
        ],
      },
      {
        path: [`skanoteka-pobieracz`, v_0_1_x],
        name: "v0.1.x",
        show: signal(false),
        nest: [ ],
      },
    ],
  },
];

const ROUTES_DOCS_MD: RoutesDocsMD = routesForDocsMD(DOCS_MD);

function routesForDocsMD(docsMD:TreeDocsMD[]): RoutesDocsMD {
  const out = <RoutesDocsMD> {};
  rekurencyjneCzytanieListyMD(docsMD);
  function rekurencyjneCzytanieListyMD(docsMD:TreeDocsMD[]) {
    for (const L of docsMD) {
      const outIntern = <RouteDocMD> {};
      outIntern.address = L.path.join("/"); 
      outIntern.title = L.name;
      outIntern.href = dirHREF + L.path.join("/");
      outIntern.file = `${dirFILE}${L.path.join("/")}${(L.nest.length!==0) ? extFILE[0] : extFILE[1]}`;     
      out[L.path.join("/")] = outIntern;
      if(L.nest.length>0){
        rekurencyjneCzytanieListyMD(L.nest);
      }
    }
  }  
  return out;
}

export { ROUTES_DOCS_MD, DOCS_MD, dirHREF };
export type {RouteDocMD, RoutesDocsMD, NavDocsEntry};