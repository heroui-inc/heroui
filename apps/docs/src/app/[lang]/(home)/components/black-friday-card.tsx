"use client";

import {Check, Copy} from "@gravity-ui/icons";
import {Button, buttonVariants} from "@heroui/react";
import {Calligraph} from "calligraph";
import {AnimatePresence, motion} from "motion/react";
import {useEffect, useState} from "react";

import {useDictionary} from "@/hooks/use-dictionary";

import {FloatingStars} from "./floating-stars";
import {PRO_URL} from "./pro-constants";

type Tone = "day" | "week";

export interface BlackFridayOffer {
  campaign: string;
  code: string;
  endsAt: number;
  percent: number;
  startsAt: number;
  tone: Tone;
}

// UTC, same schedule as the heroui.com home card (heroui-pro apps/website). The day offer sits
// inside the week and wins while it runs. The Stripe promotion codes are switched on by hand, so
// keep these dates in step with them.
const OFFERS: BlackFridayOffer[] = [
  {
    campaign: "black_friday_day",
    code: "BLACKFRIDAY50",
    endsAt: Date.UTC(2026, 10, 28),
    percent: 50,
    startsAt: Date.UTC(2026, 10, 27),
    tone: "day",
  },
  {
    campaign: "black_friday_week",
    code: "BLACKFRIDAY40",
    endsAt: Date.UTC(2026, 11, 7),
    percent: 40,
    startsAt: Date.UTC(2026, 10, 23),
    tone: "week",
  },
];

export function getBlackFridayOffer(now: number): BlackFridayOffer | null {
  return OFFERS.find((offer) => now >= offer.startsAt && now < offer.endsAt) ?? null;
}

const TONES = {
  day: {
    badge: "border-[#E8C77E]/24 bg-[#E8C77E]/7 text-[#E8C77E]",
    body: "text-[#A39D92]",
    card: "border-[#E8C77E]/18",
    close: "border-[#F5F0E6]/16 text-[#F5F0E6] hover:bg-[#F5F0E6]/6",
    copy: "bg-[#E8C77E]/10 text-[#E8C77E] hover:bg-[#E8C77E]/16",
    countdownLabel: "text-[#A39D92]",
    countdownValue: "text-[#F5F0E6]",
    coupon: "border-[#E8C77E]/35 bg-[#E8C77E]/5",
    couponCode: "text-[#E8C77E]",
    couponLabel: "text-[#A39D92]",
    cta: "bg-[linear-gradient(180deg,#F7E2A6_0%,#E2B866_55%,#C99A45_100%)] text-[#1A1206] shadow-[inset_0_1px_0_#FFFAE699,inset_0_-1px_0_#7855194D] hover:brightness-110",
    glow: "bg-[#D9AE5B] opacity-16",
    hairline: "via-[#E8C77E]/22",
    headline: "bg-[linear-gradient(160deg,#FBF0CC_30%,#D9AE5B_75%,#D9AE5B8C_100%)]",
    hero: "bg-[radial-gradient(120%_95%_at_50%_0%,#1F190F_0%,#0B0906_55%,#000_100%)]",
    // FloatingStars paints with `var(--fill-0, white)`.
    stars: "[--fill-0:#F3DFA8]",
    title: "text-[#F5F0E6]",
  },
  week: {
    badge: "border-white/10 bg-white/4 text-white/72",
    body: "text-[#A1A1AA]",
    card: "border-white/10",
    close: "border-white/14 text-white hover:bg-white/6",
    copy: "bg-white/6 text-white/72 hover:bg-white/10",
    countdownLabel: "text-white/50",
    countdownValue: "text-white/72",
    coupon: "border-white/20 bg-white/3",
    couponCode: "text-white",
    couponLabel: "text-white/50",
    cta: "bg-white text-black hover:bg-white/90",
    glow: "bg-white opacity-10",
    hairline: "via-white/14",
    headline: "bg-[linear-gradient(160deg,#FFF_35%,#FFFFFF6B_100%)]",
    hero: "bg-[radial-gradient(120%_95%_at_50%_0%,#1A1A1C_0%,#0A0A0A_55%,#000_100%)]",
    stars: "",
    title: "text-white",
  },
} satisfies Record<Tone, Record<string, string>>;

// HeroUI's button fades its background in 100ms; the deal button eases a little slower, and the gold
// gradient brightens instead (gradients can't transition).
const CTA_TRANSITION =
  "[transition:transform_250ms_var(--ease-smooth),background-color_200ms_var(--ease-out),filter_200ms_var(--ease-out)] motion-reduce:transition-none";

export const blackFridayCardClassName = (offer: BlackFridayOffer) =>
  `bg-black ${TONES[offer.tone].card}`;

const pad = (value: number) => String(value).padStart(2, "0");

const withValues = (template: string, values: Record<string, number | string>) =>
  template.replace(/\{(\w+)\}/g, (match, key: string) => String(values[key] ?? match));

