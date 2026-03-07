"use client";

import {Button} from "@heroui/react";
import {useEffect, useState} from "react";

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
    <div className="relative mx-auto h-[567px] w-full max-w-5xl overflow-clip rounded-4xl bg-default">
      <WindowDots />
    </div>
  );
}

function MobileMockup() {
  return (
    <div className="relative mx-auto h-[652px] w-[299px] overflow-clip rounded-4xl bg-default">
      <div className="absolute top-[17px] left-[108px] h-[18px] w-[84px] rounded-full bg-default" />
    </div>
  );
}

function HeroSubtitle() {
  return (
    <div className="relative mt-2 flex shrink-0 content-stretch items-center justify-center pl-[2px]">
      <p className="relative w-full max-w-lg shrink-0 text-center text-base leading-[normal] font-medium whitespace-pre-wrap text-muted">
        HeroUI Pro brings components, AI tools, templates, and a refined UI system together so your
        product looks right from day zero.
      </p>
    </div>
  );
}

function HeroHeading() {
  return (
    <div className="mx-auto mt-6 flex w-full max-w-5xl flex-col items-center justify-center gap-1.5 px-6">
      <div className="font-heading w-full text-center text-7xl leading-[0.9] font-medium tracking-[-1.08px] whitespace-pre-wrap text-foreground">
        <p className="mb-0">Build faster</p>
        <p className="text-muted/70">Look better</p>
      </div>
      <HeroSubtitle />
    </div>
  );
}

function PreOrderButton() {
  const handleClick = () => {
    document.getElementById("pricing")?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <Button className="bg-white text-black shadow-surface" onPress={handleClick}>
      Pre-order for $149 <span className="line-through opacity-50">$299</span>
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
    <div className="mt-8 flex items-center justify-center gap-5">
      {STYLE_TABS.map((label, i) => {
        const isActive = i === activeIndex;

        return (
          <div
            key={label}
            className="relative flex w-14 shrink-0 flex-col content-stretch items-center gap-1"
          >
            <p
              className={`relative w-full shrink-0 text-center text-sm leading-[1.43] font-medium whitespace-pre-wrap transition-colors duration-300 ${
                isActive ? "text-accent" : "text-muted"
              }`}
            >
              {label}
            </p>
            <div className="relative h-1 w-full shrink-0 overflow-hidden rounded-lg">
              <div className="absolute inset-0 rounded-lg bg-separator" />
              {!!isActive && (
                <div
                  key={activeIndex}
                  className="absolute inset-0 origin-left rounded-lg"
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

export {DesktopMockup, MobileMockup, HeroHeading, PreOrderButton, StyleSelector};
