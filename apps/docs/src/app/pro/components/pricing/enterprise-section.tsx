"use client";

import {Button} from "@heroui/react";

export function SlackFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-[8px]">
      <div className="relative size-[16px] shrink-0 overflow-clip opacity-30" data-name="mdi:slack">
        <div className="absolute inset-[10.94%_7.81%]" data-name="icon">
          <svg
            className="absolute block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 13.5 12.5003"
          >
            <path
              clipRule="evenodd"
              d="M5.9879 0.884294C6.062 0.476762 5.7917 0.0863244 5.38416 0.0122276C4.97663 -0.0618692 4.58619 0.208434 4.5121 0.615966L4.03316 3.25013H1.75C1.33579 3.25013 1 3.58592 1 4.00013C1 4.41434 1.33579 4.75013 1.75 4.75013H3.76043L3.21498 7.75013H0.75C0.335787 7.75013 0 8.08592 0 8.50013C0 8.91434 0.335787 9.25013 0.75 9.25013H2.94225L2.5121 11.616C2.438 12.0235 2.7083 12.4139 3.11584 12.488C3.52337 12.5621 3.91381 12.2918 3.9879 11.8843L4.46684 9.25013H7.94225L7.5121 11.616C7.438 12.0235 7.7083 12.4139 8.11584 12.488C8.52337 12.5621 8.91381 12.2918 8.9879 11.8843L9.46684 9.25013H11.75C12.1642 9.25013 12.5 8.91434 12.5 8.50013C12.5 8.08592 12.1642 7.75013 11.75 7.75013H9.73957L10.285 4.75013H12.75C13.1642 4.75013 13.5 4.41434 13.5 4.00013C13.5 3.58592 13.1642 3.25013 12.75 3.25013H10.5578L10.9879 0.884294C11.062 0.476762 10.7917 0.0863244 10.3842 0.0122276C9.97663 -0.0618692 9.58619 0.208434 9.5121 0.615966L9.03316 3.25013H5.55775L5.9879 0.884294ZM8.21498 7.75013L8.76043 4.75013H5.28502L4.73957 7.75013H8.21498Z"
              fill="var(--fill-0, #18181B)"
              fillRule="evenodd"
              id="icon"
            />
          </svg>
        </div>
      </div>
      <p className="relative shrink-0 text-[12px] leading-[1.34] font-normal text-[#18181b] not-italic">
        Private Slack channel
      </p>
    </div>
  );
}

export function SharedThemesFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-[8px]">
      <div
        className="relative size-[16px] shrink-0 overflow-clip opacity-30"
        data-name="logo-draw-io"
      >
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path
            d="M11.5 1C10.1193 1 9 2.11929 9 3.5C9 4.15311 9.24413 4.74898 9.64648 5.20703L6.20703 9.64648C5.74898 9.24413 5.15311 9 4.5 9C3.11929 9 2 10.1193 2 11.5C2 12.8807 3.11929 14 4.5 14C5.88071 14 7 12.8807 7 11.5C7 10.8469 6.75587 10.251 6.35352 9.79297L9.79297 6.35352C10.251 6.75587 10.8469 7 11.5 7C12.8807 7 14 5.88071 14 4.5C14 3.11929 12.8807 2 11.5 2V1ZM11.5 3C12.3284 3 13 3.67157 13 4.5C13 5.32843 12.3284 6 11.5 6C10.6716 6 10 5.32843 10 4.5C10 3.67157 10.6716 3 11.5 3ZM4.5 10C5.32843 10 6 10.6716 6 11.5C6 12.3284 5.32843 13 4.5 13C3.67157 13 3 12.3284 3 11.5C3 10.6716 3.67157 10 4.5 10Z"
            fill="#18181B"
          />
        </svg>
      </div>
      <p className="relative shrink-0 text-[12px] leading-[1.34] font-normal text-[#18181b] not-italic">
        Shared themes and rules
      </p>
    </div>
  );
}

