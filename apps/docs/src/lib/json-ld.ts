import {siteConfig} from "@/config/site";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HeroUI",
    url: "https://heroui.com",
    logo: "https://heroui.com/icons/favicon.svg",
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.discord,
    ],
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "HeroUI",
    url: "https://heroui.com",
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: "HeroUI",
    },
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HeroUI",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteConfig.description,
    url: "https://heroui.com",
    downloadUrl: "https://www.npmjs.com/package/@heroui/react",
  };
}

export function getBreadcrumbJsonLd(items: {name: string; url: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getTechArticleJsonLd(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: params.title,
    description: params.description,
    url: params.url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": params.url,
    },
    author: params.authorName
      ? {
          "@type": "Person",
          name: params.authorName,
          ...(params.authorUrl && {url: params.authorUrl}),
        }
      : {
          "@type": "Organization",
          name: "HeroUI",
        },
    publisher: {
      "@type": "Organization",
      name: "HeroUI",
      logo: {
        "@type": "ImageObject",
        url: "https://heroui.com/icons/favicon.svg",
      },
    },
    ...(params.datePublished && {datePublished: params.datePublished}),
    ...(params.dateModified && {dateModified: params.dateModified || params.datePublished}),
    ...(params.image && {image: params.image}),
  };
}

export function getBlogJsonLd(params: {
  url: string;
  posts: {title: string; url: string; datePublished: string; description: string}[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    url: params.url,
    name: "HeroUI Blog",
    description:
      "Guides, tutorials, and resources for building modern React applications with HeroUI.",
    publisher: {
      "@type": "Organization",
      name: "HeroUI",
      logo: {
        "@type": "ImageObject",
        url: "https://heroui.com/icons/favicon.svg",
      },
    },
    blogPost: params.posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: post.url,
      datePublished: post.datePublished,
      description: post.description,
    })),
  };
}
