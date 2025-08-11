import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";

import {HeroUILogo} from "@/components/heroui-logo";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: "https://github.com/heroui-inc/heroui",
  nav: {
    title: <HeroUILogo />,
    transparentMode: "always",
  },
};
