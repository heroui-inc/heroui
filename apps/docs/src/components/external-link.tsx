"use client";

import type {LinkProps} from "fumadocs-core/link";

import Link from "fumadocs-core/link";
import React from "react";

import {LinkIcon} from "@/icons/link";

export interface ExternalLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({children, className = "", ...props}, ref) => {
    return (
      <Link
        ref={ref}
        external
        className={`text-muted hover:text-fd-accent-foreground data-[active=true]:text-fd-primary relative inline-flex items-center gap-1 p-2 text-sm transition-colors ${className}`}
        {...props}
      >
        {children}
        <LinkIcon className="outline-solid absolute right-[-1px] top-[8px] outline-transparent transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]" />
      </Link>
    );
  },
);

ExternalLink.displayName = "ExternalLink";
