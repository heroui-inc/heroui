import {Avatar, Badge} from "@heroui/react";

const AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

const placements = ["top-right", "top-left", "bottom-right", "bottom-left"] as const;

const PLACEMENT_LABELS: Record<(typeof placements)[number], string> = {
  "bottom-left": "左下",
  "bottom-right": "右下",
  "top-left": "左上",
  "top-right": "右上",
};

export function BadgePlacements() {
  return (
    <div className="flex items-center gap-8">
      {placements.map((placement) => (
        <div key={placement} className="flex flex-col items-center gap-2">
          <Badge.Anchor>
            <Avatar>
              <Avatar.Image alt="头像" src={AVATAR_URL} />
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            <Badge color="accent" placement={placement} size="sm" />
          </Badge.Anchor>
          <span className="text-xs text-muted">{PLACEMENT_LABELS[placement]}</span>
        </div>
      ))}
    </div>
  );
}
