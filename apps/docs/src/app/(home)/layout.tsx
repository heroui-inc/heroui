import type {ReactNode} from "react";

import {HomeLayout} from "fumadocs-ui/layouts/home";

import {baseOptions} from "@/app/layout.config";

export default function Layout({children}: {children: ReactNode}) {
  return (
    <HomeLayout
      {...baseOptions}
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
