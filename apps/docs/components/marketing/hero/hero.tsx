"use client";

import NextLink from "next/link";
import {Button, Link, Snippet} from "@heroui/react";
import {ArrowRightIcon} from "@heroui/shared-icons";
import dynamic from "next/dynamic";
import {usePostHog} from "posthog-js/react";

import {FloatingComponents} from "./floating-components";
import {V3ReleaseBanner} from "./v3-release-banner";

import {GithubIcon} from "@/components/icons";
import {title, subtitle} from "@/components/primitives";
import {siteConfig} from "@/config/site";

const BgLooper = dynamic(() => import("./bg-looper").then((mod) => mod.BgLooper), {
  ssr: false,
});

export const Hero = () => {
  const posthog = usePostHog();

  return (
    <section className="flex relative overflow-hidden lg:overflow-visible w-full flex-nowrap justify-between items-center h-[calc(100vh_-_64px)] 2xl:h-[calc(84vh_-_64px)]">
      <div className="relative z-20 flex flex-col w-full gap-6 lg:w-1/2 xl:mt-10">
        <div className="w-full flex justify-center md:justify-start">
          <V3ReleaseBanner />
        </div>
        <div className="leading-8 text-center md:leading-10 md:text-left">
          <div className="inline-block">
            <h1 className={title()}>Make&nbsp;</h1>
            <h1 className={title({color: "violet"})}>beautiful&nbsp;</h1>
          </div>
          <h1 className={title()}>websites regardless of your design experience.</h1>
        </div>
        <h2 className={subtitle({fullWidth: true, class: "text-center md:text-left lg:pr-8"})}>
          Beautiful, fast and modern React UI library for building accessible and customizable web
          applications.
        </h2>
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Button
            as={NextLink}
            className="w-full md:h-11 md:w-auto"
            color="primary"
            endContent={
              <ArrowRightIcon
                className="group-data-[hover=true]:translate-x-0.5 outline-solid outline-transparent transition-transform"
                strokeWidth={2}
              />
            }
            href="/docs/guide/introduction"
            radius="full"
            size="lg"
            onPress={() => {
              posthog.capture("Hero - Get Started", {
                name: "Get Started",
                action: "click",
                category: "landing-page",
                data: "/docs/guide/introduction",
              });
            }}
          >
            Get Started
          </Button>
          <Snippet
            className="hidden w-full rounded-full md:flex sm:w-auto"
            copyButtonProps={{
              radius: "full",
            }}
            onCopy={() => {
              posthog.capture("Hero - Copy Install Command", {
                name: "Copy",
                action: "click",
                category: "landing-page",
                data: "npx heroui-cli@latest init",
              });
            }}
          >
            npx heroui-cli@latest init
          </Snippet>
          <Button
            fullWidth
            isExternal
            as={Link}
            className="w-full md:hidden"
            href={siteConfig.links.github}
            radius="full"
            size="lg"
            startContent={<GithubIcon />}
            variant="bordered"
            onPress={() => {
              posthog.capture("Hero - Github", {
                name: "Github",
                action: "click",
                category: "landing-page",
                data: siteConfig.links.github,
              });
            }}
          >
            GitHub
          </Button>
        </div>
      </div>

      <FloatingComponents />

      <BgLooper />
    </section>
  );
};
