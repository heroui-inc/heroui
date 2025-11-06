"use client";

import {Chip} from "@heroui/react";
import {Icon} from "@iconify/react/dist/offline";
import arrowRightUpIcon from "@iconify/icons-solar/arrow-right-up-linear";

const releaseInfo = {
  title: "HeroUI v3.0.0 (Beta)",
  href: "https://v3.heroui.com?ref=heroui-v2",
  emoji: "🔥",
};

export function V3ReleaseBanner() {
  return (
    <Chip
      as="a"
      classNames={{
        base: "relative transition-colors hover:bg-default-700/10  border-1 border-default-700/10 backdrop-blur-lg bg-transparent",
        content: "relative flex items-center font-medium text-default-900 pr-[14px]",
      }}
      href={releaseInfo.href}
      rel="noopener noreferrer"
      target="_blank"
      variant="flat"
    >
      <span className="mr-1 text-sm">{releaseInfo.emoji}</span>
      <span
        className="animate-text-gradient inline-flex bg-clip-text font-medium text-transparent bg-[linear-gradient(90deg,#0485f7_0%,#BA8BF6_50%,#0485f7_100%)] dark:bg-[linear-gradient(90deg,#0485f7_0%,#BA8BF6_50%,#0485f7_100%)]"
        style={{
          fontSize: "inherit",
          backgroundSize: "200%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {releaseInfo.title}
      </span>
      <Icon
        className="absolute right-[2px] top-1/2 -translate-y-1/2 text-default-500/60 outline-solid outline-transparent transition-transform group-data-[hover=true]:translate-y-0.5 [&>path]:stroke-[2.5px]"
        icon={arrowRightUpIcon}
        width={10}
      />
    </Chip>
  );
}
