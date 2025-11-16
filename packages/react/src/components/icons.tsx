import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const IconChevronDown = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Chevron down icon"
    fill="none"
    role="presentation"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const IconChevronRight = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Chevron right icon"
    fill="none"
    role="presentation"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M5.47 2.97a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 1 1-1.06-1.06L9.44 8 5.47 4.03a.75.75 0 0 1 0-1.06Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const ExternalLinkIcon = ({height = 9, width = 9, ...props}: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="External link icon"
    fill="none"
    height={height}
    role="presentation"
    viewBox="0 0 7 7"
    width={width}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.20592 6.84333L0.379822 6.01723L4.52594 1.8672H1.37819L1.38601 0.731812H6.48742V5.83714H5.34421L5.35203 2.6933L1.20592 6.84333Z"
      fill="currentColor"
    />
  </svg>
);

export const CircleDashedIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Circle dashed icon"
    fill="none"
    height={16}
    role="presentation"
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.906 1.085a7.047 7.047 0 0 1 2.188 0 .75.75 0 0 1-.232 1.482 5.546 5.546 0 0 0-1.724 0 .75.75 0 0 1-.232-1.482ZM4.933 2.502a.75.75 0 0 1-.166 1.048c-.466.34-.878.75-1.217 1.217a.75.75 0 0 1-1.213-.882 7.036 7.036 0 0 1 1.548-1.548.75.75 0 0 1 1.048.165Zm6.135 0a.75.75 0 0 1 1.047-.165 7.037 7.037 0 0 1 1.548 1.548.75.75 0 0 1-1.213.882 5.533 5.533 0 0 0-1.217-1.217.75.75 0 0 1-.165-1.048ZM1.943 6.28a.75.75 0 0 1 .624.857 5.546 5.546 0 0 0 0 1.724.75.75 0 0 1-1.482.232 7.047 7.047 0 0 1 0-2.188.75.75 0 0 1 .858-.625Zm12.114 0a.75.75 0 0 1 .858.625 7.048 7.048 0 0 1 0 2.188.75.75 0 1 1-1.482-.232 5.54 5.54 0 0 0 0-1.724.75.75 0 0 1 .624-.857ZM2.502 11.068a.75.75 0 0 1 1.048.165c.34.466.75.878 1.217 1.217a.75.75 0 0 1-.882 1.213 7.037 7.037 0 0 1-1.548-1.548.75.75 0 0 1 .165-1.047Zm10.996 0a.75.75 0 0 1 .165 1.047 7.037 7.037 0 0 1-1.548 1.548.75.75 0 0 1-.883-1.213 5.53 5.53 0 0 0 1.218-1.217.75.75 0 0 1 1.048-.165Zm-7.217 2.99a.75.75 0 0 1 .857-.625 5.54 5.54 0 0 0 1.724 0 .75.75 0 0 1 .232 1.482 7.048 7.048 0 0 1-2.188 0 .75.75 0 0 1-.625-.857Z"
      fill="currentColor"
    />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Close icon"
    fill="none"
    height={16}
    role="presentation"
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M3.47 3.47a.75.75 0 0 1 1.06 0L8 6.94l3.47-3.47a.75.75 0 1 1 1.06 1.06L9.06 8l3.47 3.47a.75.75 0 1 1-1.06 1.06L8 9.06l-3.47 3.47a.75.75 0 0 1-1.06-1.06L6.94 8 3.47 4.53a.75.75 0 0 1 0-1.06Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const InfoIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Info icon"
    fill="none"
    height={16}
    role="presentation"
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-9.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-.25 3a.75.75 0 0 0-1.5 0V11a.75.75 0 0 0 1.5 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const WarningIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Warning icon"
    fill="none"
    height={16}
    role="presentation"
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M7.134 2.994L2.217 11.5a1 1 0 0 0 .866 1.5h9.834a1 1 0 0 0 .866-1.5L8.866 2.993a1 1 0 0 0-1.732 0m3.03-.75c-.962-1.665-3.366-1.665-4.329 0L.918 10.749c-.963 1.666.24 3.751 2.165 3.751h9.834c1.925 0 3.128-2.085 2.164-3.751zM8 5a.75.75 0 0 1 .75.75v2a.75.75 0 0 1-1.5 0v-2A.75.75 0 0 1 8 5m1 5.75a1 1 0 1 1-2 0a1 1 0 0 1 2 0"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const DangerIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Danger icon"
    fill="none"
    height={16}
    role="presentation"
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M8 13.5a5.5 5.5 0 1 0 0-11a5.5 5.5 0 0 0 0 11M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m1-4.5a1 1 0 1 1-2 0a1 1 0 0 1 2 0M8.75 5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const SuccessIcon = (props: IconProps) => (
  <svg
    aria-hidden="true"
    aria-label="Success icon"
    fill="none"
    height={16}
    role="presentation"
    viewBox="0 0 16 16"
    width={16}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M13.5 8a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0m-3.9-1.55a.75.75 0 1 0-1.2-.9L7.419 8.858L6.03 7.47a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.13-.08z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
