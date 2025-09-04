import type {AvatarProps} from "./avatar";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar} from "./index";

export default {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "default", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
  component: Avatar,
  title: "✅ Ready/Avatar",
} as Meta<typeof Avatar>;

const defaultArgs: AvatarProps = {};

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

const Template = ({color, size}: AvatarProps) => (
  <div className="flex items-start gap-4">
    <div className="flex flex-col gap-4">
      <Avatar color={color} size={size}>
        <Avatar.Fallback>PG</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Fallback>JR</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Fallback>
          <Icon icon="gravity-ui:person" />
        </Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Fallback>
          <Icon icon="gravity-ui:person-gear" />
        </Avatar.Fallback>
      </Avatar>
    </div>

    <div className="flex flex-col gap-4">
      <Avatar color={color} size={size}>
        <Avatar.Image alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <Avatar.Fallback delayMs={600}>JD</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="Junior Garcia"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="Junior Garcia"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        />
        <Avatar.Fallback delayMs={600}>JG</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image alt="Paul" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=8" />
        <Avatar.Fallback delayMs={600}>PG</Avatar.Fallback>
      </Avatar>
    </div>

    <div className="flex flex-col gap-4">
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="Red"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
        />
        <Avatar.Fallback>R</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="Orange"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
        />
        <Avatar.Fallback>O</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="Green"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
        />
        <Avatar.Fallback>G</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="White"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/white.jpg"
        />
        <Avatar.Fallback>W</Avatar.Fallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <Avatar.Image
          alt="Black"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg"
        />
        <Avatar.Fallback>B</Avatar.Fallback>
      </Avatar>
    </div>
  </div>
);

const TemplateWithDelay = ({
  color,
  delay = 300,
  size,
}: {
  delay: number;
  color: AvatarProps["color"];
  size: AvatarProps["size"];
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Avatar color={color} size={size}>
        <Avatar.Image
          src={`https://app.requestly.io/delay/${delay}/https://img.heroui.chat/image/avatar?w=400&h=400&u=3`}
        />
      </Avatar>
    </div>
  );
};

const TemplateWithColors = () => {
  return (
    <div className="flex items-center gap-4">
      <Avatar color="default">
        <Avatar.Fallback>DF</Avatar.Fallback>
      </Avatar>
      <Avatar color="accent">
        <Avatar.Fallback>AC</Avatar.Fallback>
      </Avatar>
      <Avatar color="success">
        <Avatar.Fallback>SC</Avatar.Fallback>
      </Avatar>
      <Avatar color="warning">
        <Avatar.Fallback>WR</Avatar.Fallback>
      </Avatar>
      <Avatar color="danger">
        <Avatar.Fallback>DG</Avatar.Fallback>
      </Avatar>
    </div>
  );
};

const FallbackTemplate = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Text fallback */}
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

      {/* Icon fallback */}
      <Avatar>
        <Avatar.Fallback>
          <Icon icon="gravity-ui:person" />
        </Avatar.Fallback>
      </Avatar>

      {/* Fallback with delay */}
      <Avatar>
        <Avatar.Image
          alt="Delayed Avatar"
          src="https://invalid-url-to-show-fallback.com/image.jpg"
        />
        <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
      </Avatar>

      {/* Custom styled fallback */}
      <Avatar>
        <Avatar.Fallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          GB
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
};

const AvatarGroupTemplate = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center -space-x-2">
        {users.map((user) => (
          <Avatar key={user.id} className="ring-background ring-2">
            <Avatar.Image src={user.image_url} />
            <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar className="ring-background ring-2">
          <Avatar.Fallback className="border-none">+5</Avatar.Fallback>
        </Avatar>
      </div>
      <div className="flex items-center justify-center -space-x-2">
        {circles.map((circle) => (
          <Avatar key={circle.id} className="ring-background ring-2">
            <Avatar.Image src={circle.image_url} />
            <Avatar.Fallback>{circle.name}</Avatar.Fallback>
          </Avatar>
        ))}
        <Avatar className="ring-background ring-2">
          <Avatar.Fallback className="border-none">+5</Avatar.Fallback>
        </Avatar>
      </div>
    </div>
  );
};

export const Default = {
  args: defaultArgs,
  render: Template,
};

export const WithDelay = {
  args: defaultArgs,
  render: TemplateWithDelay,
};

export const WithColors = {
  render: TemplateWithColors,
};

export const Fallback = {
  render: FallbackTemplate,
};

export const Group = {
  render: AvatarGroupTemplate,
};

export const Sizes = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <Avatar.Image alt="Small" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar size="md">
        <Avatar.Image alt="Medium" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4" />
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Image alt="Large" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5" />
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};
