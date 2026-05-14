import {Rocket} from "@gravity-ui/icons";
import {buttonVariants} from "@heroui/react";
import LinkRoot from "fumadocs-core/link";

import {Footer} from "@/components/footer";
import {StarsCount} from "@/components/github-link";
import {GitHubIcon} from "@/icons/github";

import {DemoShowcase} from "./components/demo-showcase";
import {ProBanner} from "./components/pro-banner";

export const dynamic = "force-static";
export const revalidate = false;

export default function HomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* 首屏 */}
      <section className="z-10 flex min-h-0 flex-1 flex-col items-center px-4 pt-12 text-center">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center">
          <LinkRoot
            className="flex items-center gap-1 rounded-full bg-accent/10 px-2 py-1 text-xs text-accent transition-colors hover:bg-accent-soft-hover"
            href="/docs/react/releases/v3-0-4"
          >
            <Rocket className="size-3 text-accent" />
            <span className="max-w-60 truncate sm:max-w-full">
              HeroUI v3.0.4：全新 Text 组件、文档主题选择与多项修复
            </span>
          </LinkRoot>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:mt-4 lg:text-5xl">
            开箱即美。<span className="text-muted/70">按需定制。</span>
          </h1>
          <p className="text-balance text-muted md:text-lg">
            HeroUI 是面向 Web 与移动端的现代 UI
            库，助你快速迭代、保持风格一致，打造令人愉悦的用户体验。
          </p>
          <div className="mt-4 flex gap-3">
            <LinkRoot
              className={buttonVariants({variant: "primary"})}
              href="/docs/react/getting-started"
            >
              开始使用
            </LinkRoot>
            <LinkRoot
              className={buttonVariants({variant: "outline"})}
              href="/docs/react/components"
            >
              浏览组件
            </LinkRoot>
          </div>
          <a
            className="mt-2 flex items-center justify-around gap-2 text-xs text-muted transition-colors hover:text-foreground lg:mt-4"
            href="https://github.com/heroui-inc/heroui"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHubIcon className="size-4" />
            <span>
              开源项目，
              <StarsCount className="p-0 font-normal" /> 颗星
            </span>
          </a>
        </div>
        <DemoShowcase />
      </section>
      <Footer />
      <ProBanner />
    </main>
  );
}
