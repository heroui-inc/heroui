"use client";

import type {NativeQRPreviewTarget} from "./target";

import {Button, Popover} from "@heroui/react";
import {usePathname} from "next/navigation";
import {useState} from "react";

import {NATIVE_APP} from "@/config/native-app";
import {useDictionary} from "@/hooks/use-dictionary";
import {useIsMobileDevice} from "@/hooks/use-is-mobile-device";
import {i18n} from "@/lib/i18n";

import {Iconify} from "../../iconify";
import {DeepLinkQRCode} from "../deep-link-qr-code";
import {StoreButtonsLocalized} from "../store-buttons-localized";

/**
 * Read `window.location.origin` synchronously when running in the browser.
 * Returns the empty string on the server so SSR markup is deterministic and
 * hydrates cleanly. Used as a `useState` lazy initialiser to keep the call
 * site free of `useEffect` + `setState` (which triggers React's
 * cascading-render lint warning).
 */
function readOrigin(): string {
  if (typeof window === "undefined") {
    return "";
  }

  return window.location.origin;
}

/**
 * Regex matching the docs-app pathname for an individual Native component
 * page. Group 1 captures the slug. `usePathname()` returns the full browser
 * pathname (the docs site does NOT set a Next.js `basePath` — the leading
 * `/{lang}/docs` is a real route segment from the `[lang]` route param), so
 * the regex must include both the locale prefix and `/docs`. The locale
 * alternation is built from {@link i18n.languages} so the two stay in sync
 * automatically when a new language is added. Fumadocs route groups like
 * `(buttons)` are stripped from the URL, but the optional non-capturing
 * group keeps the regex defensive against any future inclusion.
 */
const COMPONENT_PATHNAME = new RegExp(
  `^/(?:${i18n.languages.join("|")})/docs/native/components/(?:\\([^)]+\\)/)?([^/]+)$`,
);

/**
 * Resolve which native-app screen the QR should deep-link into based on the
 * popover's `target` discriminator and the current page's pathname.
 *
 * The function deliberately returns `""` for the home target (rather than a
 * literal sentinel like `"home"`) because the empty slug is what makes
 * `buildDeepLinkUrl` produce `<prefix>/` — the canonical home URL.
 */
function resolveSlug(target: NativeQRPreviewTarget, pathname: string): string {
  if (target.target === "component") {
    return target.slug;
  }

  if (target.target === "home") {
    return "";
  }

  const match = COMPONENT_PATHNAME.exec(pathname);

  if (match?.[1]) {
    return match[1];
  }

  // We only escalate to a thrown error in the browser during development.
  // Throwing during SSR would break the build; throwing in production would
  // crash a live doc page just because the MDX author forgot to set the
  // target. The console message + graceful fallback to home is the safer
  // production behaviour.
  if (process.env["NODE_ENV"] !== "production" && typeof window !== "undefined") {
    throw new Error(
      [
        `QRPreviewPopover: target="auto" used on a non-component page `,
        `(pathname="${pathname}"). Pass target="home" for the app home screen, `,
        `or target="component" with a slug to deep-link to a specific component.`,
      ].join(""),
    );
  }

  return "";
}

/**
 * Construct the Universal Link URL the QR code (or mobile tap link) encodes.
 * `origin` is supplied at runtime so the URL always reflects the current
 * environment (`localhost:3000` in dev, `heroui.com` in prod, preview URLs in
 * Vercel previews, etc.) without hard-coding the host.
 */
function buildDeepLinkUrl(origin: string, slug: string): string {
  const base = `${origin}${NATIVE_APP.SHOWCASE_PATH_PREFIX}`;

  return slug ? `${base}/${slug}` : `${base}/`;
}

/**
 * QRPreviewPopover renders a "Scan to preview" button on each Native component
 * doc page. On desktop, clicking it opens a popover with a QR code. On mobile,
 * the popover shows a tap-to-open link card instead.
 *
 * The required `target` prop forces the call site to decide whether the QR
 * should deep-link to the current page's component (`"auto"`), the app's
 * home screen (`"home"`), or an explicit component (`"component"` + slug).
 */
export const QRPreviewPopover = (props: NativeQRPreviewTarget) => {
  const dict = useDictionary().qrPreviewPopover;
  const isMobile = useIsMobileDevice();
  const pathname = usePathname();

  // Lazy initializer reads `window.location.origin` once during mount on the
  // client; on the server it returns "" so the markup is identical between
  // SSR and the first client render (no hydration mismatch).
  const [origin] = useState<string>(readOrigin);

  const slug = resolveSlug(props, pathname);
  const deepLinkUrl = origin ? buildDeepLinkUrl(origin, slug) : "";
  const triggerLabel = isMobile ? dict.tapToPreview : dict.scanToPreview;
  const downloadPrompt = dict.downloadPrompt.replace("{name}", NATIVE_APP.NAME);

  return (
    <Popover>
      <Button aria-label={triggerLabel} className="bg-default/70" size="sm" variant="tertiary">
        {!isMobile && <Iconify icon="gravity-ui:qr-code" width={16} />}
        {triggerLabel}
      </Button>
      <Popover.Content className="max-w-[240px] rounded-2xl" offset={6} placement="bottom end">
        <Popover.Dialog className="flex flex-col items-center gap-4 px-5 pb-6">
          <DeepLinkQRCode size={160} url={deepLinkUrl} />
          <span className="mb-2 text-center text-xs text-foreground">{downloadPrompt}</span>
          <StoreButtonsLocalized />
        </Popover.Dialog>
      </Popover.Content>
    </Popover>
  );
};
