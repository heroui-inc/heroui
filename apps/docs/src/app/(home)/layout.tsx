import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {baseOptions} from "@/app/layout.config";
import {ExternalLink} from "@/components/external-link";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <HomeLayout
      {...baseOptions}
      links={[
        {
          active: "none",
          on: "nav",
          text: "Docs",
          url: "/docs",
        },
        {
          active: "none",
          on: "nav",
          text: "Components",
          url: "/docs/components",
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
          active: "none",
          on: "nav",
          text: "Changelog",
          url: "/docs/changelog",
        },
        {
          children: <ExternalLink href="#roadmap">Roadmap</ExternalLink>,
          on: "all",
          type: "custom",
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
      <div aria-hidden="true" className="gradient-background home-gradient-background" />
      {children}
    </HomeLayout>
  );
}
