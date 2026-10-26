import type {TabsProps} from "@/components/tabs";
import type {Root} from "react-dom/client";

import {render} from "@heroui/testing/browser";
import {StrictMode, startTransition, useEffect} from "react";
import {hydrateRoot} from "react-dom/client";
import {renderToString} from "react-dom/server";
import {page} from "vitest/browser";

import {Tabs} from "@/components/tabs";

import "@/styles.css";

const Example = ({
  onHydrated,
  ...props
}: Omit<Partial<TabsProps>, "children"> & {onHydrated?: () => void}) => {
  useEffect(() => {
    onHydrated?.();
  }, [onHydrated]);

  return (
    <Tabs style={{width: 448}} {...props}>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab id="overview">
            overview
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="analytics">
            analytics
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab id="reports">
            reports
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="overview">Overview panel</Tabs.Panel>
      <Tabs.Panel id="analytics">Analytics panel</Tabs.Panel>
      <Tabs.Panel id="reports">Reports panel</Tabs.Panel>
    </Tabs>
  );
};

const nextFrames = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });

const indicatorOf = (tab: Element) =>
  tab.querySelector<HTMLElement>('[data-slot="tabs-indicator"]')!;

const expectAligned = (tab: Element) => {
  const indicator = indicatorOf(tab).getBoundingClientRect();
  const target = tab.getBoundingClientRect();

  expect(Math.abs(indicator.left - target.left)).toBeLessThan(1);
  expect(Math.abs(indicator.top - target.top)).toBeLessThan(1);
  expect(Math.abs(indicator.width - target.width)).toBeLessThan(1);
  expect(Math.abs(indicator.height - target.height)).toBeLessThan(1);
};

describe("Tabs (browser)", () => {
  it.each(["defaultSelectedKey", "selectedKey"] as const)(
    "renders the indicator on the initially selected tab after hydrating %s",
    async (selectionProp) => {
      const onHydrated = vi.fn();
      const ui = (
        <StrictMode>
          <Example onHydrated={onHydrated} {...{[selectionProp]: "analytics"}} />
        </StrictMode>
      );
      const container = document.createElement("div");
      const onRecoverableError = vi.fn();
      let root: Root | undefined;

      container.innerHTML = renderToString(ui);
      document.body.appendChild(container);

      try {
        startTransition(() => {
          root = hydrateRoot(container, ui, {onRecoverableError});
        });
        await expect
          .element(page.getByRole("tab", {name: "analytics", exact: true}))
          .toHaveAttribute("aria-selected", "true");
        // The selected state already exists in server HTML. Wait for client effects
        // before measuring so this cannot pass against the pre-hydration DOM.
        await expect.poll(() => onHydrated.mock.calls.length).toBeGreaterThan(0);
        await nextFrames();

        const selectedTab = page.getByRole("tab", {name: "analytics", exact: true});

        await expect
          .poll(() => getComputedStyle(indicatorOf(selectedTab.element())).transitionProperty)
          .toContain("translate");
        const tab = selectedTab.element();

        // Wait for any initial transition to finish before checking its final position.
        await Promise.all(
          indicatorOf(tab)
            .getAnimations()
            .map((animation) => animation.finished),
        );
        expect(tab).toHaveAttribute("aria-selected", "true");
        expectAligned(tab);
        expect(onRecoverableError).not.toHaveBeenCalled();
      } finally {
        root?.unmount();
        container.remove();
      }
    },
  );

  it("supports animated selection after delayed mounting in Strict Mode", async () => {
    const screen = await render(<StrictMode>{null}</StrictMode>);

    await nextFrames();
    await screen.rerender(
      <StrictMode>
        <Example defaultSelectedKey="analytics" />
      </StrictMode>,
    );
    await nextFrames();

    const analytics = page.getByRole("tab", {name: "analytics", exact: true}).element();

    expectAligned(analytics);
    expect(getComputedStyle(indicatorOf(analytics)).transitionProperty).toContain("translate");

    const transitions: string[] = [];
    const list = page.getByRole("tablist").element();
    const onTransitionRun = (event: Event) => {
      if ((event.target as Element).matches('[data-slot="tabs-indicator"]')) {
        transitions.push((event as TransitionEvent).propertyName);
      }
    };

    list.addEventListener("transitionrun", onTransitionRun);

    try {
      await page.getByRole("tab", {name: "reports", exact: true}).click();
      await expect.poll(() => transitions).toContain("translate");

      const reports = page.getByRole("tab", {name: "reports", exact: true}).element();

      await expect
        .poll(() => {
          expectAligned(reports);

          return reports.getAttribute("aria-selected");
        })
        .toBe("true");
    } finally {
      list.removeEventListener("transitionrun", onTransitionRun);
    }
  });
});
