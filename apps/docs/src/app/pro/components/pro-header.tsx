"use client";

import Link from "next/link";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

import {HeroUILogo} from "@/components/heroui-logo";

import {PreOrderButton} from "./hero-section";

export default function ProHeader() {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  const updateScrolled = useCallback(() => {
    setScrolled(window.scrollY > 20);
    ticking.current = false;
  }, []);

  useLayoutEffect(updateScrolled, [updateScrolled]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateScrolled]);

  return (
    <header className="sticky top-0 z-50 flex w-full justify-center px-6 py-4">
      <div
        className={`flex w-full items-center justify-between transition-all duration-300 ${
          scrolled
            ? "max-w-3xl rounded-full bg-surface-secondary/80 px-6 py-3 shadow-[inset_0_0_0_1px_var(--border)] backdrop-blur-lg"
            : "max-w-5xl px-0 py-0"
        }`}
      >
        <Link href="/">
          <HeroUILogo />
        </Link>
        <div className="flex items-center gap-4">
          <Link className="text-sm font-medium text-muted" href="/docs">
            Start for free
          </Link>
          <PreOrderButton />
        </div>
      </div>
    </header>
  );
}
