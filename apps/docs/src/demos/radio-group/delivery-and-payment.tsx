"use client";

import {
  Description,
  Label,
  Radio,
  RadioContent,
  RadioControl,
  RadioGroup,
  RadioIndicator,
} from "@heroui/react";
import {Icon} from "@iconify/react";
import clsx from "clsx";

export function DeliveryAndPayment() {
  const deliveryOptions = [
    {
      description: "4-10 business days",
      price: "$5.00",
      title: "Standard",
      value: "standard",
    },
    {
      description: "2-5 business days",
      price: "$16.00",
      title: "Express",
      value: "express",
    },
    {
      description: "1 business day",
      price: "$25.00",
      title: "Super Fast",
      value: "super-fast",
    },
  ];

  const paymentOptions = [
    {
      description: "Exp. on 01/2026",
      icon: "uim:master-card",
      title: "**** 8304",
      value: "mastercard",
    },
    {
      description: "Exp. on 01/2026",
      icon: "streamline-logos:visa-logo-solid",
      title: "**** 0123",
      value: "visa",
    },
    {
      description: "Pay with PayPal",
      icon: "ic:baseline-paypal",
      title: "PayPal",
      value: "paypal",
    },
  ];

  return (
    <div
      className="flex w-full flex-col items-center gap-10"
      style={{
        // @ts-expect-error - Overrides default variables
        "--accent": "#006FEE",
        "--accent-foreground": "#fff",
        "--accent-hover": "#006FEE",
        "--border-width": "2px",
        "--border-width-field": "2px",
        "--focus": "#006FEE",
      }}
    >
      <section className="flex w-full max-w-lg flex-col gap-4">
        <RadioGroup defaultValue="express" name="delivery">
          <Label>Delivery method</Label>
          <div className="grid gap-x-4 md:grid-cols-3">
            {deliveryOptions.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className={clsx(
                  "bg-surface-2 data-[selected=true]:border-accent data-[selected=true]:bg-accent/10 group relative flex-col gap-4 rounded-md border border-transparent px-5 py-4 transition-all",
                  "data-[focus-visible=true]:border-accent data-[focus-visible=true]:bg-accent/10",
                )}
              >
                <RadioControl className="absolute right-4 top-3 size-5">
                  <RadioIndicator />
                </RadioControl>
                <RadioContent className="flex flex-col gap-6">
                  <div className="flex flex-col gap-1">
                    <Label>{option.title}</Label>
                    <Description>{option.description}</Description>
                  </div>
                  <span className="text-sm font-semibold">{option.price}</span>
                </RadioContent>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </section>
      <section className="flex w-full max-w-lg flex-col gap-4">
        <RadioGroup defaultValue="visa" name="payment">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Label>Payment method</Label>
          </div>
          <div className="grid gap-x-4 md:grid-cols-2">
            {paymentOptions.map((option) => (
              <Radio
                key={option.value}
                value={option.value}
                className={clsx(
                  "bg-surface-2 group relative flex-col gap-4 rounded-md border border-transparent px-5 py-4 transition-all",
                  "data-[selected=true]:border-accent data-[selected=true]:bg-accent/10",
                )}
              >
                <RadioControl className="absolute right-4 top-3 size-5">
                  <RadioIndicator />
                </RadioControl>
                <RadioContent className="flex flex-row items-start justify-start gap-4">
                  <Icon className="size-6" icon={option.icon} />
                  <div className="flex flex-col gap-1">
                    <Label>{option.title}</Label>
                    <Description>{option.description}</Description>
                  </div>
                </RadioContent>
              </Radio>
            ))}
          </div>
        </RadioGroup>
      </section>
    </div>
  );
}
