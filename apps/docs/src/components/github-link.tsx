"use client";

import {buttonVariants} from "@heroui/react";
import {useEffect, useRef, useState} from "react";

import {useCurrentFramework} from "@/hooks/use-current-framework";
import {GitHubIcon} from "@/icons/github";
import {cn} from "@/utils/cn";
import {GITHUB_API_URL, REPO_NAME, REPO_NAME_NATIVE} from "@/utils/constants";

const CACHE_DURATION = 86400000; // 1 day in milliseconds
const CACHE_KEY_PREFIX = "github-stars-";
const STATIC_STARS = {
  native: 2300,
  web: 27700,
};

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

function formatStarsCount(count: number): string {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toLocaleString();
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
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [json, setJson] = useState<any>(null);
  const prevRepoRef = useRef<string>(repo);

  // Mark as mounted after hydration to ensure server/client match
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const currentRepo = getGitHubRepo(framework);

    // Update ref for next comparison
    prevRepoRef.current = currentRepo;

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
    let cancelled = false;

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

  // Use static values during SSR and initial client render to prevent CLS
  const staticStars = STATIC_STARS[framework];
  const displayCount = !mounted || isLoading ? staticStars : json?.stargazers_count;

  if (!displayCount) {
    return null;
  }

  return (
    <span className="pt-px text-xs font-medium text-muted tabular-nums">
      {formatStarsCount(displayCount)}
    </span>
  );
}

export function StarsCount() {
  const framework = useCurrentFramework();

  return <StarsCountInner framework={framework} />;
}
