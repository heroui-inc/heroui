"use client";

import type {ComponentLinksType} from "@/utils/extract-links";
import type {ReactNode} from "react";

import {LogoFigma} from "@gravity-ui/icons";

import {useDictionary} from "@/hooks/use-dictionary";
import {RadixUIIcon, ReactAriaIcon, StorybookIcon, TailwindIcon} from "@/icons/dev";
import {GitHubIcon} from "@/icons/github";
import {cn} from "@/utils/cn";
import {generateComponentLinks} from "@/utils/extract-links";

export interface ComponentLinksProps {
  links?: ComponentLinksType;
  className?: string;
}

interface ResourceLink {
  href: string;
  icon: ReactNode;
  label: string;
}

/** Resource links from a page's `links` frontmatter, in display order. */
function useResourceLinks(links?: ComponentLinksType): ResourceLink[] {
  const dict = useDictionary().componentLinks;
  const generated = generateComponentLinks(links || null);

  if (!generated) return [];

  const github = <GitHubIcon />;
  const entries: (ResourceLink | false | undefined)[] = [
    !!generated.figma && {href: generated.figma, icon: <LogoFigma />, label: "Figma"},
    !!generated.storybook && {
      href: `${generated.storybook}--docs`,
      icon: <StorybookIcon />,
      label: "Storybook",
    },
    !!generated.rac && {href: generated.rac, icon: <ReactAriaIcon />, label: "React Aria"},
    !!generated.radix && {href: generated.radix, icon: <RadixUIIcon />, label: "Radix UI"},
    !!generated.source && {href: generated.source, icon: github, label: dict.source},
    !!generated.source_native && {href: generated.source_native, icon: github, label: dict.source},
    !!generated.styles && {href: generated.styles, icon: github, label: dict.stylesSource},
    !!generated.styles_native && {
      href: generated.styles_native,
      icon: github,
      label: dict.stylesSource,
    },
    !!generated.themes && {href: generated.themes, icon: github, label: dict.themeSource},
    !!generated.tailwind && {
      href: generated.tailwind,
      icon: <TailwindIcon />,
      label: "Tailwind CSS",
    },
  ];

  return entries.filter((entry): entry is ResourceLink => !!entry);
}

/**
 * Resource links as small pills under the page description. The TOC shows the
 * same links as a list on wide screens, so pages pass `xl:hidden` there.
 */
export const ComponentLinks = ({className, links}: ComponentLinksProps) => {
  const items = useResourceLinks(links);

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {items.map((item) => (
        <a
          key={item.href}
          className="docs-pill docs-pill-segment inline-flex h-7 items-center gap-1.5 px-3 text-xs font-medium [&_svg]:size-3.5 [&_svg]:shrink-0"
          href={item.href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.icon}
          {item.label}
        </a>
      ))}
    </div>
  );
};

/** "Resources" list for the table of contents column. */
export const ComponentResources = ({className, links}: ComponentLinksProps) => {
  const dict = useDictionary().componentLinks;
  const items = useResourceLinks(links);

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-1.5", className)} data-toc-resources="">
      <p className="text-[13px] leading-[18px] font-medium text-(--docs-fg-subtle)">
        {dict.resources}
      </p>
      {/* Slight indent so the icons sit just inside the heading's start. */}
      <ul className="flex flex-col ps-1">
        {items.map((item) => (
          <li key={item.href}>
            <a
              className="flex min-h-6 items-center gap-2 text-[13px] leading-5 text-(--docs-fg-subtle) transition-colors duration-150 hover:text-(--docs-fg) [&_svg]:size-3.5 [&_svg]:shrink-0"
              href={item.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
