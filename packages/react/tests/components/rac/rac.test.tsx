import {
  DisclosureStateContext as RacDisclosureStateContext,
  Focusable as RacFocusable,
  I18nProvider as RacI18nProvider,
  OverlayTriggerStateContext as RacOverlayTriggerStateContext,
  Pressable as RacPressable,
} from "react-aria-components";

import {
  DisclosureStateContext,
  Focusable,
  I18nProvider,
  OverlayTriggerStateContext,
  Pressable,
} from "@/components/rac";

describe("RAC re-exports", () => {
  it("exposes Pressable, Focusable, and overlay/disclosure state contexts from HeroUI's react-aria-components instance", () => {
    expect(Pressable).toBe(RacPressable);
    expect(Focusable).toBe(RacFocusable);
    expect(OverlayTriggerStateContext).toBe(RacOverlayTriggerStateContext);
    expect(DisclosureStateContext).toBe(RacDisclosureStateContext);
    expect(I18nProvider).toBe(RacI18nProvider);
  });
});
