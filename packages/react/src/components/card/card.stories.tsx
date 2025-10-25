import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar} from "../avatar";
import {Button} from "../button";
import {Link} from "../link";

import {Card} from "./index";

const meta = {
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["flat", "outlined", "elevated", "filled"],
    },
  },
  component: Card.Root,
  parameters: {
    layout: "centered",
  },
  title: "Components/Layout/Card",
} satisfies Meta<typeof Card.Root>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card.Root className="w-[400px]" {...args}>
      <Icon
        aria-label="Dollar sign icon"
        className="text-primary size-6"
        icon="gravity-ui:circle-dollar"
        role="img"
      />
      <Card.Header>
        <Card.Title>PAYMENT</Card.Title>
        <Card.Description>You can now withdraw on crypto.</Card.Description>
      </Card.Header>
      <Card.Content id="payment-content">
        <p>Add your wallet in settings to withdraw</p>
      </Card.Content>
      <Card.Footer>
        <Link.Root
          aria-label="Go to settings (opens in new tab)"
          href="https://heroui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to settings
          <Link.Icon aria-hidden="true" />
        </Link.Root>
      </Card.Footer>
    </Card.Root>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card.Root className="w-[320px]" variant="flat">
        <Card.Header>
          <Card.Title>Variant Flat</Card.Title>
          <Card.Description>Transparent background with no border</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with no variant styling</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="outlined">
        <Card.Header>
          <Card.Title>Variant Outlined</Card.Title>
          <Card.Description>This card uses outlined variant (default)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with subtle elevation</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="elevated">
        <Card.Header>
          <Card.Title>Variant Elevated</Card.Title>
          <Card.Description>This card uses elevated variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with medium elevation</p>
        </Card.Content>
      </Card.Root>

      <Card.Root className="w-[320px]" variant="filled">
        <Card.Header>
          <Card.Title>Variant Filled</Card.Title>
          <Card.Description>This card uses filled variant</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with higher elevation</p>
        </Card.Content>
      </Card.Root>
    </div>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <Card.Root className="w-full items-stretch md:flex-row" {...args}>
      <img
        alt="Porsche 911 Golden Edition"
        className="pointer-events-none aspect-square w-full select-none rounded-3xl object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/porsche-911.png"
      />
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title>Get the new Porsche 911 golden edition</Card.Title>
          <Card.Description>
            Experience unmatched luxury and performance with the Porsche 911 Golden Edition—where
            sleek design meets cutting-edge tech and pure driving thrill.
          </Card.Description>
        </Card.Header>
        <Card.Footer className="mt-auto flex w-full flex-row items-center justify-between">
          <div className="flex flex-col">
            <span
              aria-label="Price: 36,799 US dollars"
              className="text-foreground text-sm font-medium"
            >
              $36,799
            </span>
            <span aria-label="Available stock: 11 units" className="text-muted text-xs">
              11 available
            </span>
          </div>
          <Button>Buy Now</Button>
        </Card.Footer>
      </div>
    </Card.Root>
  ),
};

export const WithAvatar: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Card.Root className="w-[200px] gap-2" {...args}>
        <img
          alt="Indie Hackers community"
          className="pointer-events-none aspect-square w-14 select-none rounded-3xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/device.png"
        />
        <Card.Header>
          <Card.Title>Indie Hackers</Card.Title>
          <Card.Description>148 members</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar.Root aria-label="Martha's profile picture" className="size-5">
            <Avatar.Image
              alt="Martha's avatar"
              src="https://img.heroui.chat/image/avatar?w=160&h=160"
            />
            <Avatar.Fallback className="text-xs">IH</Avatar.Fallback>
          </Avatar.Root>
          <span className="text-xs">By Martha</span>
        </Card.Footer>
      </Card.Root>

      <Card.Root className="w-[200px] gap-2" {...args}>
        <img
          alt="AI Builders community"
          className="pointer-events-none aspect-square w-14 select-none rounded-3xl object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/ai-bot.png"
        />
        <Card.Header>
          <Card.Title>AI Builders</Card.Title>
          <Card.Description>362 members</Card.Description>
        </Card.Header>
        <Card.Footer className="flex gap-2">
          <Avatar.Root aria-label="John's profile picture" className="size-5">
            <Avatar.Image
              alt="John's avatar - blue themed"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <Avatar.Fallback className="text-xs">B</Avatar.Fallback>
          </Avatar.Root>
          <span className="text-xs">By John</span>
        </Card.Footer>
      </Card.Root>
    </div>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Card.Root className="w-[220px] gap-2 p-1" {...args}>
        <img
          alt="Luxury cars collection"
          className="block aspect-square w-full shrink-0 select-none rounded-[calc(theme(--radius-panel)-theme(spacing.1))] object-cover align-middle"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/porsche-911.png"
        />
        <Card.Footer className="flex items-center justify-between px-2 text-sm">
          <span>Cars</span>
          <span aria-label="18 pictures in collection" className="text-muted">
            18 pictures
          </span>
        </Card.Footer>
      </Card.Root>

      <Card.Root className="w-[220px] gap-2 p-1" {...args}>
        <img
          alt="Modern office workspace"
          className="block aspect-square w-full shrink-0 select-none rounded-[calc(theme(--radius-panel)-theme(spacing.1))] object-cover align-middle"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/workspace.jpeg"
        />
        <Card.Footer className="flex items-center justify-between px-2 text-sm">
          <span>Workspaces</span>
          <span aria-label="56 pictures in collection" className="text-muted">
            56 pictures
          </span>
        </Card.Footer>
      </Card.Root>
    </div>
  ),
};

