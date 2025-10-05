"use client";

import {usePathname} from "next/navigation";

import {ShowcaseItem} from "@/components/showcase-item";
import {getShowcasesByComponent} from "@/showcases";
import {cn} from "@/utils/cn";

interface RelatedShowcasesProps {
  component: string;
  className?: string;
}

export function RelatedShowcases({className, component}: RelatedShowcasesProps) {
  const pathname = usePathname();
  const showcases = getShowcasesByComponent(component);

  if (!showcases || showcases.length === 0) {
    return null;
  }

  // Encode the current pathname to use as the returnUrl parameter
  const returnUrl = encodeURIComponent(pathname);

  return (
    <div className={cn(className)}>
      <h2 className="m-0 text-xl font-semibold">Related Showcases</h2>
      <div className="not-prose -mx-2 grid grid-cols-1 gap-4 overflow-x-auto p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {showcases.map((showcase) => (
          <ShowcaseItem
            key={showcase.name}
            className="aspect-video h-[180px] max-w-[250px] flex-shrink-0"
            href={`/showcase/${showcase.name}?returnUrl=${returnUrl}`}
            item={showcase}
          />
        ))}
      </div>
    </div>
  );
}
