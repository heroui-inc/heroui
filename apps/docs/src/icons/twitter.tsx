import type {Ref, SVGProps} from "react";

import {forwardRef, memo} from "react";
import {cnBase as cn} from "tailwind-variants";

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
        d="M13.795 11.033 20.68 2.5h-3.073l-5.255 6.517L7.69 2.5H1l7.806 10.91L1.47 22.5h3.074l5.705-7.07 5.061 7.07H22l-8.205-11.467Zm-2.38 2.95L9.97 11.964 4.36 4.127h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const TwitterIcon = memo(forwardRef(IconRender));
