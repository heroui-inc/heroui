import type {Meta, StoryObj} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";

import {Button} from "../button";
import {Link} from "../link";

import {Card} from "./index";

const meta = {
  argTypes: {
    variant: {
      control: {type: "select"},
      options: [undefined, "side", "item", "full"],
    },
    surface: {
      control: {type: "select"},
      options: ["none", "1", "2", "3"],
    },
  },
  component: Card,
  parameters: {
    layout: "centered",
  },
  title: "Components/Card",
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[400px]",
  },
  render: (args) => (
    <Card {...args}>
      <Icon className="size-6" icon="gravity-ui:circle-dollar" />
      <Card.CloseButton />
      <Card.Details>
        <Card.Header>
          <Card.Title>PAYMENT</Card.Title>
          <Card.Description>You can now withdraw on crypto.</Card.Description>
        </Card.Header>
        <Card.Content>
          <Link href="#">Add your wallet in settings to withdraw</Link>
        </Card.Content>
      </Card.Details>
      <Card.Footer>
        <Link href="https://heroui.com" target="_blank">
          Go to settings
          <Link.Icon />
        </Link>
      </Card.Footer>
    </Card>
  ),
};

export const Surfaces: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Card className="w-[400px]" surface="none">
        <Card.Header>
          <Card.Title>Surface None</Card.Title>
          <Card.Description>Transparent background with no border</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with no surface styling</p>
        </Card.Content>
      </Card>

      <Card className="w-[400px]" surface="1">
        <Card.Header>
          <Card.Title>Surface Level 1</Card.Title>
          <Card.Description>This card uses surface level 1 (default)</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with subtle elevation</p>
        </Card.Content>
      </Card>

      <Card className="w-[400px]" surface="2">
        <Card.Header>
          <Card.Title>Surface Level 2</Card.Title>
          <Card.Description>This card uses surface level 2</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with medium elevation</p>
        </Card.Content>
      </Card>

      <Card className="w-[400px]" surface="3">
        <Card.Header>
          <Card.Title>Surface Level 3</Card.Title>
          <Card.Description>This card uses surface level 3</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>Content with higher elevation</p>
        </Card.Content>
      </Card>
    </div>
  ),
};

export const Variants: Story = {
  args: {},
  render: () => (
    <>
      <Card className="w-[467px] items-stretch" variant="side">
        <Card.Image
          alt="Product"
          className="aspect-square w-[136px]"
          src="https://assets.lummi.ai/assets/QmVGaqmCEBtAwTYMYUtn2ocdJcoSjtGbLydnVCGJpbUdHX"
        />
        <Card.Details className="gap-3">
          <Card.Header className="gap-1">
            <Card.Title>Become an Acme Creator!</Card.Title>
            <Card.Description>
              Visit heroui.com to sign up today and start earning credits from your fans and
              followers.
            </Card.Description>
          </Card.Header>
          <Card.Footer className="mt-auto">
            <Link href="https://heroui.com" target="_blank">
              Call to action
              <Link.Icon />
            </Link>
          </Card.Footer>
        </Card.Details>
      </Card>

      <div className="flex gap-4">
        <Card className="w-[200px]" variant="item">
          <Card.Image
            alt="Product"
            className="aspect-square"
            src="https://assets.lummi.ai/assets/QmVGaqmCEBtAwTYMYUtn2ocdJcoSjtGbLydnVCGJpbUdHX"
          />
          <Card.Details>
            <Card.Footer className="inline-flex items-center justify-between px-2 py-2 pb-1 text-sm">
              <span>Cars</span>
              <span className="text-muted">18 pictures</span>
            </Card.Footer>
          </Card.Details>
        </Card>
        <Card className="w-[200px]" variant="item">
          <Card.Image
            alt="Product"
            className="aspect-square"
            src="https://assets.lummi.ai/assets/QmVGaqmCEBtAwTYMYUtn2ocdJcoSjtGbLydnVCGJpbUdHX"
          />
          <Card.Details>
            <Card.Footer className="inline-flex items-center justify-between px-2 py-2 pb-1 text-sm">
              <span>Cars</span>
              <span className="text-muted">18 pictures</span>
            </Card.Footer>
          </Card.Details>
        </Card>
      </div>
    </>
  ),
};

export const Nested: Story = {
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

export const WithForm: Story = {
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

// export const WithImage: Story = {
//   args: {
//     className: "w-[400px]",
//   },
//   render: (args) => (
//     <Card {...args}>
//       <Card.Image
//         alt="Mountains"
//         className="h-[200px]"
//         src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
//       />
//       <Card.Header>
//         <Card.Title>Beautiful Mountains</Card.Title>
//         <Card.Description>
//           Explore the stunning mountain landscapes and breathtaking views.
//         </Card.Description>
//       </Card.Header>
//     </Card>
//   ),
// };
