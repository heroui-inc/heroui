import type {BaseLayoutProps} from "fumadocs-ui/layouts/shared";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  links: [
    {
      active: "nested-url",
      text: "Documentation",
      url: "/docs",
    },
  ],
  nav: {
    title: (
      <>
        <span className="text-xl font-semibold">HeroUI</span>
      </>
    ),
  },
};
