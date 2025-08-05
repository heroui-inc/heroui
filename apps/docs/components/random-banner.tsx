"use client";

import {useState, useEffect} from "react";

import {HeroUIChatBanner} from "@/components/heroui-chat-banner";
import {ProBanner} from "@/components/pro-banner";

export const RandomBanner = () => {
  const [showChatBanner, setShowChatBanner] = useState<boolean | null>(null);

  useEffect(() => {
    const bannerCount = parseInt(sessionStorage.getItem("bannerCount") || "0", 10);

    const shouldShowChat = bannerCount % 2 === 0;

    setShowChatBanner(shouldShowChat);

    sessionStorage.setItem("bannerCount", String(bannerCount + 1));
  }, []);

  if (showChatBanner === null) {
    return <div className="h-[47px] sm:h-[46px] border-b border-divider" />;
  }

  return showChatBanner ? <HeroUIChatBanner /> : <ProBanner />;
};
