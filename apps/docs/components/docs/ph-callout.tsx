"use client";

import NextLink from "next/link";

const PH_INFO = {
  description: "Join the conversation and help us get #1 Product of the Day! ↗",
  title: "Live on Product Hunt!",
  url: "https://ph.heroui.chat?utm_source=heroui.chat&utm_medium=callout",
};

export const PHCallout = () => {
  return (
    <div className="relative w-full max-w-[12rem] flex flex-col items-center border border-default/60 hover:border-default/90 rounded-xl py-6 px-2 cursor-pointer">
      <div>
        <p className="leading-[1.025] tracking-tight text-center text-medium font-semibold">
          {PH_INFO.title}
        </p>
        <p className="text-center text-xs mt-2 px-3 font-medium text-default-500 dark:text-default-400 leading-tight">
          {PH_INFO.description}
        </p>
      </div>
      <div className="mt-3 w-full max-w-[130px] flex group items-center text-foreground hover:shadow-sm relative overflow-hidden rounded-full p-[2px]">
        <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#EC733A_0%,#F54180_50%,#EC733A_100%)]" />
        <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background transition-background p-2.5 text-xs font-medium hover:font-semibold text-foreground backdrop-blur-3xl">
          Get 30% off
        </div>
      </div>
      <NextLink
        className="absolute inset-0 z-[1]"
        href={PH_INFO.url}
        rel="noopener noreferrer"
        target="_blank"
      />
    </div>
  );
};
