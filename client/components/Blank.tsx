//import { ComponentChildren } from "preact";

import { h } from "preact";
//export interface ButtonProps {
//onClick?: () => void;
//children?: ComponentChildren;
//disabled?: boolean;
//}

export default function Blank(n: number | string): h.JSX.Element {
  return (
    <div>
      <p>{`${n}0`}</p>
      <p>{`${n}1`}</p>
      <p>{`${n}2`}</p>
      <p>{`${n}3`}</p>
      <p>{`${n}4`}</p>
      <p>{`${n}5`}</p>
      <p>{`${n}6`}</p>
      <p>{`${n}7`}</p>
      <p>{`${n}8`}</p>
      <p>{`${n}9`}</p>
    </div>
  );
}
