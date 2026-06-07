import {Iconify} from "@/components/iconify";
import StatusChip from "@/components/status-chip";

export function createMetaIcon(iconName: string | undefined) {
  if (!iconName) return undefined;

  //  FIXME: Hacky way to show a new badge
  if (
    iconName === "new" ||
    iconName === "new-dot" ||
    iconName === "preview" ||
    iconName === "updated"
  ) {
    // Stable key based on iconName — fumadocs renders the icon as an array
    // child (e.g. `[node.icon, node.name]`), so a key is required to silence
    // React's "unique key" warning while remaining hydration-safe.
    return <StatusChip key={`status-${iconName}`} className="order-last" status={iconName} />;
  }

  return <Iconify key={`icon-${iconName}`} icon={iconName} />;
}
