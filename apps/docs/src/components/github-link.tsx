"use client";

import {Skeleton, buttonVariants} from "@heroui/react";
import {useEffect, useState} from "react";

import {useCurrentFramework} from "@/hooks/use-current-framework";
import {GitHubIcon} from "@/icons/github";
import {cn} from "@/utils/cn";
import {GITHUB_API_URL, REPO_NAME, REPO_NAME_NATIVE} from "@/utils/constants";

const CACHE_DURATION = 86400000; // 1 day in milliseconds
const CACHE_KEY_PREFIX = "github-stars-";

interface CachedStarsData {
  timestamp: number;
  data: any;
}

function getCachedStars(repo: string): any | null {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${repo}`;
    const cached = localStorage.getItem(cacheKey);

    if (!cached) {
      return null;
    }

    const parsed: CachedStarsData = JSON.parse(cached);
    const now = Date.now();
    const age = now - parsed.timestamp;

    if (age > CACHE_DURATION) {
      // Cache expired, remove it
      localStorage.removeItem(cacheKey);

      return null;
    }

    return parsed.data;
  } catch {
    // If localStorage is unavailable or corrupted, return null
    return null;
  }
}

function setCachedStars(repo: string, data: any): void {
  try {
    const cacheKey = `${CACHE_KEY_PREFIX}${repo}`;
    const cacheValue: CachedStarsData = {
      data,
      timestamp: Date.now(),
    };

    localStorage.setItem(cacheKey, JSON.stringify(cacheValue));
  } catch {
    // If localStorage is unavailable, silently fail
    // Component will still work, just won't cache
  }
}

function getGitHubRepo(framework: "web" | "native"): string {
  return framework === "native" ? REPO_NAME_NATIVE : REPO_NAME;
}

function getGitHubUrl(framework: "web" | "native"): string {
  const repo = getGitHubRepo(framework);

  return `https://github.com/${repo}`;
}

export function GitHubLink({
  children,
  className,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const framework = useCurrentFramework();
  const githubUrl = getGitHubUrl(framework);

  return (
    <a
      href={githubUrl}
      rel="noreferrer"
      target="_blank"
      className={buttonVariants({
        className: cn("bg-surface-tertiary", className),
        variant: "tertiary",
      })}
    >
      <GitHubIcon />
      {children}
      <StarsCount />
    </a>
  );
}

export function GitHubLinkSmall({className}: {className?: string}) {
  const framework = useCurrentFramework();
  const githubUrl = getGitHubUrl(framework);

  return (
    <a
      href={githubUrl}
      rel="noreferrer"
      target="_blank"
      className={buttonVariants({
        className: cn("h-[34px] border-none bg-default/80", className),
        size: "sm",
        variant: "tertiary",
      })}
    >
      <GitHubIcon />
      <StarsCount />
    </a>
  );
}

function StarsCountInner({framework}: {framework: "web" | "native"}) {
  const repo = getGitHubRepo(framework);
  const cachedData = getCachedStars(repo);
  const [isLoading, setIsLoading] = useState(() => !cachedData);
  const [json, setJson] = useState<any>(() => cachedData);

  useEffect(() => {
    const currentRepo = getGitHubRepo(framework);
    const cached = getCachedStars(currentRepo);

    // If we have valid cached data, use it (handles framework changes)
    if (cached) {
      // Use requestAnimationFrame to avoid synchronous setState warning
      const rafId = requestAnimationFrame(() => {
        setJson(cached);
        setIsLoading(false);
      });

      return () => {
        cancelAnimationFrame(rafId);
      };
    }

    // No cache, fetch from API
    // Set loading state in the promise chain to avoid linter warning
    let cancelled = false;

    // Start loading before fetch
    requestAnimationFrame(() => {
      if (!cancelled) {
        setIsLoading(true);
      }
    });

    fetch(`${GITHUB_API_URL}/repos/${currentRepo}`)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) {
          setJson(data);
          setIsLoading(false);
          // Cache the fetched data
          setCachedStars(currentRepo, data);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error("Error fetching stars count:", error);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [framework]);

  if (isLoading) {
    return <Skeleton className="h-4 w-8" />;
  }

  if (!json?.stargazers_count) {
    return null;
  }

  return (
    <span className="pt-px text-xs font-medium text-muted">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
}

export function StarsCount() {
  const framework = useCurrentFramework();

  return <StarsCountInner framework={framework} />;
}
