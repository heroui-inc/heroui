"use client";

import {cnBase as cn} from "tailwind-variants";

import {siteConfig} from "@/config/site";
import {DiscordIcon} from "@/icons/discord";
import {GitHubIcon} from "@/icons/github";
import {TwitterIcon} from "@/icons/twitter";

export interface SocialLinksProps {
  className?: string;
  iconSize?: number;
}

export function SocialLinks(props: SocialLinksProps) {
  const {className, iconSize = 18} = props;

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      <a
        className="-mr-1 text-inherit"
        href={siteConfig.links.twitter}
        rel="noreferrer"
        target="_blank"
      >
        <TwitterIcon height={iconSize - 4} width={iconSize} />
        <span className="sr-only">Twitter</span>
      </a>
      <a className="text-inherit" href={siteConfig.links.discord} rel="noreferrer" target="_blank">
        <DiscordIcon height={iconSize} width={iconSize} />
        <span className="sr-only">Discord</span>
      </a>
      <a className="text-inherit" href={siteConfig.links.github} rel="noreferrer" target="_blank">
        <GitHubIcon height={iconSize} width={iconSize} />
        <span className="sr-only">GitHub</span>
      </a>
    </div>
  );
}
