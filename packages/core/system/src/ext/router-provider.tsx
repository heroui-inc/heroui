// Partial code from react-spectrum to avoid importing the entire package
// ref: packages/@react-aria/utils/src/openLink.tsx
// ref: packages/@react-aria/utils/src/focusWithoutScrolling.ts

import type {Href, RouterOptions, FocusableElement} from "./shared";
import type {JSX, ReactNode} from "react";

import {createContext, useMemo} from "react";

interface Modifiers {
  metaKey?: boolean;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
}

interface Router {
  isNative: boolean;
  open: (
    target: Element,
    modifiers: Modifiers,
    href: Href,
    routerOptions: RouterOptions | undefined,
  ) => void;
  useHref: (href: Href) => string;
}

interface RouterProviderProps {
  navigate: (path: Href, routerOptions: RouterOptions | undefined) => void;
  useHref?: (href: Href) => string;
  children: ReactNode;
}

// This is a polyfill for element.focus({preventScroll: true});
// Currently necessary for Safari and old Edge:
// https://caniuse.com/#feat=mdn-api_htmlelement_focus_preventscroll_option
// See https://bugs.webkit.org/show_bug.cgi?id=178583
//

// Original licensing for the following methods can be found in the
// NOTICE file in the root directory of this source tree.
// See https://github.com/calvellido/focus-options-polyfill
interface ScrollableElement {
  element: HTMLElement;
  scrollTop: number;
  scrollLeft: number;
}

const RouterContext = createContext<Router>({
  isNative: true,
  open: openSyntheticLink,
  useHref: (href) => href,
});

let supportsPreventScrollCached: boolean | null = null;

function supportsPreventScroll() {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;
    try {
      let focusElem = document.createElement("div");

      focusElem.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;

          return true;
        },
      });
    } catch {
      // Ignore
    }
  }

  return supportsPreventScrollCached;
}

function focusWithoutScrolling(element: FocusableElement): void {
  if (supportsPreventScroll()) {
    element.focus({preventScroll: true});
  } else {
    let scrollableElements = getScrollableElements(element);

    element.focus();
    restoreScrollPosition(scrollableElements);
  }
}

function getScrollableElements(element: FocusableElement): ScrollableElement[] {
  let parent = element.parentNode;
  let scrollableElements: ScrollableElement[] = [];
  let rootScrollingElement = document.scrollingElement || document.documentElement;

  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      });
    }
    parent = parent.parentNode;
  }

  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    });
  }

  return scrollableElements;
}

function restoreScrollPosition(scrollableElements: ScrollableElement[]) {
  for (let {element, scrollTop, scrollLeft} of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
}

function cached(fn: () => boolean) {
  if (process.env.NODE_ENV === "test") {
    return fn;
  }

  let res: boolean | null = null;

  return () => {
    if (res == null) {
      res = fn();
    }

    return res;
  };
}

function testUserAgent(re: RegExp) {
  if (typeof window === "undefined" || window.navigator == null) {
    return false;
  }

  return (
    window.navigator["userAgentData"]?.brands.some((brand: {brand: string; version: string}) =>
      re.test(brand.brand),
    ) || re.test(window.navigator.userAgent)
  );
}

function testPlatform(re: RegExp) {
  return typeof window !== "undefined" && window.navigator != null
    ? re.test(window.navigator["userAgentData"]?.platform || window.navigator.platform)
    : false;
}

const isChrome = cached(function () {
  return testUserAgent(/Chrome/i);
});

const isWebKit = cached(function () {
  return testUserAgent(/AppleWebKit/i) && !isChrome();
});

const isMac = cached(function () {
  return testPlatform(/^Mac/i);
});

const isFirefox = cached(function () {
  return testUserAgent(/Firefox/i);
});

const isIPad = cached(function () {
  return testPlatform(/^iPad/i) || (isMac() && navigator.maxTouchPoints > 1);
});

export function RouterProvider(props: RouterProviderProps): JSX.Element {
  let {children, navigate, useHref} = props;

  let ctx = useMemo(
    () => ({
      isNative: false,
      open: (
        target: Element,
        modifiers: Modifiers,
        href: Href,
        routerOptions: RouterOptions | undefined,
      ) => {
        getSyntheticLink(target, (link) => {
          if (shouldClientNavigate(link, modifiers)) {
            navigate(href, routerOptions);
          } else {
            openLink(link, modifiers);
          }
        });
      },
      useHref: useHref || ((href) => href),
    }),
    [navigate, useHref],
  );

  return <RouterContext.Provider value={ctx}>{children}</RouterContext.Provider>;
}

function shouldClientNavigate(link: HTMLAnchorElement, modifiers: Modifiers): boolean {
  let target = link.getAttribute("target");

  return (
    (!target || target === "_self") &&
    link.origin === location.origin &&
    !link.hasAttribute("download") &&
    !modifiers.metaKey &&
    !modifiers.ctrlKey &&
    !modifiers.altKey &&
    !modifiers.shiftKey
  );
}

function openLink(target: HTMLAnchorElement, modifiers: Modifiers, setOpening = true): void {
  let {metaKey, ctrlKey, altKey, shiftKey} = modifiers;

  if (isFirefox() && window.event?.type?.startsWith("key") && target.target === "_blank") {
    if (isMac()) {
      metaKey = true;
    } else {
      ctrlKey = true;
    }
  }

  let event =
    isWebKit() && isMac() && !isIPad() && process.env.NODE_ENV !== "test"
      ? // @ts-ignore
        new KeyboardEvent("keydown", {keyIdentifier: "Enter", metaKey, ctrlKey, altKey, shiftKey})
      : new MouseEvent("click", {
          metaKey,
          ctrlKey,
          altKey,
          shiftKey,
          bubbles: true,
          cancelable: true,
        });

  (openLink as any).isOpening = setOpening;
  focusWithoutScrolling(target);
  target.dispatchEvent(event);
  (openLink as any).isOpening = false;
}
(openLink as any).isOpening = false;

function getSyntheticLink(target: Element, open: (link: HTMLAnchorElement) => void) {
  if (target instanceof HTMLAnchorElement) {
    open(target);
  } else if (target.hasAttribute("data-href")) {
    let link = document.createElement("a");

    link.href = target.getAttribute("data-href")!;
    if (target.hasAttribute("data-target")) {
      link.target = target.getAttribute("data-target")!;
    }
    if (target.hasAttribute("data-rel")) {
      link.rel = target.getAttribute("data-rel")!;
    }
    if (target.hasAttribute("data-download")) {
      link.download = target.getAttribute("data-download")!;
    }
    if (target.hasAttribute("data-ping")) {
      link.ping = target.getAttribute("data-ping")!;
    }
    if (target.hasAttribute("data-referrer-policy")) {
      link.referrerPolicy = target.getAttribute("data-referrer-policy")!;
    }
    target.appendChild(link);
    open(link);
    target.removeChild(link);
  }
}

function openSyntheticLink(target: Element, modifiers: Modifiers) {
  getSyntheticLink(target, (link) => openLink(link, modifiers));
}
