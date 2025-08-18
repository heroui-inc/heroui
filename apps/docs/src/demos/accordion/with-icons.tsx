"use client";

import {Accordion} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithIcons() {
  const items = [
    {
      icon: "gravity-ui:shopping-bag",
      title: "How do I place an order?",
      content:
        "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
    },
    {
      icon: "gravity-ui:receipt",
      title: "Can I modify or cancel my order?",
      content:
        "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
    },
    {
      icon: "gravity-ui:credit-card",
      title: "What payment methods do you accept?",
      content:
        "We accept all major credit cards, including Visa, Mastercard, and American Express.",
    },
    {
      icon: "gravity-ui:box",
      title: "How much does shipping cost?",
      content:
        "Shipping costs vary based on your location and the size of your order. We offer free shipping for orders over $50.",
    },
  ];

  return (
    <Accordion className="w-full max-w-md">
      {items.map((item, index) => (
        <Accordion.Item key={index}>
          <Accordion.Heading>
            <Accordion.Trigger>
              <Icon className="text-muted mr-3 size-4 shrink-0" icon={item.icon} />
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
  );
}
