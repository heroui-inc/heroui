import {Skeleton} from "@heroui/react";
import * as React from "react";

import {siteConfig} from "@/config/site";
import {GitHubIcon} from "@/icons/github";
import {GITHUB_API_URL} from "@/utils/constants";

export function GitHubLink() {
  return (
    <a
      className="hover:bg-field-hover bg-field flex items-center gap-1 rounded-full p-2 transition-all"
      href={siteConfig.links.github}
      rel="noreferrer"
      target="_blank"
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
    <span className="text-muted w-8 text-xs font-medium">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
}
