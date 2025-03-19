import {IconSvgProps} from "@/types";

export const CircleInfo = ({size = 24, width, height, ...props}: IconSvgProps) => (
  <svg
    aria-label="CircleInfo"
    focusable="false"
    height={size || height}
    viewBox="0 0 16 16"
    width={size || width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M8 13.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z"
      fill="#A1A1AA"
      fillRule="evenodd"
    />
  </svg>
);
