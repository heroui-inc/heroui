"use client";

import type {AllPrices} from "../../lib/stripe-prices";

import {Tabs} from "@heroui/react";
import {useState} from "react";

import {Countdown} from "../countdown";

import MobileHeroPricingCard from "./cards/mobile-hero-pricing-card";
import SuperHeroPricingCard from "./cards/super-hero-pricing-card";
import WebHeroPricingCard from "./cards/web-hero-pricing-card";
import {EnterpriseSection} from "./enterprise-section";
import {PlanTypeContext, PricingDataContext, PricingModeContext} from "./pricing-context";
import {PricingSwitch} from "./pricing-switch";

function PricingSection({prices}: {prices: AllPrices}) {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"individuals" | "teams">("individuals");
  const isTeams = selectedTab === "teams";

  return (
    <PricingDataContext.Provider value={prices}>
      <PricingModeContext.Provider value={isAnnual}>
        <PlanTypeContext.Provider value={selectedTab}>
          <div className="flex flex-col items-center gap-4 px-6 py-20">
            {/* Header */}
            <p className="text-center text-base leading-[normal] font-medium text-accent">
              Pricing
            </p>
            <div className="font-heading text-center text-5xl leading-[normal] tracking-[-0.72px] whitespace-nowrap text-foreground">
              <p className="mb-0">Become a hero early</p>
              <p className="text-foreground/60">at a better price</p>
            </div>
            <p className="mt-2 text-center text-base leading-[normal] font-medium text-accent">
              <Countdown long />
            </p>

            {/* Controls row */}
            <div className="mt-4 flex w-full max-w-[1008px] items-center justify-between">
              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={(key) => setSelectedTab(key as "individuals" | "teams")}
              >
                <Tabs.ListContainer>
                  <Tabs.List aria-label="Plan type">
                    <Tabs.Tab id="individuals">
                      Individuals
                      <Tabs.Indicator />
                    </Tabs.Tab>
                    <Tabs.Tab className="whitespace-nowrap" id="teams">
                      Teams & Enterprise
                      <Tabs.Indicator />
                    </Tabs.Tab>
                  </Tabs.List>
                </Tabs.ListContainer>
              </Tabs>
              <PricingSwitch isAnnual={isAnnual} onChange={setIsAnnual} />
            </div>

            {/* Cards */}
            <div className="flex items-start justify-center gap-6">
              <WebHeroPricingCard />
              <MobileHeroPricingCard />
              <SuperHeroPricingCard />
            </div>

            {/* Enterprise section */}
            {!!isTeams && (
              <div className="w-full max-w-[1008px]">
                <EnterpriseSection />
              </div>
            )}

            {/* Footer */}
            <p className="mt-4 max-w-[500px] text-center font-sans text-sm leading-[1.43] font-normal whitespace-pre-wrap text-muted">
              <span className="font-medium text-foreground">Note:</span>
              <span>
                If you're a HeroUI v2 Pro customer, you're eligible for an upgrade discount, check
                your email or contact support.
              </span>
            </p>
          </div>
        </PlanTypeContext.Provider>
      </PricingModeContext.Provider>
    </PricingDataContext.Provider>
  );
}

export default PricingSection;
