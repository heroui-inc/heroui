import {Iconify} from "@/components/iconify";
import StatusChip from "@/components/status-chip";
import {uniqueId} from "@/utils/unique-id";

export function createMetaIcon(iconName: string | undefined) {
  if (!iconName) return undefined;

  const id = uniqueId();

  //  FIXME: Hacky way to show a new badge
  if (
    iconName === "new" ||
    iconName === "new-dot" ||
    iconName === "preview" ||
    iconName === "updated"
  ) {
    return <StatusChip className="order-last" status={iconName} />;
  }

  return <Iconify key={id} icon={iconName} />;
}
