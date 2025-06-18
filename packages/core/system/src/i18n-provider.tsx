import type {ReactNode} from "react";

import React, {useEffect, useMemo, useState} from "react";

import {useIsSSR} from "./ssr-provider";

export type Direction = "ltr" | "rtl";

export interface I18nProviderProps {
  children: ReactNode;
  locale?: string;
}

export interface Locale {
  locale: string;
  direction: Direction;
}

const RTL_SCRIPTS = new Set([
  "Arab",
  "Syrc",
  "Samr",
  "Mand",
  "Thaa",
  "Mend",
  "Nkoo",
  "Adlm",
  "Rohg",
  "Hebr",
]);

const RTL_LANGS = new Set([
  "ae",
  "ar",
  "arc",
  "bcc",
  "bqi",
  "ckb",
  "dv",
  "fa",
  "glk",
  "he",
  "ku",
  "mzn",
  "nqo",
  "pnb",
  "ps",
  "sd",
  "ug",
  "ur",
  "yi",
]);

export function isRTL(localeString: string): boolean {
  if (Intl.Locale) {
    let locale = new Intl.Locale(localeString).maximize();
    let textInfo =
      // @ts-ignore
      typeof locale.getTextInfo === "function" ? locale.getTextInfo() : locale.textInfo;

    if (textInfo) {
      return textInfo.direction === "rtl";
    }
    if (locale.script) {
      return RTL_SCRIPTS.has(locale.script);
    }
  }
  let lang = localeString.split("-")[0];

  return RTL_LANGS.has(lang);
}

const localeSymbol = Symbol.for("react-aria.i18n.locale");

const I18nContext = React.createContext<Locale | null>(null);

export function getDefaultLocale(): Locale {
  let locale =
    (typeof window !== "undefined" && window[localeSymbol]) ||
    // @ts-ignore
    (typeof navigator !== "undefined" && (navigator.language || navigator.userLanguage)) ||
    "en-US";

  try {
    Intl.DateTimeFormat.supportedLocalesOf([locale]);
  } catch {
    locale = "en-US";
  }

  return {
    locale,
    direction: isRTL(locale) ? "rtl" : "ltr",
  };
}

let currentLocale = getDefaultLocale();

let listeners = new Set<(locale: Locale) => void>();

function updateLocale() {
  currentLocale = getDefaultLocale();
  for (let listener of listeners) {
    listener(currentLocale);
  }
}

export function useDefaultLocale(): Locale {
  let isSSR = useIsSSR();
  let [defaultLocale, setDefaultLocale] = useState(currentLocale);

  useEffect(() => {
    if (listeners.size === 0) {
      window.addEventListener("languagechange", updateLocale);
    }
    listeners.add(setDefaultLocale);

    return () => {
      listeners.delete(setDefaultLocale);
      if (listeners.size === 0) {
        window.removeEventListener("languagechange", updateLocale);
      }
    };
  }, []);

  if (isSSR) {
    return {
      locale: "en-US",
      direction: "ltr",
    };
  }

  return defaultLocale;
}

export function I18nProvider(props: I18nProviderProps): JSX.Element {
  let {locale, children} = props;
  let defaultLocale = useDefaultLocale();
  let value: Locale = useMemo(() => {
    if (!locale) {
      return defaultLocale;
    }

    return {
      locale,
      direction: isRTL(locale) ? "rtl" : "ltr",
    };
  }, [defaultLocale, locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
