import {Accordion, AccordionItem, Button} from "@heroui/react";

export default function App() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div className="w-full grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>Without Scroll on Open</h3>
        <div className="h-64 overflow-auto p-4 border rounded-lg">
          <div className="mb-32">
            <p className="mb-4 text-sm text-gray-600">
              Scroll down to see the accordion. When you expand items, they won&apos;t automatically
              scroll into view.
            </p>
          </div>
          <Accordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Regular Accordion Item">
              <div className="p-2">
                <p className="mb-4">{defaultContent}</p>
                <Button color="primary" size="sm">
                  This content might be out of view
                </Button>
              </div>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Another Item">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Third Item">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
        <h3>With Scroll on Open</h3>
        <div className="h-64 overflow-auto p-4 border rounded-lg">
          <div className="mb-32">
            <p className="mb-4 text-sm text-gray-600">
              Scroll down to see the accordion. When you expand items, they will automatically
              scroll into view.
            </p>
          </div>
          <Accordion scrollOnOpen>
            <AccordionItem key="1" aria-label="Accordion 1" title="Auto-Scroll Accordion Item">
              <div className="p-2">
                <p className="mb-4">{defaultContent}</p>
                <Button color="primary" size="sm">
                  This will be scrolled into view
                </Button>
              </div>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Another Auto-Scroll Item">
              {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Third Auto-Scroll Item">
              {defaultContent}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
