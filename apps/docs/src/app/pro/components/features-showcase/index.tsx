"use client";

import AIWorkflowCard from "./ai-workflow-card";
import AnimatedPreviewCard from "./animated-preview-card";
import DeepCustomizationCard from "./deep-customization-card";
import DesignSystemPreviewCard from "./design-system-preview-card";
import FigmaIntegrationCard from "./figma-integration-card";
import ProComponentsCard from "./pro-components-card";
import VipMemberCard from "./vip-member-card";

function PlatformAvailabilityLabel() {
  return (
    <div className="mt-7 flex flex-col items-center gap-1">
      <p className="w-[172px] shrink-0 text-center text-xs leading-[1.34] font-medium whitespace-pre-wrap text-muted">
        Available for web and native
      </p>
      <div className="flex shrink-0 items-center gap-1">
        <div className="relative size-4 shrink-0 overflow-clip opacity-50">
          <div className="absolute inset-[9.38%_6.25%]">
            <svg
              className="absolute block size-full"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 14 13"
            >
              <path
                clipRule="evenodd"
                d="M11 1.5H3C2.17157 1.5 1.5 2.17157 1.5 3V7C1.5 7.82843 2.17157 8.5 3 8.5H11C11.8284 8.5 12.5 7.82843 12.5 7V3C12.5 2.17157 11.8284 1.5 11 1.5ZM3 0C1.34315 0 0 1.34315 0 3V7C0 8.65685 1.34315 10 3 10H6.25V11.5H3.75C3.33579 11.5 3 11.8358 3 12.25C3 12.6642 3.33579 13 3.75 13H10.25C10.6642 13 11 12.6642 11 12.25C11 11.8358 10.6642 11.5 10.25 11.5H7.75V10H11C12.6569 10 14 8.65685 14 7V3C14 1.34315 12.6569 0 11 0H3Z"
                fill="var(--fill-0, #71717A)"
                fillRule="evenodd"
                id="icon"
              />
            </svg>
          </div>
        </div>
        <div className="relative size-4 shrink-0">
          <div className="absolute top-px left-px size-[14px] overflow-clip opacity-50">
            <div className="absolute inset-[3.12%_15.63%_3.13%_15.62%] flex items-center justify-center">
              <div className="h-[11px] w-[15px] flex-none rotate-90">
                <div className="relative size-full">
                  <svg
                    className="absolute block size-full"
                    fill="none"
                    preserveAspectRatio="none"
                    viewBox="0 0 13.125 9.625"
                  >
                    <path
                      clipRule="evenodd"
                      d="M2.625 1.3125H10.5C11.2249 1.3125 11.8125 1.90013 11.8125 2.625V7C11.8125 7.72487 11.2249 8.3125 10.5 8.3125H2.625C1.90013 8.3125 1.3125 7.72487 1.3125 7V2.625C1.3125 1.90013 1.90013 1.3125 2.625 1.3125ZM0 2.625C0 1.17525 1.17525 0 2.625 0L10.5 0C11.9497 0 13.125 1.17525 13.125 2.625V7C13.125 8.44975 11.9497 9.625 10.5 9.625H2.625C1.17525 9.625 0 8.44975 0 7V2.625ZM9.1875 6.34375C9.1875 6.70619 9.48131 7 9.84375 7C10.2062 7 10.5 6.70619 10.5 6.34375V3.28125C10.5 2.91881 10.2062 2.625 9.84375 2.625C9.48131 2.625 9.1875 2.91881 9.1875 3.28125V6.34375Z"
                      fill="var(--fill-0, #71717A)"
                      fillRule="evenodd"
                      id="icon"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturesShowcase() {
  return (
    <div className="mx-auto mt-12 w-full max-w-[992px]">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-center text-base leading-[normal] font-medium text-accent">
          What's included
        </p>
        <div className="font-heading text-center text-5xl leading-[normal] font-medium tracking-[-0.72px] whitespace-nowrap">
          <p className="mb-0">Stop building from scratch.</p>
          <p className="text-muted/60">Start shipping.</p>
        </div>
      </div>
      <div className="relative mt-20 grid grid-cols-6 gap-4">
        <AIWorkflowCard />
        <DeepCustomizationCard />
        <ProComponentsCard />
        <DesignSystemPreviewCard />
        <AnimatedPreviewCard />
        <FigmaIntegrationCard />
        <VipMemberCard />
      </div>
      <PlatformAvailabilityLabel />
    </div>
  );
}

export default FeaturesShowcase;
