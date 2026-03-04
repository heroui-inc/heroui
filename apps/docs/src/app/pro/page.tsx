import type {Metadata} from "next";

import {Countdown} from "./components/countdown";
import CtaSection from "./components/cta-section";
import FaqAccordion from "./components/faq-accordion";
import FeaturesShowcase from "./components/features-showcase";
import {DesktopMockup, HeroHeading, MobileMockup, StyleSelector} from "./components/hero-section";
import PricingSection from "./components/pricing";
import ProFooter from "./components/pro-footer";
import ProHeader from "./components/pro-header";
import {fetchAllPrices} from "./lib/stripe-prices";

export const revalidate = 3600;

export const metadata: Metadata = {
  description:
    "HeroUI Pro — AI tools, templates, and a refined UI system so your product looks right from day zero.",
  title: "HeroUI Pro",
};

export default async function ProPage() {
  const prices = await fetchAllPrices();

  return (
    <main className="flex w-full flex-col items-center overflow-clip">
      <ProHeader />

      <p className="mt-12 text-center text-base leading-[normal] font-medium text-accent">
        <Countdown />
      </p>

      <HeroHeading />

      {/* Mockup Placeholders */}
      <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col items-center gap-8 px-6">
        <DesktopMockup />
        <StyleSelector />
        <MobileMockup />
      </div>

      <FeaturesShowcase />
      <PricingSection prices={prices} />
      <FaqAccordion />

      <CtaSection />
      <ProFooter />
    </main>
  );
}
