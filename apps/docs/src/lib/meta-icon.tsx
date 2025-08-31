import {Iconify} from "@/components/iconify";
import {uniqueId} from "@/utils/unique-id";

export function createMetaIcon(iconName: string | undefined) {
  if (!iconName) return undefined;

  const id = uniqueId();

  return <Iconify key={id} icon={iconName} />;
}
