"use client";

import {Accordion} from "@heroui/react";

export function Multiple() {
  return (
    <Accordion.Root allowsMultipleExpanded className="w-full max-w-md">
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Getting Started
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            Learn the basics of HeroUI and how to integrate it into your React project. This section
            covers installation, setup, and your first component.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Core Concepts
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            Understand the fundamental concepts behind HeroUI, including the compound component
            pattern, styling with Tailwind CSS, and accessibility features.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Advanced Usage
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            Explore advanced features like custom variants, theme customization, and integration
            with other libraries in your React ecosystem.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>

      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            Best Practices
            <Accordion.Indicator />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            Follow our recommended best practices for building performant, accessible, and
            maintainable applications with HeroUI components.
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion.Root>
  );
}
