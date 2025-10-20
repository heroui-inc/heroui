import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Avatar, AvatarFallback, AvatarImage} from "../avatar";
import {Button} from "../button";
import {Link, LinkIcon} from "../link";

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "./index";

const meta = {
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["flat", "outlined", "elevated", "filled"],
    },
  },
  component: Card,
  parameters: {
    layout: "centered",
  },
  title: "Components/Layout/Card",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Card className="w-[400px]" {...args}>
      <Icon
        aria-label="Dollar sign icon"
        className="text-primary size-6"
        icon="gravity-ui:circle-dollar"
        role="img"
      />
      <CardHeader>
        <CardTitle>PAYMENT</CardTitle>
        <CardDescription>You can now withdraw on crypto.</CardDescription>
      </CardHeader>
      <CardContent id="payment-content">
        <p>Add your wallet in settings to withdraw</p>
      </CardContent>
      <CardFooter>
        <Link
          aria-label="Go to settings (opens in new tab)"
          href="https://heroui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to settings
          <LinkIcon aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Card className="w-[320px]" variant="flat">
        <CardHeader>
          <CardTitle>Variant Flat</CardTitle>
          <CardDescription>Transparent background with no border</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with no variant styling</p>
        </CardContent>
      </Card>

      <Card className="w-[320px]" variant="outlined">
        <CardHeader>
          <CardTitle>Variant Outlined</CardTitle>
          <CardDescription>This card uses outlined variant (default)</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with subtle elevation</p>
        </CardContent>
      </Card>

      <Card className="w-[320px]" variant="elevated">
        <CardHeader>
          <CardTitle>Variant Elevated</CardTitle>
          <CardDescription>This card uses elevated variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with medium elevation</p>
        </CardContent>
      </Card>

      <Card className="w-[320px]" variant="filled">
        <CardHeader>
          <CardTitle>Variant Filled</CardTitle>
          <CardDescription>This card uses filled variant</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Content with higher elevation</p>
        </CardContent>
      </Card>
    </div>
  ),
};

export const Horizontal: Story = {
  render: (args) => (
    <Card className="w-full items-stretch md:flex-row" {...args}>
      <img
        alt="Porsche 911 Golden Edition"
        className="rounded-panel pointer-events-none aspect-square w-full select-none object-cover md:max-w-[136px]"
        loading="lazy"
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/porsche-911.png"
      />
      <div className="flex flex-1 flex-col gap-3">
        <CardHeader className="gap-1">
          <CardTitle>Get the new Porsche 911 golden edition</CardTitle>
          <CardDescription>
            Experience unmatched luxury and performance with the Porsche 911 Golden Edition—where
            sleek design meets cutting-edge tech and pure driving thrill.
          </CardDescription>
        </CardHeader>
        <CardFooter className="mt-auto flex w-full flex-row items-center justify-between">
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
        </CardFooter>
      </div>
    </Card>
  ),
};

export const WithAvatar: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Card className="w-[200px] gap-2" {...args}>
        <img
          alt="Indie Hackers community"
          className="rounded-panel pointer-events-none aspect-square w-14 select-none object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/device.png"
        />
        <CardHeader>
          <CardTitle>Indie Hackers</CardTitle>
          <CardDescription>148 members</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Avatar aria-label="Martha's profile picture" className="size-5">
            <AvatarImage
              alt="Martha's avatar"
              src="https://img.heroui.chat/image/avatar?w=160&h=160"
            />
            <AvatarFallback className="text-xs">IH</AvatarFallback>
          </Avatar>
          <span className="text-xs">By Martha</span>
        </CardFooter>
      </Card>

      <Card className="w-[200px] gap-2" {...args}>
        <img
          alt="AI Builders community"
          className="rounded-panel pointer-events-none aspect-square w-14 select-none object-cover"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/ai-bot.png"
        />
        <CardHeader>
          <CardTitle>AI Builders</CardTitle>
          <CardDescription>362 members</CardDescription>
        </CardHeader>
        <CardFooter className="flex gap-2">
          <Avatar aria-label="John's profile picture" className="size-5">
            <AvatarImage
              alt="John's avatar - blue themed"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
            />
            <AvatarFallback className="text-xs">B</AvatarFallback>
          </Avatar>
          <span className="text-xs">By John</span>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <Card className="w-[220px] gap-2 p-1" {...args}>
        <img
          alt="Luxury cars collection"
          className="block aspect-square w-full shrink-0 select-none rounded-[calc(theme(--radius-panel)-theme(spacing.1))] object-cover align-middle"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/porsche-911.png"
        />
        <CardFooter className="flex items-center justify-between px-2 text-sm">
          <span>Cars</span>
          <span aria-label="18 pictures in collection" className="text-muted">
            18 pictures
          </span>
        </CardFooter>
      </Card>

      <Card className="w-[220px] gap-2 p-1" {...args}>
        <img
          alt="Modern office workspace"
          className="block aspect-square w-full shrink-0 select-none rounded-[calc(theme(--radius-panel)-theme(spacing.1))] object-cover align-middle"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/components/card/workspace.jpeg"
        />
        <CardFooter className="flex items-center justify-between px-2 text-sm">
          <span>Workspaces</span>
          <span aria-label="56 pictures in collection" className="text-muted">
            56 pictures
          </span>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const WithBackgroundImage: Story = {
  render: (args) => (
    <div className="flex flex-row items-center justify-center gap-6">
      <Card className="rounded-panel h-[337px] w-[280px]" {...args}>
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
        <CardHeader className="z-10 text-white">
          <CardTitle className="text-xs font-medium tracking-wide text-white/80">
            PET HEALTH
          </CardTitle>
          <CardDescription className="text-lg font-medium leading-6 text-white">
            Your pet deserve the best
          </CardDescription>
        </CardHeader>

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
        <CardFooter className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Available soon</div>
            <div className="text-xs text-white/60">Get notified</div>
          </div>
          <Button size="sm" variant="tertiary">
            Notify me
          </Button>
        </CardFooter>
      </Card>

      <Card className="rounded-panel h-[336px] w-[390px]" {...args}>
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
        <CardFooter className="z-10 mt-auto flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-white">Buenos Aires</div>
            <div className="text-xs text-white/60">Argentina</div>
          </div>
          <Button aria-label="View Buenos Aires on map" size="sm" variant="tertiary">
            <Icon aria-hidden="true" icon="gravity-ui:map-pin" />
            Map
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

export const WithForm: Story = {
  render: (args) => (
    <Card className="w-full max-w-md" {...args}>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
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
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full">Sign In</Button>
        <Link className="text-center text-sm" href="#">
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  ),
};
