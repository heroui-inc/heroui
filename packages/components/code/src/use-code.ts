import type {CodeVariantProps} from "@vezham/theme";
import type {HTMLHeroUIProps, PropGetter} from "@vezham/system-rsc";

import {code} from "@vezham/theme";
import {mapPropsVariants} from "@vezham/system-rsc";
import {ReactRef} from "@vezham/react-utils";
import {useMemo} from "react";
import {objectToDeps} from "@vezham/shared-utils";

export interface UseCodeProps extends HTMLHeroUIProps<"code">, CodeVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
}

export function useCode(originalProps: UseCodeProps) {
  const [props, variantProps] = mapPropsVariants(originalProps, code.variantKeys);

  const {as, children, className, ...otherProps} = props;

  const Component = as || "code";

  const classNames = useMemo(
    () =>
      code({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const getCodeProps: PropGetter = () => {
    return {
      className: classNames,
      ...otherProps,
    };
  };

  return {Component, children, getCodeProps};
}

export type UseCodeReturn = ReturnType<typeof useCode>;
