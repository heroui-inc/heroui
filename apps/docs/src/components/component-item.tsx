"use client";

import type {ComponentInfo} from "../components-registry";

import {Link} from "@heroui/react";
import Image from "next/image";
import {useTheme} from "next-themes";

import {cn} from "@/utils/cn";

interface ComponentItemProps extends React.ComponentProps<"div"> {
  component: ComponentInfo;
  className?: string;
}

export function ComponentItem({className, component}: ComponentItemProps) {
  const {href, title} = component;
  const {theme} = useTheme();

  return (
    <div className={cn("flex flex-col gap-[9px]", className)}>
      <div className="border-divider flex rounded-xl border">
        <Link href={href} rel="noopener noreferrer" target="_blank" underline="none">
          <Image
            alt={title}
            height={297}
            src={`https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/related-components/${theme === "dark" ? "dark" : "light"}-${title.toLowerCase()}.png`}
            width={437}
          />
        </Link>
      </div>
      <Link href={href} rel="noopener noreferrer" target="_blank" underline="none">
        {title}
        <Link.Icon />
      </Link>
    </div>
  );
}
