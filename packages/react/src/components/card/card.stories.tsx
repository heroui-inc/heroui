import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Link} from "../link";

import {Card} from "./index";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    surface: {
      control: {type: "select"},
      options: ["1", "2", "3"],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>This is the card content. You can add any content here.</p>
      </Card.Content>
    </Card>
  ),
};

export const WithFooter: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <Card.Title>Become an Acme Creator!</Card.Title>
        <Card.Description>
          Visit heroui.com to sign up today and start earning credits from your fans and followers.
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Button>Call to action</Button>
      </Card.Footer>
    </Card>
  ),
};

export const WithImage: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Image
        alt="Mountains"
        className="h-[200px]"
        src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
      />
      <Card.Header>
        <Card.Title>Beautiful Mountains</Card.Title>
        <Card.Description>
          Explore the stunning mountain landscapes and breathtaking views.
        </Card.Description>
      </Card.Header>
    </Card>
  ),
};

export const LoginForm: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
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
        <Link className="text-center text-sm" href="#">
          Forgot password?
        </Link>
      </Card.Footer>
    </Card>
  ),
};

export const SurfaceVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Card className="w-[400px]" surface="1">
        <Card.Header>
          <Card.Title>Surface Level 1</Card.Title>
          <Card.Description>This card uses surface level 1 (default)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content goes here</p>
        </Card.Content>
      </Card>

      <Card className="w-[400px]" surface="2">
        <Card.Header>
          <Card.Title>Surface Level 2</Card.Title>
          <Card.Description>This card uses surface level 2</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content goes here</p>
        </Card.Content>
      </Card>

      <Card className="w-[400px]" surface="3">
        <Card.Header>
          <Card.Title>Surface Level 3</Card.Title>
          <Card.Description>This card uses surface level 3</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content goes here</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const NestedCards: Story = {
  render: () => (
    <Card className="w-[600px]">
      <Card.Header>
        <Card.Title>Parent Card</Card.Title>
        <Card.Description>This card contains nested cards</Card.Description>
      </Card.Header>
      <Card.Content className="flex flex-col gap-4">
        <Card surface="2">
          <Card.Header>
            <Card.Title>Nested Card 1</Card.Title>
            <Card.Description>This is a nested card with surface level 2</Card.Description>
          </Card.Header>
        </Card>
        <Card surface="3">
          <Card.Header>
            <Card.Title>Nested Card 2</Card.Title>
            <Card.Description>This is another nested card with surface level 3</Card.Description>
          </Card.Header>
        </Card>
      </Card.Content>
    </Card>
  ),
};

export const AsChild: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args} asChild>
      <article>
        <Card.Header>
          <Card.Title asChild>
            <h2>Article Card</h2>
          </Card.Title>
          <Card.Description>
            This card uses semantic HTML elements via the asChild prop
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p>The root element is an article tag, and the title is an h2 tag.</p>
        </Card.Content>
      </article>
    </Card>
  ),
};
