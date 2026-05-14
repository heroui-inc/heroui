import * as React from "react";

import {getShowcase} from "@/showcases";
import {cn} from "@/utils/cn";

interface ShowcasePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  fullWidth?: boolean;
}

export function ShowcasePreview({
  className,
  fullWidth = false,
  name,
  ...props
}: ShowcasePreviewProps) {
  const showcase = getShowcase(name);

  if (!showcase) {
    return (
      <div className={cn("my-4 rounded-md border border-red-200 bg-red-50 p-4", className)}>
        <p className="text-sm text-red-600">
          Showcase &quot;{name}&quot; not found. Make sure the showcase is registered in the
          showcases index.
        </p>
      </div>
    );
  }

  const Component = showcase.component;

  return (
    <div
      data-name={name}
      className={cn(
        "showcase-preview group relative w-full",
        !fullWidth && "mx-auto max-w-7xl",
        className,
      )}
      {...props}
    >
      <div className={cn("not-prose relative w-full overflow-hidden")}>
        <Component />
      </div>
    </div>
  );
}
