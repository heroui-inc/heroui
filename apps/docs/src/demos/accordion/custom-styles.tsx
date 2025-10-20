"use client";

import {
  AccordionBody,
  AccordionHeading,
  AccordionIndicator,
  AccordionItem,
  AccordionPanel,
  AccordionRoot,
  AccordionTrigger,
  cn,
} from "@heroui/react";
import {Icon} from "@iconify/react";

const items = [
  {
    content: "Stay informed about your account activity with real-time notifications. ",
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/bell-small.png",
    subtitle: "Receive account activity updates",
    title: "Set Up Notifications",
  },
  {
    content: "Enhance your browsing experience by installing our official browser extension",
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/compass-small.png",
    subtitle: "Connect you browser to your account",
    title: "Set up Browser Extension",
  },
  {
    content:
      "Begin your journey into the world of digital collectibles by creating your first NFT. ",
    iconUrl:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/mint-collective-small.png",
    subtitle: "Create your first collectible",
    title: "Mint Collectible",
  },
];

export function CustomStyles() {
  return (
    <AccordionRoot className="bg-surface-1/10 w-full max-w-md rounded-2xl" variant="outline">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          className={cn(
            "group/item",
            "first:[&_[data-slot=accordion-trigger]]:rounded-t-2xl", // First trigger we want to round the top
            "last:[&:not(:has([data-slot=accordion-trigger][aria-expanded='true']))_[data-slot=accordion-trigger]]:rounded-b-2xl", // Last trigger we want to round the bottom
          )}
        >
          <AccordionHeading>
            <AccordionTrigger className="hover:bg-surface-2 group flex items-center gap-2 transition-none">
              {item.iconUrl ? (
                <img
                  alt={item.title}
                  className="group-hover/item:scale-120 group-hover/item:-rotate-10 h-11 w-11 transition-[scale,rotate] duration-300 ease-out group-hover/item:drop-shadow-lg"
                  src={item.iconUrl}
                />
              ) : null}
              <div className="flex flex-col gap-0">
                <span className="font-medium leading-5">{item.title}</span>
                <span className="text-muted/80 font-normal leading-6">{item.subtitle}</span>
              </div>
              <AccordionIndicator className="text-muted/50 [&>svg]:size-4">
                <Icon icon="gravity-ui:chevron-down" />
              </AccordionIndicator>
            </AccordionTrigger>
          </AccordionHeading>
          <AccordionPanel>
            <AccordionBody className="text-muted/80">{item.content}</AccordionBody>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
}
