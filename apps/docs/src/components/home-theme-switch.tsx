"use client";

import type {SwitchProps as AriaSwitchProps} from "react-aria-components";

import {useTheme} from "next-themes";
import React from "react";
import {Switch as AriaSwitch} from "react-aria-components";
import {tv} from "tailwind-variants";

import {useIsMounted} from "@/hooks/use-is-mounted";
import {composeTailwindRenderProps} from "@/utils/compose-tw-render";

import {Iconify} from "./iconify";

export interface SwitchProps extends Omit<AriaSwitchProps, "children"> {
  children: React.ReactNode;
}

const wrapper = tv({
  base: [
    "h-13 group relative flex w-[84px] items-center gap-3 rounded-full bg-[#C6BCBB]/50",
    "px-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.5),0_1px_4px_rgba(0,0,0,0.15)]",
    "backdrop-blur-[54.3px] dark:bg-[#383435]/30 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)]",
  ],
});

const icon = tv({
  base: "text-foreground z-20 text-xl",
});

const thumb = tv({
  base: [
    "absolute left-2.5 top-1/2 z-10 h-8 w-8 bg-[#FFFFFF]/70 backdrop-blur-md",
    "-translate-y-1/2 rounded-full shadow-[0px_2px_8px_0px_rgba(0,0,0,0.16)]",
    "dark:bg-[#383435]/30 dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0px_1px_4px_0px_rgba(0,0,0,0.15)]",
    "transition-all duration-300",
  ],
  compoundVariants: [
    {
      class: "w-10",
      isPressed: true,
      isSelected: false,
    },
    {
      class: "ml-6 w-10",
      isPressed: true,
      isSelected: true,
    },
  ],
  variants: {
    isFocusVisible: {
      true: "ring-2 ring-offset-2 ring-offset-white",
    },
    isSelected: {
      false: "",
      true: "ml-8",
    },
  },
});

export function HomeThemeSwitch({...props}: Omit<SwitchProps, "children">) {
  const {setTheme, theme} = useTheme();
  const isMounted = useIsMounted();

  if (!isMounted) {
    // Render placeholder to avoid layout shift
    return <div className="h-13 w-[84px] rounded-full bg-[#C6BCBB]/50 backdrop-blur-[54.3px]" />;
  }

  const isSelected = theme === "dark";

  const handleChange = (isSelected: boolean) => {
    setTheme(isSelected ? "dark" : "light");
  };

  return (
    <AriaSwitch
      {...props}
      aria-label="Theme switch"
      className={composeTailwindRenderProps(props.className, wrapper())}
      isSelected={isSelected}
      onChange={handleChange}
    >
      {(renderProps) => (
        <>
          <div className={thumb(renderProps)} />
          <Iconify className={icon()} icon="gravity-ui:sun" />
          <Iconify className={icon()} icon="gravity-ui:moon" />
        </>
      )}
    </AriaSwitch>
  );
}
