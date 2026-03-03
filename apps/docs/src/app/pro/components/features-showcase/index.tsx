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
      <p className="w-[172px] shrink-0 text-center text-[12px] leading-[1.34] font-medium whitespace-pre-wrap text-muted not-italic">
        Available for web and native
      </p>
      <div className="flex shrink-0 items-center gap-1">
        <div className="relative size-[16px] shrink-0 overflow-clip opacity-50" data-name="display">
          <div className="absolute inset-[9.38%_6.25%]" data-name="icon">
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
        <div className="relative size-[16px] shrink-0">
          <div
            className="absolute top-px left-px size-[14px] overflow-clip opacity-50"
            data-name="smartphone"
          >
            <div className="absolute inset-[3.12%_15.63%_3.13%_15.62%] flex items-center justify-center">
              <div className="h-[11px] w-[15px] flex-none rotate-90">
                <div className="relative size-full" data-name="icon">
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

function MdiSlack() {
  return (
    <div className="relative size-[9px]" data-name="mdi:slack">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 9 9"
      >
        <g id="mdi:slack" opacity="0.24">
          <path
            d="M2.25 5.625C2.25 5.82391 2.17098 6.01468 2.03033 6.15533C1.88968 6.29598 1.69891 6.375 1.5 6.375C1.30109 6.375 1.11032 6.29598 0.96967 6.15533C0.829018 6.01468 0.75 5.82391 0.75 5.625C0.75 5.42609 0.829018 5.23532 0.96967 5.09467C1.11032 4.95402 1.30109 4.875 1.5 4.875H2.25V5.625ZM2.625 5.625C2.625 5.42609 2.70402 5.23532 2.84467 5.09467C2.98532 4.95402 3.17609 4.875 3.375 4.875C3.57391 4.875 3.76468 4.95402 3.90533 5.09467C4.04598 5.23532 4.125 5.42609 4.125 5.625V7.5C4.125 7.69891 4.04598 7.88968 3.90533 8.03033C3.76468 8.17098 3.57391 8.25 3.375 8.25C3.17609 8.25 2.98532 8.17098 2.84467 8.03033C2.70402 7.88968 2.625 7.69891 2.625 7.5V5.625ZM3.375 2.625C3.17609 2.625 2.98532 2.54598 2.84467 2.40533C2.70402 2.26468 2.625 2.07391 2.625 1.875C2.625 1.67609 2.70402 1.48532 2.84467 1.34467C2.98532 1.20402 3.17609 1.125 3.375 1.125C3.57391 1.125 3.76468 1.20402 3.90533 1.34467C4.04598 1.48532 4.125 1.67609 4.125 1.875V2.625H3.375ZM3.375 3C3.57391 3 3.76468 3.07902 3.90533 3.21967C4.04598 3.36032 4.125 3.55109 4.125 3.75C4.125 3.94891 4.04598 4.13968 3.90533 4.28033C3.76468 4.42098 3.57391 4.5 3.375 4.5H1.5C1.30109 4.5 1.11032 4.42098 0.96967 4.28033C0.829018 4.13968 0.75 3.94891 0.75 3.75C0.75 3.55109 0.829018 3.36032 0.96967 3.21967C1.11032 3.07902 1.30109 3 1.5 3H3.375ZM6.375 3.75C6.375 3.55109 6.45402 3.36032 6.59467 3.21967C6.73532 3.07902 6.92609 3 7.125 3C7.32391 3 7.51468 3.07902 7.65533 3.21967C7.79598 3.36032 7.875 3.55109 7.875 3.75C7.875 3.94891 7.79598 4.13968 7.65533 4.28033C7.51468 4.42098 7.32391 4.5 7.125 4.5H6.375V3.75ZM6 3.75C6 3.94891 5.92098 4.13968 5.78033 4.28033C5.63968 4.42098 5.44891 4.5 5.25 4.5C5.05109 4.5 4.86032 4.42098 4.71967 4.28033C4.57902 4.13968 4.5 3.94891 4.5 3.75V1.875C4.5 1.67609 4.57902 1.48532 4.71967 1.34467C4.86032 1.20402 5.05109 1.125 5.25 1.125C5.44891 1.125 5.63968 1.20402 5.78033 1.34467C5.92098 1.48532 6 1.67609 6 1.875V3.75ZM5.25 6.75C5.44891 6.75 5.63968 6.82902 5.78033 6.96967C5.92098 7.11032 6 7.30109 6 7.5C6 7.69891 5.92098 7.88968 5.78033 8.03033C5.63968 8.17098 5.44891 8.25 5.25 8.25C5.05109 8.25 4.86032 8.17098 4.71967 8.03033C4.57902 7.88968 4.5 7.69891 4.5 7.5V6.75H5.25ZM5.25 6.375C5.05109 6.375 4.86032 6.29598 4.71967 6.15533C4.57902 6.01468 4.5 5.82391 4.5 5.625C4.5 5.42609 4.57902 5.23532 4.71967 5.09467C4.86032 4.95402 5.05109 4.875 5.25 4.875H7.125C7.32391 4.875 7.51468 4.95402 7.65533 5.09467C7.79598 5.23532 7.875 5.42609 7.875 5.625C7.875 5.82391 7.79598 6.01468 7.65533 6.15533C7.51468 6.29598 7.32391 6.375 7.125 6.375H5.25Z"
            fill="var(--fill-0, #18181B)"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function FeaturesShowcase() {
  return (
    <div className="mx-auto mt-12 w-full max-w-[992px]">
      <div className="flex flex-col items-center justify-center gap-2">
        <p className="text-center text-[16px] leading-[normal] font-medium text-accent not-italic">
          What's included
        </p>
        <div className="font-heading text-center text-[48px] leading-[normal] font-medium tracking-[-0.72px] whitespace-nowrap">
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
        <div className="absolute right-[141px] bottom-[245px] flex size-[9.707px] items-center justify-center">
          <div className="flex-none rotate-[4.7deg]">
            <MdiSlack />
          </div>
        </div>
      </div>
      <PlatformAvailabilityLabel />
    </div>
  );
}

export default FeaturesShowcase;
