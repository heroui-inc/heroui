import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {baseOptions} from "@/app/layout.config";
import {ExternalLink} from "@/components/external-link";
import {GitHubLink} from "@/components/github-link";
import {Iconify} from "@/components/iconify";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          items: [
            {
              icon: <Iconify icon="book" />,
              text: "Getting Started",
              url: "/docs",
            },
            {
              icon: <Iconify icon="circles-4-diamond" />,
              text: "Components",
              url: "/docs/components",
            },
          ],
          on: "menu",
          text: "Documentation",
          type: "menu",
        },
        {
          items: [
            {
              external: true,
              icon: <Iconify icon="figma" />,
              text: "Figma",
              url: "https://www.figma.com/community/file/1546526812159103429",
            },
            {
              external: true,
              icon: <Iconify icon="route" />,
              text: "Roadmap",
              url: "https://herouiv3.featurebase.app/roadmap",
            },
            {
              external: true,
              icon: <Iconify icon="smartphone" />,
              text: "React Native",
              url: "https://link.heroui.com/native?ref=heroui-v3",
            },
          ],
          on: "menu",
          text: "Resources",
          type: "menu",
        },
        {
          active: "none",
          on: "nav",
          text: "Docs",
          url: "/docs/introduction",
        },
        {
          active: "none",
          on: "nav",
          text: "Components",
          url: "/docs/components/accordion",
        },
        {
          active: "nested-url",
          on: "nav",
          text: "Showcase",
          url: "/showcase",
        },
        {
          children: (
            <ExternalLink href="https://herouiv3.featurebase.app/roadmap">Roadmap</ExternalLink>
          ),
          on: "nav",
          type: "custom",
        },

        // {
        //   active: "url",
        //   text: "Playground",
        //   url: "/playground",
        // },
        // {
        //   active: "nested-url",
        //   text: "Theming",
        //   url: "/docs/theming",
        // },
        {
          external: true,
          icon: <GitHubLink />,
          on: "all",
          text: "Github",
          type: "icon",
          url: "https://github.com/heroui-inc/heroui",
        },
      ]}
      // links={[
      //   {
      //     children: (
      //       <NavbarMenu>
      //         <NavbarMenuTrigger>Documentation</NavbarMenuTrigger>
      //         <NavbarMenuContent>
      //           <NavbarMenuLink href="/docs">Hello World</NavbarMenuLink>
      //         </NavbarMenuContent>
      //       </NavbarMenu>
      //     ),
      //     // only displayed on navbar, not mobile menu
      //     on: "nav",
      //     type: "custom",
      //   },
      // other items
      // ]}
    >
      {children}
    </HomeLayout>
  );
}
