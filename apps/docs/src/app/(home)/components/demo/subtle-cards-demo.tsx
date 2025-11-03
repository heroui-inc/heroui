import {Avatar, Card} from "@heroui/react";
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
            <Avatar.Image src="/assets/images/demo1.jpg" />
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">Indie Hackers</p>
          <p className="text-muted text-sm">148 members</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg" />
            <Avatar.Fallback>JK</Avatar.Fallback>
          </Avatar>
          <p className="text-muted text-xs">By John</p>
        </Card.Footer>
      </Card>
      <Card className={card()}>
        <Card.Header>
          <Avatar className={avatar()}>
            <Avatar.Image src="/assets/images/demo2.jpg" />
            <Avatar.Fallback>J</Avatar.Fallback>
          </Avatar>
        </Card.Header>
        <Card.Content className={cardContent()}>
          <p className="text-sm font-medium">AI Builders</p>
          <p className="text-muted text-sm">362 members</p>
        </Card.Content>
        <Card.Footer className={footer()}>
          <Avatar className={footerAvatar()}>
            <Avatar.Image src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg" />
            <Avatar.Fallback>M</Avatar.Fallback>
          </Avatar>
          <p className="text-muted text-xs">By Martha</p>
        </Card.Footer>
      </Card>
    </div>
  );
}
