import {Person} from "@gravity-ui/icons";
import {Avatar, AvatarGroup} from "@heroui/react";

const assignees = [
  {
    id: 1,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg",
    name: "John Doe",
  },
  {
    id: 2,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "Kate Wilson",
  },
  {
    id: 3,
    image: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg",
    name: "Emily Chen",
  },
] as const;

export function CustomStyles() {
  return (
    <div className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-surface/95 py-1 pr-3 pl-1 shadow-sm ring-1 ring-black/[0.04] dark:border-border/80 dark:bg-surface/90 dark:ring-white/10">
      <AvatarGroup
        aria-label="Assignees"
        className="[--avatar-group-overlap:0.7rem] [--avatar-group-seam:2px]"
        overlap="clip"
        role="group"
        size="sm"
      >
        {assignees.map((user) => (
          <Avatar key={user.id}>
            <Avatar.Image alt={user.name} src={user.image} />
            <Avatar.Fallback>
              {user.name
                .split(" ")
                .map((part) => part[0])
                .join("")}
            </Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar>
          <Avatar.Fallback>
            <Person className="size-4 shrink-0" />
          </Avatar.Fallback>
        </Avatar>
        <AvatarGroup.Count>+3</AvatarGroup.Count>
      </AvatarGroup>
      <span className="text-sm font-medium text-foreground">Assignees</span>
    </div>
  );
}
