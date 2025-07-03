import type {AccordionProps} from "./accordion";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";

import {Accordion} from "./index";

export default {
  argTypes: {
    allowsMultipleExpanded: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    variant: {
      control: {
        type: "select",
      },
      options: ["default", "outline"],
    },
  },
  component: Accordion.Root,
  title: "Components/Accordion",
} as Meta<typeof Accordion>;

const defaultArgs: AccordionProps = {
  allowsMultipleExpanded: false,
  isDisabled: false,
  variant: "default",
};

const Wrapper = ({children}: {children: React.ReactNode}) => (
  <div className="flex h-full w-full">{children}</div>
);

const items = [
  {
    content:
      "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    icon: "gravity-ui:shopping-bag",
    title: "How do I place an order?",
  },
  {
    content:
      "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    icon: "gravity-ui:receipt",
    title: "Can I modify or cancel my order?",
  },
  {
    content: "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    icon: "gravity-ui:credit-card",
    title: "What payment methods do you accept?",
  },
  {
    content:
      "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    icon: "gravity-ui:box",
    title: "How much does shipping cost?",
  },
  {
    content:
      "Yes, we ship to most countries. Please check our shipping rates and policies for more information.",
    icon: "gravity-ui:planet-earth",
    title: "Do you ship internationally?",
  },
  {
    content:
      "If you're not satisfied with your purchase, you can request a refund within 30 days of purchase. Please contact our customer support team for assistance.",
    icon: "gravity-ui:arrows-rotate-left",
    title: "How do I request a refund?",
  },
];

const Template = (props: AccordionProps) => (
  <Wrapper>
    <Accordion.Root {...props}>
      {items.map((item, index) => (
        <Accordion.Item key={index}>
          <Accordion.Heading>
            <Accordion.Trigger>
              {item.icon ? (
                <Icon className="text-muted mr-3 size-4 shrink-0" icon={item.icon} />
              ) : null}
              {item.title}
              <Accordion.Indicator />
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  </Wrapper>
);

export const Default = {
  args: {
    ...defaultArgs,
    allowsMultipleExpanded: true,
  },
  render: Template,
};
