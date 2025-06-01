"use client";

import React, {useCallback, useEffect} from "react";
import Script from "next/script";
import {Image} from "@heroui/react";

import carbonOptimize from "./carbon-optimize";

import {loadScript} from "@/utils/scripts";
import {useIsMounted} from "@/hooks/use-is-mounted";
import {__PROD__, __ENABLE_ADS__} from "@/utils";

const EA_PROVIDER_RATIO = 0.85;
const INTERNAL_AD_ENABLED = true;

const INTERNAL_AD_INFO = {
  description: "Join our hackathon, $6k in prizes + 3 months of HeroUI Chat Pro! ↗",
  title: "Hackathon #HeroHack",
  img: "https://heroui-chat-assets.nyc3.cdn.digitaloceanspaces.com/herohack.png",
  url: "https://hack.heroui.chat/twitter?utm_source=heroui.com&utm_medium=ad-banner",
};

export const CarbonAd: React.FC<unknown> = () => {
  const carbonRef = React.useRef(null);
  const [showEthicalAds, setShowEthicalAds] = React.useState(false);

  const isMounted = useIsMounted();

  const loadEthicalAds = useCallback(() => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://media.ethicalads.io/media/client/ethicalads.min.js";
      script.async = true;
      script.onload = () => {
        // @ts-ignore
        resolve(window.ethicalads);
      };

      script.onerror = () => {
        resolve(null);
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    });
  }, []);

  useEffect(() => {
    if (INTERNAL_AD_ENABLED) return;

    const shouldShowEthicalAds = Math.random() < EA_PROVIDER_RATIO;

    let loadCarbon: any = null;

    const loadCarbonAds = () => {
      setShowEthicalAds(false);
      // The isolation logic of carbonads is flawed.
      // Once the script starts loading, it will asynchronous resolve, with no way to stop it.
      // This leads to duplication of the ad. To solve the issue, we debounce the load action.
      loadCarbon =
        isMounted &&
        setTimeout(() => {
          const script = loadScript(
            "https://cdn.carbonads.com/carbon.js?serve=CESIC53Y&placement=nextuiorg",
            carbonRef.current,
          );

          script.id = "_carbonads_js";
          carbonOptimize.init();
        });
    };

    const loadAdProvider = async () => {
      if (shouldShowEthicalAds) {
        try {
          const ethicalads = await loadEthicalAds();

          if (!ethicalads) {
            loadCarbonAds();

            return;
          }
          // @ts-ignore
          ethicalads.wait.then((placements) => {
            if (!placements.length) {
              loadCarbonAds();
            } else {
              setShowEthicalAds(true);
            }
          });
        } catch {
          loadCarbonAds();
        }
      } else {
        loadCarbonAds();
      }
    };

    loadAdProvider();

    return () => {
      loadCarbon && clearTimeout(loadCarbon);
    };
  }, [isMounted]);

  if (INTERNAL_AD_ENABLED) {
    return (
      <div className="px-2 not-prose hover:opacity-80 transition-[opacity] duration-200 carbon-ad-container max-h-[100px] min-h-[100px] h-[100px] m-0 p-0">
        <a
          className="group flex items-center flex gap-4 h-full"
          href={INTERNAL_AD_INFO.url}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Image
            removeWrapper
            alt="Product Hunt"
            className="m-0 w-[120px] h-[80px] object-cover rounded-[8px]"
            src={INTERNAL_AD_INFO.img}
          />
          <div className="flex flex-col gap-0.5 pointer-events-none">
            <div className="text-small md:text-medium font-medium no-underline">
              {INTERNAL_AD_INFO.title}
            </div>
            <div className="text-tiny md:text-small text-default-500">
              {INTERNAL_AD_INFO.description}
            </div>
          </div>
        </a>
      </div>
    );
  }

  if (!__PROD__ || !__ENABLE_ADS__) return null;

  return (
    <>
      <>
        <Script async src="https://media.ethicalads.io/media/client/ethicalads.min.js" />
        <div
          className="ea-container horizontal"
          data-ea-campaign-types="paid|publisher-house|community"
          data-ea-publisher="nextuiorg"
          data-ea-type="image"
          style={{display: showEthicalAds ? "block" : "none"}}
        />
      </>
      <div
        className="carbon-ad-container max-h-[120px] p-0"
        style={{display: showEthicalAds ? "none" : "block"}}
      >
        <span ref={carbonRef} id="carbon-ad" />
      </div>
    </>
  );
};
