import type {Task} from "./agent-panel.stories.shared";
import type {Meta} from "@storybook/react";

import {Icon} from "@iconify/react";
import {parseDate} from "@internationalized/date";
import React, {useRef, useState} from "react";

import {Accordion} from "../components/accordion";
import {Alert} from "../components/alert";
import {Button} from "../components/button";
import {Checkbox} from "../components/checkbox";
import {ComboBox} from "../components/combo-box";
import {DateField} from "../components/date-field";
import {DateRangePicker} from "../components/date-range-picker";
import {Description} from "../components/description";
import {Dropdown} from "../components/dropdown";
import {Input} from "../components/input";
import {Label} from "../components/label";
import {Link} from "../components/link";
import {ListBox} from "../components/list-box";
import {Modal} from "../components/modal";
import {NumberField} from "../components/number-field";
import {Radio} from "../components/radio";
import {RadioGroup} from "../components/radio-group";
import {Select} from "../components/select";
import {Slider} from "../components/slider";
import {Switch} from "../components/switch";
import {TextField} from "../components/textfield";
import {TimeField} from "../components/time-field";

import {AgentPanel, Describe, Section, Stage} from "./agent-panel.stories.shared";

import {getChangeSource} from "./index";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Agents/Agent Bridge",
} as Meta;

/* -------------------------------------------------------------------------------------------------
 * Playground: ordinary HeroUI components. Nothing here knows about the agent.
 * -----------------------------------------------------------------------------------------------*/

const REGIONS = [
  {id: "europe", name: "Europe"},
  {id: "north-america", name: "North America"},
  {id: "asia-pacific", name: "Asia Pacific"},
];

const PEOPLE = [
  {id: "ada", name: "Ada Lovelace"},
  {id: "grace", name: "Grace Hopper"},
  {id: "alan", name: "Alan Turing"},
];

const PLAYGROUND_TASKS: Task[] = [
  {
    ask: "Rename the project to Atlas, move it to North America and make it public",
    label: "Rename and go public",
    steps: [
      {action: "setValue", args: ["Atlas"], ref: "Project name"},
      {action: "setValue", args: ["North America"], ref: "Region"},
      {action: "setChecked", args: [true], ref: "Public project"},
    ],
  },
  {
    ask: "Upgrade to Pro with 8 seats, owned by Grace, budget alert at 70%",
    label: "Upgrade to Pro",
    steps: [
      {action: "setValue", args: ["Pro"], ref: "Plan"},
      {action: "setValue", args: [8], ref: "Seats"},
      {action: "setValue", args: ["Grace Hopper"], ref: "Owner"},
      {action: "setValue", args: [70], ref: "Budget alert"},
    ],
  },
  {
    ask: "Launch on March 15, sprint April 2 to 9, standup at 14:05",
    label: "Set the dates",
    steps: [
      {action: "setValue", args: ["2026-03-15"], ref: "Launch date"},
      {action: "setValue", args: [{end: "2026-04-09", start: "2026-04-02"}], ref: "Sprint"},
      {action: "setValue", args: ["14:05"], ref: "Standup time"},
    ],
  },
  {
    ask: "Send events to https://example.com/hook",
    label: "Add a webhook",
    steps: [
      {action: "setOpen", args: [true], ref: "Advanced"},
      {action: "setValue", args: ["https://example.com/hook"], ref: "Webhook URL"},
    ],
  },
  {
    ask: "Invite ada@example.com to the project",
    label: "Invite Ada",
    steps: [
      {action: "press", ref: "Invite member"},
      {action: "setValue", args: ["ada@example.com"], ref: "Email"},
      {action: "press", ref: "Send invite"},
    ],
  },
  {
    ask: "Duplicate the project, then save",
    label: "Duplicate",
    steps: [
      {action: "press", args: ["Duplicate"], ref: "More actions"},
      {action: "press", ref: "Save"},
    ],
  },
  {
    ask: "Move the project to Mars",
    label: "Move it to Mars",
    steps: [{action: "setValue", args: ["Mars"], ref: "Region"}],
  },
];

