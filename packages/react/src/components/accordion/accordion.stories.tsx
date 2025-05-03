import type {AccordionProps} from "./accordion";
import type {Meta} from "@storybook/react";

import {Accordion} from "./index";

export default {
  argTypes: {
    variant: {},
  },
  component: Accordion.Root,
  title: "Components/Accordion",
} as Meta<typeof Accordion>;

const Template = (_props: AccordionProps) => (
  <Accordion.Root>
    <Accordion.Item>
      <Accordion.Trigger>How do I place an order?</Accordion.Trigger>
      <Accordion.Content>
        Browse our products, add items to your cart, and proceed to checkout. You&apos;ll need to
        provide shipping and payment information to complete your purchase.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>Can I modify or cancel my order?</Accordion.Trigger>
      <Accordion.Content>
        Yes, you can modify or cancel your order before it&apos;s shipped. Once your order is
        processed, you can&apos;t make changes.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>What payment methods do you accept?</Accordion.Trigger>
      <Accordion.Content>
        We accept all major credit cards, including Visa, Mastercard, and American Express.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>How much does shipping cost?</Accordion.Trigger>
      <Accordion.Content>
        Shipping costs vary based on your location and the size of your order. We offer free
        shipping for orders over $50.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>Do you ship internationally?</Accordion.Trigger>
      <Accordion.Content>
        Yes, we ship to most countries. Please check our shipping rates and policies for more
        information.
      </Accordion.Content>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>How do I request a refund?</Accordion.Trigger>
      <Accordion.Content>
        If you&apos;re not satisfied with your purchase, you can request a refund within 30 days of
        purchase. Please contact our customer support team for assistance.
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

export const Default = {
  args: {},
  render: Template,
};
