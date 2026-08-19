export interface DocsSeoMetadata {
  description: string;
  title: string;
}

const ENGLISH_DOCS_SEO_METADATA: Readonly<Record<string, DocsSeoMetadata>> = {
  "/docs/react/components": {
    description:
      "Browse accessible HeroUI React components for forms, overlays, navigation, data display, and more, built with React Aria and Tailwind CSS v4.",
    title: "HeroUI React Components – Accessible UI Library",
  },
  "/docs/react/components/button": {
    description:
      "Build accessible React buttons with HeroUI. Explore variants, sizes, icon-only states, custom styles, ripple effects, render props, and BEM classes.",
    title: "HeroUI Button – Accessible React Button Component",
  },
  "/docs/react/components/select": {
    description:
      "Build accessible React select inputs with HeroUI. Explore single and multiple selection, async loading, sections, disabled items, and controlled values.",
    title: "HeroUI Select – Accessible React Select Component",
  },
  "/docs/react/getting-started": {
    description:
      "Meet HeroUI v3, an accessible React UI library built on React Aria and Tailwind CSS v4. Explore its design approach, ecosystem, and common questions.",
    title: "Introduction to HeroUI v3 – React UI Library",
  },
};

export function getDocsSeoMetadata(
  locale: string | undefined,
  unlocalizedPath: string,
): DocsSeoMetadata | undefined {
  return locale === "en" ? ENGLISH_DOCS_SEO_METADATA[unlocalizedPath] : undefined;
}
