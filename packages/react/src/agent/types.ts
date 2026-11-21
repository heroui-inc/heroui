/** Who caused a change: an agent acting through the bridge, or anything else. */
export type AgentSource = "agent" | "user";

/** One choice a list-like component offers. */
export interface AgentItem {
  value: string;
  label: string;
  disabled?: boolean;
}

/** What `snapshot()` and `query()` report for one component. */
export interface AgentComponent {
  /** Stable identifier while the component stays on the page, such as `"c3"`. */
  ref: string;
  /** The kind of component, such as `"select"`, `"text-field"`, or a custom name. */
  component: string;
  /** Accessible name. */
  label?: string;
  /** Label of the group or fieldset the component sits in. */
  group?: string;
  /** Text of the table row or list item the component sits in. */
  row?: string;
  value?: unknown;
  checked?: boolean | "mixed";
  open?: boolean;
  pressed?: boolean;
  /** Choices, included when there are few. Use `query({within})` for the rest. */
  items?: AgentItem[];
  /** How many choices exist when they are not all listed. */
  itemCount?: number;
  /** Help and error text connected to the component. */
  description?: string;
  /** Visible text of a dialog, alert, or toast. */
  text?: string;
  placeholder?: string;
  href?: string;
  min?: number;
  max?: number;
  step?: number;
  multiple?: boolean;
  required?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  disabled?: boolean;
  /** Text of a `data-agent-confirm` mark. A step on this component needs a person. */
  confirm?: string;
  /** Extra guidance for the agent, such as why a list has no items yet. */
  note?: string;
  /** Number of matches left out of a capped list. */
  more?: number;
  /** Action names the agent may request right now. */
  actions: string[];
  /** Custom components may expose additional state keys. */
  [key: string]: unknown;
}

/** One requested action. */
export interface AgentStep {
  /** A ref from a snapshot, or the component's label. */
  ref: string;
  /** An action name from the component's `actions`. */
  action: string;
  /** Arguments for the action. */
  args?: unknown[];
}

/** A resolved action, passed to `allow`. */
export interface AgentAction {
  ref: string;
  component: string;
  label?: string;
  action: string;
  args: unknown[];
  /** Text of a `data-agent-confirm` mark on or around the target. */
  confirm?: string;
}

export type AgentAllow = (
  action: AgentAction,
  context: {signal: AbortSignal},
) => boolean | Promise<boolean>;

/** A state change on one component. */
export interface AgentChange {
  ref: string;
  component: string;
  label?: string;
  /** The state key that changed: `value`, `checked`, `open`, or `pressed`. */
  key: string;
  previous: unknown;
  value: unknown;
  source: AgentSource;
}

export interface AgentStepResult {
  /** Index of the step in the request. */
  step: number;
  /** The ref the step acted on. */
  ref: string;
  /** Value returned by a custom action, when it returned one. */
  result?: unknown;
  /** State changes observed on the page after the step. */
  changes: Omit<AgentChange, "source">[];
}

export interface AgentActResult {
  /** Whether every step ran without a bridge error. */
  ok: boolean;
  /** The failing step and why. */
  error?: {step: number; message: string};
  /** Steps that ran. */
  steps: AgentStepResult[];
  /** Current field values, keyed by ref and label, such as `"c1 Project name"`. */
  values: Record<string, unknown>;
  /** Components that appeared during the call and are still on the page. */
  appeared?: AgentComponent[];
  /** Refs of components that left the page during the call. */
  gone?: string[];
}

export interface AgentQuery {
  /** Words to look for in labels, groups, rows, and list choices. */
  text?: string;
  /** Ref or label of one list, to return its choices. */
  within?: string;
  /** Keep one kind of component, such as `"select"`. */
  kind?: string;
}

export interface AgentOptions {
  /** Decides whether a resolved action may run. Return `false` to refuse it. */
  allow?: AgentAllow;
  /** How long a step waits for `allow`, in milliseconds. 5 minutes by default. */
  timeout?: number;
  /** Limit the bridge to part of the page. Defaults to the whole document. */
  root?: Element | (() => Element | null | undefined);
}

export interface Agent {
  /** Lists the components on the page with their state and available actions. */
  snapshot: () => AgentComponent[];
  /** Runs actions in order. Stops at the first failure; earlier steps stay applied. */
  act: (input: {steps: AgentStep[]}, options?: {allow?: AgentAllow}) => Promise<AgentActResult>;
  /** Finds components and list choices without listing the whole page. */
  query: (input: AgentQuery) => Promise<AgentComponent[] | {error: string}>;
  /** Reports state changes made by people, the app, and the agent. */
  subscribe: (listener: (change: AgentChange) => void) => () => void;
}

/** How a custom component describes itself to the bridge. */
export interface AgentComponentOptions {
  /** The kind reported in snapshots, such as `"rating"`. */
  component: string;
  /** Accessible name. Defaults to the element's own label. */
  label?: string;
  /** Current state. `value`, `checked`, `open`, and `pressed` are tracked for changes. */
  state?: () => Record<string, unknown>;
  /** Methods an agent may call, by name. */
  actions?: Record<string, (...args: never[]) => unknown>;
  /** Choices, when the component is a list. */
  items?: () => AgentItem[];
  /** The value is always one of `items`, so other values are refused. */
  closed?: boolean;
  /** The value is never shown to the agent. */
  secret?: boolean;
  /** Whether the agent sees the component right now. */
  shown?: () => boolean;
  /** List the controls inside the element separately instead of hiding them. */
  exposeChildren?: boolean;
}
