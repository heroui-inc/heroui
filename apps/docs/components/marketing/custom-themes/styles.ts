import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

export const shopCartStyles = tv({
  slots: {
    wrapper: "overflow-visible h-auto lg:h-[240px] dark:border-transparent",
    imageWrapper: [
      "flex-none",
      "w-full",
      "sm:w-48",
      "h-48",
      "mb-6",
      "sm:mb-0",
      "relative",
      "z-10",
      "before:absolute",
      "before:top-0",
      "before:left-0",
      "before:w-full",
      "before:h-full",
      "before:bg-linear-to-br",
      "transition-all",
      "ease-soft-spring!",
      "duration-500!",
      "will-change-auto",
      "before:transition-all",
    ],
    img: [
      "object-[45%_50%]",
      "sm:scale-125",
      "absolute",
      "z-10",
      "top-2",
      "sm:left-2",
      "inset-0",
      "w-full",
      "h-full",
      "object-cover",
      "rounded-lg",
      "transition-all",
      "will-change-auto",
      "ease-soft-spring!",
      "duration-300!",
    ],
    contentWrapper: "flex flex-col justify-center transition-all h-full min-h-[200px]",
    title: ["relative", "w-full", "flex-none", "text-xl", "font-semibold", "text-foreground"],
    description: ["my-2", "w-full", "text-base", "text-default-500"],
    price: "relative text-lg font-semibold text-foreground",
    previousPrice: "relative line-through font-semibold text-default-400 ml-3",
    percentOff: "relative font-normal text-success ml-3",
    sizeOption: [
      "w-8",
      "h-8",
      "flex",
      "m-0",
      "justify-center",
      "items-center",
      "text-sm",
      "rounded-full",
      // focus ring
      "group-data-[focus-visible=true]:outline-solid outline-transparent",
      "group-data-[focus-visible=true]:ring-2",
      "group-data-[focus-visible=true]:ring-focus",
      "group-data-[focus-visible=true]:ring-offset-2",
      "group-data-[focus-visible=true]:ring-offset-background",
    ],
    sizeOptionLabel: "text-sm font-semibold text-inherit",
    buyButton: ["text-sm", "font-normal"],
    addToBagButton: ["text-sm", "font-normal"],
    starButton: "absolute top-3 right-3 text-default-400 data-[liked=true]:text-warning",
    learnMoreButton: "max-w-fit",
  },
  variants: {
    theme: {
      heroui: {
        card: "py-5",
        imageWrapper: ["before:rounded-2xl", "before:from-[#010187] before:to-[#18000E]"],
        sizeOption: [
          "group-data-[selected=true]:bg-primary",
          "group-data-[selected=true]:text-primary-foreground",
        ],
        learnMoreButton: "bg-primary/20 text-primary",
      },
      modern: {
        wrapper: "rounded-3xl",
        contentWrapper: "ml-3",
        imageWrapper: [
          "lg:scale-[1.3]",
          "before:rounded-3xl",
          "before:from-[#870172] before:to-[#18000E]",
          "shadow-lg rounded-3xl",
        ],
        img: "sm:scale-90 sm:left-0",
        title: "text-2xl",
        description: "text-sm",
        sizeOption: [
          "group-data-[selected=true]:bg-secondary",
          "group-data-[selected=true]:text-secondary-foreground",
          "group-data-[focus-visible=true]:ring-secondary",
        ],
        percentOff: "text-pink-500",
        buyButton: [
          "bg-secondary",
          "text-sm",
          "font-normal",
          "rounded-full",
          "data-[focus-visible=true]:ring-secondary",
        ],
        addToBagButton: [
          "border-secondary",
          "text-secondary",
          "text-sm",
          "font-normal",
          "rounded-full",
          "data-[focus-visible=true]:ring-secondary",
        ],
        learnMoreButton: "bg-secondary/20 text-secondary",
      },
      elegant: {
        wrapper: "rounded-sm",
        contentWrapper: "ml-3",
        imageWrapper: [
          "lg:scale-[1.3]",
          "before:rounded-sm",
          "before:from-[#323232] before:to-[#000000]",
          "shadow-xl",
        ],
        img: "sm:scale-75 sm:left-0 saturate-0",
        title: "text-xl font-mono font-thin",
        description: "text-sm font-mono font-light",
        sizeOption: [
          "rounded-sm w-7 h-7",
          "group-data-[selected=true]:bg-foreground",
          "group-data-[selected=true]:text-background",
          "group-data-[focus-visible=true]:ring-foreground",
        ],
        sizeOptionLabel: "font-normal",
        price: "font-mono font-thin",
        previousPrice: "font-mono font-light ml-2",
        percentOff: "text-default-500 font-mono text-sm",
        buyButton: [
          "bg-foreground",
          "text-background",
          "text-sm",
          "font-normal",
          "rounded-sm",
          "data-[focus-visible=true]:ring-foreground",
        ],
        addToBagButton: [
          "border-foreground",
          "text-foreground",
          "text-sm",
          "font-normal",
          "rounded-sm",
          "data-[focus-visible=true]:ring-foreground",
        ],
        learnMoreButton: "bg-foreground/10 text-foreground",
      },
      retro: {
        wrapper: "bg-[#F4E8D1] dark:bg-[#E1CA9E] rounded-sm",
        contentWrapper: "ml-3",
        imageWrapper: [
          "before:rounded-none",
          "before:from-[#FFD34E] before:to-[#EE457E]",
          "before:shadow-md",
          "after:-z-10",
          "after:absolute",
          "after:top-2",
          "after:left-2",
          "after:w-full",
          "after:h-full",
          "after:bg-[#FFD34E]",
        ],
        img: "sm:scale-125",
        title: "text-xl uppercase text-black",
        description: "text-[0.7rem] uppercase text-black",
        sizeOption: [
          "text-black/80",
          "group-data-[selected=true]:bg-[#EE457E]",
          "group-data-[selected=true]:text-white",
          "group-data-[focus-visible=true]:ring-[#EE457E]",
          "group-data-[focus-visible=true]:ring-offset-[#F4E8D1]",
          "dark:group-data-[focus-visible=true]:ring-offset-[#F4E8D1]",
        ],
        price: "text-black",
        previousPrice: "text-black/60 ml-2",
        percentOff: "text-black/40 font-mono text-sm",
        buyButton: [
          "bg-[#FFD34E]",
          "text-black",
          "font-medium",
          "uppercase",
          "text-sm",
          "rounded-sm",
          "data-[focus-visible=true]:ring-[#EE457E]",
          "data-[focus-visible=true]:ring-offset-[#F4E8D1]",
          "dark:data-[focus-visible=true]:ring-offset-[#F4E8D1]",
        ],
        addToBagButton: [
          "border-[#FFD34E]",
          "text-black",
          "uppercase",
          "font-medium",
          "text-sm",
          "rounded-sm",
          "data-[focus-visible=true]:ring-[#EE457E]",
          "data-[focus-visible=true]:ring-offset-[#F4E8D1]",
          "dark:data-[focus-visible=true]:ring-offset-[#F4E8D1]",
        ],
        learnMoreButton: "bg-warning/20 text-warning",
      },
    },
  },
  defaultVariants: {
    theme: "heroui",
  },
});

export type ShopCartProps = VariantProps<typeof shopCartStyles>;
