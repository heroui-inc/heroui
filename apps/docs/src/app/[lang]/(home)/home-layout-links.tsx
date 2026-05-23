import type {LinkItemType} from "@/components/fumadocs/ui/link-item";
import type {Dictionary} from "@/lib/dictionaries";

import {ExternalLink} from "@/components/external-link";
import {Iconify} from "@/components/iconify";

export function getHomeLayoutLinks(dict: Dictionary, lang: string = "en"): LinkItemType[] {
  const nav = dict.nav;
  const blogUrl = `/${lang}/blog`;

  return [
    {
      items: [
        {
          icon: <Iconify icon="book" />,
          text: nav.gettingStarted,
          url: "/docs/react/getting-started",
        },
        {
          icon: <Iconify icon="palette" />,
          text: nav.themes,
          url: "/themes",
        },
        {
          icon: <Iconify icon="circles-4-diamond" />,
          text: nav.components,
          url: "/docs/react/components",
        },
        {
          icon: <Iconify icon="smartphone" />,
          text: nav.reactNative,
          url: "/docs/native/getting-started",
        },
        {
          icon: <Iconify icon="rocket" />,
          text: nav.releases,
          url: "/docs/react/releases",
        },
      ],
      on: "menu",
      text: nav.documentation,
      type: "menu",
    },
    {
      items: [
        {
          icon: <Iconify icon="pen-line" />,
          text: nav.blog,
          url: blogUrl,
        },
        {
          external: true,
          icon: <Iconify icon="figma" />,
          text: "Figma",
          url: "https://www.figma.com/community/file/1546526812159103429",
        },
        {
          external: true,
          icon: <Iconify icon="route" />,
          text: nav.roadmap,
          url: "https://herouiv3.featurebase.app/roadmap",
        },
      ],
      on: "menu",
      text: nav.resources,
      type: "menu",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.docs,
      url: "/docs/react/getting-started",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.themes,
      url: "/themes",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.components,
      url: "/docs/react/components",
    },
    {
      active: "nested-url",
      on: "nav",
      text: (
        <>
          <span className="md:hidden">{nav.reactNativeShort}</span>
          <span className="hidden md:inline">{nav.reactNative}</span>
        </>
      ),
      url: "/docs/native/getting-started",
    },
    {
      active: "nested-url",
      on: "nav",
      text: nav.blog,
      url: blogUrl,
    },
    {
      children: (
        <ExternalLink href="https://herouiv3.featurebase.app/roadmap">{nav.roadmap}</ExternalLink>
      ),
      on: "nav",
      type: "custom",
    },
  ];
}
