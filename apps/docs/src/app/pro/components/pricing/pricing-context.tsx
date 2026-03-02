"use client";

import type {Format} from "@number-flow/react";

import NumberFlow, {NumberFlowGroup} from "@number-flow/react";
import {createContext, useContext} from "react";

export const PricingModeContext = createContext(true);
export const PlanTypeContext = createContext<"individuals" | "teams">("individuals");

export const CURRENCY_FMT = {
  currency: "USD",
  style: "currency",
  trailingZeroDisplay: "stripIfInteger",
} as Format;

export type PlanPricing = {
  annual: {price: number; original: number; billed: number};
  perpetual: {price: number; original: number};
};

export const WEB_PRICING: PlanPricing = {
  annual: {billed: 199, original: 25, price: 16},
  perpetual: {original: 897, price: 599},
};

export const MOBILE_PRICING: PlanPricing = {
  annual: {billed: 249, original: 29, price: 20},
  perpetual: {original: 1047, price: 749},
};

export const SUPER_PRICING: PlanPricing = {
  annual: {billed: 349, original: 50, price: 29},
  perpetual: {original: 1797, price: 997},
};

export type TeamPlanPricing = {
  annual: {price: number; original: number};
  perpetual: {price: number; original: number};
};

export const TEAM_WEB_PRICING: TeamPlanPricing = {
  annual: {original: 399, price: 299},
  perpetual: {original: 1197, price: 899},
};

export const TEAM_MOBILE_PRICING: TeamPlanPricing = {
  annual: {original: 499, price: 399},
  perpetual: {original: 1497, price: 1199},
};

export const TEAM_SUPER_PRICING: TeamPlanPricing = {
  annual: {original: 749, price: 599},
  perpetual: {original: 2247, price: 1799},
};

export function AnimatedPrice({pricing}: {pricing: PlanPricing}) {
  const isAnnual = useContext(PricingModeContext);
  const price = isAnnual ? pricing.annual.price : pricing.perpetual.price;
  const original = isAnnual ? pricing.annual.original : pricing.perpetual.original;

  return (
    <NumberFlowGroup>
      <div className="flex items-baseline gap-[8px] leading-[normal] font-medium not-italic">
        <NumberFlow
          className="part-[suffix]:font-normal part-[suffix]:text-[#71717a] part-[suffix]:text-[0.75em] part-[suffix]:ml-[0.0625em] relative shrink-0 text-[32px] font-semibold text-[#18181b]"
          format={CURRENCY_FMT}
          style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
          suffix={isAnnual ? "/mo" : undefined}
          value={price}
        />
        <span className="relative shrink-0 opacity-30">
          <NumberFlow
            animated={false}
            className="text-[32px] text-[#18181b]"
            format={CURRENCY_FMT}
            style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
            value={original}
          />
          <span className="absolute top-1/2 right-0 left-0 h-[2px] bg-[#18181b]" />
        </span>
      </div>
    </NumberFlowGroup>
  );
}

export function BillingNote({pricing}: {pricing: PlanPricing}) {
  const isAnnual = useContext(PricingModeContext);

  return (
    <p className="text-[12px] leading-[1.34] font-medium text-[#71717a] not-italic">
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
      <div className="flex items-baseline gap-[8px] leading-[normal] font-medium not-italic">
        <NumberFlow
          className="relative shrink-0 text-[32px] font-semibold text-[#18181b]"
          format={CURRENCY_FMT}
          style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
          value={price}
        />
        <span className="relative shrink-0 opacity-30">
          <NumberFlow
            animated={false}
            className="text-[32px] text-[#18181b]"
            format={CURRENCY_FMT}
            style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
            value={original}
          />
          <span className="absolute top-1/2 right-0 left-0 h-[2px] bg-[#18181b]" />
        </span>
      </div>
    </NumberFlowGroup>
  );
}

export function TeamBillingNote() {
  const isAnnual = useContext(PricingModeContext);

  return (
    <p className="text-[12px] leading-[1.34] font-medium text-[#71717a] not-italic">
      {isAnnual ? "Billed annually per seat" : "One-time payment per seat"}
    </p>
  );
}
