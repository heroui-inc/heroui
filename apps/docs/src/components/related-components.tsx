"use client";

import {ComponentItem} from "@/components/component-item";
import {getRelatedComponents} from "@/components-registry";
import {cn} from "@/utils/cn";

interface RelatedComponentsProps {
  component: string;
  className?: string;
}

export function RelatedComponents({className, component}: RelatedComponentsProps) {
  const relatedComponents = getRelatedComponents(component);

  if (!relatedComponents || relatedComponents.length === 0) {
    return null;
  }

  return (
    <div className={cn("my-8", className)}>
      <h2 className="mb-4 text-xl font-semibold">Related Components</h2>
      <div className="not-prose grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {relatedComponents.map((relatedComponent) => (
          <ComponentItem key={relatedComponent.name} component={relatedComponent} />
        ))}
      </div>
    </div>
  );
}
