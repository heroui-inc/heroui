"use client";

import type {LinkProps} from "fumadocs-core/link";

import Link from "fumadocs-core/link";
import React from "react";

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
        <svg
          aria-hidden="true"
          className="outline-solid absolute right-[-1px] top-[8px] outline-transparent transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]"
          height="10"
          role="img"
          viewBox="0 0 24 24"
          width="10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6m0 0H9m9 0v9"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </Link>
    );
  },
);

ExternalLink.displayName = "ExternalLink";
