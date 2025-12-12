import {Avatar, Card} from "@heroui/react";
import Image from "next/image";
import {tv} from "tailwind-variants";

const cardStyles = tv({
  slots: {
    avatar: "size-[56px] rounded-xl",
    card: "w-full",
    cardContent: "items-start",
    footer: "items-center gap-2",
    footerAvatar: "size-4",
  },
});

export function SubtleCardsDemo() {
  const {avatar, card, cardContent, footer, footerAvatar} = cardStyles();

  return (
    <div className="flex w-full flex-row gap-4">
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image asChild>
              <Image
                alt="Demo 1"
                height={56}
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                width={56}
              />
            </Avatar.Image>
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">Indie Hackers</p>
          <p className="text-sm text-muted">148 members</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image asChild>
              <Image
                alt="John"
                height={16}
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                width={16}
              />
            </Avatar.Image>
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
          <p className="text-xs text-muted">By John</p>
        </Card.Footer>
      </Card>
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image asChild>
              <Image
                alt="AI Builders"
                height={56}
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
                width={56}
              />
            </Avatar.Image>
            <Avatar.Fallback>J</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">AI Builders</p>
          <p className="text-sm text-muted">362 members</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image asChild>
              <Image
                alt="Martha"
                height={16}
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                width={16}
              />
            </Avatar.Image>
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <p className="text-xs text-muted">By Martha</p>
        </Card.Footer>
      </Card>
    </div>
  );
}
