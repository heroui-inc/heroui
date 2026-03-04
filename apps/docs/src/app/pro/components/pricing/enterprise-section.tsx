"use client";

import {ChartPie, Check, Factory, Hashtag, LogoDrawIo, Receipt} from "@gravity-ui/icons";
import {Button} from "@heroui/react";

export function SlackFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-2">
      <div className="relative size-4 shrink-0 opacity-30">
        <Hashtag className="size-full" />
      </div>
      <p className="relative shrink-0 text-xs leading-[1.34] font-normal text-foreground">
        Private Slack channel
      </p>
    </div>
  );
}

export function SharedThemesFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-2">
      <div className="relative size-4 shrink-0 opacity-30">
        <LogoDrawIo className="size-full" />
      </div>
      <p className="relative shrink-0 text-xs leading-[1.34] font-normal text-foreground">
        Shared themes and rules
      </p>
    </div>
  );
}

export function UsageAnalyticsFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-2">
      <div className="relative size-4 shrink-0 opacity-30">
        <ChartPie className="size-full" />
      </div>
      <p className="relative shrink-0 text-xs leading-[1.34] font-normal text-foreground">
        Usage analytics and reports
      </p>
    </div>
  );
}

export function CentralizedBillingFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-2">
      <div className="relative size-4 shrink-0 opacity-30">
        <Receipt className="size-full" />
      </div>
      <p className="relative shrink-0 text-xs leading-[1.34] font-normal text-foreground">
        Centralized team billing
      </p>
    </div>
  );
}

function EnterpriseFeatureItem({text}: {text: string}) {
  return (
    <div className="flex items-center gap-2">
      <Check className="size-4 shrink-0 opacity-50" />
      <p className="text-xs leading-[1.34] font-normal text-foreground">{text}</p>
    </div>
  );
}

export function EnterpriseSection() {
  return (
    <div className="rounded-3xl bg-surface-secondary px-8 py-6">
      <div className="flex items-start justify-between">
        <div className="flex max-w-[340px] flex-col gap-2">
          <div className="flex items-center gap-2">
            <Factory className="size-4 opacity-70" />
            <p className="font-heading text-lg leading-[normal] text-foreground">Enterprise</p>
          </div>
          <p className="text-xs leading-[normal] font-normal text-muted">
            Enterprise-grade performance, security, control, and privacy. Designed for teams who
            demand more.
          </p>
          <Button
            className="mt-1 w-[120px] rounded-2xl bg-surface text-surface-foreground shadow-[inset_0_0_1px_0_var(--border)]"
            size="sm"
          >
            Contact us
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-12 gap-y-3">
          <EnterpriseFeatureItem text="SSO authentication" />
          <EnterpriseFeatureItem text="Guaranteed SLA" />
          <EnterpriseFeatureItem text="Audit Logs" />
          <EnterpriseFeatureItem text="Enterprise security" />
          <EnterpriseFeatureItem text="Custom integrations" />
          <EnterpriseFeatureItem text="Customer success" />
          <EnterpriseFeatureItem text="Custom components" />
          <EnterpriseFeatureItem text="Enterprise support" />
        </div>
      </div>
    </div>
  );
}