export function UsageAnalyticsFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-[8px]">
      <div className="relative size-[16px] shrink-0 overflow-clip opacity-30" data-name="chart-pie">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path
            d="M7.25 1.08C3.84 1.52 1.17 4.42 1.17 7.92C1.17 11.74 4.26 14.83 8.08 14.83C11.58 14.83 14.48 12.16 14.92 8.75H8.08C7.63 8.75 7.25 8.37 7.25 7.92V1.08Z"
            fill="#18181B"
          />
          <path
            d="M8.75 1.08V7.25H14.92C14.48 3.84 11.58 1.17 8.75 1.08Z"
            fill="#18181B"
            opacity="0.5"
          />
        </svg>
      </div>
      <p className="relative shrink-0 text-[12px] leading-[1.34] font-normal text-[#18181b] not-italic">
        Usage analytics and reports
      </p>
    </div>
  );
}

export function CentralizedBillingFeature() {
  return (
    <div className="relative flex shrink-0 content-stretch items-center gap-[8px]">
      <div className="relative size-[16px] shrink-0 overflow-clip opacity-30" data-name="receipt">
        <svg className="absolute block size-full" fill="none" viewBox="0 0 16 16">
          <path
            clipRule="evenodd"
            d="M3.5 1C2.67157 1 2 1.67157 2 2.5V14.5L3.75 13.25L5.5 14.5L7.25 13.25L9 14.5L10.75 13.25L12.5 14.5L14 13V2.5C14 1.67157 13.3284 1 12.5 1H3.5ZM5 5.25C4.58579 5.25 4.25 5.58579 4.25 6C4.25 6.41421 4.58579 6.75 5 6.75H11C11.4142 6.75 11.75 6.41421 11.75 6C11.75 5.58579 11.4142 5.25 11 5.25H5ZM4.25 9C4.25 8.58579 4.58579 8.25 5 8.25H11C11.4142 8.25 11.75 8.58579 11.75 9C11.75 9.41421 11.4142 9.75 11 9.75H5C4.58579 9.75 4.25 9.41421 4.25 9ZM5 11.25C4.58579 11.25 4.25 11.5858 4.25 12C4.25 12.4142 4.58579 12.75 5 12.75H8C8.41421 12.75 8.75 12.4142 8.75 12C8.75 11.5858 8.41421 11.25 8 11.25H5Z"
            fill="#18181B"
            fillRule="evenodd"
          />
        </svg>
      </div>
      <p className="relative shrink-0 text-[12px] leading-[1.34] font-normal text-[#18181b] not-italic">
        Centralized team billing
      </p>
    </div>
  );
}

function EnterpriseFeatureItem({text}: {text: string}) {
  return (
    <div className="flex items-center gap-[8px]">
      <svg className="size-[16px] shrink-0 opacity-50" fill="none" viewBox="0 0 16 16">
        <path
          d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"
          fill="#18181B"
        />
      </svg>
      <p className="text-[12px] leading-[1.34] font-normal text-[#18181b] not-italic">{text}</p>
    </div>
  );
}

export function EnterpriseSection() {
  return (
    <div className="rounded-[24px] bg-surface-secondary px-[32px] py-[24px]">
      <div className="flex items-start justify-between">
        <div className="flex max-w-[340px] flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <svg className="size-[20px] opacity-70" fill="none" viewBox="0 0 20 20">
              <path
                d="M3 4C3 2.89543 3.89543 2 5 2H15C16.1046 2 17 2.89543 17 4V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V4ZM5 3.5C4.72386 3.5 4.5 3.72386 4.5 4V16C4.5 16.2761 4.72386 16.5 5 16.5H15C15.2761 16.5 15.5 16.2761 15.5 16V4C15.5 3.72386 15.2761 3.5 15 3.5H5ZM7 6H9V8H7V6ZM11 6H13V8H11V6ZM7 10H9V12H7V10ZM11 10H13V12H11V10ZM7 14H13V15.5H7V14Z"
                fill="#18181B"
              />
            </svg>
            <p className="font-heading text-[18px] leading-[normal] text-[#18181b]">Enterprise</p>
          </div>
          <p className="text-[12px] leading-[normal] font-normal text-[#71717a]">
            Enterprise-grade performance, security, control, and privacy. Designed for teams who
            demand more.
          </p>
          <Button
            className="mt-[4px] w-[120px] rounded-2xl bg-white text-foreground shadow-[inset_0px_0px_1px_0px_rgba(0,0,0,0.3)]"
            size="sm"
          >
            Contact Us
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-x-[48px] gap-y-[12px]">
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
