import type {IconSvgProps} from "./types";

export const LoadingIcon = (props: IconSvgProps) => (
  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="40" cy="65" fill="#3871FF" r="15" stroke="#3871FF" strokeWidth="15">
      <animate
        attributeName="cy"
        begin="-.4"
        calcMode="spline"
        dur="2"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        values="65;135;65;"
      />
    </circle>
    <circle cx="100" cy="65" fill="#3871FF" r="15" stroke="#3871FF" strokeWidth="15">
      <animate
        attributeName="cy"
        begin="-.2"
        calcMode="spline"
        dur="2"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        values="65;135;65;"
      />
    </circle>
    <circle cx="160" cy="65" fill="#3871FF" r="15" stroke="#3871FF" strokeWidth="15">
      <animate
        attributeName="cy"
        begin="0"
        calcMode="spline"
        dur="2"
        keySplines=".5 0 .5 1;.5 0 .5 1"
        repeatCount="indefinite"
        values="65;135;65;"
      />
    </circle>
  </svg>
);
