import {Avatar, Link} from "@heroui/react";
import * as React from "react";

import {siteConfig} from "@/config/site";
import {GITHUB_API_URL} from "@/utils/constants";

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

/**
 * Fetches all unique contributors from a GitHub Pull Request
 */
async function fetchPRContributors(prNumber: number): Promise<GitHubUser[]> {
  try {
    const url = `${GITHUB_API_URL}/repos/${siteConfig.githubRepo}/pulls/${prNumber}/commits`;
    const response = await fetch(url, {cache: "force-cache"});

    if (!response.ok) return [];

    const commits: Array<{author: GitHubUser | null}> = await response.json();

    // Deduplicate contributors by login
    const uniqueContributors = commits.reduce((acc, commit) => {
      const author = commit.author;

      if (author?.login && !acc.has(author.login)) {
        acc.set(author.login, author);
      }

      return acc;
    }, new Map<string, GitHubUser>());

    return Array.from(uniqueContributors.values());
  } catch (error) {
    return [];
  }
}

export async function PRContributors(props: any) {
  if (!props.github?.pull) return null;

  const contributors = await fetchPRContributors(props.github.pull);

  if (contributors.length === 0) return null;

  return (
    <div className="!mt-0 mb-2 flex flex-wrap gap-4">
      {contributors.map((contributor) => (
        <Link.Root
          key={contributor.login}
          className="group flex items-center justify-start gap-1 !no-underline hover:!no-underline"
          href={contributor.html_url}
          rel="noreferrer"
          target="_blank"
          underline="none"
        >
          <Avatar.Root size="sm">
            <Avatar.Image alt={contributor.login} className="!m-0" src={contributor.avatar_url} />
            <Avatar.Fallback>{contributor.login[0]?.toUpperCase()}</Avatar.Fallback>
            <span className="sr-only">{contributor.login}</span>
          </Avatar.Root>
          <span className="text-sm">@{contributor.login}</span>
        </Link.Root>
      ))}
    </div>
  );
}
