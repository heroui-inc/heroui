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

export function Disabled() {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="w-full max-w-md space-y-2">
        <h3 className="text-muted text-sm font-medium">Entire accordion disabled</h3>
        <Accordion isDisabled className="w-full max-w-md">
          <AccordionItem>
            <AccordionHeading>
              <AccordionTrigger>
                Disabled Item 1
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>
                This content cannot be accessed when the accordion is disabled.
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeading>
              <AccordionTrigger>
                Disabled Item 2
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>
                This content cannot be accessed when the accordion is disabled.
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="w-full max-w-md space-y-2">
        <h3 className="text-muted text-sm font-medium">Individual items disabled</h3>
        <Accordion className="w-full max-w-md">
          <AccordionItem>
            <AccordionHeading>
              <AccordionTrigger>
                Active Item
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>This item is active and can be toggled normally.</AccordionBody>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem isDisabled>
            <AccordionHeading>
              <AccordionTrigger>
                Disabled Item
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>
                This content cannot be accessed when the item is disabled.
              </AccordionBody>
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeading>
              <AccordionTrigger>
                Another Active Item
                <AccordionIndicator />
              </AccordionTrigger>
            </AccordionHeading>
            <AccordionPanel>
              <AccordionBody>This item is also active and can be toggled.</AccordionBody>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
