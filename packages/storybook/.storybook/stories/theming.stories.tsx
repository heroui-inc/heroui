import type {Meta} from "@storybook/react";

import {
  Alert,
  Button,
  Card,
  Checkbox,
  Chip,
  Description,
  Dropdown,
  Input,
  Label,
  ListBox,
  Modal,
  ProgressBar,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tabs,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@heroui/react";
import React, {useEffect, useState} from "react";

const meta: Meta = {
  parameters: {
    layout: "fullscreen",
  },
  title: "Theming/Themes",
};

export default meta;

type Mode = "light" | "dark";

const THEMES = [
  {id: "default", name: "Default", note: "@heroui/styles as shipped"},
  {id: "arcade", name: "Arcade", note: "Ink outlines and key-cap shadows · 5 component files"},
  {id: "ledger", name: "Ledger", note: "Square, hairline, flat · almost only tokens"},
] as const;

type ThemeId = (typeof THEMES)[number]["id"];

const readMode = (): Mode =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

/**
 * Activates a theme the way an app does: one attribute on `<html>`.
 * Storybook's toolbar keeps writing `light` / `dark` there, so this follows it.
 */
type Desired = {mode: Mode; onModeChange: (mode: Mode) => void; theme: ThemeId};

/**
 * One desired theme and one observer for the whole page. With an observer per hook call, a
 * stale one kept restoring its own theme and the two rewrote `data-theme` forever.
 */
let desired: Desired | null = null;
let observer: MutationObserver | null = null;

const applyDesired = () => {
  if (!desired) return;

  const root = document.documentElement;
  const current = readMode();

  if (current !== desired.mode) {
    desired.onModeChange(current);

    return;
  }

  const next = desired.theme === "default" ? desired.mode : `${desired.theme}-${desired.mode}`;

  if (root.getAttribute("data-theme") !== next) root.setAttribute("data-theme", next);
};

const useTheme = (theme: ThemeId, mode: Mode, onModeChange: (mode: Mode) => void) => {
  useEffect(() => {
    const root = document.documentElement;
    const entry: Desired = {mode, onModeChange, theme};

    desired = entry;
    root.classList.remove("light", "dark");
    root.classList.add(mode);
    applyDesired();

    if (!observer) {
      observer = new MutationObserver(applyDesired);
      observer.observe(root, {attributeFilter: ["class", "data-theme"], attributes: true});
    }

    return () => {
      if (desired !== entry) return;

      desired = null;
      root.setAttribute("data-theme", readMode());
    };
  }, [theme, mode, onModeChange]);
};

const Section = ({children, title}: {children: React.ReactNode; title: string}) => (
  <section className="flex flex-col gap-3">
    <h2 className="text-xs font-medium tracking-wide text-muted uppercase">{title}</h2>
    {children}
  </section>
);

const KitchenSink = () => (
  <div className="grid gap-8 lg:grid-cols-2">
    <Section title="Buttons">
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button isDisabled>Disabled</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button size="sm">Small</Button>
        <Button size="lg">Large</Button>
        <Tooltip delay={0}>
          <Button variant="secondary">Hover for a tooltip</Button>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Themed too
          </Tooltip.Content>
        </Tooltip>
      </div>
    </Section>

    <Section title="Chips">
      <div className="flex flex-wrap items-center gap-2">
        <Chip>Default</Chip>
        <Chip color="accent" variant="soft">
          Accent
        </Chip>
        <Chip color="success" variant="soft">
          Success
        </Chip>
        <Chip color="warning" variant="soft">
          Warning
        </Chip>
        <Chip color="danger" variant="soft">
          Danger
        </Chip>
        <Chip color="accent" variant="primary">
          Solid
        </Chip>
      </div>
      <Alert status="accent">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Soft colors are calculated</Alert.Title>
          <Alert.Description>
            Hover, soft, and border shades follow the base tokens of each theme.
          </Alert.Description>
        </Alert.Content>
      </Alert>
    </Section>

    <Section title="Fields">
      <div className="grid gap-4 sm:grid-cols-2">
        <TextField defaultValue="Apollo" name="project">
          <Label>Project name</Label>
          <Input />
          <Description>Shown to your team</Description>
        </TextField>
        <Select defaultValue="europe" placeholder="Select a region">
          <Label>Region</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="europe" textValue="Europe">
                Europe
              </ListBox.Item>
              <ListBox.Item id="north-america" textValue="North America">
                North America
              </ListBox.Item>
              <ListBox.Item id="asia-pacific" textValue="Asia Pacific">
                Asia Pacific
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
      <Slider defaultValue={40}>
        <Label>Volume</Label>
        <Slider.Output />
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb />
        </Slider.Track>
      </Slider>
      <ProgressBar value={64}>
        <Label>Storage</Label>
        <ProgressBar.Output />
        <ProgressBar.Track>
          <ProgressBar.Fill />
        </ProgressBar.Track>
      </ProgressBar>
    </Section>

    <Section title="Controls">
      <div className="flex flex-wrap items-center gap-6">
        <Switch defaultSelected>
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            Notifications
          </Switch.Content>
        </Switch>
        <Checkbox defaultSelected>
          <Checkbox.Content>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            Remember me
          </Checkbox.Content>
        </Checkbox>
        <ToggleButtonGroup aria-label="View" defaultSelectedKeys={["week"]} selectionMode="single">
          <ToggleButton id="day">Day</ToggleButton>
          <ToggleButton id="week">Week</ToggleButton>
          <ToggleButton id="month">Month</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <RadioGroup defaultValue="pro" orientation="horizontal">
        <Label>Plan</Label>
        <Radio value="free">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Free
          </Radio.Content>
        </Radio>
        <Radio value="pro">
          <Radio.Content>
            <Radio.Control>
              <Radio.Indicator />
            </Radio.Control>
            Pro
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </Section>

    <Section title="Surfaces">
      <Card>
        <Card.Header>
          <Card.Title>Team plan</Card.Title>
          <Card.Description>Billed monthly, cancel any time.</Card.Description>
        </Card.Header>
        <Card.Content>
          <p className="text-3xl font-semibold">
            $24 <span className="text-sm font-normal text-muted">/ seat</span>
          </p>
        </Card.Content>
        <Card.Footer className="flex gap-2">
          <Button>Upgrade</Button>
          <Button variant="tertiary">Compare plans</Button>
        </Card.Footer>
      </Card>
      <Tabs>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Sections">
            <Tabs.Tab id="overview">Overview</Tabs.Tab>
            <Tabs.Tab id="members">Members</Tabs.Tab>
            <Tabs.Tab id="billing">Billing</Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel className="text-sm text-muted" id="overview">
          Tabs, cards, and fields all read the same tokens.
        </Tabs.Panel>
        <Tabs.Panel className="text-sm text-muted" id="members">
          Three members.
        </Tabs.Panel>
        <Tabs.Panel className="text-sm text-muted" id="billing">
          Next invoice on the 1st.
        </Tabs.Panel>
      </Tabs>
    </Section>

    <Section title="Overlays">
      <div className="flex flex-wrap items-center gap-3">
        <Modal>
          <Button variant="secondary">Open modal</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[380px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Overlays portal to the body</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p className="text-sm text-muted">
                    The theme sits on the html element, so modals, popovers, and tooltips pick it up
                    as well.
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" variant="tertiary">
                    Cancel
                  </Button>
                  <Button slot="close">Got it</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
        <Dropdown>
          <Button variant="secondary">Open menu</Button>
          <Dropdown.Popover>
            <Dropdown.Menu aria-label="Actions">
              <Dropdown.Item id="duplicate" textValue="Duplicate">
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item id="archive" textValue="Archive">
                Archive
              </Dropdown.Item>
              <Dropdown.Item id="delete" textValue="Delete" variant="danger">
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>
    </Section>
  </div>
);

const Toolbar = ({
  mode,
  onModeChange,
  onThemeChange,
  theme,
}: {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onThemeChange: (theme: ThemeId) => void;
  theme: ThemeId;
}) => (
  <div className="flex flex-wrap items-end justify-between gap-4">
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium tracking-wide text-muted uppercase">Theme</span>
      <div className="flex flex-wrap gap-2">
        {THEMES.map((item) => (
          <Button
            key={item.id}
            variant={item.id === theme ? "primary" : "secondary"}
            onPress={() => onThemeChange(item.id)}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <code className="text-xs text-muted">
        &lt;html data-theme=&quot;{theme === "default" ? mode : `${theme}-${mode}`}&quot;&gt; ·{" "}
        {THEMES.find((item) => item.id === theme)?.note}
      </code>
    </div>
    <Switch
      isSelected={mode === "dark"}
      onChange={(isDark) => onModeChange(isDark ? "dark" : "light")}
    >
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Dark mode
      </Switch.Content>
    </Switch>
  </div>
);

/** Same React tree, three looks. Only the `data-theme` attribute on `<html>` changes. */
export const NamedThemes = () => {
  const [theme, setTheme] = useState<ThemeId>("arcade");
  const [mode, setMode] = useState<Mode>(readMode);

  useTheme(theme, mode, setMode);

  return (
    <div className="min-h-screen bg-background p-6 text-foreground lg:p-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">One component tree, three themes</h1>
          <p className="text-sm text-muted">
            No props change below. A theme is a CSS folder (variables + a few BEM overrides) that an
            agent can write with the heroui-theming skill.
          </p>
        </header>
        <Toolbar mode={mode} theme={theme} onModeChange={setMode} onThemeChange={setTheme} />
        <KitchenSink />
      </div>
    </div>
  );
};

/** Rung 1 of the skill's ladder: change two tokens and every component follows. */
export const Tokens = () => {
  const [mode, setMode] = useState<Mode>(readMode);
  const [hue, setHue] = useState(300);
  const [radius, setRadius] = useState(0.5);

  useTheme("default", mode, setMode);

  useEffect(() => {
    const root = document.documentElement;

    // Calculated tokens (hover, soft, borders) only recompute on the root element.
    root.style.setProperty("--accent", `oklch(0.58 0.2 ${hue})`);
    root.style.setProperty("--focus", `oklch(0.58 0.2 ${hue})`);
    root.style.setProperty("--radius", `${radius}rem`);
    root.style.setProperty("--field-radius", `${radius * 1.5}rem`);

    return () => {
      for (const token of ["--accent", "--focus", "--radius", "--field-radius"]) {
        root.style.removeProperty(token);
      }
    };
  }, [hue, radius]);

  return (
    <div className="min-h-screen bg-background p-6 text-foreground lg:p-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Two tokens, every component</h1>
          <p className="text-sm text-muted">
            The sliders set --accent and --radius on the html element. Hover, soft, and focus colors
            are derived from them.
          </p>
        </header>
        <div className="grid items-end gap-6 sm:grid-cols-[1fr_1fr_auto]">
          <Slider
            maxValue={360}
            minValue={0}
            value={hue}
            onChange={(value) => setHue(Number(value))}
          >
            <Label>--accent hue</Label>
            <Slider.Output />
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
          <Slider
            maxValue={1.5}
            minValue={0}
            step={0.125}
            value={radius}
            onChange={(value) => setRadius(Number(value))}
          >
            <Label>--radius (rem)</Label>
            <Slider.Output />
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
          <Switch
            isSelected={mode === "dark"}
            onChange={(isDark) => setMode(isDark ? "dark" : "light")}
          >
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Dark mode
            </Switch.Content>
          </Switch>
        </div>
        <pre className="rounded-xl bg-surface p-4 font-mono text-xs shadow-surface">
          {`@layer theme {
  :root {
    --accent: oklch(0.58 0.2 ${hue});
    --radius: ${radius}rem;
  }
}`}
        </pre>
        <KitchenSink />
      </div>
    </div>
  );
};

/**
 * No `@heroui/react` below this line: native elements and BEM class names only.
 * The CSS is separate from the implementation, so it works on any framework.
 */
export const WithoutReactComponents = () => {
  const [theme, setTheme] = useState<ThemeId>("arcade");
  const [mode, setMode] = useState<Mode>(readMode);
  const [isOn, setIsOn] = useState(true);

  useTheme(theme, mode, setMode);

  return (
    <div className="min-h-screen bg-background p-6 text-foreground lg:p-10">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold">Plain HTML, same themes</h1>
          <p className="text-sm text-muted">
            Everything in the box below is a native element with HeroUI class names. Vue, Svelte,
            Rails, or a static page get the same look and the same themes.
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-2">
          {THEMES.map((item) => (
            <button
              key={item.id}
              className={item.id === theme ? "button button--primary" : "button button--secondary"}
              type="button"
              onClick={() => setTheme(item.id)}
            >
              {item.name}
            </button>
          ))}
          <button
            className="button button--tertiary"
            type="button"
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
          >
            Toggle dark mode
          </button>
        </div>

        <div className="card card--default">
          <div className="card__header">
            <h3 className="card__title">Notifications</h3>
            <p className="card__description">Choose what you want to hear about.</p>
          </div>
          <div className="card__content flex flex-col gap-4">
            <input className="input input--full-width" placeholder="you@example.com" type="email" />
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip chip--accent chip--soft">
                <span className="chip__label">New</span>
              </span>
              <span className="chip chip--success chip--soft">
                <span className="chip__label">Active</span>
              </span>
              <span className="chip chip--danger chip--soft">
                <span className="chip__label">Overdue</span>
              </span>
            </div>
            <button
              aria-checked={isOn}
              className="switch"
              role="switch"
              type="button"
              onClick={() => setIsOn(!isOn)}
            >
              <span className="switch__content">
                <span className="switch__control">
                  <span className="switch__thumb" />
                </span>
                Email me updates
              </span>
            </button>
          </div>
          <div className="card__footer flex gap-2">
            <button className="button button--primary" type="button">
              Save
            </button>
            <button className="button button--outline" type="button">
              Cancel
            </button>
            <button disabled className="button button--danger" type="button">
              Disabled
            </button>
          </div>
        </div>

        <pre className="rounded-xl bg-surface p-4 font-mono text-xs shadow-surface">
          {`<button class="button button--primary">Save</button>
<span class="chip chip--accent chip--soft"><span class="chip__label">New</span></span>
<button class="switch" role="switch" aria-checked="${isOn}">…</button>`}
        </pre>
      </div>
    </div>
  );
};
