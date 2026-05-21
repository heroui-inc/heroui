/**
 * Discriminated union describing which screen the QR code should deep-link
 * into when the native HeroUI app intercepts the URL.
 *
 * - `target: "auto"` derives the slug from `usePathname()` inside the
 *   popover. Only valid on pages whose URL matches `/native/components/{slug}`.
 *   Using it elsewhere throws in development to surface the bug at edit time;
 *   in production it silently falls back to the home target so a missed MDX
 *   edit never breaks a live page.
 * - `target: "home"` opens the app's home screen. Encoded as
 *   `${origin}${SHOWCASE_PATH_PREFIX}/` (trailing slash), which is matched
 *   by Apple's `*` glob in apple-app-site-association.
 * - `target: "component"` deep-links to an explicit component, even when the
 *   surrounding page is NOT a component page (e.g. release notes that demo
 *   `area-chart`).
 *
 * Required at every level - both the `QRPreviewPopover` itself and the
 * wrapper components (`VideoPlayerView`, `ImageHeroView`). There is no
 * default value. The whole point is to force every call site to make a
 * deliberate choice so the deep-link can never silently encode the wrong
 * screen.
 */
export type NativeQRPreviewTarget =
  | {target: "auto"}
  | {target: "home"}
  | {target: "component"; slug: string};

/**
 * Narrow a larger props object (e.g. wrapper-component props that also carry
 * video URLs, CSS classes, etc.) down to the popover's `NativeQRPreviewTarget`
 * shape. Reconstructs the discriminator so the popover receives ONLY the
 * fields it expects - no leaked `srcLight`, `showQRCode`, etc.
 *
 * @param props - Any object that satisfies {@link NativeQRPreviewTarget}.
 * @returns A clean {@link NativeQRPreviewTarget} ready to spread onto the
 *   popover.
 */
export function pickNativeQRTarget(props: NativeQRPreviewTarget): NativeQRPreviewTarget {
  if (props.target === "component") {
    return {slug: props.slug, target: "component"};
  }

  return {target: props.target};
}