export const Playground = () => {
  const [activity, setActivity] = useState<string[]>([]);

  // `getChangeSource()` tells the app who triggered a handler.
  const log = (what: string) =>
    setActivity((list) => [`${what} — by ${getChangeSource()}`, ...list].slice(0, 4));

  return (
    <Stage
      description="A plain HeroUI form with no agent code in it. The panel plays the model: it reads the page as labels and values, then fills it, without a single click."
      eyebrow="createAgent · snapshot · act"
      panel={<AgentPanel tasks={PLAYGROUND_TASKS} />}
      title="Project settings"
    >
      <Section title="General">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <TextField defaultValue="Apollo" name="name">
            <Label>Project name</Label>
            <Input placeholder="Name your project" />
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
                {REGIONS.map((region) => (
                  <ListBox.Item key={region.id} id={region.id} textValue={region.name}>
                    {region.name}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <ComboBox>
            <Label>Owner</Label>
            <ComboBox.InputGroup>
              <Input placeholder="Search people" />
              <ComboBox.Trigger />
            </ComboBox.InputGroup>
            <ComboBox.Popover>
              <ListBox>
                {PEOPLE.map((person) => (
                  <ListBox.Item key={person.id} id={person.id} textValue={person.name}>
                    {person.name}
                  </ListBox.Item>
                ))}
              </ListBox>
            </ComboBox.Popover>
          </ComboBox>
        </div>
      </Section>

      <Section title="Plan">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <NumberField defaultValue={3} maxValue={50} minValue={1}>
            <Label>Seats</Label>
            <NumberField.Group>
              <NumberField.DecrementButton />
              <NumberField.Input />
              <NumberField.IncrementButton />
            </NumberField.Group>
          </NumberField>

          <RadioGroup defaultValue="free" orientation="horizontal">
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

          <Slider defaultValue={30}>
            <Label>Budget alert</Label>
            <Slider.Output />
            <Slider.Track>
              <Slider.Fill />
              <Slider.Thumb />
            </Slider.Track>
          </Slider>
        </div>
      </Section>

      <Section title="Schedule">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <DateField defaultValue={parseDate("2026-01-02")}>
            <Label>Launch date</Label>
            <DateField.Group>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.Group>
          </DateField>

          <TimeField name="standup">
            <Label>Standup time</Label>
            <DateField.Group>
              <DateField.Input>
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
            </DateField.Group>
          </TimeField>

          <DateRangePicker className="sm:col-span-2" endName="sprintEnd" startName="sprintStart">
            <Label>Sprint</Label>
            <DateField.Group>
              <DateField.Input slot="start">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateRangePicker.RangeSeparator />
              <DateField.Input slot="end">
                {(segment) => <DateField.Segment segment={segment} />}
              </DateField.Input>
              <DateField.Suffix>
                <DateRangePicker.Trigger>
                  <DateRangePicker.TriggerIndicator />
                </DateRangePicker.Trigger>
              </DateField.Suffix>
            </DateField.Group>
          </DateRangePicker>
        </div>
      </Section>

      <Section title="Sharing">
        <div className="flex flex-col gap-4">
          <Switch onChange={(isSelected) => log(`Public project ${isSelected ? "on" : "off"}`)}>
            <Switch.Content>
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
              Public project
            </Switch.Content>
          </Switch>

          <Checkbox>
            <Checkbox.Content>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Email notifications
            </Checkbox.Content>
          </Checkbox>

          <Accordion className="-mx-1">
            <Accordion.Item id="advanced">
              <Accordion.Heading>
                <Accordion.Trigger>
                  Advanced
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <TextField name="webhook">
                    <Label>Webhook URL</Label>
                    <Input placeholder="https://" />
                  </TextField>
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </div>
      </Section>

      <footer className="flex flex-wrap items-center gap-2">
        <Button onPress={() => log("Saved")}>Save</Button>

        <Modal>
          <Button variant="outline">Invite member</Button>
          <Modal.Backdrop>
            <Modal.Container>
              <Modal.Dialog className="sm:max-w-[380px]">
                <Modal.CloseTrigger />
                <Modal.Header>
                  <Modal.Heading>Invite a member</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <TextField name="email">
                    <Label>Email</Label>
                    <Input placeholder="name@company.com" />
                  </TextField>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close" onPress={() => log("Invite sent")}>
                    Send invite
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>

        <Dropdown>
          <Button isIconOnly aria-label="More actions" variant="ghost">
            <Icon icon="gravity-ui:ellipsis" />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => log(`Menu: ${String(key)}`)}>
              <Dropdown.Item id="duplicate" textValue="Duplicate">
                Duplicate
              </Dropdown.Item>
              <Dropdown.Item id="archive" textValue="Archive">
                Archive
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        <p data-agent-hidden className="ms-auto font-mono text-xs text-muted">
          {activity[0] ?? "getChangeSource() reports who triggered each handler"}
        </p>
      </footer>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Permissions: `allow`, plus the three markup attributes.
 * -----------------------------------------------------------------------------------------------*/

const PERMISSION_TASKS: Task[] = [
  {
    ask: "Delete this project",
    label: "Delete the project",
    steps: [{action: "press", ref: "Delete project"}],
  },
  {
    ask: "Set the tax ID to 98-7654321 and change the password",
    label: "Update secrets",
    steps: [
      {action: "setValue", args: ["98-7654321"], ref: "Tax ID"},
      {action: "setValue", args: ["correct horse battery"], ref: "Password"},
    ],
  },
  {
    ask: "Reset the recovery code",
    label: "Recovery code",
    steps: [{action: "setValue", args: ["0000-0000"], ref: "Recovery code"}],
  },
  {
    ask: "Open the billing portal",
    label: "Billing portal",
    steps: [{action: "press", ref: "Billing portal"}],
  },
  {
    ask: "Rename the workspace to Hero Labs",
    label: "Rename workspace",
    steps: [{action: "setValue", args: ["Hero Labs"], ref: "Workspace name"}],
  },
];

export const Permissions = () => {
  const [deletedBy, setDeletedBy] = useState<string | null>(null);

  return (
    <Stage
      description="Three attributes mark the markup, and one allow() callback decides each action. Open the Page view: secrets read “[redacted]” and the recovery code is not there at all."
      eyebrow="allow · data-agent-confirm · secret · hidden"
      panel={<AgentPanel guarded tasks={PERMISSION_TASKS} />}
      title="Permissions"
    >
      <Section title="Workspace">
        <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
          <TextField defaultValue="Acme" name="workspace">
            <Label>Workspace name</Label>
            <Input />
          </TextField>

          <TextField data-agent-secret defaultValue="12-3456789" name="taxId">
            <Label>Tax ID</Label>
            <Input />
            <Description>data-agent-secret</Description>
          </TextField>

          <TextField defaultValue="hunter2" name="password" type="password">
            <Label>Password</Label>
            <Input />
            <Description>Password fields are secret without any attribute</Description>
          </TextField>

          <section data-agent-hidden>
            <TextField isReadOnly defaultValue="4821-9930" name="recovery">
              <Label>Recovery code</Label>
              <Input />
              <Description>data-agent-hidden</Description>
            </TextField>
          </section>

          <Link className="w-fit sm:col-span-2" href="#billing">
            Billing portal
            <Link.Icon />
          </Link>
        </div>
      </Section>

      <Section title="Danger Zone">
        <div className="flex flex-col items-start gap-4">
          <p className="max-w-md text-sm text-muted">
            Deleting removes the project for everyone. The button carries data-agent-confirm, so an
            agent has to ask you first.
          </p>
          {deletedBy ? (
            <Alert status="danger">
              <Alert.Indicator />
              <Alert.Content>
                <Alert.Title>Project deleted by the {deletedBy}</Alert.Title>
                <Alert.Description>
                  {deletedBy === "agent" ? "You approved it in the agent panel." : null}
                </Alert.Description>
              </Alert.Content>
            </Alert>
          ) : null}
          <div className="flex gap-2">
            <Button
              data-agent-confirm="Permanently deletes this project for everyone"
              isDisabled={deletedBy !== null}
              variant="danger-soft"
              onPress={() => setDeletedBy(getChangeSource())}
            >
              Delete project
            </Button>
            {deletedBy ? (
              <Button variant="tertiary" onPress={() => setDeletedBy(null)}>
                Restore
              </Button>
            ) : null}
          </div>
        </div>
      </Section>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Custom components: things HeroUI doesn't ship, described with `useAgentComponent`.
 * -----------------------------------------------------------------------------------------------*/

const Rating = ({isDescribed}: {isDescribed: boolean}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(2);

  return (
    <div ref={ref} aria-label="Your rating" className="flex gap-1" role="group">
      {isDescribed ? (
        <Describe
          actions={{rate: (next: number) => setValue(Math.max(0, Math.min(5, next)))}}
          component="rating"
          state={() => ({max: 5, value})}
          target={ref}
        />
      ) : null}
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
          aria-pressed={star <= value}
          className="rounded-md p-1 text-2xl text-warning outline-none focus-visible:ring-2 focus-visible:ring-focus"
          type="button"
          onClick={() => setValue(star)}
        >
          <Icon icon={star <= value ? "gravity-ui:star-fill" : "gravity-ui:star"} />
        </button>
      ))}
    </div>
  );
};

const SEATS = ["A1", "A2", "A3", "A4", "B1", "B2", "B3", "B4"];
const TAKEN = new Set(["A2", "B4"]);

const SeatPicker = ({isDescribed}: {isDescribed: boolean}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [seat, setSeat] = useState<string | null>(null);

  return (
    <div ref={ref} aria-label="Seat" className="grid w-fit grid-cols-4 gap-2" role="group">
      {isDescribed ? (
        <Describe
          closed
          component="seat-picker"
          state={() => ({value: seat})}
          target={ref}
          actions={{
            clear: () => setSeat(null),
            setValue: (next: string) => {
              if (TAKEN.has(next)) {
                throw new Error(
                  `Seat ${next} is taken. Free seats: ${SEATS.filter((id) => !TAKEN.has(id)).join(", ")}.`,
                );
              }
              setSeat(next);
            },
          }}
          items={() =>
            SEATS.map((id) => ({disabled: TAKEN.has(id), label: `Seat ${id}`, value: id}))
          }
        />
      ) : null}
      {SEATS.map((id) => (
        <button
          key={id}
          aria-pressed={seat === id}
          className="flex size-11 items-center justify-center rounded-lg bg-default text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-focus disabled:opacity-40 aria-pressed:bg-accent aria-pressed:text-accent-foreground"
          disabled={TAKEN.has(id)}
          type="button"
          onClick={() => setSeat(id)}
        >
          {id}
        </button>
      ))}
    </div>
  );
};

const COUPONS: Record<string, number> = {HERO20: 20, WELCOME10: 10};

const OrderSummary = ({isDescribed}: {isDescribed: boolean}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [coupon, setCoupon] = useState<string | null>(null);
  const subtotal = 120;
  const discount = coupon ? (COUPONS[coupon] ?? 0) : 0;
  const total = subtotal - (subtotal * discount) / 100;

  return (
    <div
      ref={ref}
      aria-label="Order summary"
      className="flex max-w-xs flex-col gap-2 text-sm tabular-nums"
      role="group"
    >
      {isDescribed ? (
        <Describe
          component="order-summary"
          state={() => ({coupon, subtotal, value: total})}
          target={ref}
          actions={{
            // The returned value reaches the model as the step's `result`.
            applyCoupon: (code: string) => {
              const percent = COUPONS[code.toUpperCase()];

              if (!percent) throw new Error(`"${code}" is not a valid coupon.`);
              setCoupon(code.toUpperCase());

              return {discount: `${percent}%`, total: subtotal - (subtotal * percent) / 100};
            },
            removeCoupon: () => setCoupon(null),
          }}
        />
      ) : null}
      <div className="flex justify-between">
        <span className="text-muted">Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-muted">Coupon</span>
        <span>{coupon ? `${coupon} (−${discount}%)` : "None"}</span>
      </div>
      <div className="flex justify-between border-t border-separator pt-2 font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

const CUSTOM_TASKS: Task[] = [
  {
    ask: "Rate it 4 stars",
    label: "Rate 4 stars",
    steps: [{action: "rate", args: [4], ref: "Your rating"}],
  },
  {
    ask: "Book seat B3",
    label: "Book B3",
    steps: [{action: "setValue", args: ["Seat B3"], ref: "Seat"}],
  },
  {
    ask: "Book seat A2",
    label: "Book A2 (taken)",
    steps: [{action: "setValue", args: ["A2"], ref: "Seat"}],
  },
  {
    ask: "Book seat Z9",
    label: "Book Z9",
    steps: [{action: "setValue", args: ["Z9"], ref: "Seat"}],
  },
  {
    ask: "Apply the coupon HERO20",
    label: "Apply HERO20",
    steps: [{action: "applyCoupon", args: ["HERO20"], ref: "Order summary"}],
  },
];

export const CustomComponents = () => {
  const [isDescribed, setIsDescribed] = useState(true);

  return (
    <Stage
      description="Three components HeroUI doesn't ship. Described, each is one entry with real actions. Turn it off and open the Page view: the agent is left with a pile of buttons."
      eyebrow="useAgentComponent"
      panel={<AgentPanel tasks={CUSTOM_TASKS} />}
      title="Custom components"
    >
      <div data-agent-hidden>
        <Switch isSelected={isDescribed} onChange={setIsDescribed}>
          <Switch.Content>
            <Switch.Control>
              <Switch.Thumb />
            </Switch.Control>
            Describe them with useAgentComponent
          </Switch.Content>
        </Switch>
      </div>

      <section className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Rating</h2>
          <p className="font-mono text-xs text-muted">rating · rate(n)</p>
        </div>
        <Rating isDescribed={isDescribed} />
      </section>

      <section className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Seat Picker</h2>
          <p className="font-mono text-xs text-muted">
            seat-picker · items, closed · setValue(seat), clear()
          </p>
        </div>
        <SeatPicker isDescribed={isDescribed} />
      </section>

      <section className="grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-medium">Order Summary</h2>
          <p className="font-mono text-xs text-muted">
            order-summary · applyCoupon(code), removeCoupon()
          </p>
        </div>
        <OrderSummary isDescribed={isDescribed} />
      </section>
    </Stage>
  );
};
