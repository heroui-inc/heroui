import type {Ref, SVGProps} from "react";

import React, {forwardRef, memo} from "react";
import {cn} from "tailwind-variants";

const AppleIconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  const {className, ...restProps} = props;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={cn("text-2xl", className)}
      fill="currentColor"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 256 315"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path d="M213.803 167.03c.442 47.58 41.74 63.413 42.197 63.615c-.35 1.116-6.599 22.563-21.757 44.716c-13.104 19.153-26.705 38.235-48.13 38.63c-21.05.388-27.82-12.483-51.888-12.483c-24.061 0-31.582 12.088-51.51 12.871c-20.68.783-36.428-20.71-49.64-39.793c-27-39.033-47.633-110.3-19.928-158.406c13.763-23.89 38.36-39.017 65.056-39.405c20.307-.387 39.475 13.662 51.889 13.662c12.406 0 35.699-16.895 60.186-14.414c10.25.427 39.026 4.14 57.503 31.186c-1.49.923-34.335 20.044-33.978 59.822M174.24 50.199c10.98-13.29 18.369-31.79 16.353-50.199c-15.826.636-34.962 10.546-46.314 23.828c-10.173 11.763-19.082 30.589-16.678 48.633c17.64 1.365 35.66-8.964 46.64-22.262" />
    </svg>
  );
};

export const AppleIcon = memo(forwardRef(AppleIconRender));

const GoogleIconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
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
      viewBox="0 0 256 262"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285f4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34a853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
        fill="#fbbc05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#eb4335"
      />
    </svg>
  );
};

export const GoogleIcon = memo(forwardRef(GoogleIconRender));

const VerifiedBadgeIconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
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

export const VerifiedBadgeIcon = memo(forwardRef(VerifiedBadgeIconRender));
