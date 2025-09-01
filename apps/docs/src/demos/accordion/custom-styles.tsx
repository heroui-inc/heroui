"use client";

import {Accordion, cn} from "@heroui/react";
import {Icon} from "@iconify/react";

const items = [
  {
    content:
      "Stay informed about your account activity with real-time notifications. You'll receive instant alerts for important events like transactions, new messages, security updates, and system announcements. ",
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/bell-small.png",
    subtitle: "Receive account activity updates",
    title: "Set Up Notifications",
  },
  {
    content:
      "Enhance your browsing experience by installing our official browser extension. The extension provides seamless integration with your account, allowing you to receive notifications directly in your browser, quickly access your dashboard, and interact with web3 applications securely. Compatible with Chrome, Firefox, Edge, and Brave browsers.",
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/compass-small.png",
    subtitle: "Connect you browser to your account",
    title: "Set up Browser Extension",
  },
  {
    content:
      "Begin your journey into the world of digital collectibles by creating your first NFT. Our intuitive minting process guides you through uploading your artwork, setting metadata, choosing royalty percentages, and deploying to the blockchain. Whether you're an artist, creator, or collector, you'll find all the tools you need to bring your digital assets to life. Your collectibles are stored on IPFS for permanent decentralized storage.",
    iconUrl:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/mint-collective-small.png",
    subtitle: "Create your first collectible",
    title: "Mint Collectible",
  },
];

export function CustomStyles() {
  return (
    <Accordion className="bg-surface-1 w-full max-w-md rounded-2xl" variant="outline">
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          className={cn(
            "group/item",
            "first:[&_[data-accordion-trigger]]:rounded-t-2xl", // First trigger we want to round the top
            "last:[&:not(:has([data-accordion-trigger][aria-expanded='true']))_[data-accordion-trigger]]:rounded-b-2xl", // Last trigger we want to round the bottom
          )}
        >
          <Accordion.Heading>
            <Accordion.Trigger className="hover:bg-surface-2 group flex items-center gap-2 transition-none">
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
              <Accordion.Indicator className="text-muted/50 [&>svg]:size-4">
                <Icon icon="gravity-ui:chevron-down" />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="text-muted/80">{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
