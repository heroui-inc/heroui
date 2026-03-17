"use client";

import {Button, CloseButton, buttonVariants} from "@heroui/react";
import {Calligraph} from "calligraph";
import {AnimatePresence, motion} from "motion/react";
import {useEffect, useState} from "react";

import {env} from "~env";

import {FloatingStars} from "./floating-stars";
import {ProTitle} from "./pro-title";

interface DiscountData {
  label: string;
  percent: number;
  endsAt: string;
}

const PRO_API_URL = env.NEXT_PUBLIC_PRO_API_URL;

export const SHOW_BANNER = env.NEXT_PUBLIC_SHOW_PRE_SALE_BANNER;

const HEROUI_PRO_URL = env.NEXT_PUBLIC_HEROUI_PRO_URL ?? "https://heroui.pro";

const PLACEHOLDER = {days: "--", hours: "--", minutes: "--", seconds: "--"};

function useProDiscount() {
  const [discount, setDiscount] = useState<DiscountData | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`${PRO_API_URL}/api/prices`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && data?.discount) {
          setDiscount(data.discount);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return discount;
}

interface TimeRemaining {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function getTimeRemaining(targetDate: Date): TimeRemaining | null {
  const diff = Math.max(0, targetDate.getTime() - Date.now());

  if (diff <= 0) return null;

  const totalSeconds = Math.floor(diff / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

function useCountdown(endsAt: string | null) {
  const [time, setTime] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!endsAt) return;

    const endDate = new Date(endsAt);

    if (Number.isNaN(endDate.getTime())) return;

    const frame = requestAnimationFrame(() => setTime(getTimeRemaining(endDate)));
    const id = setInterval(() => setTime(getTimeRemaining(endDate)), 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(id);
    };
  }, [endsAt]);

  return time;
}

export function HeaderBanner() {
  const discount = useProDiscount();
  const time = useCountdown(discount?.endsAt ?? null);

  if (!SHOW_BANNER) return null;

  const percent = discount?.percent ?? "--";
  const t = time ?? PLACEHOLDER;

  return (
    <a
      className="flex h-8 w-full items-center justify-center gap-1.5 bg-surface-secondary transition-colors hover:bg-surface-secondary/80"
      href={`${HEROUI_PRO_URL}?utm_source=heroui.com&utm_medium=banner&utm_campaign=presale`}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="shrink-0 rounded-full bg-accent px-2 py-0.5 text-xs leading-tight font-medium text-accent-foreground">
        Pro
      </span>
      <span className="hidden text-xs font-medium text-foreground sm:inline">
        Pre-sale is live!
      </span>
      <span className="text-xs font-medium text-foreground">
        <span className="tabular-nums">{percent}%</span> off
        <span className="hidden sm:inline"> ends</span> in
      </span>
      <span className="shrink-0 rounded-[5px] border border-accent-soft-hover bg-linear-to-r from-accent/10 to-accent/7 px-1.5 py-0.5 text-xs leading-tight font-medium text-foreground tabular-nums">
        <Calligraph animation="snappy" variant="number">
          {t.days}
        </Calligraph>
        d :{" "}
        <Calligraph animation="snappy" variant="number">
          {t.hours}
        </Calligraph>
        h :{" "}
        <Calligraph animation="snappy" variant="number">
          {t.minutes}
        </Calligraph>
        m :{" "}
        <Calligraph animation="snappy" variant="number">
          {t.seconds}
        </Calligraph>
        s
      </span>
    </a>
  );
}

export function ProBanner() {
  const [visible, setVisible] = useState(true);
  const discount = useProDiscount();
  const time = useCountdown(discount?.endsAt ?? null);

  if (!SHOW_BANNER) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          animate={{opacity: 1, scale: 1, y: 0}}
          className="fixed bottom-6 left-6 z-50 w-[288px] overflow-hidden rounded-[20px] border border-separator bg-surface shadow-xl"
          exit={{opacity: 0, scale: 0.95, transition: {duration: 0.2, ease: "easeIn"}, y: 20}}
          initial={{opacity: 0, scale: 0.95, y: 20}}
          transition={{damping: 25, delay: 0.5, stiffness: 300, type: "spring"}}
        >
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
                  <rect
                    fill="url(#paint0_linear_pro_banner)"
                    height="365"
                    width="406"
                    x="0"
                    y="0"
                  />
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
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  />
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
                  <feBlend
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    mode="normal"
                    result="shape"
                  />
                  <feGaussianBlur
                    result="effect1_foregroundBlur_pro_banner"
                    stdDeviation="32.0312"
                  />
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
            <span className="relative text-xs text-[#4E75A5] tabular-nums">
              Ends in{" "}
              <Calligraph animation="snappy" variant="number">
                {(time ?? PLACEHOLDER).days}
              </Calligraph>
              d{" "}
              <Calligraph animation="snappy" variant="number">
                {(time ?? PLACEHOLDER).hours}
              </Calligraph>
              h{" "}
              <Calligraph animation="snappy" variant="number">
                {(time ?? PLACEHOLDER).minutes}
              </Calligraph>
              m{" "}
              <Calligraph animation="snappy" variant="number">
                {(time ?? PLACEHOLDER).seconds}
              </Calligraph>
              s
            </span>
          </div>

          <CloseButton
            className="absolute top-2 right-2 bg-transparent text-white/50 hover:bg-white/10 hover:text-white"
            onPress={() => setVisible(false)}
          />

          {/* Content section */}
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-col gap-1.5">
              <h3 className="text-base font-semibold text-foreground">
                HeroUI Pro pre-sale is live!
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                More components, charts, advanced MCP &amp; Skills, and a complete theme builder.
                Get your license now at a better price before launch.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Button size="md" variant="outline" onPress={() => setVisible(false)}>
                Close
              </Button>
              <a
                href="https://heroui.pro"
                className={buttonVariants({
                  className: "bg-black text-white dark:bg-white dark:text-black",
                  fullWidth: true,
                  size: "md",
                  variant: "primary",
                })}
              >
                Get Pro deal
              </a>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
