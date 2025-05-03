interface IconProps extends React.SVGProps<SVGSVGElement> {}

export const IconChevronDown = (props: IconProps) => (
  <svg fill="none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      clipRule="evenodd"
      d="M2.97 5.47a.75.75 0 0 1 1.06 0L8 9.44l3.97-3.97a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 0 1 0-1.06"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export const LinkIcon = ({height = 7, width = 7, ...props}: IconProps) => (
  <svg
    aria-hidden="true"
    fill="currentColor"
    height={height}
    viewBox="0 0 6 6"
    width={width}
    {...props}
  >
    <path d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z" />
  </svg>
);
