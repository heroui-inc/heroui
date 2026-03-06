"use client";

import type {AllPrices} from "../../lib/stripe-prices";
import type {Format} from "@number-flow/react";

import NumberFlow, {NumberFlowGroup} from "@number-flow/react";
import {createContext, useContext} from "react";

import {env} from "~env";

export const PlanTypeContext = createContext<"individuals" | "teams">("individuals");
export const PricingDataContext = createContext<AllPrices | null>(null);

export const CURRENCY_FMT = {
  currency: "USD",
  style: "currency",
  trailingZeroDisplay: "stripIfInteger",
} as Format;

export type PlanPricing = {
  price: number;
  original: number;
};

export type TeamPlanPricing = {
  price: number;
  original: number;
};

export function AnimatedPrice({pricing}: {pricing: PlanPricing}) {
  return (
    <NumberFlowGroup>
      <div className="flex items-baseline gap-2 leading-[normal] font-medium">
        <NumberFlow
          className="part-[suffix]:font-normal part-[suffix]:text-muted part-[suffix]:text-[0.75em] part-[suffix]:ml-[0.0625em] relative shrink-0 text-[2rem] font-semibold text-foreground"
          format={CURRENCY_FMT}
          style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
          value={pricing.price}
        />
        <span className="relative shrink-0 opacity-30">
          <NumberFlow
            animated={false}
            className="text-[2rem] text-foreground"
            format={CURRENCY_FMT}
            style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
            value={pricing.original}
          />
          <span className="absolute top-1/2 right-0 left-0 h-0.5 bg-foreground" />
        </span>
      </div>
    </NumberFlowGroup>
  );
}

export function BillingNote() {
  return <p className="text-xs leading-[1.34] font-medium text-muted">One-time payment</p>;
}

export function TeamAnimatedPrice({pricing}: {pricing: TeamPlanPricing}) {
  return (
    <NumberFlowGroup>
      <div className="flex items-baseline gap-2 leading-[normal] font-medium">
        <NumberFlow
          className="part-[suffix]:font-normal part-[suffix]:text-muted part-[suffix]:text-[0.75em] part-[suffix]:ml-[0.0625em] relative shrink-0 text-[2rem] font-semibold text-foreground"
          format={CURRENCY_FMT}
          style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
          value={pricing.price}
        />
        <span className="relative shrink-0 opacity-30">
          <NumberFlow
            animated={false}
            className="text-[2rem] text-foreground"
            format={CURRENCY_FMT}
            style={{"--number-flow-char-height": "0.85em"} as React.CSSProperties}
            value={pricing.original}
          />
          <span className="absolute top-1/2 right-0 left-0 h-0.5 bg-foreground" />
        </span>
      </div>
    </NumberFlowGroup>
  );
}

export function TeamBillingNote() {
  return (
    <p className="text-xs leading-[1.34] font-medium text-muted">
      One-time payment per seat (Min 2 seats)
    </p>
  );
}

export function RenewalNote() {
  const planType = useContext(PlanTypeContext);
  const prices = usePricingData();
  const amount = planType === "teams" ? prices.renewal.team : prices.renewal.individual;

  if (!amount) return null;

  return (
    <div className="border-t border-default px-5 py-4">
      <p className="text-xs leading-[1.34] font-medium text-foreground">
        Optional renewal at ${amount}/yr{planType === "teams" ? "/seat" : ""}
      </p>
      <p className="mt-1 text-xs leading-[1.34] text-muted">
        Get another year of updates or keep using without renewing. No pressure.
      </p>
    </div>
  );
}

export function usePricingData(): AllPrices {
  const ctx = useContext(PricingDataContext);

  if (!ctx) {
    throw new Error("usePricingData must be used within a PricingDataContext.Provider");
  }

  return ctx;
}

export function getDashboardCheckoutUrl(planId: string): string {
  const base = env.NEXT_PUBLIC_DASHBOARD_URL;

  return `${base}/checkout?plan=${planId}`;
}
