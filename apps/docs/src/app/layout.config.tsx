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
        <svg aria-label="Logo" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
          <circle cx={12} cy={12} fill="currentColor" r={12} />
        </svg>
        My App
      </>
    ),
  },
};
