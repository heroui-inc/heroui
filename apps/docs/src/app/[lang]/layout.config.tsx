import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";

import {HomeNavTitle} from "@/components/home-nav-title";

export {getHomeLayoutLinks} from "./(home)/home-layout-links";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: HomeNavTitle,
    transparentMode: "always",
  },
};
