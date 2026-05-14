"use client";

import {cn} from "tailwind-variants";

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
        <span className="sr-only">在 X 上关注 HeroUI</span>
      </a>
      <a className="text-inherit" href={siteConfig.links.discord} rel="noreferrer" target="_blank">
        <DiscordIcon height={iconSize} width={iconSize} />
        <span className="sr-only">加入 HeroUI Discord 社区</span>
      </a>
      <a className="text-inherit" href={siteConfig.links.github} rel="noreferrer" target="_blank">
        <GitHubIcon height={iconSize} width={iconSize} />
        <span className="sr-only">在 GitHub 上查看 HeroUI</span>
      </a>
    </div>
  );
}
