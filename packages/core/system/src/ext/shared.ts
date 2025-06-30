import type {HTMLAttributeAnchorTarget, HTMLAttributeReferrerPolicy} from "react";

export interface RouterConfig {}

export type Href = RouterConfig extends {href: infer H} ? H : string;

export type RouterOptions = RouterConfig extends {routerOptions: infer O} ? O : never;

export interface LinkDOMProps {
  /** A URL to link to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#href). */
  href?: Href;
  /** Hints at the human language of the linked URL. See[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#hreflang). */
  hrefLang?: string;
  /** The target window for the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#target). */
  target?: HTMLAttributeAnchorTarget;
  /** The relationship between the linked resource and the current page. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/rel). */
  rel?: string;
  /** Causes the browser to download the linked URL. A string may be provided to suggest a file name. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#download). */
  download?: boolean | string;
  /** A space-separated list of URLs to ping when the link is followed. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#ping). */
  ping?: string;
  /** How much of the referrer to send when following the link. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#referrerpolicy). */
  referrerPolicy?: HTMLAttributeReferrerPolicy;
  /** Options for the configured client side router. */
  routerOptions?: RouterOptions;
}

/** Any focusable element, including both HTML and SVG elements. */
export interface FocusableElement extends Element, HTMLOrSVGElement {}
