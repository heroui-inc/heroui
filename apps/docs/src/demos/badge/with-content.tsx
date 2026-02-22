import {Bell} from "@gravity-ui/icons";
import {Avatar, Badge} from "@heroui/react";

const AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

export function BadgeWithContent() {
  return (
    <div className="flex items-center gap-6">
      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          5
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          New
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger" size="sm">
          99+
        </Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar>
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="accent" size="sm">
          <Bell className="size-2.5" />
        </Badge>
      </Badge.Anchor>
    </div>
  );
}
