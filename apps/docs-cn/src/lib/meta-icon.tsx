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
    return <StatusChip className="order-last" status={iconName} />;
  }

  // Remove key prop to avoid hydration mismatch - React will handle reconciliation automatically
  return <Iconify icon={iconName} />;
}
