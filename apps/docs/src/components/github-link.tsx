import {Skeleton, buttonVariants} from "@heroui/react";
import * as React from "react";

import {siteConfig} from "@/config/site";
import {GitHubIcon} from "@/icons/github";
import {cn} from "@/utils/cn";
import {GITHUB_API_URL} from "@/utils/constants";

export function GitHubLink({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={siteConfig.links.github}
      rel="noreferrer"
      target="_blank"
      className={buttonVariants({
        className: cn("bg-surface-tertiary", className),
        variant: "tertiary",
      })}
    >
      <GitHubIcon />
      {children}
      <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
        <StarsCount />
      </React.Suspense>
    </a>
  );
}

export function GitHubLinkSmall({className}: {className?: string}) {
  return (
    <a
      href={siteConfig.links.github}
      rel="noreferrer"
      target="_blank"
      className={buttonVariants({
        className: cn("bg-default/80 h-[34px] border-none", className),
        size: "sm",
        variant: "tertiary",
      })}
    >
      <GitHubIcon />
      <React.Suspense fallback={<Skeleton className="h-4 w-8" />}>
        <StarsCount />
      </React.Suspense>
    </a>
  );
}

export async function StarsCount() {
  const data = await fetch(`${GITHUB_API_URL}/repos/${siteConfig.githubRepo}`, {
    next: {revalidate: 86400}, // Cache for 1 day (86400 seconds)
  });
  const json = await data.json();

  return (
    <span className="text-muted pt-px text-xs font-medium">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
}
