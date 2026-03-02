"use client";

import {Accordion} from "@heroui/react";

const faqItems = [
  {
    answer:
      "HeroUI Pro is a set of beautiful production-ready components built on top of HeroUI component library. Compared to the free version, HeroUI Pro offer more complex components, such as components for AI, E-commerce, Marketing, and more.",
    question: "What's HeroUI Pro?",
  },
  {
    answer:
      "Perpetual means that you only pay once to purchase the HeroUI Pro. There are no additional charges or recurring subscriptions after this initial payment, you get access to HeroUI Pro forever.",
    question: 'What does "Perpetual" mean?',
  },
  {
    answer:
      "Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.",
    question: "How does the Team and Enterprise teams work?",
  },
  {
    answer:
      "Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.",
    question: "Can I use HeroUI Pro in open source projects?",
  },
  {
    answer:
      "Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.",
    question: "Can I use HeroUI Pro for commercial projects?",
  },
  {
    answer:
      "Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl. Ornare imperdiet amet lorem adipiscing.",
    question: "Do I need to purchase a license for each project I work on?",
  },
];

export default function FaqSection() {
  return (
    <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20">
      <p className="text-center text-base leading-[normal] font-medium text-accent">FAQs</p>
      <div className="font-heading mt-2 text-center text-[48px] leading-[normal] tracking-[-0.72px] whitespace-nowrap text-foreground">
        <p className="mb-0">Frequently asked</p>
        <p className="text-foreground/60">questions</p>
      </div>

      <div className="mt-10 w-full max-w-lg">
        <Accordion className="w-full">
          {faqItems.map((item, index) => (
            <Accordion.Item key={index}>
              <Accordion.Heading>
                <Accordion.Trigger className="text-sm font-medium">
                  {item.question}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-xs text-muted">{item.answer}</Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
