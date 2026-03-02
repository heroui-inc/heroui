"use client";

import {Tabs} from "@heroui/react";
import {useState} from "react";

import MobileHeroPricingCard from "./cards/mobile-hero-pricing-card";
import SuperHeroPricingCard from "./cards/super-hero-pricing-card";
import WebHeroPricingCard from "./cards/web-hero-pricing-card";
import {EnterpriseSection} from "./enterprise-section";
import {PlanTypeContext, PricingModeContext} from "./pricing-context";
import {PricingSwitch} from "./pricing-switch";

function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedTab, setSelectedTab] = useState<"individuals" | "teams">("individuals");
  const isTeams = selectedTab === "teams";

  return (
    <PricingModeContext.Provider value={isAnnual}>
      <PlanTypeContext.Provider value={selectedTab}>
        <div className="flex flex-col items-center gap-8 px-6 py-20" data-name="pricing - annual">
          {/* Header */}
          <p className="text-center text-[16px] leading-[normal] font-medium text-[#0485f7] not-italic">
            Pricing
          </p>
          <div className="font-heading -mt-4 text-center text-[48px] leading-[normal] tracking-[-0.72px] whitespace-nowrap text-[#18181b] not-italic">
            <p className="mb-0">Become a hero early</p>
            <p className="text-[rgba(24,24,27,0.6)]">at a better price</p>
          </div>

          {/* Controls row */}
          <div className="flex w-full max-w-[1008px] items-center justify-between">
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
          <p className="-mt-4 max-w-[500px] text-center font-['Inter',sans-serif] text-[14px] leading-[1.43] font-normal whitespace-pre-wrap text-[#71717a] not-italic">
            <span className="leading-[1.43] font-medium text-[#18181b]">Note:</span>
            <span className="leading-[1.43]">{` if you're a HeroUI v2 Pro customer, you're eligible for an upgrade discount, check your email or contact support.`}</span>
          </p>
        </div>
      </PlanTypeContext.Provider>
    </PricingModeContext.Provider>
  );
}

export default PricingSection;
