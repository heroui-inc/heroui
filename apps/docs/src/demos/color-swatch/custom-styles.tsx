import {ColorSwatch} from "@heroui/react";

export function ColorSwatchCustomStyles() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch
        aria-label="Slate"
        className="size-10 rounded-xl ring-2 ring-neutral-300/80 ring-offset-2 ring-offset-background transition-transform hover:scale-105 dark:ring-neutral-600/80"
        color="#52525b"
      />
      <ColorSwatch
        aria-label="Stone"
        className="size-10 rounded-xl ring-2 ring-neutral-300/80 ring-offset-2 ring-offset-background transition-transform hover:scale-105 dark:ring-neutral-600/80"
        color="#78716c"
      />
      <ColorSwatch
        aria-label="Zinc"
        className="size-10 rounded-xl ring-2 ring-neutral-300/80 ring-offset-2 ring-offset-background transition-transform hover:scale-105 dark:ring-neutral-600/80"
        color="#a1a1aa"
      />
    </div>
  );
}
