import type {
  AgentActResult,
  AgentAction,
  AgentComponent,
  AgentComponentOptions,
  AgentQuery,
  AgentStep,
} from "./index";
import type {ReactNode, RefObject} from "react";

import {Icon} from "@iconify/react";
import React, {useEffect, useMemo, useRef, useState, useSyncExternalStore} from "react";

import {Button} from "../components/button";
import {Tabs} from "../components/tabs";

import {agentTools, createAgent, useAgentComponent} from "./index";

/**
 * Shared by the agent stories. Not a story file itself: the name keeps it out of the
 * package build and out of Storybook's story glob.
 */

/* -------------------------------------------------------------------------------------------------
 * Tasks: what a person asks, and the calls a model would make for it.
 * -----------------------------------------------------------------------------------------------*/

export type Task = {
  /** Short text for the suggestion chip. */
  label: string;
  /** What the person asked for, in their words. */
  ask: string;
  /**
   * The steps a model would send to `act`. A function gets the snapshot first, the way a
   * model reads the page before it picks refs.
   */
  steps?: AgentStep[] | ((page: AgentComponent[]) => AgentStep[]);
  /** Or a read-only `query`. */
  query?: AgentQuery;
  /** Keep going after a failed step, the way a model reads the error and tries again. */
  recover?: boolean;
  /** What the model says once the calls are done. */
  reply?: ReactNode;
};

type Kind = "act" | "query" | "snapshot";

type LineStatus = "running" | "ok" | "error";

type Line = {
  call: string;
  detail?: string;
  id: number;
  kind: Kind;
  ms?: number;
  status: LineStatus;
};

type Turn = {ask: string; done: boolean; id: number; lines: Line[]; reply?: ReactNode};

type Pending = {action: AgentAction; resolve: (allowed: boolean) => void};

const STEP_DELAY = 420;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const clipText = (text: string, max = 96) =>
  text.length > max ? `${text.slice(0, max - 1)}…` : text;

/** Formats a value the way you would write it in code: `{together: 3, cabin: "economy"}`. */
const format = (value: unknown): string => {
  if (typeof value === "string") return `"${value}"`;
  if (Array.isArray(value)) return `[${value.map(format).join(", ")}]`;
  if (value && typeof value === "object") {
    return `{${Object.entries(value)
      .map(([key, entry]) => `${key}: ${format(entry)}`)
      .join(", ")}}`;
  }

  return String(value);
};

/** Actions every built-in component shares. Their target reads as the first argument. */
const BUILT_IN = new Set(["setValue", "setChecked", "setOpen", "press", "clear", "toggle"]);

const callOf = (step: AgentStep, target: string): string => {
  const args = Array.isArray(step.args) ? step.args : [];

  return BUILT_IN.has(step.action)
    ? `${step.action}(${[target, ...args].map(format).join(", ")})`
    : `${step.action}(${args.map(format).join(", ")})`;
};

const summarize = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value
      .map((entry) =>
        entry && typeof entry === "object" && "seats" in entry
          ? (entry.seats as string[]).join("·")
          : typeof entry === "object"
            ? format(entry)
            : String(entry),
      )
      .join(", ");
  }

  if (value && typeof value === "object") {
    return Object.entries(value)
      .map(([key, entry]) => `${key} ${typeof entry === "object" ? format(entry) : String(entry)}`)
      .join(" · ");
  }

  return String(value);
};

const detailOf = (result: AgentActResult): string => {
  const [step] = result.steps;

  if (!step) return "";
  if (step.result !== undefined) return clipText(summarize(step.result));
  if (step.changes.length === 0) return "done";

  return clipText(
    step.changes
      .map((change) =>
        typeof change.value === "object" && change.value !== null
          ? `${change.label ?? change.component} updated`
          : `${change.label ?? change.component} → ${format(change.value)}`,
      )
      .join(", "),
  );
};

const duration = (ms: number) =>
  ms < 1000 ? `${Math.max(1, Math.round(ms))} ms` : `${(ms / 1000).toFixed(1)} s`;

/* -------------------------------------------------------------------------------------------------
 * Activity: what the agent is doing right now, for the cursor and for demos that react to it.
 * -----------------------------------------------------------------------------------------------*/

