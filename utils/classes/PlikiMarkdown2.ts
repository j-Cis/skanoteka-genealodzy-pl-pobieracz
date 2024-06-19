import { walkSync } from "@std/fs";
import type { WalkEntry, WalkOptions} from "@std/fs";
import * as C from "@std/fmt/colors";
import type { 
  Dokument, Dokumenty,
  Kategoria, KategoriaPlus, KategoriaPlus2, KategoriaT, Kategorie, Kategorie2,
  maxPoziomKategoria, GenerKategori1, GenerKategori2,
} from "../types/PlikiMarkdown.d.ts"

export default class PlikiMarkdown {
  #FOLDER: IterableIterator<WalkEntry>;
  dokumenty: Dokumenty;
  kategorie: Kategorie;

  constructor(root:string, options?: WalkOptions){
    let WALK: IterableIterator<WalkEntry> 
    if (options !== undefined) {
      WALK = walkSync(root, options);
      this.#FOLDER = walkSync(root, options);
    } else {
      WALK = walkSync(root);
      this.#FOLDER = walkSync(root);
    }
    ((W)=>{
      let dok: Dokumenty = {};       
      let katA:Kategorie = {};
      let katO:Kategorie2 = {};
      const katSet: Set<string> = new Set<string>();
      for (const F of W) {
        if (F.isFile && F.name.slice(-3)===".md" && F.path.split("\\").length>=4) {                
          const P:string[] = F.path.split("\\");
          const R:number = P.findIndex((p)=> p !== "..");
          if(!(P[R+1] in dok)) {dok[P[R+1]]={}}
          if(!(P[R+1] in katA)) {katA[P[R+1]]=[]}
          if(!(P[R+1] in katO)) {katO[P[R+1]]={}}
          katSet.add(`/${P.slice(R,-1).join("/")}`);
          const Q:Dokument = {
            address: F.name==="index.md" ? P.slice(R+2,-1).join("/") : P.slice(R+2).join("/").slice(0,-3),
            title: F.name==="index.md" ? P.slice(-2,-1)[0].replaceAll("_"," ").replaceAll("-"," - ") : P.slice(-1)[0].slice(0,-3).replaceAll("_"," ").replaceAll("-"," - "),
            href:`/${P.slice(R,-1).join("/")}${F.name==="index.md"?"":"/"+F.name.slice(0,-3)}`,
            file:P.join("/") 
          };
          if(!(Q.address in dok[P[R+1]])) {dok[P[R+1]][Q.address]={...Q}}
        }
      }      
      const max:number = (()=>{ const M = new Set<number>(); for (const k of katSet) {  const P:string[] = k.slice(1).split("/"); M.add(P.length); } return Math.max(...M); })()-2;
      const katArr: string[][] = Array.from(katSet).map(x => x.slice(1).split("/"));
      const katMap: Map<number, string[][]> = new Map<number,string[][]>(); 
      for (const k of katArr) { 
        if(!katMap.has(k.length-2)){
          katMap.set(k.length-2,[k]); 
        } else {
          let kk = katMap.get(k.length-2);
          kk?.push(k);
          katMap.set(k.length-2,kk??[[]]); 
        }      
      }
      const x = (n:number,s:string[]):string => {
        if(n<1){
          return s.join("/");
        } else {
          return s.slice(0,-(n)).join("/");
        }
      };
      let poziom:number = 0; 
      while(poziom<=max){
        const katPoziomX = katMap.has(poziom) ? katMap.get(poziom) : [];
        if (typeof katPoziomX !== "undefined") {
          for (const X of katPoziomX) {  
            // TODO zamienić tak aby działalo dla dowolnego poziomu
            if(poziom == 1 && X[1] in katO && !(x(0,X) in katO[X[1]])){
              katO[X[1]][x(0,X)] = {
                title: X[poziom+1].replaceAll("_"," ").replaceAll("-"," - "),
                href: "/"+x(0,X),
                entries: {}
              };
            }
            if(poziom == 2 && X[1] in katO && x(1,X) in katO[X[1]] && !(x(0,X) in katO[X[1]][x(1,X)]["entries"])){
              katO[X[1]][x(1,X)]["entries"][x(0,X)] = {
                title: X[poziom+1].replaceAll("_"," ").replaceAll("-"," - "),
                href: "/"+x(0,X),
                entries: {}
              };
            }
            if(poziom == 3 && X[1] in katO && x(2,X) in katO[X[1]] && x(1,X) in katO[X[1]][x(1,X)]["entries"] && !(x(0,X) in katO[X[1]][x(2,X)]["entries"][x(1,X)]["entries"])){
              katO[X[1]][x(2,X)]["entries"][x(1,X)]["entries"][x(0,X)] = {
                title: X[poziom+1].replaceAll("_"," ").replaceAll("-"," - "),
                href: "/"+x(0,X),
                entries: {}
              };
            }
          }
        }
        poziom++;
      }
      // TODO zamienić tak aby działalo dla dowolnego poziomu         
      for (const keyLang in katO) {
        if (Object.prototype.hasOwnProperty.call(katO, keyLang)) {
          const valLang = katO[keyLang];
          for (const keyPoziom1 in valLang) {
            if (Object.prototype.hasOwnProperty.call(valLang, keyPoziom1)) {  
              const valPoziom1 = valLang[keyPoziom1];
              katA[keyLang].push({
                title: valPoziom1.title,
                href: valPoziom1.href,
                entries: (()=>{
                  let tabPoziom1:KategoriaT[]  = [];
                  for (const keyPoziom2 in valPoziom1["entries"]) {
                    if (Object.prototype.hasOwnProperty.call(valPoziom1["entries"], keyPoziom2)) {
                      const valPoziom2 = valPoziom1["entries"][keyPoziom2];
                        tabPoziom1.push({
                        title: valPoziom2.title,
                        href: valPoziom2.href,
                        entries: (()=>{
                          let tabPoziom2:KategoriaT[] = [];
                          for (const keyPoziom3 in valPoziom2["entries"]) {
                            if (Object.prototype.hasOwnProperty.call(valPoziom2["entries"], keyPoziom3)) {
                              const valPoziom3 = valPoziom2["entries"][keyPoziom3];
                              tabPoziom1.push({
                                title: valPoziom3.title,
                                href: valPoziom3.href,                                  
                              });
                            }
                          }
                          return tabPoziom2;
                        })()
                      }); 
                    }
                  }
                  return tabPoziom1;
                })()
              });
            }
          }
          
        }
      }
      this.dokumenty = dok;
      this.kategorie = katA;
    })(WALK)
    //this.dokumenty = this.#dokumenty;
    //this.kategorie = this.#kategorie;
  }
  
