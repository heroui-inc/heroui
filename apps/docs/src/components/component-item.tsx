"use client";

import type {ComponentInfo} from "../components-registry";

import {LinkIcon} from "@/icons/link";
import {cn} from "@/utils/cn";

interface ComponentItemProps extends React.ComponentProps<"div"> {
  component: ComponentInfo;
  className?: string;
}

export function ComponentItem({className, component, ...props}: ComponentItemProps) {
  const {description, href, title} = component;

  return (
    <a className="block" href={href} rel="noopener noreferrer" target="_blank">
      <div
        className={cn(
          "border-border/60 bg-content1 group relative flex h-full flex-col gap-3 rounded-xl border p-5 py-4 transition-all duration-200",
          "hover:border-border",
          className,
        )}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-muted line-clamp-2 text-sm">{description}</p>
        </div>
        <span className="absolute right-3 top-3">
          <LinkIcon className="group-hover:text-muted text-muted/30 size-4 transition-all duration-200" />
        </span>
      </div>
    </a>
  );
}
