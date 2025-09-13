import {Chip} from "@heroui/react";

import {Iconify} from "@/components/iconify";
import {uniqueId} from "@/utils/unique-id";

export function createMetaIcon(iconName: string | undefined) {
  if (!iconName) return undefined;

  const id = uniqueId();

  //  Hacky way to show a new badge
  if (iconName === "new")
    return (
      <Chip
        className="text-foreground/90 dark:bg-white/8 bg-black/8 absolute right-[18%] top-1/2 -translate-y-1/2 rounded-full"
        variant="primary"
      >
        New
      </Chip>
    );

  return <Iconify key={id} icon={iconName} />;
}
