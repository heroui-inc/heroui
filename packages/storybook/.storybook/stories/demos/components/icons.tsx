import type {Ref, SVGProps} from "react";

import React, {forwardRef, memo, useId} from "react";
import {cn} from "tailwind-variants";

const AppleIconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  const {className, ...restProps} = props;

  return (
    <svg
      ref={ref}
      aria-hidden="true"
      className={cn("text-foreground", className)}
      fill="none"
      focusable="false"
      height={16}
      role="presentation"
      viewBox="0 0 16 16"
      width={16}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M11.367 13.52c-.654.633-1.367.533-2.054.233-.726-.306-1.393-.32-2.16 0-.96.414-1.466.294-2.04-.233-3.253-3.353-2.773-8.46.92-8.647.9.047 1.527.494 2.054.534.786-.16 1.54-.62 2.38-.56 1.006.08 1.766.48 2.266 1.2-2.08 1.246-1.586 3.986.32 4.753-.38 1-.873 1.993-1.693 2.727l.007-.007ZM8.02 4.833C7.92 3.347 9.127 2.12 10.513 2c.194 1.72-1.56 3-2.493 2.833Z"
        fill="currentColor"
      />
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
      className={cn(className)}
      fill="none"
      focusable="false"
      height={16}
      role="presentation"
      viewBox="0 0 16 16"
      width={16}
      xmlns="http://www.w3.org/2000/svg"
      {...restProps}
    >
      <path
        d="M5.877 1.46a6.921 6.921 0 0 0 .474 13.224c1.159.3 2.373.312 3.539.038a6.248 6.248 0 0 0 2.833-1.472 6.28 6.28 0 0 0 1.75-2.872 8.125 8.125 0 0 0 .176-3.673h-6.51v2.7h3.77a3.25 3.25 0 0 1-1.385 2.136c-.46.304-.98.509-1.523.601a4.517 4.517 0 0 1-1.652 0 4.068 4.068 0 0 1-1.537-.67 4.299 4.299 0 0 1-1.586-2.124 4.189 4.189 0 0 1 0-2.694c.208-.613.551-1.17 1.005-1.631a4.066 4.066 0 0 1 4.096-1.07c.558.172 1.07.471 1.492.875.425-.423.849-.847 1.273-1.272.218-.228.457-.446.672-.68a6.693 6.693 0 0 0-2.227-1.374 7 7 0 0 0-4.66-.042Z"
        fill="#fff"
      />
      <path
        d="M5.877 1.46a7 7 0 0 1 4.66.04c.826.31 1.582.78 2.226 1.381-.219.234-.45.453-.672.68l-1.272 1.267a3.752 3.752 0 0 0-1.492-.875 4.066 4.066 0 0 0-4.098 1.065A4.293 4.293 0 0 0 4.225 6.65L1.958 4.894A6.949 6.949 0 0 1 5.877 1.46Z"
        fill="#E33629"
      />
      <path
        d="M1.356 6.633a6.89 6.89 0 0 1 .602-1.74l2.267 1.76a4.19 4.19 0 0 0 0 2.694c-.755.584-1.511 1.17-2.267 1.76a6.927 6.927 0 0 1-.602-4.474Z"
        fill="#F8BD00"
      />
      <path
        d="M8.139 6.704h6.51a8.127 8.127 0 0 1-.176 3.673 6.283 6.283 0 0 1-1.75 2.872c-.732-.571-1.467-1.138-2.199-1.709a3.25 3.25 0 0 0 1.385-2.137h-3.77v-2.7Z"
        fill="#587DBD"
      />
      <path
        d="M1.957 11.106a539.69 539.69 0 0 0 2.267-1.759 4.298 4.298 0 0 0 1.588 2.125c.462.326.987.552 1.54.665a4.517 4.517 0 0 0 1.652 0 3.96 3.96 0 0 0 1.524-.602c.731.57 1.466 1.137 2.198 1.708a6.25 6.25 0 0 1-2.833 1.474 7.394 7.394 0 0 1-3.54-.039 6.967 6.967 0 0 1-4.397-3.572Z"
        fill="#319F43"
      />
    </svg>
  );
};

export const GoogleIcon = memo(forwardRef(GoogleIconRender));

const VerifiedBadgeIconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  const {className, ...restProps} = props;

  const uid = useId();
  const filterId = `verified-badge-filter-${uid}`;
  const gradientId = `verified-badge-gradient-${uid}`;

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
        fill={`url(#${gradientId})`}
      />
      <path
        d="M13.9844 3.40625L14.2471 3.65625L14.6055 3.60645L18.0098 3.13281L18.5977 6.48145L18.6611 6.84375L18.9873 7.01562L22.0059 8.60156L20.4941 11.6963L20.332 12.0283L20.4961 12.3594L22.002 15.3994L18.9873 16.9844L18.6611 17.1562L18.5977 17.5186L18.0098 20.8662L14.6055 20.3936L14.2471 20.3438L13.9844 20.5938L11.5 22.9629L9.01562 20.5938L8.75293 20.3438L8.39453 20.3936L4.98926 20.8662L4.40234 17.5186L4.33887 17.1562L4.0127 16.9844L0.99707 15.3994L2.50391 12.3594L2.66797 12.0283L2.50586 11.6963L0.993164 8.60156L4.0127 7.01562L4.33887 6.84375L4.40234 6.48145L4.98926 3.13281L8.39453 3.60645L8.75293 3.65625L9.01562 3.40625L11.5 1.03613L13.9844 3.40625Z"
        stroke="#D4D4D8"
        strokeWidth="1.5"
        style={{mixBlendMode: "overlay" as const}}
      />
      <g filter={`url(#${filterId})`}>
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
          id={filterId}
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
          id={gradientId}
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
