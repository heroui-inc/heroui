import {Bell} from "@gravity-ui/icons";
import {Avatar, Badge} from "@heroui/react";

const AVATAR_URL = "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg";

export function BadgeWithContent() {
  return (
    <div className="flex items-center gap-6">
      <Badge.Anchor>
        <Avatar size="lg">
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger">5</Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar size="lg">
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger">New</Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar size="lg">
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="danger">99+</Badge>
      </Badge.Anchor>

      <Badge.Anchor>
        <Avatar size="lg">
          <Avatar.Image src={AVATAR_URL} />
          <Avatar.Fallback>JD</Avatar.Fallback>
        </Avatar>
        <Badge color="accent">
          <Bell width={12} />
        </Badge>
      </Badge.Anchor>
    </div>
  );
}
