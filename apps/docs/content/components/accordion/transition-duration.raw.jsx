import {Accordion, AccordionItem} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Fast Transition (150ms)</h3>
        <Accordion transitionDuration={150}>
          <AccordionItem key="1" aria-label="Accordion 1" title="Fast Animation">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Default Transition (300ms)</h3>
        <Accordion>
          <AccordionItem key="1" aria-label="Accordion 1" title="Default Animation">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Slow Transition (800ms)</h3>
        <Accordion transitionDuration={800}>
          <AccordionItem key="1" aria-label="Accordion 1" title="Slow Animation">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Very Slow Transition (1200ms)</h3>
        <Accordion transitionDuration={1200}>
          <AccordionItem key="1" aria-label="Accordion 1" title="Very Slow Animation">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
            {defaultContent}
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
            {defaultContent}
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
