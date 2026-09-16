import type {Meta, StoryObj} from "@storybook/react";
import type {ReactNode} from "react";

import React from "react";

import {Avatar} from "../avatar";
import {Checkbox} from "../checkbox";
import {CheckboxGroup} from "../checkbox-group";
import {Description} from "../description";
import {Label} from "../label";
import {Radio} from "../radio";
import {RadioGroup} from "../radio-group";

import {AvatarGroup} from "./index";

const meta: Meta<typeof AvatarGroup> = {
  argTypes: {
    color: {
      control: "select",
      options: ["accent", "default", "success", "warning", "danger"],
    },
    isGrid: {
      control: "boolean",
    },
    max: {
      control: "number",
    },
    overlap: {
      control: "select",
      options: ["clip", "ring"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: "select",
      options: ["default", "soft"],
    },
  },
  component: AvatarGroup,
  parameters: {
    layout: "centered",
  },
  title: "Components/Media/AvatarGroup",
};

export default meta;

type Story = StoryObj<typeof AvatarGroup>;

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

const renderUserAvatars = (items = users) =>
  items.map((user) => (
    <Avatar key={user.id}>
      <Avatar.Image alt={user.name} src={user.image_url} />
      <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
    </Avatar>
  ));

/** Story-only: interleave image avatars with fallback-only ones (stable order). */
const renderMixedAvatars = (
  items: typeof users,
  fallbacks: {color?: "accent" | "danger" | "default" | "success" | "warning"; label: string}[],
) => {
  const nodes: ReactNode[] = [];
  const imageCount = Math.max(items.length, fallbacks.length);
  let fi = 0;

  for (let i = 0; i < imageCount; i++) {
    if (i < items.length) {
      const item = items[i];

      nodes.push(
        <Avatar key={`img-${item.id}`}>
          <Avatar.Image alt={item.name} src={item.image_url} />
          <Avatar.Fallback>{item.name.charAt(0)}</Avatar.Fallback>
        </Avatar>,
      );
    }
    // Insert a fallback after every image while we still have some (2–3 total)
    if (fi < fallbacks.length) {
      const fb = fallbacks[fi++];

      nodes.push(
        <Avatar key={`fb-${fb.label}`} color={fb.color}>
          <Avatar.Fallback>{fb.label}</Avatar.Fallback>
        </Avatar>,
      );
    }
  }

  return nodes;
};

/* -------------------------------------------------------------------------------------------------
 * Progressive stories (simple → advanced)
 * -----------------------------------------------------------------------------------------------*/

export const Default: Story = {
  render: () => <AvatarGroup>{renderUserAvatars(users.slice(0, 4))}</AvatarGroup>,
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Small</p>
        <AvatarGroup size="sm">{renderUserAvatars(users.slice(0, 4))}</AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Medium (default)</p>
        <AvatarGroup size="md">{renderUserAvatars(users.slice(0, 4))}</AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Large</p>
        <AvatarGroup size="lg">{renderUserAvatars(users.slice(0, 4))}</AvatarGroup>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Default</p>
        <AvatarGroup color="default">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Accent</p>
        <AvatarGroup color="accent">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Success</p>
        <AvatarGroup color="success">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Warning</p>
        <AvatarGroup color="warning">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Danger</p>
        <AvatarGroup color="danger">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Default</p>
        <AvatarGroup color="accent" variant="default">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted">Soft</p>
        <AvatarGroup color="accent" variant="soft">
          <Avatar>
            <Avatar.Fallback>A</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>B</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>C</Avatar.Fallback>
          </Avatar>
          <Avatar>
            <Avatar.Fallback>D</Avatar.Fallback>
          </Avatar>
        </AvatarGroup>
      </div>
    </div>
  ),
};

export const Max: Story = {
  render: () => <AvatarGroup max={3}>{renderUserAvatars()}</AvatarGroup>,
};

export const WithCount: Story = {
  render: () => (
    <AvatarGroup size="sm">
      {renderUserAvatars(users.slice(0, 3))}
      <AvatarGroup.Count>+9</AvatarGroup.Count>
    </AvatarGroup>
  ),
};

