import type {UseBadgeProps} from "./use-badge";

import {forwardRef} from "@heroui/system";

import {useBadge} from "./use-badge";

export interface BadgeProps extends UseBadgeProps {}

const Badge = forwardRef<"span", BadgeProps>((props, ref) => {
  const {Component, children, content, slots, classNames, getBadgeProps} = useBadge({
    ...props,
  });

  return (
    <div className={slots.base({class: classNames?.base})}>
      {children}
      <Component ref={ref} {...getBadgeProps()}>
        {content}
      </Component>
    </div>
  );
});

Badge.displayName = "HeroUI.Badge";

export default Badge;
