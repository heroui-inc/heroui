import type {Ref, SVGProps} from "react";

import {forwardRef, memo} from "react";
import {cn} from "tailwind-variants";

const IconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  const {className, ...restProps} = props;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={cn("text-2xl", className)}
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M13.9844 3.40625L14.2471 3.65625L14.6055 3.60645L18.0098 3.13281L18.5977 6.48145L18.6611 6.84375L18.9873 7.01562L22.0059 8.60156L20.4941 11.6963L20.332 12.0283L20.4961 12.3594L22.002 15.3994L18.9873 16.9844L18.6611 17.1562L18.5977 17.5186L18.0098 20.8662L14.6055 20.3936L14.2471 20.3438L13.9844 20.5938L11.5 22.9629L9.01562 20.5938L8.75293 20.3438L8.39453 20.3936L4.98926 20.8662L4.40234 17.5186L4.33887 17.1562L4.0127 16.9844L0.99707 15.3994L2.50391 12.3594L2.66797 12.0283L2.50586 11.6963L0.993164 8.60156L4.0127 7.01562L4.33887 6.84375L4.40234 6.48145L4.98926 3.13281L8.39453 3.60645L8.75293 3.65625L9.01562 3.40625L11.5 1.03613L13.9844 3.40625Z"
        fill="url(#paint0_linear_1_1856)"
      />
      <path
        d="M13.9844 3.40625L14.2471 3.65625L14.6055 3.60645L18.0098 3.13281L18.5977 6.48145L18.6611 6.84375L18.9873 7.01562L22.0059 8.60156L20.4941 11.6963L20.332 12.0283L20.4961 12.3594L22.002 15.3994L18.9873 16.9844L18.6611 17.1562L18.5977 17.5186L18.0098 20.8662L14.6055 20.3936L14.2471 20.3438L13.9844 20.5938L11.5 22.9629L9.01562 20.5938L8.75293 20.3438L8.39453 20.3936L4.98926 20.8662L4.40234 17.5186L4.33887 17.1562L4.0127 16.9844L0.99707 15.3994L2.50391 12.3594L2.66797 12.0283L2.50586 11.6963L0.993164 8.60156L4.0127 7.01562L4.33887 6.84375L4.40234 6.48145L4.98926 3.13281L8.39453 3.60645L8.75293 3.65625L9.01562 3.40625L11.5 1.03613L13.9844 3.40625Z"
        stroke="#D4D4D8"
        strokeWidth="1.5"
        style={{mixBlendMode: "overlay" as const}}
      />
      <g filter="url(#filter0_ddddddd_1_1856)">
        <path
          d="M6 12.3279L9.76623 16L16 9.35519L14.5281 8L9.67965 13.1585L7.42857 10.929L6 12.3279Z"
          fill="#F4F4F5"
        />
      </g>
      <defs>
        <filter
          colorInterpolationFilters="sRGB"
          filterUnits="userSpaceOnUse"
          height="10.1"
          id="filter0_ddddddd_1_1856"
          width="10"
          x="6"
          y="8"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.785986 0 0 0 0 0.532335 0 0 0 0 0.21662 0 0 0 1 0"
          />
          <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow_1_1856" />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.6" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784314 0 0 0 0 0.533333 0 0 0 0 0.215686 0 0 0 1 0"
          />
          <feBlend
            in2="effect1_dropShadow_1_1856"
            mode="normal"
            result="effect2_dropShadow_1_1856"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.9" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784314 0 0 0 0 0.533333 0 0 0 0 0.215686 0 0 0 1 0"
          />
          <feBlend
            in2="effect2_dropShadow_1_1856"
            mode="normal"
            result="effect3_dropShadow_1_1856"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1.2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784314 0 0 0 0 0.533333 0 0 0 0 0.215686 0 0 0 1 0"
          />
          <feBlend
            in2="effect3_dropShadow_1_1856"
            mode="normal"
            result="effect4_dropShadow_1_1856"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784314 0 0 0 0 0.533333 0 0 0 0 0.215686 0 0 0 1 0"
          />
          <feBlend
            in2="effect4_dropShadow_1_1856"
            mode="normal"
            result="effect5_dropShadow_1_1856"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="1.8" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784314 0 0 0 0 0.533333 0 0 0 0 0.215686 0 0 0 1 0"
          />
          <feBlend
            in2="effect5_dropShadow_1_1856"
            mode="normal"
            result="effect6_dropShadow_1_1856"
          />
          <feColorMatrix
            in="SourceAlpha"
            result="hardAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="2.1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.784314 0 0 0 0 0.533333 0 0 0 0 0.215686 0 0 0 1 0"
          />
          <feBlend
            in2="effect6_dropShadow_1_1856"
            mode="normal"
            result="effect7_dropShadow_1_1856"
          />
          <feBlend
            in="SourceGraphic"
            in2="effect7_dropShadow_1_1856"
            mode="normal"
            result="shape"
          />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_1_1856"
          x1="6"
          x2="16.5"
          y1="1"
          y2="25"
        >
          <stop stopColor="#F1DF76" />
          <stop offset="0.0001" stopColor="#FFEF8F" />
          <stop offset="0.479167" stopColor="#EECA37" />
          <stop offset="1" stopColor="#DEB200" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const VerifiedBadgeIcon = memo(forwardRef(IconRender));
