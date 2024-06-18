import { ComponentChildren, h } from "preact";

interface AccordionContainerProps {
  children: ComponentChildren;
}

export default function AccordionContainer(props: AccordionContainerProps): h.JSX.Element {
  return (
    <div 
      class={[
        "rounded-none border border-l-0 border-r-0 border-b-0",
        "bg-white dark:bg-neutral-800",
        "border-t-4 border-t-stone-200"
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}
