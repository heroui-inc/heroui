import {Avatar, Link} from "@heroui/react";
import * as React from "react";

import {siteConfig} from "@/config/site";
import {GITHUB_API_URL} from "@/utils/constants";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  type?: "User" | "Bot";
}

interface GitHubCommit {
  author: GitHubUser | null;
  committer: GitHubUser | null;
  commit?: {
    author?: {name?: string; email?: string};
    committer?: {name?: string; email?: string};
  };
}

interface GitHubPR {
  user?: GitHubUser;
}

/* -------------------------------------------------------------------------------------------------
 * Constants
 * -----------------------------------------------------------------------------------------------*/

const CACHE_CONFIG = {
  cache: "force-cache" as RequestCache,
  next: {revalidate: 3600}, // Revalidate every hour
};

const COMMITS_PER_PAGE = 100;

const BOT_LOGINS = new Set(["web-flow", "ghost"]);

/* -------------------------------------------------------------------------------------------------
 * Utilities
 * -----------------------------------------------------------------------------------------------*/

/**
 * Checks if a GitHub user is a bot or automated account
 */
function isBot(user: GitHubUser | null | undefined): boolean {
  if (!user?.login) return false;

  return (
    user.type === "Bot" ||
    user.login.endsWith("[bot]") ||
    user.login.endsWith("-bot") ||
    BOT_LOGINS.has(user.login)
  );
}

/**
 * Adds a user to the contributors map if valid and not already present
 */
function addContributor(
  contributors: Map<string, GitHubUser>,
  user: GitHubUser | null | undefined,
): void {
  if (!user?.login || isBot(user) || contributors.has(user.login)) return;

  contributors.set(user.login, user);
}

/**
 * Extracts unique contributors from commits
 */
function extractContributorsFromCommits(commits: GitHubCommit[]): Map<string, GitHubUser> {
  const contributors = new Map<string, GitHubUser>();

  for (const commit of commits) {
    addContributor(contributors, commit.author);
    addContributor(contributors, commit.committer);
  }

  return contributors;
}

/* -------------------------------------------------------------------------------------------------
 * API Functions
 * -----------------------------------------------------------------------------------------------*/

/**
 * Fetches all commits from a PR with pagination support
 */
async function fetchAllCommits(prNumber: number): Promise<GitHubCommit[]> {
  const allCommits: GitHubCommit[] = [];
  let page = 1;

  while (true) {
    const url = `${GITHUB_API_URL}/repos/${siteConfig.githubRepo}/pulls/${prNumber}/commits?page=${page}&per_page=${COMMITS_PER_PAGE}`;
    const response = await fetch(url, CACHE_CONFIG);

    if (!response.ok) break;

    const commits: GitHubCommit[] = await response.json();

    if (commits.length === 0) break;

    allCommits.push(...commits);

    // Reached the last page if we got fewer commits than requested
    if (commits.length < COMMITS_PER_PAGE) break;

    page++;
  }

  return allCommits;
}

/**
 * Fetches PR details including creator information
 */
async function fetchPRDetails(prNumber: number): Promise<GitHubPR | null> {
  try {
    const url = `${GITHUB_API_URL}/repos/${siteConfig.githubRepo}/pulls/${prNumber}`;
    const response = await fetch(url, CACHE_CONFIG);

    if (!response.ok) return null;

    return (await response.json()) as GitHubPR;
  } catch {
    return null;
  }
}

/**
 * Fetches all unique contributors from a GitHub Pull Request
 * Includes commits authors/committers and PR creator
 * Filters out bots and automated accounts
 */
export async function fetchPRContributors(prNumber: number): Promise<GitHubUser[]> {
  try {
    // Fetch PR details and commits in parallel for better performance
    const [commits, prData] = await Promise.all([
      fetchAllCommits(prNumber),
      fetchPRDetails(prNumber),
    ]);

    // Extract contributors from commits
    const contributors = extractContributorsFromCommits(commits);

    // Add PR creator if available
    if (prData?.user) {
      addContributor(contributors, prData.user);
    }

    return Array.from(contributors.values());
  } catch {
    return [];
  }
}

/* -------------------------------------------------------------------------------------------------
 * Components
 * -----------------------------------------------------------------------------------------------*/

interface PRContributorsProps {
  contributors?: GitHubUser[];
  github?: {pull?: number};
}

/**
 * Renders a single contributor avatar and link
 */
function ContributorItem({contributor}: {contributor: GitHubUser}) {
  return (
    <Link.Root
      className="group flex items-center justify-start gap-1 no-underline! hover:no-underline!"
      href={contributor.html_url}
      rel="noreferrer"
      target="_blank"
      underline="none"
    >
      <Avatar.Root size="sm">
        <Avatar.Image alt={contributor.login} className="m-0!" src={contributor.avatar_url} />
        <Avatar.Fallback>{contributor.login[0]?.toUpperCase()}</Avatar.Fallback>
        <span className="sr-only">{contributor.login}</span>
      </Avatar.Root>
      <span className="text-sm">@{contributor.login}</span>
    </Link.Root>
  );
}

/**
 * Synchronous component that renders PR contributors list
 */
export function PRContributors({contributors, github}: PRContributorsProps) {
  if (!contributors || contributors.length === 0) {
    // Fallback for dev mode compatibility
    if (!github?.pull) return null;

    return null;
  }

  return (
    <div className="mt-0! mb-2 flex flex-wrap gap-4">
      {contributors.map((contributor) => (
        <ContributorItem key={contributor.login} contributor={contributor} />
      ))}
    </div>
  );
}

/**
 * Async version for backward compatibility (dev mode)
 */
export async function PRContributorsAsync(props: {github?: {pull?: number}}) {
  if (!props.github?.pull) return null;

  const contributors = await fetchPRContributors(props.github.pull);

  if (contributors.length === 0) return null;

  return <PRContributors contributors={contributors} />;
}
