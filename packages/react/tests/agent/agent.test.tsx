import type {Agent, AgentChange, AgentComponent} from "@/agent";

import {cleanup, render, screen, setupUser} from "@heroui/testing/helpers";

import {createAgent, getChangeSource} from "@/agent";

import {PickersFixture, RatingFixture, SettingsFixture} from "./fixtures";

const byLabel = (components: AgentComponent[], label: string) =>
  components.find((component) => component.label === label);

const run = (agent: Agent, ...steps: Parameters<Agent["act"]>[0]["steps"]) => agent.act({steps});

const environment = globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean};

describe("Agent bridge", () => {
  // The bridge drives the page the way a browser does, outside any test `act()` scope,
  // so React schedules its work as it would in production.
  beforeEach(() => {
    environment.IS_REACT_ACT_ENVIRONMENT = false;
  });

  afterEach(() => {
    environment.IS_REACT_ACT_ENVIRONMENT = true;
    cleanup();
  });

  describe("snapshot", () => {
    it("exposes components with their label, state, and actions", () => {
      render(<SettingsFixture />);

      const components = createAgent().snapshot();

      expect(byLabel(components, "Project name")).toMatchObject({
        actions: ["clear", "setValue"],
        component: "text-field",
        description: "Shown to your team",
        placeholder: "Name your project",
        value: "Apollo",
      });
      expect(byLabel(components, "Region")).toMatchObject({
        actions: ["setValue"],
        component: "select",
        items: [
          {label: "Europe", value: "europe"},
          {label: "North America", value: "north-america"},
          {label: "Asia Pacific", value: "asia-pacific"},
        ],
        open: false,
        value: "europe",
      });
      expect(byLabel(components, "Email notifications")).toMatchObject({
        checked: false,
        component: "checkbox",
      });
      expect(byLabel(components, "Public project")).toMatchObject({component: "switch"});
      expect(byLabel(components, "Plan")).toMatchObject({component: "radio-group", value: "free"});
      expect(byLabel(components, "Volume")).toMatchObject({max: 100, min: 0, value: 30});
      expect(byLabel(components, "Seats")).toMatchObject({component: "number-field", value: "3"});
      expect(byLabel(components, "Due date")).toMatchObject({value: "2026-01-02"});
      expect(byLabel(components, "Sections")).toMatchObject({component: "tabs", value: "general"});
      expect(byLabel(components, "Advanced")).toMatchObject({component: "accordion", open: false});
      expect(byLabel(components, "More actions")).toMatchObject({component: "menu", open: false});
    });

    it("exposes one entry per component, not one per internal control", () => {
      render(<SettingsFixture />);

      const components = createAgent().snapshot();
      const labels = components.map((component) => component.label);

      // The select trigger, combo box button, steppers, radios, and tabs belong to their parent.
      expect(labels.filter((label) => label === "Region")).toHaveLength(1);
      expect(labels).not.toContain("Free");
      expect(labels).not.toContain("General");
      expect(
        components.some((component) => /Increase|Decrease|suggestions/.test(component.label ?? "")),
      ).toBe(false);
      expect(new Set(components.map((component) => component.ref)).size).toBe(components.length);
    });

    it("exposes stable refs across snapshots", () => {
      render(<SettingsFixture />);

      const agent = createAgent();

      expect(agent.snapshot().map((component) => component.ref)).toEqual(
        agent.snapshot().map((component) => component.ref),
      );
    });

    it("redacts secret values and leaves hidden regions out", () => {
      render(<SettingsFixture />);

      const components = createAgent().snapshot();

      expect(byLabel(components, "Tax ID")?.value).toBe("[redacted]");
      expect(byLabel(components, "Recovery code")).toBeUndefined();
      expect(JSON.stringify(components)).not.toContain("1234-5678");
      expect(JSON.stringify(components)).not.toContain("12-3456789");
    });

    it("exposes confirm marks and closed content stays out", () => {
      render(<SettingsFixture />);

      const components = createAgent().snapshot();

      expect(byLabel(components, "Delete project")?.confirm).toBe(
        "Deletes the project for everyone",
      );
      expect(byLabel(components, "Webhook URL")).toBeUndefined();
      expect(byLabel(components, "Email")).toBeUndefined();
    });
  });

  describe("act", () => {
    it("supports setting values through each component's own change handler", async () => {
      const onNameChange = vi.fn();
      const onRegionChange = vi.fn();

      render(<SettingsFixture onNameChange={onNameChange} onRegionChange={onRegionChange} />);

      const agent = createAgent();
      const result = await run(
        agent,
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
      );

      expect(result.error).toBeUndefined();
      expect(result.ok).toBe(true);
      expect(onNameChange).toHaveBeenLastCalledWith("Atlas");
      expect(onRegionChange).toHaveBeenLastCalledWith("north-america");
      expect(result.steps).toHaveLength(10);
      expect(result.steps[1]?.changes).toEqual([
        expect.objectContaining({key: "value", previous: "europe", value: "north-america"}),
      ]);
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
      expect(screen.getByRole("tab", {name: "Billing"})).toHaveAttribute("aria-selected", "true");
      expect(screen.getByRole("switch")).toBeChecked();
    });

    it("supports refs, case-insensitive labels, and whole-word matches", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();
      const ref = byLabel(agent.snapshot(), "Project name")?.ref ?? "";

      expect((await run(agent, {action: "setValue", args: ["One"], ref})).ok).toBe(true);
      expect((await run(agent, {action: "setValue", args: ["Two"], ref: "project NAME"})).ok).toBe(
        true,
      );
      expect(
        (await run(agent, {action: "setValue", args: ["Three"], ref: "Project"})).values,
      ).toEqual(expect.objectContaining({[`${ref} Project name`]: "Three"}));
    });

    it("reports an unknown item with the real items", async () => {
      render(<SettingsFixture />);

      const result = await run(createAgent(), {action: "setValue", args: ["Mars"], ref: "Region"});

      expect(result.ok).toBe(false);
      expect(result.error).toEqual({
        message: expect.stringMatching(
          /No item "Mars" in Region \(c\d+\)\. Its items: Europe, North America, Asia Pacific\./,
        ),
        step: 0,
      });
    });

    it("reports unknown components, unknown actions, and invalid arguments", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();

      expect((await run(agent, {action: "press", ref: "Launch rocket"})).error?.message).toMatch(
        /No component "Launch rocket" on the page.*Advanced/,
      );
      expect((await run(agent, {action: "open", ref: "Project name"})).error?.message).toMatch(
        /takes no open now\. It takes: clear, setValue\./,
      );
      expect(
        (await run(agent, {action: "setChecked", args: ["yes"], ref: "Public project"})).error
          ?.message,
      ).toBe("Public project takes true or false.");
      expect(
        (await run(agent, {action: "setValue", args: [500], ref: "Volume"})).error?.message,
      ).toBe("Volume takes a number from 0 to 100.");
      expect(
        (await run(agent, {action: "setValue", args: ["tomorrow"], ref: "Due date"})).error
          ?.message,
      ).toBe("Due date takes a date such as 2026-01-31.");
    });

    it("stops at the first failing step and keeps earlier steps applied", async () => {
      render(<SettingsFixture />);

      const result = await run(
        createAgent(),
        {action: "setValue", args: ["Atlas"], ref: "Project name"},
        {action: "setValue", args: ["Mars"], ref: "Region"},
        {action: "setChecked", args: [true], ref: "Public project"},
      );

      expect(result.ok).toBe(false);
      expect(result.error?.step).toBe(1);
      expect(result.steps).toHaveLength(1);
      expect(screen.getByRole("textbox", {name: "Project name"})).toHaveValue("Atlas");
      expect(screen.getByRole("switch")).not.toBeChecked();
    });

    it("supports opening sections and reaching what they reveal", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();
      const result = await run(
        agent,
        {action: "setOpen", args: [true], ref: "Advanced"},
        {action: "setValue", args: ["https://example.com/hook"], ref: "Webhook URL"},
      );

      expect(result.ok).toBe(true);
      expect(result.appeared?.map((component) => component.label)).toContain("Webhook URL");
      expect(screen.getByRole("textbox", {name: "Webhook URL"})).toHaveValue(
        "https://example.com/hook",
      );
    });

    it("supports pressing a menu item by its label", async () => {
      const onMenuAction = vi.fn();

      render(<SettingsFixture onMenuAction={onMenuAction} />);

      const agent = createAgent();

      expect((await run(agent, {action: "press", args: ["Archive"], ref: "More actions"})).ok).toBe(
        true,
      );
      expect(onMenuAction.mock.calls[0]?.[0]).toBe("archive");

      const missing = await run(agent, {action: "press", args: ["Explode"], ref: "More actions"});

      expect(missing.error?.message).toMatch(/No item "Explode".*Its items: Duplicate, Archive\./);
    });

    it("supports dialogs: open, fill, and close", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();
      const opened = await run(agent, {action: "press", ref: "Invite member"});

      expect(opened.appeared).toEqual(
        expect.arrayContaining([
          expect.objectContaining({component: "modal", label: "Invite a member", open: true}),
          expect.objectContaining({component: "text-field", label: "Email"}),
        ]),
      );

      const filled = await run(
        agent,
        {action: "setValue", args: ["ada@example.com"], ref: "Email"},
        {action: "close", ref: "Invite a member"},
      );

      expect(filled.error).toBeUndefined();
      expect(screen.queryByRole("dialog")).toBeNull();
    });
  });

  describe("dates, times, and searchable lists", () => {
    it("exposes each picker as one component named by its label", () => {
      render(<PickersFixture />);

      expect(
        createAgent()
          .snapshot()
          .map(({component, label}) => [component, label]),
      ).toEqual([
        ["date-picker", "Launch date"],
        ["date-range-picker", "Trip dates"],
        ["time-field", "Standup time"],
        ["autocomplete", "State"],
      ]);
    });

    it("supports setting a date picker without opening its calendar", async () => {
      const onDateChange = vi.fn();

      render(<PickersFixture onDateChange={onDateChange} />);

      const result = await run(createAgent(), {
        action: "setValue",
        args: ["2026-03-01"],
        ref: "Launch date",
      });

      expect(result.error).toBeUndefined();
      expect(String(onDateChange.mock.calls.at(-1)?.[0])).toBe("2026-03-01");
    });

    it("supports setting both ends of a date range", async () => {
      const onRangeChange = vi.fn();

      render(<PickersFixture onRangeChange={onRangeChange} />);

      const agent = createAgent();
      const result = await run(agent, {
        action: "setValue",
        args: [{end: "2026-04-09", start: "2026-04-02"}],
        ref: "Trip dates",
      });
      const range = onRangeChange.mock.calls.at(-1)?.[0] as {end: unknown; start: unknown};

      expect(result.error).toBeUndefined();
      expect([String(range.start), String(range.end)]).toEqual(["2026-04-02", "2026-04-09"]);
      expect(byLabel(agent.snapshot(), "Trip dates")?.value).toEqual({
        end: "2026-04-09",
        start: "2026-04-02",
      });
    });

    it.each([
      ["09:30", "09:30:00"],
      ["14:05", "14:05:00"],
      ["00:15", "00:15:00"],
      ["12:00", "12:00:00"],
    ])("supports setting a time field to %s", async (time, expected) => {
      const onTimeChange = vi.fn();

      render(<PickersFixture onTimeChange={onTimeChange} />);

      const agent = createAgent();
      const result = await run(agent, {action: "setValue", args: [time], ref: "Standup time"});

      expect(result.error).toBeUndefined();
      expect(String(onTimeChange.mock.calls.at(-1)?.[0])).toBe(expected);
      expect(byLabel(agent.snapshot(), "Standup time")?.value).toBe(time);
    });

    it("exposes the format a date or time field takes when the value doesn't fit", async () => {
      render(<PickersFixture />);

      const result = await run(
        createAgent(),
        {action: "setValue", args: ["tomorrow"], ref: "Trip dates"},
        {action: "setValue", args: ["9am"], ref: "Standup time"},
      );

      expect(result.error).toEqual({
        message: "Trip dates takes a date such as 2026-01-31.",
        step: 0,
      });

      const time = await run(createAgent(), {
        action: "setValue",
        args: ["9am"],
        ref: "Standup time",
      });

      expect(time.error?.message).toBe("Standup time takes a time such as 09:30.");
    });

    it("supports choosing an autocomplete item by its label", async () => {
      const onStateChange = vi.fn();

      render(<PickersFixture onStateChange={onStateChange} />);

      const result = await run(createAgent(), {action: "setValue", args: ["Texas"], ref: "State"});

      expect(result.error).toBeUndefined();
      expect(onStateChange.mock.calls.at(-1)?.[0]).toBe("texas");
    });
  });

  describe("permissions", () => {
    it("refuses a confirm-marked control when nobody can be asked", async () => {
      const onDelete = vi.fn();

      render(<SettingsFixture onDelete={onDelete} />);

      const result = await run(createAgent(), {action: "press", ref: "Delete project"});

      expect(result.error?.message).toBe(
        'Needs a person: "Deletes the project for everyone". Ask them to use "Delete project" themselves.',
      );
      expect(onDelete).not.toHaveBeenCalled();
    });

    it("calls allow with the resolved action and waits for its answer", async () => {
      const onDelete = vi.fn();
      const allow = vi.fn(async (action: {confirm?: string}) => action.confirm === undefined);

      render(<SettingsFixture onDelete={onDelete} />);

      const agent = createAgent({allow});

      expect(
        (await run(agent, {action: "setValue", args: ["Asia Pacific"], ref: "Region"})).ok,
      ).toBe(true);
      expect(allow).toHaveBeenLastCalledWith(
        expect.objectContaining({
          action: "setValue",
          args: ["asia-pacific"],
          component: "select",
          label: "Region",
        }),
        expect.objectContaining({signal: expect.any(AbortSignal)}),
      );

      const refused = await run(agent, {action: "press", ref: "Delete project"});

      expect(refused.error?.message).toBe(
        'The person said no to "Deletes the project for everyone".',
      );
      expect(onDelete).not.toHaveBeenCalled();
    });

    it("supports a second allow for one call", async () => {
      const onSave = vi.fn();

      render(<SettingsFixture onSave={onSave} />);

      const agent = createAgent({allow: () => true});
      const result = await agent.act(
        {steps: [{action: "press", ref: "Save"}]},
        {allow: (action) => action.action !== "press"},
      );

      expect(result.error?.message).toBe(`The app doesn't allow press on "Save".`);
      expect(onSave).not.toHaveBeenCalled();
    });

    it("refuses hidden regions and never returns a secret", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();
      const hidden = await run(agent, {action: "setValue", args: ["x"], ref: "Recovery code"});

      expect(hidden.error?.message).toMatch(/kept from agents/);

      const secret = await run(
        agent,
        {action: "setValue", args: ["hunter2"], ref: "Password"},
        {action: "setValue", args: ["98-7654321"], ref: "Tax ID"},
      );

      expect(secret.ok).toBe(true);
      expect(JSON.stringify(secret)).not.toMatch(/hunter2|98-7654321|12-3456789/);
      expect(screen.getByLabelText("Password")).toHaveValue("hunter2");
    });

    it("exposes the agent as the change source inside handlers", async () => {
      const sources: string[] = [];
      const user = setupUser();

      render(<SettingsFixture onNameChange={() => sources.push(getChangeSource())} />);

      await run(createAgent(), {action: "setValue", args: ["Atlas"], ref: "Project name"});
      await user.type(screen.getByRole("textbox", {name: "Project name"}), "!");

      expect(sources).toEqual(["agent", "user"]);
      expect(getChangeSource()).toBe("user");
    });
  });

  describe("query", () => {
    it("supports listing and filtering one list's choices", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();

      expect(await agent.query({within: "Region"})).toEqual([
        expect.objectContaining({
          items: [
            {label: "Europe", value: "europe"},
            {label: "North America", value: "north-america"},
            {label: "Asia Pacific", value: "asia-pacific"},
          ],
          label: "Region",
        }),
      ]);
      expect(await agent.query({text: "asia", within: "Region"})).toEqual([
        expect.objectContaining({items: [{label: "Asia Pacific", value: "asia-pacific"}]}),
      ]);
    });

    it("supports finding components by text, choice, and kind", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();
      const byText = (await agent.query({text: "project"})) as AgentComponent[];
      const byChoice = (await agent.query({text: "Europe"})) as AgentComponent[];
      const byKind = (await agent.query({kind: "switch"})) as AgentComponent[];

      expect(byText.map((component) => component.label)).toEqual([
        "Project name",
        "Public project",
        "Delete project",
      ]);
      expect(byChoice).toEqual([
        expect.objectContaining({items: [{label: "Europe", value: "europe"}], label: "Region"}),
      ]);
      expect(byKind.map((component) => component.label)).toEqual(["Public project"]);
    });

    it("reports a call with no input or an unknown list", async () => {
      render(<SettingsFixture />);

      const agent = createAgent();

      expect(await agent.query({})).toEqual({error: "Pass text, within, or kind."});
      expect(await agent.query({within: "Nope"})).toEqual({
        error: expect.stringContaining('No component "Nope"'),
      });
    });
  });

  describe("subscribe", () => {
    it("calls the listener with changes from people and from the agent", async () => {
      const user = setupUser();
      const changes: AgentChange[] = [];

      render(<SettingsFixture />);

      const agent = createAgent();
      const stop = agent.subscribe((change) => changes.push(change));

      await user.click(screen.getByRole("checkbox", {name: "Email notifications"}));
      await new Promise((resolve) => setTimeout(resolve, 10));
      await run(agent, {action: "setValue", args: ["Pro"], ref: "Plan"});

      expect(changes).toEqual([
        expect.objectContaining({
          key: "checked",
          label: "Email notifications",
          previous: false,
          source: "user",
          value: true,
        }),
        expect.objectContaining({
          key: "value",
          label: "Plan",
          previous: "free",
          source: "agent",
          value: "pro",
        }),
      ]);

      stop();
      await run(agent, {action: "setValue", args: ["Free"], ref: "Plan"});

      expect(changes).toHaveLength(2);
    });
  });

  describe("custom components", () => {
    it("exposes a registered component with its state and actions", async () => {
      const onRate = vi.fn();

      render(<RatingFixture onRate={onRate} />);

      const agent = createAgent();

      expect(agent.snapshot()).toEqual([
        {actions: ["rate"], component: "rating", label: "Your rating", ref: "c1", value: 0},
      ]);

      const result = await run(agent, {action: "rate", args: [4], ref: "Your rating"});

      expect(onRate).toHaveBeenCalledWith(4);
      expect(result.steps[0]?.changes).toEqual([
        expect.objectContaining({key: "value", previous: 0, value: 4}),
      ]);
      expect(agent.snapshot()[0]?.value).toBe(4);
    });

    it("supports exposing inner controls and hiding the component", () => {
      const {rerender} = render(<RatingFixture exposeChildren />);
      const agent = createAgent();

      expect(agent.snapshot().map((component) => component.component)).toEqual([
        "rating",
        "toggle-button",
        "toggle-button",
        "toggle-button",
        "toggle-button",
        "toggle-button",
      ]);

      rerender(<RatingFixture shown={() => false} />);

      expect(agent.snapshot()).toEqual([]);
    });

    it("removes the component when it unmounts", () => {
      const {unmount} = render(<RatingFixture />);
      const agent = createAgent();

      expect(agent.snapshot()).toHaveLength(1);
      unmount();
      expect(agent.snapshot()).toEqual([]);
    });
  });

  describe("root", () => {
    it("supports limiting the bridge to part of the page", () => {
      render(
        <>
          <SettingsFixture />
          <aside data-testid="panel">
            <button type="button">Help</button>
          </aside>
        </>,
      );

      const agent = createAgent({root: () => screen.getByTestId("panel")});

      expect(agent.snapshot().map((component) => component.label)).toEqual(["Help"]);
    });
  });
});
