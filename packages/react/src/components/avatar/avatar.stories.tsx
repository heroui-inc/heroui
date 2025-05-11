import type {AvatarProps} from "./avatar";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";

import {Avatar} from "./index";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "base", "success", "warning", "danger"],
    },
  },
  component: Avatar.Root,
  title: "Components/Avatar",
} as Meta<typeof Avatar>;

const defaultArgs: AvatarProps = {};

const Template = ({color}: AvatarProps) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col gap-4">
      <Avatar.Root color={color}>
        <Avatar.Fallback>PG</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Fallback>JR</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Fallback>
          <Icon icon="gravity-ui:person" />
        </Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Fallback>
          <Icon icon="gravity-ui:person-gear" />
        </Avatar.Fallback>
      </Avatar.Root>
    </div>

    <div className="flex flex-col gap-4">
      <Avatar.Root color={color}>
        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="Junior Garcia"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="Junior Garcia"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        />
        <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image alt="Paul" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=8" />
        <Avatar.Fallback delayMs={600}>PG</Avatar.Fallback>
      </Avatar.Root>
    </div>

    <div className="flex flex-col gap-4">
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="Red"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
        />
        <Avatar.Fallback>R</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="Orange"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
        />
        <Avatar.Fallback>O</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="Green"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
        />
        <Avatar.Fallback>G</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="White"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/white.jpg"
        />
        <Avatar.Fallback>W</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root color={color}>
        <Avatar.Image
          alt="Black"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg"
        />
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar.Root>
    </div>
  </div>
);

const users = [
  {
    id: 1,
    image_url: "https://img.heroui.chat/image/avatar?w=400&h=400&u=3",
    name: "John",
  },
  {
    id: 2,
    image_url: "https://img.heroui.chat/image/avatar?w=400&h=400&u=5",
    name: "Kate",
  },
  {
    id: 3,
    image_url: "https://img.heroui.chat/image/avatar?w=400&h=400&u=20",
    name: "Emily",
  },
  {
    id: 4,
    image_url: "https://img.heroui.chat/image/avatar?w=400&h=400&u=23",
    name: "Michael",
  },
  {
    id: 5,
    image_url: "https://img.heroui.chat/image/avatar?w=400&h=400&u=16",
    name: "Olivia",
  },
];

const circles = [
  {
    id: 1,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg",
    name: "R",
  },
  {
    id: 2,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg",
    name: "O",
  },
  {
    id: 3,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg",
    name: "G",
  },
  {
    id: 4,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/white.jpg",
    name: "W",
  },
  {
    id: 5,
    image_url: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg",
    name: "B",
  },
];

const AvatarGroupTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center -space-x-2">
        {users.map((user) => (
          <Avatar.Root key={user.id} className="ring-background ring-2">
            <Avatar.Image src={user.image_url} />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar.Root>
        ))}
        <Avatar.Root className="ring-background ring-2">
          <Avatar.Fallback className="border-none">+5</Avatar.Fallback>
        </Avatar.Root>
      </div>
      <div className="flex items-center justify-center -space-x-2">
        {circles.map((circle) => (
          <Avatar.Root key={circle.id} className="ring-background ring-2">
            <Avatar.Image src={circle.image_url} />
            <Avatar.Fallback>{circle.name}</Avatar.Fallback>
          </Avatar.Root>
        ))}
        <Avatar.Root className="ring-background ring-2">
          <Avatar.Fallback className="border-none">+5</Avatar.Fallback>
        </Avatar.Root>
      </div>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const Group = {
  render: AvatarGroupTemplate,
};
