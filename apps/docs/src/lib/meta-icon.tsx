import {Iconify} from "@/components/iconify";

export function createMetaIcon(iconName: string | undefined) {
  if (!iconName) return undefined;

  return <Iconify icon={iconName} />;
}