type Activity = {
  /** The call in flight. */
  call?: string;
  /** Label of the action waiting for a person. */
  pending?: string;
  running: boolean;
  /** When the current request started. Pointers older than this are stale. */
  turnAt: number;
};

let activity: Activity = {running: false, turnAt: 0};
const listeners = new Set<() => void>();

const setActivity = (patch: Partial<Activity>) => {
  activity = {...activity, ...patch};
  listeners.forEach((listener) => listener());
};

const subscribeActivity = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

/** What the agent is doing right now. */
export const useAgentActivity = () =>
  useSyncExternalStore(
    subscribeActivity,
    () => activity,
    () => activity,
  );

/**
 * Value for `data-agent-pointer` on whatever the agent just changed. The cursor goes to the
 * newest one. Use `0` on a component's root so the cursor rests there while the agent reads.
 */
export const pointerStamp = () => Date.now();

/* -------------------------------------------------------------------------------------------------
 * Agent panel: stands in for the model, and shows what it sees and does.
 * It is marked `data-agent-hidden`, so the agent never sees its own controls.
 * -----------------------------------------------------------------------------------------------*/

type AgentPanelProps = {
  /** Ask the person before steps marked `data-agent-confirm`, and refuse links. */
  guarded?: boolean;
  tasks: Task[];
};