function Countdown({className, ms}: {className: string; ms: number}) {
  const units = useDictionary().proBanner.units;
  const total = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(total / 86400);
  const parts = [
    ...(days > 0 ? [{unit: units.days, value: days}] : []),
    {unit: units.hours, value: Math.floor((total % 86400) / 3600)},
    {unit: units.minutes, value: Math.floor((total % 3600) / 60)},
    {unit: units.seconds, value: total % 60},
  ];

  return (
    <span className={`flex gap-1 ${className}`}>
      {parts.map(({unit, value}) => (
        <span key={unit}>
          <Calligraph animation="snappy" variant="number">
            {pad(value)}
          </Calligraph>
          {unit}
        </span>
      ))}
    </span>
  );
}

function CouponCode({code, tone}: {code: string; tone: Tone}) {
  const dict = useDictionary().proBanner.blackFriday;
  const styles = TONES[tone];
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;

    const timeout = setTimeout(() => setCopied(false), 1500);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(
      () => setCopied(true),
      () => {},
    );
  };

  return (
    <div
      className={`flex h-10 items-center justify-between rounded-xl border border-dashed ps-3 pe-2 ${styles.coupon}`}
    >
      <span className="flex items-center gap-2">
        <span className={`text-xs font-medium ${styles.couponLabel}`}>{dict.code}</span>
        <span
          className={`font-mono text-[13px] font-medium tracking-[0.02em] ${styles.couponCode}`}
        >
          {code}
        </span>
      </span>
      <button
        aria-label={withValues(copied ? dict.copiedLabel : dict.copyLabel, {code})}
        className={`flex h-[26px] items-center gap-1 rounded-lg px-2 text-xs font-medium transition-colors ${styles.copy}`}
        type="button"
        onClick={handleCopy}
      >
        <span aria-hidden className="relative flex size-3 items-center justify-center">
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={copied ? "check" : "copy"}
              animate={{filter: "blur(0px)", opacity: 1, scale: 1}}
              className="flex"
              exit={{filter: "blur(2px)", opacity: 0, scale: 0.5}}
              initial={{filter: "blur(2px)", opacity: 0, scale: 0.5}}
              transition={{duration: 0.18, ease: [0.23, 1, 0.32, 1]}}
            >
              {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
            </motion.span>
          </AnimatePresence>
        </span>
        <Calligraph aria-hidden>{copied ? dict.copied : dict.copy}</Calligraph>
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? withValues(dict.copiedAnnouncement, {code}) : ""}
      </span>
    </div>
  );
}

/** Black Friday hero and body for the Pro banner. The banner owns the shell and the close button. */
export function BlackFridayContent({
  now,
  offer,
  onDismiss,
}: {
  now: number;
  offer: BlackFridayOffer;
  onDismiss: () => void;
}) {
  const dict = useDictionary().proBanner;
  const copy = dict.blackFriday;
  const styles = TONES[offer.tone];
  const href = `${PRO_URL}/pricing?utm_source=heroui.com&utm_medium=pro_banner&utm_campaign=${offer.campaign}`;

  return (
    <>
      <div
        className={`relative flex h-[180px] flex-col items-center justify-center gap-3 overflow-hidden p-6 ${styles.hero}`}
      >
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute start-[54px] -top-[100px] h-[150px] w-[180px] rounded-full blur-[52px] ${styles.glow}`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 overflow-hidden ${styles.stars}`}
        >
          <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-50">
            <FloatingStars />
          </div>
        </div>
        <span
          className={`relative rounded-full border px-2.5 py-[3px] text-[11px] leading-4 font-medium tracking-[0.01em] ${styles.badge}`}
        >
          {offer.tone === "day" ? copy.dayLabel : copy.weekLabel}
        </span>
        <p
          className={`relative bg-clip-text text-[46px] leading-12 font-semibold tracking-[-0.045em] text-transparent ${styles.headline}`}
        >
          {withValues(copy.headline, {percent: offer.percent})}
        </p>
        <p className="relative flex items-center gap-[5px] text-xs font-medium tabular-nums">
          <span className={styles.countdownLabel}>{copy.endsIn}</span>
          <Countdown className={styles.countdownValue} ms={offer.endsAt - now} />
        </p>
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent to-transparent ${styles.hairline}`}
        />
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1.5">
          <h3 className={`text-base font-medium ${styles.title}`}>{copy.cardTitle}</h3>
          <p className={`text-sm leading-relaxed ${styles.body}`}>{copy.cardDescription}</p>
        </div>
        <CouponCode code={offer.code} tone={offer.tone} />
        <div className="flex items-center gap-2 pt-1">
          <Button
            className={`bg-transparent ${styles.close}`}
            size="md"
            variant="outline"
            onPress={onDismiss}
          >
            {dict.close}
          </Button>
          <a
            href={href}
            rel="noopener noreferrer"
            target="_blank"
            className={buttonVariants({
              className: `${CTA_TRANSITION} ${styles.cta}`,
              fullWidth: true,
              size: "md",
              variant: "primary",
            })}
          >
            {copy.cta}
          </a>
        </div>
      </div>
    </>
  );
}
