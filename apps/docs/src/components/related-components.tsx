import {ComponentTile} from "@/components/components-index/component-tile";
import {getRelatedComponentItems} from "@/lib/related-components";
import {cn} from "@/utils/cn";

interface RelatedComponentsProps {
  component: string;
  className?: string;
}

/** Related free components, followed by related Pro components (which open the Pro docs). */
export async function RelatedComponents({className, component}: RelatedComponentsProps) {
  const {free, pro} = await getRelatedComponentItems(component);
  const items = [...free, ...pro];

  if (items.length === 0) return null;

  return (
    <div
      className={cn(
        "not-prose grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {items.map((item) => (
        <ComponentTile key={`${item.pro ? "pro" : "free"}-${item.name}`} item={item} />
      ))}
    </div>
  );
}
