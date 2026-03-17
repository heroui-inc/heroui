"use client";

import {Button, buttonVariants} from "@heroui/react";
import {useEffect, useState} from "react";

import {FloatingStars} from "./floating-stars";
import {ProTitle} from "./pro-title";

const TARGET_DATE = new Date("2026-04-12T00:00:00Z");

function getTimeRemaining() {
  const now = Date.now();
  const diff = TARGET_DATE.getTime() - now;

  if (diff <= 0) return null;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {days, hours, minutes, seconds};
}

function formatTime(time: ReturnType<typeof getTimeRemaining>) {
  if (!time) return "Ended";

  return `Ends in ${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
}

export function ProBanner() {
  const [visible, setVisible] = useState(true);
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 w-[288px] overflow-hidden rounded-[20px] border border-separator bg-surface shadow-xl">
      {/* Top gradient section */}
      <div className="relative flex h-[180px] flex-col items-center justify-center gap-2 overflow-hidden px-6 py-6">
        <svg
          className="absolute inset-0 size-full -scale-y-100"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 406 328"
        >
          <g clipPath="url(#clip0_pro_banner)">
            <g filter="url(#filter0_i_pro_banner)">
              <rect fill="url(#paint0_linear_pro_banner)" height="365" width="406" x="0" y="0" />
            </g>
            <g filter="url(#filter1_f_pro_banner)">
              <path
                d="M301.812 168C361.459 168 409.812 216.353 409.812 276C409.812 335.647 361.459 384 301.812 384C242.166 384 193.813 335.647 193.812 276C193.812 216.353 242.166 168 301.812 168Z"
                fill="url(#paint1_linear_pro_banner)"
              />
            </g>
          </g>
          <defs>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="365"
              id="filter0_i_pro_banner"
              width="406"
              x="0"
              y="0"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feColorMatrix
                in="SourceAlpha"
                result="hardAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              />
              <feMorphology
                in="SourceAlpha"
                operator="erode"
                radius="12.8125"
                result="effect1_innerShadow_pro_banner"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="80.0781" />
              <feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.728741 0 0 0 0 0.968353 0 0 0 0 1 0 0 0 0.8 0"
              />
              <feBlend in2="shape" mode="normal" result="effect1_innerShadow_pro_banner" />
            </filter>
            <filter
              colorInterpolationFilters="sRGB"
              filterUnits="userSpaceOnUse"
              height="344.125"
              id="filter1_f_pro_banner"
              width="344.125"
              x="129.75"
              y="103.938"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
              <feGaussianBlur result="effect1_foregroundBlur_pro_banner" stdDeviation="32.0312" />
            </filter>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_pro_banner"
              x1="203"
              x2="203"
              y1="0"
              y2="365"
            >
              <stop stopColor="#E9E9FF" />
              <stop offset="1" stopColor="#CCE5F1" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_pro_banner"
              x1="235.242"
              x2="397.641"
              y1="219.359"
              y2="417.953"
            >
              <stop stopColor="#5DD0E7" />
              <stop offset="1" stopColor="#7300FF" />
            </linearGradient>
            <clipPath id="clip0_pro_banner">
              <rect fill="white" height="328" width="406" />
            </clipPath>
          </defs>
        </svg>
        {/* Floating white particles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-50">
            <FloatingStars />
          </div>
        </div>
        <div className="relative flex items-center gap-2">
          <ProTitle />
        </div>
        <span className="relative text-xs text-[#4E75A5]">{formatTime(time)}</span>
      </div>

      {/* Content section */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-base font-semibold text-foreground">HeroUI Pro pre-sale is live!</h3>
          <p className="text-sm leading-relaxed text-muted">
            More components, charts, advanced MCP &amp; Skills, and a complete theme builder. Get
            your license now at a better price before launch.
          </p>
        </div>
        <div className="flex items-center gap-2 pt-1">
          <Button size="md" variant="outline" onPress={() => setVisible(false)}>
            Close
          </Button>
          <a
            href="https://heroui.pro"
            className={buttonVariants({
              className: "bg-black text-white",
              fullWidth: true,
              size: "md",
              variant: "primary",
            })}
          >
            Get Pro deal
          </a>
        </div>
      </div>
    </div>
  );
}
