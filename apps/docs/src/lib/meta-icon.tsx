import {Chip} from "@heroui/react";

import {Iconify} from "@/components/iconify";
import {uniqueId} from "@/utils/unique-id";

export function createMetaIcon(iconName: string | undefined) {
  if (!iconName) return undefined;

  const id = uniqueId();

  //  FIXME: Hacky way to show a new badge
  if (iconName === "new") {
    return (
      <Chip
        key={id}
        className="text-foreground/90 dark:bg-white/8 bg-black/8 absolute right-[22%] top-1/2 h-5 -translate-y-1/2 rounded-full px-1.5 text-[10px]"
        variant="primary"
      >
        New
      </Chip>
    );
  }

  return <Iconify key={id} icon={iconName} />;
}
