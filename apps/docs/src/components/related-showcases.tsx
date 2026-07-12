"use client";

import {useParams, usePathname} from "next/navigation";

import {ShowcaseItem} from "@/components/showcase-item";
import {i18n} from "@/lib/i18n";
import {getShowcasesByComponent} from "@/showcases";
import {cn} from "@/utils/cn";

interface RelatedShowcasesProps {
  component: string;
  className?: string;
}

export function RelatedShowcases({className, component}: RelatedShowcasesProps) {
  const params = useParams<{lang?: string}>();
  const lang = params.lang ?? i18n.defaultLanguage;
  const pathname = usePathname();
  const showcases = getShowcasesByComponent(component);

  if (!showcases || showcases.length === 0) {
    return null;
  }

  // Encode the current pathname to use as the returnUrl parameter
  const returnUrl = encodeURIComponent(pathname);

  return (
    <div
      className={cn(
        "not-prose -mx-2 grid grid-cols-1 gap-4 overflow-x-auto p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {showcases.map((showcase) => (
        <ShowcaseItem
          key={showcase.name}
          className="aspect-video h-[180px] max-w-[250px] shrink-0"
          href={`/${lang}/showcase/${showcase.name}?returnUrl=${returnUrl}`}
          item={showcase}
        />
      ))}
    </div>
  );
}
