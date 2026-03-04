"use client";

import {Button} from "@heroui/react";
import {useContext} from "react";

import {
  CentralizedBillingFeature,
  SharedThemesFeature,
  SlackFeature,
  UsageAnalyticsFeature,
} from "../enterprise-section";
import {
  AnimatedPrice,
  BillingNote,
  PlanTypeContext,
  PricingModeContext,
  TeamAnimatedPrice,
  TeamBillingNote,
  usePricingData,
} from "../pricing-context";

import {
  BrainIcon,
  BrushIcon,
  CommentsIcon,
  ComponentsIcon,
  FeatureRow,
  FigmaIcon,
  FloatingStars,
  HashtagIcon,
  HeroBadge,
  PaletteIcon,
  PlugConnectionIcon,
  SuperHeroBlueGradient,
  TemplatesIcon,
} from "./cards-svgs";

function SuperHeroCardHeader() {
  const isAnnual = useContext(PricingModeContext);
  const planType = useContext(PlanTypeContext);
  const isTeam = planType === "teams";
  const prices = usePricingData();

  const savings = isTeam
    ? isAnnual
      ? prices.teamWeb.annual.billed +
        prices.teamMobile.annual.billed -
        prices.teamSuper.annual.billed
      : prices.teamWeb.perpetual.original +
        prices.teamMobile.perpetual.original -
        prices.teamSuper.perpetual.original
    : isAnnual
      ? prices.web.annual.billed + prices.mobile.annual.billed - prices.super.annual.billed
      : prices.web.perpetual.price + prices.mobile.perpetual.price - prices.super.perpetual.price;

  return (
    <div className="relative mx-2 mt-2 mb-2 h-[255px] overflow-clip rounded-2xl bg-default">
      {/* Decorative backgrounds */}
      <div
        className="absolute top-[-148px] left-[-10px] flex h-[406px] w-[328px] items-center justify-center"
        style={
          {
            "--transform-inner-height": "153.5",
            "--transform-inner-width": "1200",
          } as React.CSSProperties
        }
      >
        <div className="flex-none -rotate-90">
          <SuperHeroBlueGradient />
        </div>
      </div>
      <div className="absolute top-[calc(50%-216.65px)] left-[calc(50%+48.35px)] flex h-[637.702px] w-[760.706px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
        <div className="flex-none rotate-180">
          <FloatingStars />
        </div>
      </div>
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col px-4">
        <div className="flex items-center gap-2 pt-4">
          <HeroBadge gradientFrom="#FDBB23" gradientTo="#FECE30" id="1_13839" />
          <p className="text-xs leading-[1.34] font-medium text-warning">
            {isTeam
              ? `Save $${savings.toLocaleString("en-US")}`
              : `Save $${savings.toLocaleString("en-US")} with bundle`}
          </p>
        </div>
        <p className="font-heading mt-3 text-xl leading-[normal] text-foreground">
          {isTeam ? "Super Heroes" : "Super Hero"}
        </p>
        <p className="mt-1 w-[214px] text-xs leading-[1.34] font-normal whitespace-pre-wrap text-foreground">
          Get access to all HeroUI libraries components and features
        </p>
        <div className="mt-5">
          {isTeam ? (
            <TeamAnimatedPrice pricing={prices.teamSuper} />
          ) : (
            <AnimatedPrice pricing={prices.super} />
          )}
        </div>
        <div className="mt-[7px]">
          {isTeam ? (
            <TeamBillingNote pricing={prices.teamSuper} />
          ) : (
            <BillingNote pricing={prices.super} />
          )}
        </div>
        <Button className="mt-3 min-h-8 w-full bg-foreground text-background" size="sm">
          Get Super edition
        </Button>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_1px_0_var(--border)]" />
    </div>
  );
}

function SuperHeroFeaturesList() {
  const planType = useContext(PlanTypeContext);
  const isTeam = planType === "teams";

  return (
    <div className="flex flex-col items-start gap-3 px-5 pt-5 pb-5">
      <FeatureRow icon={<ComponentsIcon />} label="More than 100 components" />
      <FeatureRow icon={<TemplatesIcon />} label="Premium templates" />
      <FeatureRow className="w-full" icon={<BrainIcon />} label="Advanced AI (Skills and MCPs)" />
      <FeatureRow icon={<PaletteIcon />} label="Premium design systems" />
      <FeatureRow icon={<BrushIcon />} label="Advanced theme builder" />
      {isTeam ? (
        <SlackFeature />
      ) : (
        <FeatureRow icon={<HashtagIcon />} label="Private Discord channels" />
      )}
      <FeatureRow icon={<FigmaIcon />} label="Figma files (web & mobile)" />
      <FeatureRow icon={<PlugConnectionIcon />} label="Figma plugin sync" />
      <FeatureRow icon={<CommentsIcon />} label="Priority support" />
      {!!isTeam && (
        <>
          <SharedThemesFeature />
          <UsageAnalyticsFeature />
          <CentralizedBillingFeature />
        </>
      )}
    </div>
  );
}

function SuperHeroPricingCard() {
  return (
    <div className="flex w-[320px] flex-col rounded-3xl bg-surface shadow-surface">
      <SuperHeroCardHeader />
      <SuperHeroFeaturesList />
    </div>
  );
}

// === Team-specific feature components ===

export default SuperHeroPricingCard;
