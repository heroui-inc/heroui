import type {Ref, SVGProps} from "react";

import {forwardRef, memo} from "react";
import {cn} from "tailwind-variants";

const IconRender = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
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

export const AppleIcon = memo(forwardRef(IconRender));