  public log():void {
    console.log(C.bgCyan(" ".repeat(75)));    
    console.log(C.bgCyan(C.black(C.bold("LISTA PLIKÓW MARKDOWN"))));
    console.log(C.bgCyan(" ".repeat(75)));
    console.log(Array.from(this.#FOLDER));
    console.log(C.bgCyan(" ".repeat(75)));
    console.log(C.bgCyan(" ".repeat(75)));
  }
  get #dokumenty():Dokumenty {
    let dok: Dokumenty = {};
    for (const F of this.#FOLDER) {
      if (F.isFile && F.name.slice(-3)===".md" && F.path.split("\\").length>=4) {                
        const P:string[] = F.path.split("\\");
        const R:number = P.findIndex((p)=> p !== "..");
        if(!(P[R+1] in dok)) {dok[P[R+1]]={}}
        const Q:Dokument = {
          address: F.name==="index.md" ? P.slice(R+2,-1).join("/") : P.slice(R+2).join("/").slice(0,-3),
          title: F.name==="index.md" ? P.slice(-2,-1)[0].replaceAll("_"," ").replaceAll("-"," - ") : P.slice(-1)[0].slice(0,-3).replaceAll("_"," ").replaceAll("-"," - "),
          href:`/${P.slice(R,-1).join("/")}${F.name==="index.md"?"":"/"+F.name.slice(0,-3)}`,
          file:P.join("/") 
        };
        if(!(Q.address in dok[P[R+1]])) {dok[P[R+1]][Q.address]={...Q}}
      }
    }
    return dok;
  }
  get #kategorie():Kategorie {    
    let katA:Kategorie = {};
    let katO:Kategorie2 = {};
    const generKategori1 = (G:IterableIterator<WalkEntry>): GenerKategori1 => {
      const K = new Set<string>();
      for (const F of G) {      
        if (F.isFile && F.name.slice(-3)===".md" && F.path.split("\\").length>=4) {                
          const P:string[] = F.path.split("\\");
          const R:number = P.findIndex((p)=> p !== "..");
          if(!(P[R+1] in katA)) {katA[P[R+1]]=[]}
          if(!(P[R+1] in katO)) {katO[P[R+1]]={}}
          K.add(`/${P.slice(R,-1).join("/")}`);        
        }      
      }
      const max:number = (()=>{ const M = new Set<number>(); for (const k of K) {  const P:string[] = k.slice(1).split("/"); M.add(P.length); } return Math.max(...M); })()-2;
      return {
        K:Array.from(K).map(x => x.slice(1).split("/")),
        max:max
      };
    };
    const generKategori2 = ({K,max}:GenerKategori1): GenerKategori2 => {
      const KK = new Map<number,string[][]>(); 
      for (const k of K) { 
        if(!KK.has(k.length-2)){
          KK.set(k.length-2,[k]); 
        } else {
          let kk = KK.get(k.length-2);
          kk?.push(k);
          KK.set(k.length-2,kk??[[]]); 
        }      
      }
      return {
        K: KK,
        max:max
      };
    };
    const generKategori3 = ({K,max}:GenerKategori2):void => {
      function x(n:number,s:string[]):string {
        if(n<1){
          return s.join("/");
        } else {
          return s.slice(0,-(n)).join("/");
        }
      }
      let poziom:number = 0; 
      while(poziom<=max){
        const KK = K.has(poziom) ? K.get(poziom) : [];
        if (typeof KK !== "undefined") {
          for (const X of KK) {  
            // TODO zamienić tak aby działalo dla dowolnego poziomu
            if(poziom == 1 && X[1] in katO && !(x(0,X) in katO[X[1]])){
              katO[X[1]][x(0,X)] = {
                title: X[poziom+1].replaceAll("_"," ").replaceAll("-"," - "),
                href: "/"+x(0,X),
                entries: {}
              };
            }
            if(poziom == 2 && X[1] in katO && x(1,X) in katO[X[1]] && !(x(0,X) in katO[X[1]][x(1,X)]["entries"])){
              katO[X[1]][x(1,X)]["entries"][x(0,X)] = {
                title: X[poziom+1].replaceAll("_"," ").replaceAll("-"," - "),
                href: "/"+x(0,X),
                entries: {}
              };
            }
            if(poziom == 3 && X[1] in katO && x(2,X) in katO[X[1]] && x(1,X) in katO[X[1]][x(1,X)]["entries"] && !(x(0,X) in katO[X[1]][x(2,X)]["entries"][x(1,X)]["entries"])){
              katO[X[1]][x(2,X)]["entries"][x(1,X)]["entries"][x(0,X)] = {
                title: X[poziom+1].replaceAll("_"," ").replaceAll("-"," - "),
                href: "/"+x(0,X),
                entries: {}
              };
            }
          }
        }
        poziom++;
      }

      
    };
    const generKategori4 = ():void => { 
      // TODO zamienić tak aby działalo dla dowolnego poziomu 
      
        for (const keyLang in katO) {
          if (Object.prototype.hasOwnProperty.call(katO, keyLang)) {
            const valLang = katO[keyLang];
            for (const keyPoziom1 in valLang) {
              if (Object.prototype.hasOwnProperty.call(valLang, keyPoziom1)) {  
                const valPoziom1 = valLang[keyPoziom1];
                katA[keyLang].push({
                  title: valPoziom1.title,
                  href: valPoziom1.href,
                  entries: (()=>{
                    let tabPoziom1:KategoriaT[]  = [];
                    for (const keyPoziom2 in valPoziom1["entries"]) {
                      if (Object.prototype.hasOwnProperty.call(valPoziom1["entries"], keyPoziom2)) {
                        const valPoziom2 = valPoziom1["entries"][keyPoziom2];
                          tabPoziom1.push({
                          title: valPoziom2.title,
                          href: valPoziom2.href,
                          entries: (()=>{
                            let tabPoziom2:KategoriaT[] = [];
                            for (const keyPoziom3 in valPoziom2["entries"]) {
                              if (Object.prototype.hasOwnProperty.call(valPoziom2["entries"], keyPoziom3)) {
                                const valPoziom3 = valPoziom2["entries"][keyPoziom3];
                                tabPoziom1.push({
                                  title: valPoziom3.title,
                                  href: valPoziom3.href,                                  
                                });
                              }
                            }
                            return tabPoziom2;
                          })()
                        }); 
                      }
                    }
                    return tabPoziom1;
                  })()
                });
              }
            }
            
          }
        }
    };
    generKategori3(generKategori2(generKategori1(this.#FOLDER)));
    generKategori4();

    return katA;
  }
}