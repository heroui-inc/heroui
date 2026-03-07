import type {PlanPricing, TeamPlanPricing} from "../components/pricing/pricing-context";

import {env} from "~env";

const ORIGINAL_PRICES = {
  mobile: 299,
  super: 399,
  teamMobile: 299,
  teamSuper: 399,
  teamWeb: 199,
  web: 199,
};

export type Discount = {
  label: string;
  percent: number;
  teamPercent?: number;
};

export type PlanPricingWithRenewal = PlanPricing & {renewal: number};
export type TeamPlanPricingWithRenewal = TeamPlanPricing & {renewal: number};

export type AllPrices = {
  discount: Discount | null;
  mobile: PlanPricingWithRenewal;
  super: PlanPricingWithRenewal;
  teamMobile: TeamPlanPricingWithRenewal;
  teamSuper: TeamPlanPricingWithRenewal;
  teamWeb: TeamPlanPricingWithRenewal;
  web: PlanPricingWithRenewal;
};

type PlanPriceResponse = {
  discountUnitAmount: number | null;
  licenseType: string;
  plan: string;
  planId: string;
  renewalUnitAmount: number | null;
  unitAmount: number | null;
};

type PricesApiResponse = {
  discount: Discount | null;
  plans: PlanPriceResponse[];
};

const EMPTY_RESPONSE: PricesApiResponse = {discount: null, plans: []};

async function fetchPricesApi(): Promise<PricesApiResponse> {
  if (!env.DASHBOARD_API_URL) {
    return EMPTY_RESPONSE;
  }

  try {
    const res = await fetch(`${env.DASHBOARD_API_URL}/api/prices`, {
      next: {revalidate: 3600},
    });

    if (!res.ok) {
      console.warn(`Failed to fetch plan prices (HTTP ${res.status}), using fallback prices`);

      return EMPTY_RESPONSE;
    }

    return (await res.json()) as PricesApiResponse;
  } catch (error) {
    console.warn("Failed to fetch plan prices, using fallback prices:", error);

    return EMPTY_RESPONSE;
  }
}

function cents(amount: number | null): number {
  return amount != null ? amount / 100 : 0;
}

function fallbackRenewal(originalDollars: number): number {
  return Math.round(originalDollars / 3 / 10) * 10 - 1;
}

function buildPlanPricing(
  plan: PlanPriceResponse | undefined,
  fallback: number,
): PlanPricingWithRenewal {
  const original = cents(plan?.unitAmount ?? null) || fallback;
  const price = cents(plan?.discountUnitAmount ?? null) || original;
  const renewal = cents(plan?.renewalUnitAmount ?? null) || fallbackRenewal(fallback);

  return {original, price, renewal};
}

function buildTeamPlanPricing(
  plan: PlanPriceResponse | undefined,
  fallback: number,
): TeamPlanPricingWithRenewal {
  const original = cents(plan?.unitAmount ?? null) || fallback;
  const price = cents(plan?.discountUnitAmount ?? null) || original;
  const renewal = cents(plan?.renewalUnitAmount ?? null) || fallbackRenewal(fallback);

  return {original, price, renewal};
}

export async function fetchAllPrices(): Promise<AllPrices> {
  const body = await fetchPricesApi();

  const plans = new Map<string, PlanPriceResponse>();

  for (const p of body.plans ?? []) {
    plans.set(p.planId, p);
  }

  const rawDiscount = body.discount;
  const discount = rawDiscount
    ? {
        ...rawDiscount,
        teamPercent: rawDiscount.teamPercent ?? rawDiscount.percent,
      }
    : null;

  return {
    discount,
    mobile: buildPlanPricing(plans.get("mobile-hero"), ORIGINAL_PRICES.mobile),
    super: buildPlanPricing(plans.get("super-hero"), ORIGINAL_PRICES.super),
    teamMobile: buildTeamPlanPricing(plans.get("mobile-heroes"), ORIGINAL_PRICES.teamMobile),
    teamSuper: buildTeamPlanPricing(plans.get("super-heroes"), ORIGINAL_PRICES.teamSuper),
    teamWeb: buildTeamPlanPricing(plans.get("web-heroes"), ORIGINAL_PRICES.teamWeb),
    web: buildPlanPricing(plans.get("web-hero"), ORIGINAL_PRICES.web),
  };
}
