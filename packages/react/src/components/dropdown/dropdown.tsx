"use client";

import type {SurfaceVariants} from "../surface";
import type {DropdownVariants} from "@heroui/styles";
import type {ComponentPropsWithRef} from "react";

import {dropdownVariants} from "@heroui/styles";
import React, {createContext, use, useLayoutEffect, useRef, useState} from "react";
import {Button} from "react-aria-components/Button";
import {
  Menu as MenuPrimitive,
  MenuTrigger as MenuTriggerPrimitive,
  Popover as PopoverPrimitive,
  SubmenuTrigger as SubmenuTriggerPrimitive,
} from "react-aria-components/Menu";

import {composeTwRenderProps} from "../../utils/compose";
import {MenuItemIndicator, MenuItemRoot, MenuItemSubmenuIndicator} from "../menu-item";
import {MenuSectionRoot} from "../menu-section";
import {SurfaceContext} from "../surface";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Context
 * -----------------------------------------------------------------------------------------------*/
type DropdownContext = {
  slots?: ReturnType<typeof dropdownVariants>;
  /** True while the root menu should stay mounted for its close animation. */
  isExiting: boolean;
  endExit: () => void;
};

const DropdownContext = createContext<DropdownContext>({
  isExiting: false,
  endExit: () => {},
});

/** Submenu popovers have their own open state and must not inherit the root exit hold. */
const DropdownSubmenuContext = createContext(false);

/** Longest CSS animation duration on `element`, in milliseconds. */
const animationDurationMs = (element: HTMLElement) => {
  const durations = getComputedStyle(element)
    .animationDuration.split(",")
    .map((part) => {
      const value = part.trim();
      const amount = Number.parseFloat(value);

      if (Number.isNaN(amount)) return 0;

      return value.endsWith("ms") ? amount : amount * 1000;
    });

  return Math.max(0, ...durations);
};

