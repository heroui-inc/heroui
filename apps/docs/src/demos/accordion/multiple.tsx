"use client";

import {
  Accordion,
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@heroui/react";

export function Multiple() {
  return (
    <Accordion allowsMultipleExpanded className="w-full max-w-md">
      <AccordionItem>
        <AccordionHeading>
          <AccordionTrigger>
            Getting Started
            <AccordionIndicator />
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            Learn the basics of HeroUI and how to integrate it into your React project. This section
            covers installation, setup, and your first component.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeading>
          <AccordionTrigger>
            Core Concepts
            <AccordionIndicator />
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            Understand the fundamental concepts behind HeroUI, including the compound component
            pattern, styling with Tailwind CSS, and accessibility features.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeading>
          <AccordionTrigger>
            Advanced Usage
            <AccordionIndicator />
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            Explore advanced features like custom variants, theme customization, and integration
            with other libraries in your React ecosystem.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <AccordionHeading>
          <AccordionTrigger>
            Best Practices
            <AccordionIndicator />
          </AccordionTrigger>
        </AccordionHeading>
        <AccordionPanel>
          <AccordionBody>
            Follow our recommended best practices for building performant, accessible, and
            maintainable applications with HeroUI components.
          </AccordionBody>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
