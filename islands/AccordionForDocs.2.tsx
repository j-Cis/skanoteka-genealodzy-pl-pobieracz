import { type Signal, signal, useSignal } from "@preact/signals";
import { ComponentChildren, h } from "preact";

interface DocMD {
  category?: string;
  address: string;
  href: string;
  file: string;
  title: string;
}

export default function AccordionForDocs(): h.JSX.Element {
  const tab: {
    name: string;
    link: string;
    show: Signal<boolean>;
    nest: {
      name: string;
      link: string;
      show: Signal<boolean>;
      nest: {
        name: string;
        link: string;
        show: Signal<boolean>;
        nest: never[];
      }[];
    }[];
  }[] = [
    {
      name: "Zanim zaczniesz",
      link: "/docs/zanim_zaczniesz",
      show: useSignal(false),
      nest: [
        {
          name: "Środowisko wykonawcze DeNo",
          link: "/docs/zanim_zaczniesz/srodowisko_deno",
          show: useSignal(false),
          nest: [
            {
              name: "instalacja",
              link: "/docs/zanim_zaczniesz/srodowisko_deno/instalacja",
              show: useSignal(false),
              nest: [],
            },
          ],
        },
        {
          name: "Rozbudowany edytor tekstu vsCODE",
          link: "/docs/zanim_zaczniesz/edytor_vscode",
          show: useSignal(false),
          nest: [
            {
              name: "instalacja",
              link: "/docs/zanim_zaczniesz/edytor_vscode/instalacja",
              show: useSignal(false),
              nest: [],
            },
          ],
        },
        {
          name: "Przeglądarka internetowa",
          link: "/docs/zanim_zaczniesz/przegladarka",
          show: useSignal(false),
          nest: [
            {
              name: "instalacja",
              link: "/docs/zanim_zaczniesz/przegladarka/instalacja",
              show: useSignal(false),
              nest: [],
            },
          ],
        },
        {
          name: "terminal",
          link: "/docs/zanim_zaczniesz/terminal",
          show: useSignal(false),
          nest: [
            {
              name: "instalacja",
              link: "/docs/zanim_zaczniesz/terminal/instalacja",
              show: useSignal(false),
              nest: [],
            },
          ],
        },
      ],
    },
    {
      name: "skanoteka - pobieracz",
      link: "/docs/skanoteka-pobieracz",
      show: useSignal(true),
      nest: [
        {
          name: "v0.0.x",
          link: "/docs/skanoteka-pobieracz/v0.0.2",
          show: useSignal(true),
          nest: [
            {
              name: "instalacja",
              link: "/docs/skanoteka-pobieracz/v0.0.2/instalacja",
              show: useSignal(false),
              nest: [],
            },
            {
              name: "instrukcja",
              link: "/docs/skanoteka-pobieracz/v0.0.2/instrukcja",
              show: useSignal(false),
              nest: [],
            },
            {
              name: "konfiguracja",
              link: "/docs/skanoteka-pobieracz/v0.0.2/konfiguracja",
              show: useSignal(false),
              nest: [],
            },
            {
              name: "nowe - zadanie",
              link: "/docs/skanoteka-pobieracz/v0.0.2/nowe-zadanie",
              show: useSignal(false),
              nest: [],
            },
          ],
        },
        {
          name: "v0.1.x",
          link: "/docs/skanoteka-pobieracz/v0.1.0",
          show: useSignal(false),
          nest: [],
        },
      ],
    },
  ];

  function AccordionContainer(props: {
    children: ComponentChildren;
  }): h.JSX.Element {
    return (
      <div
        class={[
          "pr-0 mr-0 border-r-0",
          "rounded-none border border-y-4 border-l-4",
          `border-y-stone-200 border-l-stone-200`,
          "bg-white dark:bg-neutral-800",
        ].join(" ")}
      >
        {props.children}
      </div>
    );
  }

  function AccordionItem(props: {
    children: ComponentChildren;
    label: string;
    labelIsLink?: boolean;
    href?: string;
    show: Signal<boolean>;
  }): h.JSX.Element {
    return (
      <div class=" flex flex-col flex-1 flex-nowrap">
        <div
          class={[
            "flex flex-row flex-nowrap",
            "justify-between",
            "mb-0",
            props.show.value &&
            "[box-shadow:inset_0_-1px_0_rgba(229,231,235)] dark:[box-shadow:inset_0_-1px_0_rgba(75,85,99)]",
            !props.show.value && `border-b-4 border-b-stone-200`,
          ].join(" ")}
        >
          <ButtonToggle
            show={props.show}
            borderB={"border-b-4 border-b-stone-200"}
            bgColorTrueFalse={["bg-cyan-700", "bg-pink-700"]}
          />
          <LabelItem
            labelIsLink={true}
            label={props.label}
            href={props.href}
            show={props.show}
            decorationColorTrueFalse={[
              "hover:decoration-cyan-700",
              "hover:decoration-pink-700",
            ]}
          />
        </div>
        {props.show.value && (
          <div
            class={`!mt-0 !rounded-b-none !shadow-none border-b-4 border-b-stone-200`}
          >
            <div class="pl-5 py-4">
              {props.children}
            </div>
          </div>
        )}
      </div>
    );
  }

  function LabelItem(props: {
    label: string;
    labelIsLink?: boolean;
    href?: string;
    show?: Signal<boolean>;
    decorationColorTrueFalse: [string, string];
  }): h.JSX.Element {
    const showIsUndefined = typeof props.show === "undefined";
    return (
      <h2
        class={[
          "text-wrap text-lg px-5 py-4 font-bold text-gray-900 text-right",
          props.labelIsLink &&
          `hover:text-gray-600 hover:underline hover:decoration-double hover:decoration-2 ${
            props.decorationColorTrueFalse[0]
          }`,
          showIsUndefined
            ? ""
            : props.labelIsLink
            ? (props.show.value ?? false)
              ? props.decorationColorTrueFalse[0]
              : props.decorationColorTrueFalse[1]
            : "",
        ].join(" ")}
      >
        {props.labelIsLink && (
          <a
            class="aria-[current]:bg-slate-300 aria-[current]:underline aria-[current]:decoration-double aria-[current]:decoration-4"
            href={props.href ?? ""}
          >
            {` ${props.label} `}
          </a>
        )}
        {!props.labelIsLink && <>{` ${props.label} `}</>}
      </h2>
    );
  }

  function ButtonToggle(props: {
    show: Signal<boolean>;
    bgColorTrueFalse: [string, string];
    borderB: string;
  }): h.JSX.Element {
    const showIsUndefined = typeof props.show === "undefined";
    return (
      <div class="flex flex-col flex-nowrap justify-center px-2">
        <button
          class={[
            `box-border size-10 ${props.borderB}`,
            props.show.value
              ? `${props.bgColorTrueFalse[0]} px-[16px]`
              : `${props.bgColorTrueFalse[1]} pr-[16px] pl-[12px]`,
            "flex w-full items-center",
            "transition [overflow-anchor:none] hover:z-[2] focus:z-[3] focus:outline-none",
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
              "ease-in-out motion-reduce:transition-none dark:fill-blue-300",
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
    );
  }

  return (
    <AccordionContainer>
      {tab.map((a) => {
        switch (a.nest.length) {
          case 0:
            return (
              <LabelItem
                labelIsLink={true}
                label={a.name}
                href={a.link}
                decorationColorTrueFalse={[
                  "hover:decoration-cyan-700",
                  "hover:decoration-pink-700",
                ]}
              />
            );
          default:
            return (
              <AccordionItem
                labelIsLink={true}
                label={a.name}
                href={a.link}
                show={a.show}
              >
                {a.nest.length === 0 && <div></div>}
                {a.nest.length > 0 && (
                  <AccordionContainer>
                    {a.nest.map((b) => {
                      switch (b.nest.length) {
                        case 0:
                          return (
                            <LabelItem
                              labelIsLink={true}
                              label={b.name}
                              href={b.link}
                              decorationColorTrueFalse={[
                                "hover:decoration-cyan-700",
                                "hover:decoration-pink-700",
                              ]}
                            />
                          );
                        default:
                          return (
                            <AccordionItem
                              labelIsLink={true}
                              label={b.name}
                              href={b.link}
                              show={b.show}
                            >
                              {b.nest.length === 0 && <div>0</div>}
                              {b.nest.length > 0 && (
                                <AccordionContainer>
                                  {b.nest.map((c) => {
                                    switch (c.nest.length) {
                                      case 0:
                                        return (
                                          <LabelItem
                                            labelIsLink={true}
                                            label={c.name}
                                            href={c.link}
                                            decorationColorTrueFalse={[
                                              "hover:decoration-cyan-700",
                                              "hover:decoration-pink-700",
                                            ]}
                                          />
                                        );
                                      default:
                                        return (
                                          <AccordionItem
                                            labelIsLink={true}
                                            label={c.name}
                                            href={c.link}
                                            show={c.show}
                                          >
                                            {c.nest.length === 0 && (
                                              <div>0</div>
                                            )}
                                            {c.nest.length > 0 && <div>X</div>}
                                          </AccordionItem>
                                        );
                                    }
                                  })}
                                </AccordionContainer>
                              )}
                            </AccordionItem>
                          );
                      }
                    })}
                  </AccordionContainer>
                )}
              </AccordionItem>
            );
        }
      })}
    </AccordionContainer>
  );
}
