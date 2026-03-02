import type {Metadata} from "next";

import Link from "next/link";

import {HeroUILogo} from "@/components/heroui-logo";

import DottedHeroUILogo from "./components/dotted-heroui-logo";
import FaqAccordion from "./components/faq-accordion";
import FeaturesShowcase from "./components/features-showcase";
import {ClaimButton, DarkMembershipCard} from "./components/footer-cta";
import {
  Countdown,
  DesktopMockup,
  HeroHeading,
  MobileMockup,
  PreOrderButton,
  StyleSelector,
} from "./components/hero-section";
import {BlueMembershipCard, OrangeMembershipCard} from "./components/membership-cards";
import PricingSection from "./components/pricing";

export const dynamic = "force-static";
export const revalidate = false;

export const metadata: Metadata = {
  description:
    "HeroUI Pro — AI tools, templates, and a refined UI system so your product looks right from day zero.",
  title: "HeroUI Pro",
};

export default function ProContent() {
  return (
    <main className="flex w-full flex-col items-center overflow-clip">
      {/* Hero Section */}
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <HeroUILogo />
        <div className="flex items-center gap-4">
          <Link className="text-base font-medium text-muted" href="/docs">
            Start for free
          </Link>
          <PreOrderButton />
        </div>
      </header>

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

      <p className="mt-16 w-full max-w-lg px-6 text-center text-base leading-[normal] font-medium whitespace-pre-wrap text-muted">
        Beautiful components for React and React Native, advanced AI tools, and ready-made
        templates. It's a refined UI system that makes your product look right from day zero.
      </p>

      {/* Below-fold sections (dynamically loaded) */}
      <FeaturesShowcase />
      <PricingSection />
      <FaqAccordion />

      {/* CTA Section */}
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-20">
        <p className="text-center text-base leading-[normal] font-medium text-accent">Join us</p>
        <div className="font-heading mt-2 text-center text-[48px] leading-[normal] tracking-[-0.72px] whitespace-nowrap text-foreground">
          <p className="mb-0">Claim your hero license</p>
          <p className="text-foreground/60">before it&apos;s late</p>
        </div>

        {/* Stacked membership cards */}
        <div className="relative mt-10 h-[480px] w-[400px]">
          <div className="absolute top-1/2 left-1/2 z-0 -translate-x-[65%] -translate-y-1/2 -rotate-2">
            <BlueMembershipCard />
          </div>
          <div className="absolute top-1/2 left-1/2 z-0 -translate-x-[35%] -translate-y-1/2 rotate-[3.78deg]">
            <OrangeMembershipCard />
          </div>
          <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <DarkMembershipCard />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-6">
        <p className="text-center text-xs leading-[1.34] font-normal text-muted">
          Junior claimed 24 mins ago
        </p>
        <ClaimButton />
        <p className="text-center text-xs leading-[1.34] font-medium text-muted">
          <Countdown />
        </p>
        <p className="text-center text-xs leading-[1.34] font-normal text-muted">
          &copy; 2026 NextUI Inc. All rights reserved.
        </p>
      </footer>

      {/* Dotted logo - full width, clipped at bottom */}
      <div className="mx-auto mt-4 max-h-[200px] w-full max-w-5xl overflow-hidden">
        <DottedHeroUILogo />
      </div>
    </main>
  );
}