export const AgentPanel = ({guarded = false, tasks}: AgentPanelProps) => {
  const [pending, setPending] = useState<Pending | null>(null);
  const [snapshot, setSnapshot] = useState<AgentComponent[]>([]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const nextId = useRef(0);
  const transcriptRef = useRef<HTMLDivElement>(null);

  const agent = useMemo(
    () =>
      createAgent(
        guarded
          ? {
              allow: (action, {signal}) => {
                if (action.component === "link") return false;
                if (!action.confirm) return true;

                return new Promise<boolean>((resolve) => {
                  setPending({action, resolve});
                  setActivity({pending: action.label ?? action.ref});
                  signal.addEventListener("abort", () => {
                    setPending(null);
                    setActivity({pending: undefined});
                    resolve(false);
                  });
                });
              },
            }
          : {},
      ),
    [guarded],
  );

  useEffect(() => {
    let last = "";

    const refresh = () => {
      const next = agent.snapshot();
      const serialized = JSON.stringify(next);

      if (serialized === last) return;
      last = serialized;
      setSnapshot(next);
    };

    refresh();

    const timer = setInterval(refresh, 600);
    const unsubscribe = agent.subscribe(refresh);

    return () => {
      clearInterval(timer);
      unsubscribe();
      setActivity({call: undefined, pending: undefined, running: false});
    };
  }, [agent]);

  useEffect(() => {
    const element = transcriptRef.current;

    if (element) element.scrollTo({behavior: "smooth", top: element.scrollHeight});
  }, [turns, pending]);

  const updateTurn = (turnId: number, patch: (turn: Turn) => Partial<Turn>) =>
    setTurns((list) => list.map((turn) => (turn.id === turnId ? {...turn, ...patch(turn)} : turn)));

  const addLine = (turnId: number, line: Omit<Line, "id" | "status">) => {
    const id = nextId.current++;

    updateTurn(turnId, (turn) => ({lines: [...turn.lines, {...line, id, status: "running"}]}));
    setActivity({call: line.call});

    return id;
  };

  const updateLine = (turnId: number, lineId: number, patch: Partial<Line>) =>
    updateTurn(turnId, (turn) => ({
      lines: turn.lines.map((line) => (line.id === lineId ? {...line, ...patch} : line)),
    }));

  /** The label a person would recognize for a step's target, such as "Sentiment · Acme". */
  const targetOf = (ref: string, page: AgentComponent[]) => {
    const found = page.find((component) => component.ref === ref);

    if (!found) return ref;

    return [found.label ?? found.component, found.row].filter(Boolean).join(" · ");
  };

  /** Runs one call after the demo's pause, and reports how long the bridge itself took. */
  const timed = async <T,>(work: () => Promise<T> | T) => {
    await wait(STEP_DELAY);

    const start = performance.now();
    const value = await work();

    return {ms: performance.now() - start, value};
  };

  const runQuery = async (turnId: number, input: AgentQuery) => {
    const lineId = addLine(turnId, {call: `query(${format(input)})`, kind: "query"});
    const {ms, value: found} = await timed(() => agent.query(input));

    if ("error" in found) {
      updateLine(turnId, lineId, {detail: found.error, ms, status: "error"});

      return false;
    }

    const items = found.flatMap((component) => component.items ?? []);
    const detail =
      items.length > 0
        ? items.map((item) => item.label.split(" · ")[0]).join(", ")
        : found.map((component) => component.label ?? component.component).join(", ");

    updateLine(turnId, lineId, {
      detail: `${items.length || found.length} found · ${clipText(detail || "nothing")}`,
      ms,
      status: "ok",
    });

    return true;
  };

  const runSteps = async (turnId: number, input: Task["steps"], recover: boolean) => {
    let page = agent.snapshot();
    let steps: AgentStep[] = Array.isArray(input) ? input : [];
    let ok = true;

    if (typeof input === "function") {
      const lineId = addLine(turnId, {call: "snapshot()", kind: "snapshot"});
      const {ms, value} = await timed(() => agent.snapshot());

      page = value;
      steps = input(page);
      updateLine(turnId, lineId, {detail: `${page.length} components`, ms, status: "ok"});
    }

    for (const step of steps) {
      const lineId = addLine(turnId, {call: callOf(step, targetOf(step.ref, page)), kind: "act"});
      const {ms, value: result} = await timed(() => agent.act({steps: [step]}));

      if (!result.ok) {
        updateLine(turnId, lineId, {detail: result.error?.message, ms, status: "error"});
        ok = false;

        if (!recover) return false;
        continue;
      }

      updateLine(turnId, lineId, {detail: detailOf(result), ms, status: "ok"});
      page = agent.snapshot();
    }

    return ok || recover;
  };

  const run = async (ask: string, task: Pick<Task, "query" | "recover" | "reply" | "steps">) => {
    const turnId = nextId.current++;

    setIsRunning(true);
    setActivity({call: undefined, running: true, turnAt: Date.now()});
    setTurns((list) => [...list, {ask, done: false, id: turnId, lines: []}]);

    try {
      const ok = task.query
        ? await runQuery(turnId, task.query)
        : await runSteps(turnId, task.steps, Boolean(task.recover));

      updateTurn(turnId, () => ({done: true, reply: ok ? task.reply : undefined}));
    } finally {
      setIsRunning(false);
      setActivity({call: undefined, running: false});
    }
  };

  const send = () => {
    const text = draft.trim();

    if (!text || isRunning) return;

    setDraft("");

    const task = tasks.find(
      (entry) =>
        entry.ask.toLowerCase() === text.toLowerCase() ||
        entry.label.toLowerCase() === text.toLowerCase(),
    );

    if (task) {
      void run(task.ask, task);

      return;
    }

    try {
      const input: unknown = JSON.parse(text);

      void run(
        text,
        Array.isArray(input) ? {steps: input as AgentStep[]} : {query: input as AgentQuery},
      );
    } catch {
      setTurns((list) => [
        ...list,
        {
          ask: text,
          done: true,
          id: nextId.current++,
          lines: [],
          reply: (
            <>
              There's no model in this demo. Pick a suggestion, or send steps as JSON:{" "}
              <code className="font-mono text-xs">{'[{"ref": "…", "action": "…"}]'}</code>
            </>
          ),
        },
      ]);
    }
  };

  const answer = (allowed: boolean) => {
    pending?.resolve(allowed);
    setPending(null);
    setActivity({pending: undefined});
  };

  return (
    <aside
      data-agent-hidden
      className="flex h-screen min-h-0 flex-col border-l border-separator bg-background-secondary"
    >
      <Tabs className="flex min-h-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-3 border-b border-separator px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span
              className={`size-2 rounded-full ${
                isRunning
                  ? "animate-pulse bg-accent ring-4 ring-accent-soft"
                  : "bg-success ring-4 ring-success-soft"
              }`}
            />
            <span className="text-sm font-semibold">Agent</span>
            <span className="font-mono text-xs whitespace-nowrap text-muted tabular-nums">
              sees {snapshot.length} {snapshot.length === 1 ? "component" : "components"}
            </span>
          </div>
          <Tabs.ListContainer>
            <Tabs.List aria-label="Agent views">
              <Tabs.Tab id="chat">
                Chat
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="page">
                Page
                <Tabs.Indicator />
              </Tabs.Tab>
              <Tabs.Tab id="tools">
                Tools
                <Tabs.Indicator />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>
        </header>

        <Tabs.Panel className="flex min-h-0 flex-1 flex-col p-0" id="chat">
          <div
            ref={transcriptRef}
            className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-5 py-5"
          >
            {turns.length === 0 ? (
              <div className="my-auto flex flex-col items-center gap-2 px-6 text-center">
                <Icon className="size-5 text-muted" icon="gravity-ui:sparkles" />
                <p className="text-sm font-medium">The agent reads the page, not pixels</p>
                <p className="text-sm text-muted">
                  Pick a request below. Each call shows up here, and a cursor shows where it lands.
                </p>
              </div>
            ) : null}

            {turns.map((turn) => (
              <TurnView key={turn.id} turn={turn} />
            ))}

            {pending ? (
              <div className="flex flex-col gap-3.5 rounded-2xl bg-surface p-4 shadow-[0_0_0_1px_var(--color-warning),0_6px_20px_-8px_var(--color-warning)]">
                <div className="flex items-start gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-warning-soft text-warning-soft-foreground">
                    <Icon className="size-3.5" icon="gravity-ui:lock" />
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-semibold">
                      {pending.action.action === "press" ? "Press" : pending.action.action} “
                      {pending.action.label}”?
                    </p>
                    <p className="text-sm text-muted">
                      {pending.action.confirm}. This control is marked data-agent-confirm.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ps-9.5">
                  <Button size="sm" onPress={() => answer(true)}>
                    Allow
                  </Button>
                  <Button size="sm" variant="outline" onPress={() => answer(false)}>
                    Deny
                  </Button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 px-5 pt-3 pb-5">
            <div className="flex flex-wrap gap-1.5">
              {tasks.map((task) => (
                <Button
                  key={task.label}
                  isDisabled={isRunning}
                  size="sm"
                  variant="outline"
                  onPress={() => void run(task.ask, task)}
                >
                  {task.label}
                </Button>
              ))}
            </div>
            <form
              className="flex items-end gap-2 rounded-[22px] bg-surface p-2 ps-4 shadow-surface"
              onSubmit={(event) => {
                event.preventDefault();
                send();
              }}
            >
              <textarea
                aria-label="Ask the agent"
                className="min-h-8 flex-1 resize-none bg-transparent py-1.5 text-sm leading-5 outline-none placeholder:text-muted"
                placeholder="Ask the agent to do something…"
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send();
                  }
                }}
              />
              <Button
                isIconOnly
                aria-label="Send"
                isDisabled={isRunning || draft.trim() === ""}
                size="sm"
                type="submit"
              >
                <Icon icon="gravity-ui:arrow-up" />
              </Button>
            </form>
          </div>
        </Tabs.Panel>

        <Tabs.Panel className="min-h-0 flex-1 overflow-y-auto px-5 py-3" id="page">
          <p className="mb-3 text-sm text-muted">
            agent.snapshot() — the page as the model reads it, instead of a screenshot.
          </p>
          <ul className="flex flex-col font-mono text-xs">
            {snapshot.map((component) => (
              <li key={component.ref} className="flex flex-col gap-0.5 py-2">
                <span>
                  <span className="text-muted">{component.ref}</span>{" "}
                  <span className="text-accent">{component.component}</span>{" "}
                  <span className="font-semibold">{component.label}</span>
                  {component.row ? <span className="text-muted"> · {component.row}</span> : null}
                  {component.group ? (
                    <span className="text-muted"> · {component.group}</span>
                  ) : null}
                </span>
                <span className="text-muted">
                  {"value" in component ? `value ${clipText(format(component.value), 80)} ` : null}
                  {"checked" in component ? `checked ${format(component.checked)} ` : null}
                  {"open" in component ? `open ${format(component.open)} ` : null}
                  {component.confirm ? `confirm ${format(component.confirm)} ` : null}
                  {component.itemCount ? `${component.itemCount} items ` : null}
                  {component.actions.length > 0 ? `→ ${component.actions.join(", ")}` : null}
                </span>
              </li>
            ))}
          </ul>
        </Tabs.Panel>

        <Tabs.Panel className="min-h-0 flex-1 overflow-y-auto px-5 py-3" id="tools">
          <p className="mb-3 text-sm text-muted">
            agentTools — three tool definitions you hand to your model SDK.
          </p>
          <ul className="flex flex-col gap-5 text-sm">
            {agentTools.map((tool) => (
              <li key={tool.name} className="flex flex-col gap-1">
                <p className="font-mono text-xs font-semibold">{tool.name}</p>
                <p className="text-muted">{tool.description}</p>
                <details className="mt-1">
                  <summary className="cursor-pointer text-xs text-muted">inputSchema</summary>
                  <pre className="mt-2 overflow-auto rounded-xl bg-default p-3 font-mono text-xs whitespace-pre-wrap">
                    {JSON.stringify(tool.inputSchema, null, 2)}
                  </pre>
                </details>
              </li>
            ))}
          </ul>
        </Tabs.Panel>
      </Tabs>
    </aside>
  );
};

