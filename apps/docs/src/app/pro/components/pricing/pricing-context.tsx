"use client";

import type {AllPrices} from "../../lib/stripe-prices";
import type {Format} from "@number-flow/react";

import NumberFlow, {NumberFlowGroup} from "@number-flow/react";
import {createContext, useContext} from "react";

export const PricingModeContext = createContext(true);
export const PlanTypeContext = createContext<"individuals" | "teams">("individuals");
export const PricingDataContext = createContext<AllPrices | null>(null);

export const CURRENCY_FMT = {
  currency: "USD",
  style: "currency",
  trailingZeroDisplay: "stripIfInteger",
} as Format;

export type PlanPricing = {
  annual: {price: number; original: number; billed: number};
  perpetual: {price: number; original: number};
};

export type TeamPlanPricing = {
  annual: {price: number; original: number; billed: number};
  perpetual: {price: number; original: number};
};

export function AnimatedPrice({pricing}: {pricing: PlanPricing}) {
  const isAnnual = useContext(PricingModeContext);
  const price = isAnnual ? pricing.annual.price : pricing.perpetual.price;
  const original = isAnnual ? pricing.annual.original : pricing.perpetual.original;

  return (
    <NumberFlowGroup>
      <div className="flex items-baseline gap-2 leading-[normal] font-medium">
        <NumberFlow
          className="part-[suffix]:font-normal part-[suffix]:text-muted part-[suffix]:text-[0.75em] part-[suffix]:ml-[0.0625em] relative shrink-0 text-[2rem] font-semibold text-foreground"
          format={CURRENCY_FMT}
          style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
          suffix={isAnnual ? "/mo" : undefined}
          value={price}
        />
        <span className="relative shrink-0 opacity-30">
          <NumberFlow
            animated={false}
            className="text-[2rem] text-foreground"
            format={CURRENCY_FMT}
            style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
            value={original}
          />
          <span className="absolute top-1/2 right-0 left-0 h-0.5 bg-foreground" />
        </span>
      </div>
    </NumberFlowGroup>
  );
}

export function BillingNote({pricing}: {pricing: PlanPricing}) {
  const isAnnual = useContext(PricingModeContext);

  return (
    <p className="text-xs leading-[1.34] font-medium text-muted">
      {isAnnual ? `Billed annually at $${pricing.annual.billed}` : "One-time payment"}
    </p>
  );
}

export function TeamAnimatedPrice({pricing}: {pricing: TeamPlanPricing}) {
  const isAnnual = useContext(PricingModeContext);
  const price = isAnnual ? pricing.annual.price : pricing.perpetual.price;
  const original = isAnnual ? pricing.annual.original : pricing.perpetual.original;

  return (
    <NumberFlowGroup>
      <div className="flex items-baseline gap-2 leading-[normal] font-medium">
        <NumberFlow
          className="part-[suffix]:font-normal part-[suffix]:text-muted part-[suffix]:text-[0.75em] part-[suffix]:ml-[0.0625em] relative shrink-0 text-[2rem] font-semibold text-foreground"
          format={CURRENCY_FMT}
          style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
          suffix={isAnnual ? "/mo" : undefined}
          value={price}
        />
        <span className="relative shrink-0 opacity-30">
          <NumberFlow
            animated={false}
            className="text-[2rem] text-foreground"
            format={CURRENCY_FMT}
            style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
            value={original}
          />
          <span className="absolute top-1/2 right-0 left-0 h-0.5 bg-foreground" />
        </span>
      </div>
    </NumberFlowGroup>
  );
}

export function TeamBillingNote({pricing}: {pricing: TeamPlanPricing}) {
  const isAnnual = useContext(PricingModeContext);

  return (
    <p className="text-xs leading-[1.34] font-medium text-muted">
      {isAnnual
        ? `Billed annually at $${pricing.annual.billed} per seat`
        : "One-time payment per seat"}
    </p>
  );
}

export function usePricingData(): AllPrices {
  const ctx = useContext(PricingDataContext);

  if (!ctx) {
    throw new Error("usePricingData must be used within a PricingDataContext.Provider");
  }

  return ctx;
}
