"use client";

import {Button} from "@heroui/react";
import {Calligraph} from "calligraph";
import {useEffect, useState} from "react";

import {env} from "~env";

function WindowDots() {
  return (
    <div className="absolute top-[24px] left-[24px] h-[14px] w-[68px]">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 68 14"
      >
        <g id="Frame 2147225902">
          <circle cx="7" cy="7" fill="var(--fill-0, #D9D9D9)" id="Ellipse 3" r="7" />
          <circle cx="34" cy="7" fill="var(--fill-0, #D9D9D9)" id="Ellipse 4" r="7" />
          <circle cx="61" cy="7" fill="var(--fill-0, #D9D9D9)" id="Ellipse 5" r="7" />
        </g>
      </svg>
    </div>
  );
}

function DesktopMockup() {
  return (
    <div className="relative mx-auto h-[567px] w-full max-w-5xl overflow-clip rounded-[35px] bg-[rgba(221,221,221,0.2)]">
      <WindowDots />
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="relative mx-auto h-[652px] w-[299px] overflow-clip rounded-[35px] bg-[rgba(221,221,221,0.4)]">
      <div className="absolute top-[17px] left-[108px] h-[18px] w-[84px] rounded-[999px] bg-[#d9d9d9]" />
    </div>
  );
}

function HeroSubtitle() {
  return (
    <div className="relative mt-2 flex shrink-0 content-stretch items-center justify-center pl-[2px]">
      <p className="relative w-full max-w-lg shrink-0 text-center text-[16px] leading-[normal] font-medium whitespace-pre-wrap text-[#71717a] not-italic">
        HeroUI Pro brings components, AI tools, templates, and a refined UI system together so your
        product looks right from day zero.
      </p>
    </div>
  );
}

function HeroHeading() {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-5xl flex-col items-center justify-center gap-[6px] px-6">
      <div className="font-heading w-full text-center text-[72px] leading-[0.9] font-medium tracking-[-1.08px] whitespace-pre-wrap text-[#18181b]">
        <p className="mb-0">Build faster</p>
        <p className="text-muted/70">Look better</p>
      </div>
      <HeroSubtitle />
    </div>
  );
}

function PreOrderButton() {
  return (
    <Button className="rounded-full bg-white text-foreground shadow-[0px_2px_4px_0px_rgba(0,0,0,0.04),0px_1px_2px_0px_rgba(0,0,0,0.06),0px_0px_1px_0px_rgba(0,0,0,0.06)]">
      Pre-order for $199 <span className="line-through opacity-50">$299</span>
    </Button>
  );
}

const STYLE_TABS = ["Default", "Brutalist", "Glass"] as const;
const CYCLE_DURATION = 4000;

function StyleTabs() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STYLE_TABS.length);
    }, CYCLE_DURATION);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-8 flex items-center justify-center gap-[20px]">
      {STYLE_TABS.map((label, i) => {
        const isActive = i === activeIndex;

        return (
          <div
            key={label}
            className="relative flex w-[56px] shrink-0 flex-col content-stretch items-center gap-[4px]"
          >
            <p
              className={`relative w-full shrink-0 text-center text-[14px] leading-[1.43] font-medium whitespace-pre-wrap not-italic transition-colors duration-300 ${
                isActive ? "text-[#0485f7]" : "text-[#71717a]"
              }`}
            >
              {label}
            </p>
            <div className="relative h-[4px] w-full shrink-0 overflow-hidden rounded-[8px]">
              <div className="absolute inset-0 rounded-[8px] bg-[#e4e4e7]" />
              {!!isActive && (
                <div
                  key={activeIndex}
                  className="absolute inset-0 origin-left rounded-[8px]"
                  style={{
                    animation: `progress-gradient ${CYCLE_DURATION}ms linear forwards`,
                    backgroundImage:
                      "linear-gradient(92.4969deg, rgb(60, 147, 241) 20.482%, rgba(255, 255, 255, 0) 98.948%)",
                  }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function StyleSelector() {
  return <StyleTabs />;
}

const PRE_SALE_END = new Date(env.NEXT_PUBLIC_PRE_SALE_END_DATE ?? "2026-03-30T00:00:00");

function getTimeRemaining() {
  const now = new Date();
  const diff = Math.max(0, PRE_SALE_END.getTime() - now.getTime());
  const totalSeconds = Math.floor(diff / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");

  return {
    days: pad(Math.floor(totalSeconds / 86400)),
    hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
  };
}

function Countdown({long}: {long?: boolean}) {
  const [time, setTime] = useState(getTimeRemaining);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeRemaining()), 1000);

    return () => clearInterval(id);
  }, []);

  if (long) {
    return (
      <span className="tabular-nums">
        <span className="font-normal text-[#71717a]">Pre-sale closes in</span>{" "}
        <span className="font-medium text-[#18181b]">
          <Calligraph animation="snappy" variant="number">
            {time.days}
          </Calligraph>{" "}
          days{" "}
          <Calligraph animation="snappy" variant="number">
            {time.hours}
          </Calligraph>{" "}
          hours{" "}
          <Calligraph animation="snappy" variant="number">
            {time.minutes}
          </Calligraph>{" "}
          minutes{" "}
          <Calligraph animation="snappy" variant="number">
            {time.seconds}
          </Calligraph>{" "}
          seconds
        </span>
        <span className="font-normal text-[#71717a]">. Prices increase at launch.</span>
      </span>
    );
  }

  return (
    <span className="tabular-nums">
      Pre-sale ends in{" "}
      <Calligraph animation="snappy" variant="number">
        {time.days}
      </Calligraph>
      d{" "}
      <Calligraph animation="snappy" variant="number">
        {time.hours}
      </Calligraph>
      h{" "}
      <Calligraph animation="snappy" variant="number">
        {time.minutes}
      </Calligraph>
      m{" "}
      <Calligraph animation="snappy" variant="number">
        {time.seconds}
      </Calligraph>
      s
    </span>
  );
}

export {Countdown, DesktopMockup, MobileMockup, HeroHeading, PreOrderButton, StyleSelector};