const KIND_TONES: Record<Kind | "error", string> = {
  act: "bg-accent-soft text-accent-soft-foreground",
  error: "bg-danger-soft text-danger-soft-foreground",
  query: "bg-default text-muted",
  snapshot: "bg-default text-muted",
};

/** One request: the ask, a log of the calls it made, and the model's reply. */
const TurnView = ({turn}: {turn: Turn}) => {
  const total = turn.lines.reduce((sum, line) => sum + (line.ms ?? 0), 0);

  return (
    <section className="flex flex-col gap-3">
      <p className="ms-auto max-w-[85%] rounded-[18px] rounded-br-md bg-surface px-3.5 py-2.5 text-sm leading-5 shadow-surface">
        {turn.ask}
      </p>

      {turn.lines.length > 0 ? (
        <div className="flex flex-col gap-2">
          <p className="flex items-center justify-between text-[13px] font-medium">
            {turn.done
              ? `Ran ${turn.lines.length} ${turn.lines.length === 1 ? "call" : "calls"}`
              : "Working…"}
            {turn.done ? (
              <span className="font-mono text-[11px] font-normal text-muted tabular-nums">
                {duration(total)} in the bridge
              </span>
            ) : null}
          </p>
          <ol className="flex flex-col rounded-2xl bg-surface py-1 shadow-surface">
            {turn.lines.map((line) => (
              <li
                key={line.id}
                className={`flex items-start gap-3 px-3.5 py-2.5 transition-colors duration-300 ${
                  line.status === "running" ? "bg-accent-soft/40" : ""
                }`}
              >
                <span
                  className={`w-[66px] shrink-0 rounded-md text-center font-mono text-[10px] leading-[18px] ${
                    KIND_TONES[line.status === "error" ? "error" : line.kind]
                  }`}
                >
                  {line.kind}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-mono text-xs leading-[18px] break-words">{line.call}</span>
                  {line.status === "running" ? (
                    <span className="text-xs text-accent">Running…</span>
                  ) : line.detail ? (
                    <span
                      className={`text-xs leading-[17px] break-words ${
                        line.status === "error" ? "text-danger" : "text-muted"
                      }`}
                    >
                      {line.detail}
                    </span>
                  ) : null}
                </span>
                <span className="w-11 shrink-0 text-end font-mono text-[11px] leading-[18px] text-muted tabular-nums">
                  {line.ms === undefined ? "" : duration(line.ms)}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ) : null}

      {turn.reply ? (
        <div className="text-sm leading-[22px] text-foreground/80 [&_b]:font-semibold [&_b]:text-foreground">
          {turn.reply}
        </div>
      ) : null}
    </section>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Agent cursor: shows where the agent is acting, on top of the demo.
 * -----------------------------------------------------------------------------------------------*/

const findTarget = (pending: string | undefined, turnAt: number): HTMLElement | null => {
  if (pending) {
    const marks = [...document.querySelectorAll<HTMLElement>("[data-agent-confirm]")];
    const match = marks.find((mark) => mark.textContent?.includes(pending)) ?? marks[0];

    if (match) return match;
  }

  let fresh: HTMLElement | null = null;
  let freshStamp = 0;
  let resting: HTMLElement | null = null;

  for (const element of document.querySelectorAll<HTMLElement>("[data-agent-pointer]")) {
    const stamp = Number(element.dataset["agentPointer"]) || 0;

    if (stamp === 0) resting ??= element;
    else if (stamp >= turnAt && stamp > freshStamp) {
      fresh = element;
      freshStamp = stamp;
    }
  }

  return fresh ?? resting;
};

const pointOf = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();

  // Big targets get the cursor in the middle, small ones near their lower right.
  return rect.width > 240
    ? {x: rect.left + rect.width / 2, y: rect.top + rect.height / 2}
    : {x: rect.left + rect.width * 0.7, y: rect.top + rect.height * 0.72};
};

export const AgentCursor = () => {
  const {call, pending, running, turnAt} = useAgentActivity();
  const isActive = running || Boolean(pending);
  const [isShown, setIsShown] = useState(false);
  const [point, setPoint] = useState<{x: number; y: number} | null>(null);

  useEffect(() => {
    if (isActive) {
      setIsShown(true);

      return;
    }

    const timer = setTimeout(() => setIsShown(false), 1400);

    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isShown) return;

    let frame = 0;

    const follow = () => {
      const target = findTarget(pending, turnAt);
      const next = target ? pointOf(target) : null;

      setPoint((current) =>
        next && current && Math.abs(current.x - next.x) < 0.5 && Math.abs(current.y - next.y) < 0.5
          ? current
          : next,
      );
      frame = requestAnimationFrame(follow);
    };

    follow();

    return () => cancelAnimationFrame(frame);
  }, [isShown, pending, turnAt]);

  const label = pending ? "waiting for you" : call ? clipText(call, 30) : "reading";

  return (
    <div
      aria-hidden
      data-agent-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
      style={{
        opacity: isShown && point ? 1 : 0,
        translate: point ? `${point.x}px ${point.y}px` : undefined,
      }}
    >
      <svg className="drop-shadow-sm" fill="none" height="20" viewBox="0 0 18 20" width="18">
        <path
          className="fill-accent stroke-white"
          d="M2 1.5L16 9.2L9.4 10.6L6.2 17.6L2 1.5Z"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
      <span className="ms-3 -mt-0.5 flex w-max items-center gap-1.5 rounded-full bg-accent py-1 ps-2 pe-2.5 shadow-[0_4px_12px_-2px_var(--color-accent)]">
        <span className="text-xs font-semibold text-accent-foreground">Agent</span>
        <span className="font-mono text-[11px] text-accent-foreground/80">{label}</span>
      </span>
    </div>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Stage: the demo sits straight on the page, with the agent panel beside it.
 * -----------------------------------------------------------------------------------------------*/

type StageProps = {
  children: ReactNode;
  /** One line under the title. */
  description: ReactNode;
  /** The API the demo shows, such as "useAgentComponent · seat-map". */
  eyebrow: string;
  panel: ReactNode;
  title: string;
  /** Room for a wide demo. */
  isWide?: boolean;
};

export const Stage = ({
  children,
  description,
  eyebrow,
  isWide = false,
  panel,
  title,
}: StageProps) => (
  <div className="grid h-screen grid-cols-1 bg-background text-foreground lg:grid-cols-[minmax(0,1fr)_420px]">
    <main className="flex min-h-0 flex-col overflow-y-auto px-6 py-12 sm:px-10 lg:px-16">
      <div
        className={`mx-auto my-auto flex w-full flex-col gap-10 ${isWide ? "max-w-5xl" : "max-w-3xl"}`}
      >
        <header className="flex max-w-xl flex-col gap-2.5">
          <p className="font-mono text-xs text-muted">{eyebrow}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-balance">{title}</h1>
          <p className="text-[15px] leading-relaxed text-pretty text-muted">{description}</p>
        </header>
        {children}
      </div>
    </main>
    {panel}
    <AgentCursor />
  </div>
);

/** A titled group of controls, without a card around it. */
export const Section = ({
  children,
  className = "",
  title,
}: {
  children: ReactNode;
  className?: string;
  title: string;
}) => (
  <section className={`flex flex-col gap-4 ${className}`}>
    <h2 className="text-sm font-medium text-muted">{title}</h2>
    {children}
  </section>
);

/** Renders nothing. Mounting it describes `target` to the bridge; unmounting removes it. */
export const Describe = ({
  target,
  ...options
}: AgentComponentOptions & {target: RefObject<Element | null>}) => {
  useAgentComponent(target, options);

  return null;
};
