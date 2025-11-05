import {Avatar, Card} from "@heroui/react";

export function WithAvatar() {
  return (
    <div className="flex gap-4">
      <Card className="w-[200px] gap-2">
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-14 select-none rounded-2xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
        />
        <Card.Header>
          <Card.Title>Indie Hackers</Card.Title>
          <Card.Description>148 members</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar aria-label="Martha's profile picture" className="size-5">
            <Avatar.Image
              alt="Martha's avatar"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback className="text-xs">IH</Avatar.Fallback>
          </Avatar>
          <span className="text-xs">By Martha</span>
        </Card.Footer>
      </Card>

      <Card className="w-[200px] gap-2">
        <img
          alt="AI Builders community"
          className="pointer-events-none aspect-square w-14 select-none rounded-2xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
        />
        <Card.Header>
          <Card.Title>AI Builders</Card.Title>
          <Card.Description>362 members</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar aria-label="John's profile picture" className="size-5">
            <Avatar.Image
              alt="John's avatar - blue themed"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
          </Avatar>
          <span className="text-xs">By John</span>
        </Card.Footer>
      </Card>
    </div>
  );
}
