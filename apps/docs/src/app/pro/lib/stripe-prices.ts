import type {PlanPricing, TeamPlanPricing} from "../components/pricing/pricing-context";

import {env} from "~env";

// Original (crossed-out) prices — marketing display only, not in Stripe
const ORIGINAL_PRICES = {
  mobile: {annual: 21, perpetual: 749},
  super: {annual: 29, perpetual: 997},
  teamMobile: {annual: 33, perpetual: 1199},
  teamSuper: {annual: 50, perpetual: 1799},
  teamWeb: {annual: 25, perpetual: 899},
  web: {annual: 17, perpetual: 599},
};

export type AllPrices = {
  mobile: PlanPricing;
  super: PlanPricing;
  teamMobile: TeamPlanPricing;
  teamSuper: TeamPlanPricing;
  teamWeb: TeamPlanPricing;
  web: PlanPricing;
};

type StripePrice = {
  id: string;
  unit_amount: number;
};

type StripeListResponse = {
  data: StripePrice[];
  has_more: boolean;
};

async function fetchStripePrices(): Promise<Map<string, number>> {
  if (!env.STRIPE_SECRET_KEY) {
    return new Map();
  }

  const priceIds = [
    env.STRIPE_PRICE_WEB_ANNUAL,
    env.STRIPE_PRICE_WEB_PERPETUAL,
    env.STRIPE_PRICE_MOBILE_ANNUAL,
    env.STRIPE_PRICE_MOBILE_PERPETUAL,
    env.STRIPE_PRICE_SUPER_ANNUAL,
    env.STRIPE_PRICE_SUPER_PERPETUAL,
    env.STRIPE_PRICE_TEAM_WEB_ANNUAL,
    env.STRIPE_PRICE_TEAM_WEB_PERPETUAL,
    env.STRIPE_PRICE_TEAM_MOBILE_ANNUAL,
    env.STRIPE_PRICE_TEAM_MOBILE_PERPETUAL,
    env.STRIPE_PRICE_TEAM_SUPER_ANNUAL,
    env.STRIPE_PRICE_TEAM_SUPER_PERPETUAL,
  ].filter((id): id is string => !!id);

  const params = new URLSearchParams({active: "true", limit: "100"});

  const res = await fetch(`https://api.stripe.com/v1/prices?${params}`, {
    headers: {Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`},
    next: {revalidate: 3600},
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch Stripe prices: ${res.status}`);
  }

  const json = (await res.json()) as StripeListResponse;

  const priceMap = new Map<string, number>();

  for (const price of json.data) {
    if (priceIds.includes(price.id)) {
      priceMap.set(price.id, price.unit_amount / 100);
    }
  }

  // Ensure all required prices were found
  for (const id of priceIds) {
    if (!priceMap.has(id)) {
      throw new Error(`Stripe price not found: ${id}`);
    }
  }

  return priceMap;
}

function getPrice(priceMap: Map<string, number>, priceId: string | undefined): number {
  if (!priceId) return 0;

  return priceMap.get(priceId) ?? 0;
}

function buildPlanPricing(
  annualAmount: number,
  perpetualAmount: number,
  originals: {annual: number; perpetual: number},
): PlanPricing {
  return {
    annual: {
      billed: annualAmount,
      original: originals.annual,
      price: Math.round(annualAmount / 12),
    },
    perpetual: {
      original: originals.perpetual,
      price: perpetualAmount,
    },
  };
}

function buildTeamPlanPricing(
  annualAmount: number,
  perpetualAmount: number,
  originals: {annual: number; perpetual: number},
): TeamPlanPricing {
  return {
    annual: {
      billed: annualAmount,
      original: originals.annual,
      price: Math.round(annualAmount / 12),
    },
    perpetual: {
      original: originals.perpetual,
      price: perpetualAmount,
    },
  };
}

export async function fetchAllPrices(): Promise<AllPrices> {
  const priceMap = await fetchStripePrices();

  return {
    mobile: buildPlanPricing(
      getPrice(priceMap, env.STRIPE_PRICE_MOBILE_ANNUAL),
      getPrice(priceMap, env.STRIPE_PRICE_MOBILE_PERPETUAL),
      ORIGINAL_PRICES.mobile,
    ),
    super: buildPlanPricing(
      getPrice(priceMap, env.STRIPE_PRICE_SUPER_ANNUAL),
      getPrice(priceMap, env.STRIPE_PRICE_SUPER_PERPETUAL),
      ORIGINAL_PRICES.super,
    ),
    teamMobile: buildTeamPlanPricing(
      getPrice(priceMap, env.STRIPE_PRICE_TEAM_MOBILE_ANNUAL),
      getPrice(priceMap, env.STRIPE_PRICE_TEAM_MOBILE_PERPETUAL),
      ORIGINAL_PRICES.teamMobile,
    ),
    teamSuper: buildTeamPlanPricing(
      getPrice(priceMap, env.STRIPE_PRICE_TEAM_SUPER_ANNUAL),
      getPrice(priceMap, env.STRIPE_PRICE_TEAM_SUPER_PERPETUAL),
      ORIGINAL_PRICES.teamSuper,
    ),
    teamWeb: buildTeamPlanPricing(
      getPrice(priceMap, env.STRIPE_PRICE_TEAM_WEB_ANNUAL),
      getPrice(priceMap, env.STRIPE_PRICE_TEAM_WEB_PERPETUAL),
      ORIGINAL_PRICES.teamWeb,
    ),
    web: buildPlanPricing(
      getPrice(priceMap, env.STRIPE_PRICE_WEB_ANNUAL),
      getPrice(priceMap, env.STRIPE_PRICE_WEB_PERPETUAL),
      ORIGINAL_PRICES.web,
    ),
  };
}