export const Grid: Story = {
  render: () => (
    <AvatarGroup isGrid max={7}>
      {renderUserAvatars()}
    </AvatarGroup>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * OverlapPlayground — Storybook-only (not linked from docs)
 * Clip / optical center / backdrop — Users + Circles
 * Inspired by Florian: https://x.com/flornkm/status/2088296589282705508
 * -----------------------------------------------------------------------------------------------*/

const FEATURES = [
  ["clip", "Clip", 'overlap="clip"'],
  ["opticalCenter", "Optically center", "Clip only — nudge fallback glyphs into the crescent"],
  ["backdrop", "Backdrop", "Animated stripes to prove the seam is transparent"],
] as const;

const PLAYGROUND_STYLES = `
@keyframes ag-stripes {
  to { background-position: 24px 24px; }
}

.ag-stripes {
  background-color: color-mix(in oklab, var(--danger) 6%, var(--surface));
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 10px,
    color-mix(in oklab, var(--danger) 12%, transparent) 10px 11px,
    transparent 11px 21px,
    color-mix(in oklab, var(--danger) 28%, transparent) 21px 22px
  );
  background-size: 24px 24px;
  animation: ag-stripes 2.8s linear infinite;
}

.avatar-group--clip[data-optical="false"] > .avatar:not(:last-child) .avatar__fallback {
  padding-inline-end: 0;
}
`;

const StripeBackdrop = ({animated, children}: {children: ReactNode; animated: boolean}) => (
  <div className="relative inline-flex rounded-xl p-6">
    <div
      aria-hidden
      className={
        animated
          ? "ag-stripes pointer-events-none absolute inset-0 rounded-xl"
          : "pointer-events-none absolute inset-0 rounded-xl bg-background"
      }
    />
    <div className="relative z-10">{children}</div>
  </div>
);

export const OverlapPlayground: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Storybook-only: toggle clip/ring, optical centering, animated backdrop, and size. Shows Users and Circles with a few fallback-only avatars mixed in.",
      },
    },
  },
  render: () => {
    const [features, setFeatures] = React.useState<string[]>(["clip", "opticalCenter", "backdrop"]);
    const [size, setSize] = React.useState("lg");

    const clip = features.includes("clip");
    const opticalCenter = features.includes("opticalCenter");
    const backdrop = features.includes("backdrop");

    const groupProps = {
      // Optical CSS is clip-only; data-optical A/B only applies under --clip
      "data-optical": clip && !opticalCenter ? ("false" as const) : undefined,
      overlap: (clip ? "clip" : "ring") as "clip" | "ring",
      size: size as "sm" | "md" | "lg",
    };

    return (
      <div className="flex flex-col items-start gap-6">
        <style>{PLAYGROUND_STYLES}</style>

        <CheckboxGroup
          className="max-w-md"
          name="overlap-playground-features"
          value={features}
          onChange={setFeatures}
        >
          <Label>Features</Label>
          {FEATURES.map(([value, label, description]) => (
            <Checkbox key={value} isDisabled={value === "opticalCenter" && !clip} value={value}>
              <Checkbox.Content>
                <Checkbox.Control>
                  <Checkbox.Indicator />
                </Checkbox.Control>
                {label}
              </Checkbox.Content>
              <Description>{description}</Description>
            </Checkbox>
          ))}
        </CheckboxGroup>

        <RadioGroup
          name="overlap-playground-size"
          orientation="horizontal"
          value={size}
          onChange={setSize}
        >
          <Label>Size</Label>
          {(["sm", "md", "lg"] as const).map((s) => (
            <Radio key={s} value={s}>
              <Radio.Content>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                {s}
              </Radio.Content>
            </Radio>
          ))}
        </RadioGroup>

        <StripeBackdrop animated={backdrop}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted">Users</p>
              <AvatarGroup {...groupProps}>
                {renderMixedAvatars(users.slice(0, 3), [
                  {color: "accent", label: "AB"},
                  {color: "warning", label: "JD"},
                  {color: "success", label: "SM"},
                ])}
                <AvatarGroup.Count>+2</AvatarGroup.Count>
              </AvatarGroup>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted">Circles</p>
              <AvatarGroup {...groupProps}>
                {renderMixedAvatars(circles.slice(0, 3), [
                  {color: "danger", label: "Q"},
                  {color: "accent", label: "ZK"},
                ])}
                <AvatarGroup.Count>+2</AvatarGroup.Count>
              </AvatarGroup>
            </div>
          </div>
        </StripeBackdrop>
      </div>
    );
  },
};