export const WithBackgroundImage: Story = {
  render: (args) => (
    <div className="flex flex-row items-center justify-center gap-6">
      <Card.Root className="h-[337px] w-[280px] rounded-3xl" {...args}>
        {/* Background image */}
        <img
          alt="Happy pet"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/dog.png"
        />

        {/* Top gradient blur overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 right-0 top-0 h-[76px]"
        >
          <div
            className="absolute inset-0 h-[-200%] rounded-t-[inherit] backdrop-blur-sm"
            style={{
              WebkitMaskImage: "linear-gradient(to bottom, black 80%, transparent)",
              maskImage: "linear-gradient(to bottom, black 80%, transparent)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* Header */}
        <Card.Header className="z-10 text-white">
          <Card.Title className="text-xs font-medium tracking-wide text-white/80">
            PET HEALTH
          </Card.Title>
          <Card.Description className="text-lg font-medium leading-6 text-white">
            Your pet deserve the best
          </Card.Description>
        </Card.Header>

        {/* Bottom gradient blur overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[64px]"
        >
          <div
            className="absolute inset-0 h-[200%] rounded-b-[inherit] backdrop-blur-sm"
            style={{
              WebkitMaskImage: "linear-gradient(to top, black 80%, transparent)",
              maskImage: "linear-gradient(to top, black 80%, transparent)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* Footer */}
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Available soon</div>
            <div className="text-xs text-white/60">Get notified</div>
          </div>
          <Button size="sm" variant="tertiary">
            Notify me
          </Button>
        </Card.Footer>
      </Card.Root>

      <Card.Root className="h-[336px] w-[390px] rounded-3xl" {...args}>
        {/* Background image */}
        <img
          alt="Beautiful aerial view of Buenos Aires cityscape"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/mountain.png"
        />

        {/* Bottom gradient blur overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[64px]"
        >
          <div
            className="absolute inset-0 h-[200%] rounded-b-[inherit] backdrop-blur-sm"
            style={{
              WebkitMaskImage: "linear-gradient(to top, black 80%, transparent)",
              maskImage: "linear-gradient(to top, black 80%, transparent)",
              maskRepeat: "no-repeat",
              maskSize: "100% 100%",
            }}
          />
        </div>

        {/* Footer */}
        <Card.Footer className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Buenos Aires</div>
            <div className="text-xs text-white/60">Argentina</div>
          </div>
          <Button aria-label="View Buenos Aires on map" size="sm" variant="tertiary">
            <Icon aria-hidden="true" icon="gravity-ui:map-pin" />
            Map
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Card.Root className="w-full max-w-md" {...args}>
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>Enter your credentials to access your account</Card.Description>
      </Card.Header>
      <Card.Content>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              className="border-border bg-background focus:ring-focus rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              id="email"
              placeholder="email@example.com"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              className="border-border bg-background focus:ring-focus rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2"
              id="password"
              placeholder="••••••••"
              type="password"
            />
          </div>
        </form>
      </Card.Content>
      <Card.Footer className="flex flex-col gap-2">
        <Button className="w-full">Sign In</Button>
        <Link.Root className="text-center text-sm" href="#">
          Forgot password?
        </Link.Root>
      </Card.Footer>
    </Card.Root>
  ),
};
