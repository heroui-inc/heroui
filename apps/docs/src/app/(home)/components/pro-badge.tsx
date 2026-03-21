import type {SVGProps} from "react";

export const ProBadge = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="none"
      height={16}
      viewBox="0 0 16 16"
      width={16}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#a)">
        <path
          d="M6.668 1.436a2.667 2.667 0 0 1 2.667 0l3.684 2.127a2.667 2.667 0 0 1 1.333 2.31v4.254c0 .953-.508 1.833-1.333 2.31l-3.684 2.126a2.667 2.667 0 0 1-2.667 0l-3.684-2.127a2.667 2.667 0 0 1-1.334-2.31V5.874c0-.953.509-1.833 1.334-2.31l3.684-2.127Z"
          fill="url(#b)"
        />
      </g>
      <path
        d="M8.384 7.063V5.237c.01-.045-.008-.152-.148-.218-.122-.057-.255.028-.295.082a72.22 72.22 0 0 0-1.788 3.12c-.057.13-.018.21.035.27.04.045.134.072.185.072h1.235l-.263 2.233c.003.052.046.163.188.197.141.034.239-.068.27-.123l2.019-3.417c.03-.045.09-.164.025-.27a.26.26 0 0 0-.233-.12h-1.23Z"
        fill="#fff"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="b"
          x1={8.001}
          x2={8.001}
          y1={0.667}
          y2={15.333}
        >
          <stop stopColor="#388EF8" />
          <stop offset={1} stopColor="#90D7F6" />
        </linearGradient>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height={13.841}
          id="a"
          width={12.699}
          x={1.652}
          y={1.079}
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation={0.333} />
          <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0" />
          <feBlend in2="shape" result="effect1_innerShadow_3573_58880" />
        </filter>
      </defs>
    </svg>
  );
};
