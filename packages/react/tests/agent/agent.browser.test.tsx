import type {AgentComponent} from "@/agent";

import {render} from "@heroui/testing/browser";
import {page} from "vitest/browser";

import {createAgent} from "@/agent";

import {PickersFixture, SettingsFixture} from "./fixtures";

import "@/styles.css";

const byLabel = (components: AgentComponent[], label: string) =>
  components.find((component) => component.label === label);

describe("Agent bridge (browser)", () => {
  it("supports reading and changing every field with real layout and focus", async () => {
    await render(<SettingsFixture />);

    const agent = createAgent();
    const before = agent.snapshot();

    // Closed accordion content and the unopened modal are not rendered, so they stay out.
    expect(byLabel(before, "Webhook URL")).toBeUndefined();
    expect(byLabel(before, "Email")).toBeUndefined();
    expect(byLabel(before, "Recovery code")).toBeUndefined();
    expect(byLabel(before, "Region")).toMatchObject({component: "select", value: "europe"});

    const result = await agent.act({
      steps: [
        {action: "setValue", args: ["Atlas"], ref: "Project name"},
        {action: "setValue", args: ["North America"], ref: "Region"},
        {action: "setValue", args: ["Grace Hopper"], ref: "Owner"},
        {action: "setChecked", args: [true], ref: "Email notifications"},
        {action: "setChecked", args: [true], ref: "Public project"},
        {action: "setValue", args: ["Pro"], ref: "Plan"},
        {action: "setValue", args: [70], ref: "Volume"},
        {action: "setValue", args: [8], ref: "Seats"},
        {action: "setValue", args: ["2026-03-15"], ref: "Due date"},
        {action: "setValue", args: ["Billing"], ref: "Sections"},
      ],
    });

    expect(result.error).toBeUndefined();
    expect(Object.entries(result.values)).toEqual(
      expect.arrayContaining([
        [expect.stringMatching(/Project name$/), "Atlas"],
        [expect.stringMatching(/Region$/), "north-america"],
        [expect.stringMatching(/Owner$/), "Grace Hopper"],
        [expect.stringMatching(/Email notifications$/), true],
        [expect.stringMatching(/Public project$/), true],
        [expect.stringMatching(/Plan$/), "pro"],
        [expect.stringMatching(/Volume$/), 70],
        [expect.stringMatching(/Seats$/), "8"],
        [expect.stringMatching(/Due date$/), "2026-03-15"],
        [expect.stringMatching(/Sections$/), "billing"],
      ]),
    );
    await expect
      .element(page.getByRole("button", {name: /Region/}))
      .toHaveTextContent("North America");
    await expect
      .element(page.getByRole("tab", {name: "Billing"}))
      .toHaveAttribute("aria-selected", "true");
  });

  it("supports popups: a menu item, then a modal that traps focus", async () => {
    const onMenuAction = vi.fn();

    await render(<SettingsFixture onMenuAction={onMenuAction} />);

    const agent = createAgent();
    const menu = await agent.act({
      steps: [{action: "press", args: ["Duplicate"], ref: "More actions"}],
    });

    expect(menu.error).toBeUndefined();
    expect(onMenuAction.mock.calls[0]?.[0]).toBe("duplicate");

    const opened = await agent.act({steps: [{action: "press", ref: "Invite member"}]});

    expect(opened.appeared).toEqual(
      expect.arrayContaining([
        expect.objectContaining({component: "modal", label: "Invite a member"}),
        expect.objectContaining({component: "text-field", label: "Email"}),
      ]),
    );

    const closed = await agent.act({
      steps: [
        {action: "setValue", args: ["ada@example.com"], ref: "Email"},
        {action: "close", ref: "Invite a member"},
      ],
    });

    expect(closed.error).toBeUndefined();
    await expect.element(page.getByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports revealing an accordion section before filling it", async () => {
    await render(<SettingsFixture />);

    const result = await createAgent().act({
      steps: [
        {action: "setOpen", args: [true], ref: "Advanced"},
        {action: "setValue", args: ["https://example.com/hook"], ref: "Webhook URL"},
      ],
    });

    expect(result.error).toBeUndefined();
    await expect
      .element(page.getByRole("textbox", {name: "Webhook URL"}))
      .toHaveValue("https://example.com/hook");
  });

  it("supports dates, a date range, a time, and a searchable list in a real browser", async () => {
    const onRangeChange = vi.fn();
    const onTimeChange = vi.fn();
    const onStateChange = vi.fn();

    await render(
      <PickersFixture
        onRangeChange={onRangeChange}
        onStateChange={onStateChange}
        onTimeChange={onTimeChange}
      />,
    );

    const agent = createAgent();
    const result = await agent.act({
      steps: [
        {action: "setValue", args: ["2026-03-01"], ref: "Launch date"},
        {action: "setValue", args: [{end: "2026-04-09", start: "2026-04-02"}], ref: "Trip dates"},
        {action: "setValue", args: ["14:05"], ref: "Standup time"},
        {action: "setValue", args: ["Texas"], ref: "State"},
      ],
    });

    expect(result.error).toBeUndefined();
    expect(result.values).toMatchObject({
      "c1 Launch date": "2026-03-01",
      "c2 Trip dates": {end: "2026-04-09", start: "2026-04-02"},
      "c3 Standup time": "14:05",
      "c4 State": "texas",
    });
    expect(String(onTimeChange.mock.calls.at(-1)?.[0])).toBe("14:05:00");
    expect(onStateChange.mock.calls.at(-1)?.[0]).toBe("texas");
    expect(String((onRangeChange.mock.calls.at(-1)?.[0] as {end: unknown}).end)).toBe("2026-04-09");
  });
});