/* -------------------------------------------------------------------------------------------------
 * Dropdown Root (MenuTrigger wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownRootProps
  extends ComponentPropsWithRef<typeof MenuTriggerPrimitive>, DropdownVariants {
  className?: string;
}

const DropdownRoot = ({children, onOpenChange, ...props}: DropdownRootProps) => {
  const [isExiting, setIsExiting] = useState(false);
  const slots = React.useMemo(() => dropdownVariants(), []);
  const endExit = React.useCallback(() => setIsExiting(false), []);
  const contextValue = React.useMemo(
    () => ({slots, isExiting, endExit}),
    [slots, isExiting, endExit],
  );

  return (
    <DropdownContext value={contextValue}>
      <MenuTriggerPrimitive
        {...props}
        onOpenChange={(isOpen) => {
          // WebKit reports the exit animation as pending in the same layout effect where
          // React Aria looks for a running one, then unmounts. Hold `isExiting` so the
          // close animation can paint. Batched with the trigger's own close update.
          setIsExiting(!isOpen);
          onOpenChange?.(isOpen);
        }}
      >
        {children}
      </MenuTriggerPrimitive>
    </DropdownContext>
  );
};

DropdownRoot.displayName = "HeroUI.Dropdown";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Trigger (Button wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownTriggerProps extends ComponentPropsWithRef<typeof Button> {}

const DropdownTrigger = ({children, className, ...props}: DropdownTriggerProps) => {
  const {slots} = use(DropdownContext);

  return (
    <Button
      className={composeTwRenderProps(className, slots?.trigger())}
      data-slot="dropdown-trigger"
      {...props}
    >
      {(values) => <>{typeof children === "function" ? children(values) : children}</>}
    </Button>
  );
};

DropdownTrigger.displayName = "HeroUI.Dropdown.Trigger";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Popover (Popover wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownPopoverProps
  extends Omit<ComponentPropsWithRef<typeof PopoverPrimitive>, "children">, DropdownVariants {
  children: React.ReactNode;
}

const DropdownPopover = ({
  children,
  className,
  isExiting: isExitingProp,
  placement,
  ref,
  ...props
}: DropdownPopoverProps) => {
  const {endExit, isExiting, slots} = use(DropdownContext);
  const isSubmenu = use(DropdownSubmenuContext);
  const holdExit = !isSubmenu && isExiting;
  const popoverRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const popover = popoverRef.current;

    if (!holdExit || !popover) return;

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      endExit();
    };
    const exitAnimations = () =>
      popover.getAnimations().filter((animation): animation is CSSAnimation => {
        return (
          animation instanceof CSSAnimation &&
          (animation.playState === "running" || String(animation.playState) === "pending")
        );
      });
    const waitForAnimations = (animations: CSSAnimation[]) => {
      if (animations.length === 0) {
        finish();

        return;
      }

      void Promise.all(animations.map((animation) => animation.finished)).then(finish, finish);
    };

    const current = exitAnimations();

    if (current.length > 0) {
      waitForAnimations(current);

      return () => {
        settled = true;
      };
    }

    // No stylesheet animation (jsdom). Release in this layout pass so the menu does not stick.
    const hasAnimation = getComputedStyle(popover)
      .animationName.split(",")
      .some((name) => {
        const value = name.trim().replaceAll('"', "");

        return value !== "" && value !== "none";
      });

    if (!hasAnimation) {
      finish();

      return;
    }

    // WebKit has already applied the animation name, but getAnimations() still
    // reports nothing until the next frame. Hold until it is running, or until
    // its duration elapses if it never starts.
    const onAnimationDone = (event: AnimationEvent) => {
      if (event.target === popover) finish();
    };

    popover.addEventListener("animationend", onAnimationDone);
    popover.addEventListener("animationcancel", onAnimationDone);
    const timeout = window.setTimeout(finish, animationDurationMs(popover) + 50);
    const frame = window.requestAnimationFrame(() => {
      const next = exitAnimations();

      if (next.length === 0) return;

      window.clearTimeout(timeout);
      waitForAnimations(next);
    });

    return () => {
      settled = true;
      popover.removeEventListener("animationend", onAnimationDone);
      popover.removeEventListener("animationcancel", onAnimationDone);
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frame);
    };
  }, [holdExit, endExit]);

  return (
    <SurfaceContext
      value={{
        variant: "default" as SurfaceVariants["variant"],
      }}
    >
      <PopoverPrimitive
        {...props}
        ref={(node) => {
          popoverRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={composeTwRenderProps(className, slots?.popover())}
        data-slot="dropdown-popover"
        isExiting={holdExit || isExitingProp}
        placement={placement}
      >
        {children}
      </PopoverPrimitive>
    </SurfaceContext>
  );
};

DropdownPopover.displayName = "HeroUI.Dropdown.Popover";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Menu (Menu wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownMenuProps<T extends object>
  extends ComponentPropsWithRef<typeof MenuPrimitive<T>>, DropdownVariants {
  className?: string;
}

function DropdownMenu<T extends object>({className, ...props}: DropdownMenuProps<T>) {
  const {slots} = use(DropdownContext);

  return (
    <MenuPrimitive
      className={composeTwRenderProps(className, slots?.menu())}
      data-selection-mode={props.selectionMode}
      data-slot="dropdown-menu"
      {...props}
    />
  );
}

DropdownMenu.displayName = "HeroUI.Dropdown.Menu";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item (MenuItem wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemProps extends ComponentPropsWithRef<typeof MenuItemRoot> {}

const DropdownItem = (props: DropdownItemProps) => {
  return <MenuItemRoot {...props} />;
};

DropdownItem.displayName = "HeroUI.Dropdown.Item";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Indicator (MenuItemSubmenuIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuIndicatorProps extends ComponentPropsWithRef<
  typeof MenuItemSubmenuIndicator
> {}

const DropdownSubmenuIndicator = (props: DropdownSubmenuIndicatorProps) => {
  return <MenuItemSubmenuIndicator {...props} />;
};

DropdownSubmenuIndicator.displayName = "HeroUI.Dropdown.SubmenuIndicator";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Submenu Trigger
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSubmenuTriggerProps extends ComponentPropsWithRef<
  typeof SubmenuTriggerPrimitive
> {}

const DropdownSubmenuTrigger = ({children, ...props}: DropdownSubmenuTriggerProps) => {
  return (
    <DropdownSubmenuContext value>
      <SubmenuTriggerPrimitive data-slot="dropdown-submenu-trigger" {...props}>
        {children}
      </SubmenuTriggerPrimitive>
    </DropdownSubmenuContext>
  );
};

DropdownSubmenuTrigger.displayName = "HeroUI.Dropdown.SubmenuTrigger";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Item Indicator (MenuItemIndicator wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownItemIndicatorProps extends ComponentPropsWithRef<typeof MenuItemIndicator> {}

const DropdownItemIndicator = (props: DropdownItemIndicatorProps) => {
  return <MenuItemIndicator {...props} />;
};

DropdownItemIndicator.displayName = "HeroUI.Dropdown.ItemIndicator";

/* -------------------------------------------------------------------------------------------------
 * Dropdown Section (MenuSection wrapper)
 * -----------------------------------------------------------------------------------------------*/
interface DropdownSectionProps extends ComponentPropsWithRef<typeof MenuSectionRoot> {}

const DropdownSection = (props: DropdownSectionProps) => {
  return <MenuSectionRoot {...props} />;
};

DropdownSection.displayName = "HeroUI.Dropdown.Section";

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/
export {
  DropdownItem,
  DropdownItemIndicator,
  DropdownMenu,
  DropdownPopover,
  DropdownRoot,
  DropdownSection,
  DropdownSubmenuIndicator,
  DropdownSubmenuTrigger,
  DropdownTrigger,
};

export type {
  DropdownItemIndicatorProps,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownPopoverProps,
  DropdownRootProps,
  DropdownSectionProps,
  DropdownSubmenuIndicatorProps,
  DropdownSubmenuTriggerProps,
  DropdownTriggerProps,
};
