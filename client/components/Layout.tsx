import { ComponentChildren, h } from "preact";
import { NAVIGATION_LINK } from "../data/NavApp.ts";
//type LayoutType =

function Layout(props: {
  children: ComponentChildren;
  navShow: boolean;
  navActive: string;
  navClass?: string;
  navClass_ul?: string;
  navClass_li?: string;
  navClass_a?: string;
  asideShow?: boolean;
  asideClass_box?: string;
  asideClass?: string;
  aside?: h.JSX.Element;
  footShow?: boolean;
  foot?: h.JSX.Element;
}): h.JSX.Element {
  return (
    <div
      class={[
        "flex flex-1 flex-col flex-nowrap",
        "w-full h-full",
        "fresh-gradient",
      ].join(" ")}
    >
      {props.navShow && (
        <nav
          class={"flex shadow-xl " + props.navClass ?? ""}
          f-client-nav={false}
        >
          <ul
            class={[
              "flex flex-wrap items-center",
              "gap-x-2 sm:gap-4",
              "mx-4 lg:mx-8",
              "my-2 sm:my-6",
              "2xl:mr-0",
              props.navClass_ul ?? "",
            ].join(" ")}
          >
            {NAVIGATION_LINK.map((item) => (
              <li class={" " + props.navClass_li ?? ""}>
                <a
                  href={item.href}
                  class={[
                    "p-1 sm:p-2 hover:underline text-black font-bold",
                    "aria-[current]:font-bold aria-[current]:text-rose-800",
                    props.navClass_a ?? "",
                  ].join(" ")}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div class="flex-1 flex flex-row flex-nowrap overflow-hidden">
        {props.asideShow && (
          <div
            class={"flex shadow-xl py-4 px-2 mr-4 w-72 overflow-hidden " +
                props.asideClass_box ?? ""}
          >
            <nav
              class={"flex-1 overflow-y-auto pb-8 " +
                  props.asideClass ?? ""}
              f-client-nav={false}
            >
              {props.aside ?? ""}
            </nav>
          </div>
        )}
        <div
          f-client-nav={true}
          class="flex-1 flex flex-col flex-nowrap pt-4 overflow-hidden"
        >
          <div class="flex-1 overflow-auto">
            {props.children}
          </div>
        </div>
      </div>
      {props.footShow && (props.foot ?? "")}
    </div>
  );
}

export default Layout;
