import {Avatar, Card} from "@heroui/react";

export function WithAvatar() {
  return (
    <div className="flex flex-wrap gap-4">
      <Card className="w-[200px] gap-2">
        <img
          alt="独立创客社区"
          className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
        />
        <Card.Header>
          <Card.Title>Indie Hackers</Card.Title>
          <Card.Description>148 位成员</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar aria-label="玛莎的头像" className="size-5">
            <Avatar.Image
              alt="玛莎的头像"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
            />
            <Avatar.Fallback className="text-xs">IH</Avatar.Fallback>
          </Avatar>
          <span className="text-xs">创建者：玛莎</span>
        </Card.Footer>
      </Card>

      <Card className="w-[200px] gap-2">
        <img
          alt="AI 开发者社区"
          className="pointer-events-none aspect-square w-14 rounded-2xl object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
        />
        <Card.Header>
          <Card.Title>AI Builders</Card.Title>
          <Card.Description>362 位成员</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar aria-label="约翰的头像" className="size-5">
            <Avatar.Image
              alt="约翰的头像"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
          </Avatar>
          <span className="text-xs">创建者：约翰</span>
        </Card.Footer>
      </Card>
    </div>
  );
}
