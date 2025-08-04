import type {AccordionProps} from "./accordion";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import React from "react";
import {cnBase} from "tailwind-variants";

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
  component: Accordion,
  title: "✅ Ready/Accordion",
} as Meta<typeof Accordion>;

const defaultArgs: AccordionProps = {
  allowsMultipleExpanded: false,
  isDisabled: false,
  variant: "default",
};

const Wrapper = ({children, className}: {children: React.ReactNode; className?: string}) => (
  <div data-animation-off className={cnBase("w-full max-w-md", className)}>
    {children}
  </div>
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
    <Accordion {...props}>
      {items.map((item, index) => (
        <Accordion.Item key={index}>
          <Accordion.Heading>
            <Accordion.Trigger>
              {item.icon ? (
                <Icon className="text-muted mr-3 size-4 shrink-0" icon={item.icon} />
              ) : null}
              {item.title}
              <Accordion.Indicator>
                <Icon icon="gravity-ui:chevron-down" />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  </Wrapper>
);

const categories = [
  {
    title: "General",
    items: [
      {
        title: "How do I place an order?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
      {
        title: "Can I modify or cancel my order?",
        content:
          "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
      },
    ],
  },
  {
    title: "Licensing",
    items: [
      {
        title: "How do I purchase a license?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
      {
        title: "What is the difference between a standard and a pro license?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
    ],
  },
  {
    title: "Usage",
    items: [
      {
        title: "How do I use the HeroUI icon set?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
      {
        title: "Can I use it with Tailwind CSS?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
    ],
  },
  {
    title: "Support",
    items: [
      {
        title: "How do I get support?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
    ],
  },
  {
    title: "Other",
    items: [
      {
        title: "How do I get support?",
        content:
          "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
      },
    ],
  },
];

const CustomTemplate = (props: AccordionProps) => (
  <div className="flex w-full justify-center px-4 py-8">
    <div className="w-full max-w-2xl">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted mb-4 text-lg font-medium">
          Everything you need to know about licensing and usage.
        </p>
      </div>
      <div className="mt-2 flex flex-col gap-6">
        {categories.map((category) => (
          <div key={category.title}>
            <p className="text-muted text-md mb-2 font-medium">{category.title}</p>
            <Accordion {...props} className="w-full" variant="outline">
              {category.items.map((item, index) => (
                <Accordion.Item key={index}>
                  <Accordion.Heading>
                    <Accordion.Trigger>
                      {item.title}
                      <Accordion.Indicator>
                        <Icon icon="gravity-ui:chevron-down" />
                      </Accordion.Indicator>
                    </Accordion.Trigger>
                  </Accordion.Heading>
                  <Accordion.Panel>
                    <Accordion.Body>{item.content}</Accordion.Body>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export const Default = {
  args: {
    ...defaultArgs,
    allowsMultipleExpanded: true,
  },
  render: Template,
};

export const Custom = {
  args: {
    ...defaultArgs,
    allowsMultipleExpanded: true,
  },
  render: CustomTemplate,
};
