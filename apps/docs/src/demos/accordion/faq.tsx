import {Accordion} from "@heroui/react";
import {Icon} from "@iconify/react";

export function FAQ() {
  const categories = [
    {
      items: [
        {
          content:
            "Browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping and payment information to complete your purchase.",
          title: "How do I place an order?",
        },
        {
          content:
            "Yes, you can modify or cancel your order before it's shipped. Once your order is processed, you can't make changes.",
          title: "Can I modify or cancel my order?",
        },
      ],
      title: "General",
    },
    {
      items: [
        {
          content:
            "You can purchase a license directly from our website. Select the license type that fits your needs and proceed to checkout.",
          title: "How do I purchase a license?",
        },
        {
          content:
            "A standard license is for personal use or small projects, while a pro license includes commercial use rights and priority support.",
          title: "What is the difference between a standard and a pro license?",
        },
      ],
      title: "Licensing",
    },
    {
      items: [
        {
          content:
            "You can reach our support team through the contact form on our website, or email us directly at support@example.com.",
          title: "How do I get support?",
        },
      ],
      title: "Support",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted mb-4 text-lg font-medium">
          Everything you need to know about licensing and usage.
        </p>
      </div>
      {categories.map((category) => (
        <div key={category.title}>
          <p className="text-muted text-md mb-2 font-medium">{category.title}</p>
          <Accordion.Root className="w-full" variant="outline">
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
          </Accordion.Root>
        </div>
      ))}
    </div>
  );
}
