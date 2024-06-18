import type { Signal } from "@preact/signals";
import { ComponentChildren, h } from "preact";

interface AccordionItemProps {
  children: ComponentChildren;
  label: string;
  labelIsLink?:boolean;
  href?:string;
  show: Signal<boolean>;
}

export default function AccordionItem(props: AccordionItemProps): h.JSX.Element {
  return (
    <div class=" flex flex-col flex-1 flex-nowrap">
      <div 
        class={[
          "flex flex-row flex-nowrap",
          "justify-between",
          "mb-0",
          props.show.value && "[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]",
          !props.show.value && "border-b-4 border-b-stone-200"
        ].join(" ")}
      >        
        <div class="flex flex-col flex-nowrap justify-center px-2">
          <button 
            class={[
              "box-border size-10  border-b-4 border-b-stone-200",
              props.show.value ? "bg-cyan-700 px-[16px]" : "bg-emerald-700 pr-[16px] pl-[12px]",
              "flex w-full items-center",
              "transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none"
            ].join(" ")}
            onClick={() => props.show.value = !props.show.value}
            type="button"
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <span
              class={[
                props.show.value 
                  ? "rotate-[-180deg] -mr-1"
                  : "rotate-0 fill-[#212529] dark:fill-white",
                "ml-auto h-5 w-5 shrink-0 fill-[#336dec] transition-transform duration-200",
                "ease-in-out motion-reduce:transition-none dark:fill-blue-300"
              ].join(" ")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                view-box="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>     
        </div>    
        <h2 class={[
          "text-wrap text-lg px-5 py-4 text-left  font-bold text-gray-900",
          props.labelIsLink && "hover:text-gray-600 hover:underline hover:decoration-double hover:decoration-2",
          props.labelIsLink
            ? props.show.value ? "hover:decoration-cyan-700" : "hover:decoration-emerald-700"
            : "",
          props.labelIsLink && "aria-[current]:text-green-700 aria-[current]:underline aria-[current]:decoration-double aria-[current]:decoration-4"
        ].join(" ")}>
          {props.labelIsLink && <a href={props.href ?? ""} > {` ${props.label} `} </a> }
          {!props.labelIsLink && <>{` ${props.label} `}</>}          
        </h2>
      </div>
      {props.show.value && <div class="!mt-0 !rounded-b-none !shadow-none border-b-4 border-b-stone-200">
          <div class="px-5 py-4">
            {props.children}
          </div>
        </div>
      }
    </div>
  );
}
