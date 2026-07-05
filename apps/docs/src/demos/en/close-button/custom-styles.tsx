import {CloseButton} from "@heroui/react";

export function CustomStyles() {
  return (
    <CloseButton
      aria-label="Close"
      className="size-8 rounded-full bg-default text-muted hover:bg-default-hover hover:text-foreground active:scale-95"
    />
  );
}
