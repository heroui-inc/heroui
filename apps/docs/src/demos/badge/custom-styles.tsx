import {Avatar, Badge} from "@heroui/react";

const BLUE_AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg";
const ORANGE_AVATAR_URL =
  "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg";
const GREEN_AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-6">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="Kate Wilson" src={BLUE_AVATAR_URL} />
          <Avatar.Fallback>KW</Avatar.Fallback>
        </Avatar>
        <Badge
          className="min-w-5 px-1 font-semibold tabular-nums shadow-md ring-2 ring-surface ring-offset-1 ring-offset-surface dark:ring-offset-surface"
          color="danger"
          size="sm"
          variant="primary"
        >
          5
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="Marcus Lee" src={ORANGE_AVATAR_URL} />
          <Avatar.Fallback>ML</Avatar.Fallback>
        </Avatar>
        <Badge
          className="rounded-md border border-separator px-2 text-[10px] font-semibold tracking-wide uppercase shadow-sm ring-1 ring-black/5 backdrop-blur-md dark:ring-white/10"
          size="sm"
          variant="secondary"
        >
          New
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image alt="Sarah Chen" src={GREEN_AVATAR_URL} />
          <Avatar.Fallback>SC</Avatar.Fallback>
        </Avatar>
        <Badge
          className="size-3.5 shadow-sm ring-2 ring-surface ring-offset-2 ring-offset-surface"
          color="success"
          placement="bottom-right"
          size="sm"
          variant="primary"
        />
      </Badge.Anchor>
    </div>
  );
}
