import type {AgentComponentOptions} from "@/agent";

import {parseDate} from "@internationalized/date";
import {useRef, useState} from "react";

import {useAgentComponent} from "@/agent";
import {Accordion} from "@/components/accordion";
import {Autocomplete} from "@/components/autocomplete";
import {Button} from "@/components/button";
import {Checkbox} from "@/components/checkbox";
import {ComboBox} from "@/components/combo-box";
import {DateField} from "@/components/date-field";
import {DatePicker} from "@/components/date-picker";
import {DateRangePicker} from "@/components/date-range-picker";
import {Description} from "@/components/description";
import {Dropdown} from "@/components/dropdown";
import {Input} from "@/components/input";
import {Label} from "@/components/label";
import {ListBox} from "@/components/list-box";
import {Modal} from "@/components/modal";
import {NumberField} from "@/components/number-field";
import {Radio} from "@/components/radio";
import {RadioGroup} from "@/components/radio-group";
import {SearchField} from "@/components/search-field";
import {Select} from "@/components/select";
import {Slider} from "@/components/slider";
import {Switch} from "@/components/switch";
import {Tabs} from "@/components/tabs";
import {TextField} from "@/components/textfield";
import {TimeField} from "@/components/time-field";

export type SettingsFixtureProps = {
  onDelete?: () => void;
  onMenuAction?: (key: unknown) => void;
  onNameChange?: (value: string) => void;
  onRegionChange?: (value: unknown) => void;
  onSave?: () => void;
};

const REGIONS = [
  {id: "europe", name: "Europe"},
  {id: "north-america", name: "North America"},
  {id: "asia-pacific", name: "Asia Pacific"},
];

/** A project settings page that uses the components an agent meets most often. */
export const SettingsFixture = (props: SettingsFixtureProps = {}) => (
  <main>
    <TextField defaultValue="Apollo" name="name" onChange={props.onNameChange}>
      <Label>Project name</Label>
      <Input placeholder="Name your project" />
      <Description>Shown to your team</Description>
    </TextField>

    <TextField name="password" type="password">
      <Label>Password</Label>
      <Input />
    </TextField>

    <Select defaultValue="europe" placeholder="Select a region" onChange={props.onRegionChange}>
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
          <ListBox.Item id="ada" textValue="Ada Lovelace">
            Ada Lovelace
          </ListBox.Item>
          <ListBox.Item id="grace" textValue="Grace Hopper">
            Grace Hopper
          </ListBox.Item>
        </ListBox>
      </ComboBox.Popover>
    </ComboBox>

    <Checkbox>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Email notifications
      </Checkbox.Content>
    </Checkbox>

    <Switch>
      <Switch.Content>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        Public project
      </Switch.Content>
    </Switch>

    <RadioGroup defaultValue="free">
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
      <Label>Volume</Label>
      <Slider.Output />
      <Slider.Track>
        <Slider.Fill />
        <Slider.Thumb />
      </Slider.Track>
    </Slider>

    <NumberField defaultValue={3}>
      <Label>Seats</Label>
      <NumberField.Group>
        <NumberField.DecrementButton />
        <NumberField.Input />
        <NumberField.IncrementButton />
      </NumberField.Group>
    </NumberField>

    <DateField defaultValue={parseDate("2026-01-02")}>
      <Label>Due date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>

    <Tabs>
      <Tabs.ListContainer>
        <Tabs.List aria-label="Sections">
          <Tabs.Tab id="general">General</Tabs.Tab>
          <Tabs.Tab id="billing">Billing</Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
      <Tabs.Panel id="general">General settings</Tabs.Panel>
      <Tabs.Panel id="billing">Billing settings</Tabs.Panel>
    </Tabs>

    <Accordion>
      <Accordion.Item id="advanced">
        <Accordion.Heading>
          <Accordion.Trigger>Advanced</Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <TextField name="webhook">
              <Label>Webhook URL</Label>
              <Input />
            </TextField>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>

    <Dropdown>
      <Button aria-label="More actions">More</Button>
      <Dropdown.Popover>
        <Dropdown.Menu onAction={props.onMenuAction}>
          <Dropdown.Item id="duplicate" textValue="Duplicate">
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item id="archive" textValue="Archive">
            Archive
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>

    <Modal>
      <Button>Invite member</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading>Invite a member</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <TextField name="email">
                <Label>Email</Label>
                <Input />
              </TextField>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close">Send invite</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>

    <section data-agent-hidden>
      <TextField name="recovery">
        <Label>Recovery code</Label>
        <Input defaultValue="1234-5678" />
      </TextField>
    </section>

    <div data-agent-secret>
      <TextField defaultValue="12-3456789" name="tax">
        <Label>Tax ID</Label>
        <Input />
      </TextField>
    </div>

    <Button data-agent-confirm="Deletes the project for everyone" onPress={props.onDelete}>
      Delete project
    </Button>
    <Button onPress={props.onSave}>Save</Button>
  </main>
);

export type RatingFixtureProps = Partial<AgentComponentOptions> & {
  onRate?: (value: number) => void;
};

/** A component the library doesn't ship, registered with the bridge by its author. */
export const RatingFixture = ({onRate, ...options}: RatingFixtureProps = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useAgentComponent(ref, {
    actions: {
      rate: (next: number) => {
        setValue(next);
        onRate?.(next);
      },
    },
    component: "rating",
    state: () => ({value}),
    ...options,
  });

  return (
    <div ref={ref} aria-label="Your rating" role="group">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          aria-pressed={star <= value}
          type="button"
          onClick={() => setValue(star)}
        >
          {star}
        </button>
      ))}
    </div>
  );
};

export type PickersFixtureProps = {
  onDateChange?: (value: unknown) => void;
  onRangeChange?: (value: unknown) => void;
  onStateChange?: (value: unknown) => void;
  onTimeChange?: (value: unknown) => void;
};

/** Date, time, and searchable pickers, which the bridge drives without opening their popups. */
export const PickersFixture = (props: PickersFixtureProps) => (
  <main>
    <DatePicker name="launch" onChange={props.onDateChange}>
      <Label>Launch date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
    </DatePicker>
    <DateRangePicker endName="tripEnd" startName="tripStart" onChange={props.onRangeChange}>
      <Label>Trip dates</Label>
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
    <TimeField name="standup" onChange={props.onTimeChange}>
      <Label>Standup time</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </TimeField>
    <Autocomplete name="state" placeholder="Select a state" onChange={props.onStateChange}>
      <Label>State</Label>
      <Autocomplete.Trigger>
        <Autocomplete.Value />
        <Autocomplete.Indicator />
      </Autocomplete.Trigger>
      <Autocomplete.Popover>
        <Autocomplete.Filter>
          <SearchField aria-label="Search states">
            <SearchField.Group>
              <SearchField.Input placeholder="Search" />
            </SearchField.Group>
          </SearchField>
          <ListBox>
            <ListBox.Item id="florida" textValue="Florida">
              Florida
            </ListBox.Item>
            <ListBox.Item id="texas" textValue="Texas">
              Texas
            </ListBox.Item>
          </ListBox>
        </Autocomplete.Filter>
      </Autocomplete.Popover>
    </Autocomplete>
  </main>
);
