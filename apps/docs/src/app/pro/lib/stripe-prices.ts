import type {PlanPricing, TeamPlanPricing} from "../components/pricing/pricing-context";

import {env} from "~env";

const ORIGINAL_PRICES = {
  mobile: 399,
  super: 499,
  teamMobile: 349,
  teamSuper: 449,
  teamWeb: 249,
  web: 299,
};

export type Discount = {
  label: string;
  percent: number;
  teamPercent?: number;
};

export type AllPrices = {
  discount: Discount | null;
  mobile: PlanPricing;
  renewal: {individual: number; team: number};
  super: PlanPricing;
  teamMobile: TeamPlanPricing;
  teamSuper: TeamPlanPricing;
  teamWeb: TeamPlanPricing;
  web: PlanPricing;
};

type PlanPriceResponse = {
  discountUnitAmount: number | null;
  licenseType: string;
  plan: string;
  planId: string;
  unitAmount: number | null;
};

type RenewalPriceResponse = {
  licenseType: string;
  unitAmount: number | null;
};

type PricesApiResponse = {
  discount: Discount | null;
  plans: PlanPriceResponse[];
  renewal?: RenewalPriceResponse[];
};

const EMPTY_RESPONSE: PricesApiResponse = {discount: null, plans: [], renewal: []};

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

function buildPlanPricing(plan: PlanPriceResponse | undefined, fallback: number): PlanPricing {
  const original = cents(plan?.unitAmount ?? null) || fallback;
  const price = cents(plan?.discountUnitAmount ?? null) || original;

  return {original, price};
}

function buildTeamPlanPricing(
  plan: PlanPriceResponse | undefined,
  fallback: number,
): TeamPlanPricing {
  const original = cents(plan?.unitAmount ?? null) || fallback;
  const price = cents(plan?.discountUnitAmount ?? null) || original;

  return {original, price};
}

export async function fetchAllPrices(): Promise<AllPrices> {
  const body = await fetchPricesApi();

  const plans = new Map<string, PlanPriceResponse>();

  for (const p of body.plans ?? []) {
    plans.set(p.planId, p);
  }

  const individualRenewal = body.renewal?.find((r) => r.licenseType === "individual");
  const teamRenewal = body.renewal?.find((r) => r.licenseType === "team");

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
    renewal: {
      individual: cents(individualRenewal?.unitAmount ?? null),
      team: cents(teamRenewal?.unitAmount ?? null),
    },
    super: buildPlanPricing(plans.get("super-hero"), ORIGINAL_PRICES.super),
    teamMobile: buildTeamPlanPricing(plans.get("mobile-heroes"), ORIGINAL_PRICES.teamMobile),
    teamSuper: buildTeamPlanPricing(plans.get("super-heroes"), ORIGINAL_PRICES.teamSuper),
    teamWeb: buildTeamPlanPricing(plans.get("web-heroes"), ORIGINAL_PRICES.teamWeb),
    web: buildPlanPricing(plans.get("web-hero"), ORIGINAL_PRICES.web),
  };
}
