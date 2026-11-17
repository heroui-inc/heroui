"use client";

import {ArrowRight} from "@gravity-ui/icons";

import {getProHref, useProOffer} from "@/app/[lang]/(home)/components/pro-banner";
import {SHOW_BANNER} from "@/app/[lang]/(home)/components/pro-constants";
import {useDictionary} from "@/hooks/use-dictionary";
import {cn} from "@/utils/cn";

/** HeroUI Pro promo at the bottom of the "On this page" column. The whole card is the link. */
export function TocProCard({className}: {className?: string}) {
  const dict = useDictionary().proBanner;
  const {campaign, hasLiveDiscount} = useProOffer();

  if (!SHOW_BANNER) return null;

  const title = hasLiveDiscount ? dict.discount.cardTitle : dict.default.cardTitle;
  const description = hasLiveDiscount ? dict.discount.cardDescription : dict.default.headerDetail;
  const cta = hasLiveDiscount ? dict.discount.cta : dict.default.cta;

  return (
    <a
      data-soft-pill-host=""
      data-toc-promo=""
      href={getProHref("docs_toc", campaign)}
      rel="noopener noreferrer"
      target="_blank"
      className={cn(
        // 16px above, like "On this page" → first item (TOC scroll padding + column gap).
        "flex flex-col items-start gap-1.5 rounded-2xl bg-(--docs-promo) p-4 [[data-toc-resources]+&]:mt-3",
        className,
      )}
    >
      <span className="text-sm leading-5 font-semibold text-balance text-foreground">{title}</span>
      <span className="line-clamp-3 text-[13px] leading-5 text-(--docs-fg-muted)">
        {description}
      </span>
      <span className="docs-soft-pill mt-2 inline-flex h-7 items-center gap-1 rounded-full ps-3 pe-2.5 text-xs font-medium">
        {cta}
        <ArrowRight className="size-3 rtl:rotate-180" />
      </span>
    </a>
  );
}
