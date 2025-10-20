import type {AvatarProps} from "./index";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "./index";

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
  title: "Components/Media/Avatar",
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
        <AvatarFallback>PG</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarFallback>JR</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarFallback>
          <Icon icon="gravity-ui:person" />
        </AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarFallback>
          <Icon icon="gravity-ui:person-gear" />
        </AvatarFallback>
      </Avatar>
    </div>

    <div className="flex flex-col gap-4">
      <Avatar color={color} size={size}>
        <AvatarImage alt="John Doe" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <AvatarFallback delayMs={600}>JD</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="Junior Garcia"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4"
        />
        <AvatarFallback delayMs={600}>JG</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="Junior Garcia"
          src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5"
        />
        <AvatarFallback delayMs={600}>JG</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage alt="Paul" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=8" />
        <AvatarFallback delayMs={600}>PG</AvatarFallback>
      </Avatar>
    </div>

    <div className="flex flex-col gap-4">
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="Red"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
        />
        <AvatarFallback>R</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="Orange"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
        />
        <AvatarFallback>O</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="Green"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/green.jpg"
        />
        <AvatarFallback>G</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="White"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/white.jpg"
        />
        <AvatarFallback>W</AvatarFallback>
      </Avatar>
      <Avatar color={color} size={size}>
        <AvatarImage
          alt="Black"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/black.jpg"
        />
        <AvatarFallback>B</AvatarFallback>
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
        <AvatarImage
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
        <AvatarFallback>DF</AvatarFallback>
      </Avatar>
      <Avatar color="accent">
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <Avatar color="success">
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
      <Avatar color="warning">
        <AvatarFallback>WR</AvatarFallback>
      </Avatar>
      <Avatar color="danger">
        <AvatarFallback>DG</AvatarFallback>
      </Avatar>
    </div>
  );
};

const FallbackTemplate = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Text fallback */}
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      {/* Icon fallback */}
      <Avatar>
        <AvatarFallback>
          <Icon icon="gravity-ui:person" />
        </AvatarFallback>
      </Avatar>
      {/* Fallback with delay */}
      <Avatar>
        <AvatarImage
          alt="Delayed Avatar"
          src="https://invalid-url-to-show-fallback.com/image.jpg"
        />
        <AvatarFallback delayMs={600}>NA</AvatarFallback>
      </Avatar>
      {/* Custom styled fallback */}
      <Avatar>
        <AvatarFallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          GB
        </AvatarFallback>
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
            <AvatarImage src={user.image_url} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="ring-background ring-2">
          <AvatarFallback className="border-none">+5</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex items-center justify-center -space-x-2">
        {circles.map((circle) => (
          <Avatar key={circle.id} className="ring-background ring-2">
            <AvatarImage src={circle.image_url} />
            <AvatarFallback>{circle.name}</AvatarFallback>
          </Avatar>
        ))}
        <Avatar className="ring-background ring-2">
          <AvatarFallback className="border-none">+5</AvatarFallback>
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
        <AvatarImage alt="Small" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=3" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="md">
        <AvatarImage alt="Medium" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=4" />
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage alt="Large" src="https://img.heroui.chat/image/avatar?w=400&h=400&u=5" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
};
