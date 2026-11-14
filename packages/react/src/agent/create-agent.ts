import type {Found} from "./discover";
import type {
  Agent,
  AgentActResult,
  AgentAction,
  AgentAllow,
  AgentChange,
  AgentComponent,
  AgentItem,
  AgentOptions,
  AgentQuery,
  AgentStep,
  AgentStepResult,
} from "./types";

import {AgentError, discover, pickItem} from "./discover";
import {
  REDACTED,
  asAgent,
  confirmOf,
  descriptionOf,
  fold,
  groupOf,
  hasWords,
  isAgentHidden,
  isDisabled,
  isSecret,
  labelOf,
  rowOf,
  settle,
} from "./dom";

const MAX_COMPONENTS = 100;
const MAX_INLINE_ITEMS = 10;
const MAX_QUERY_ITEMS = 50;
const DEFAULT_TIMEOUT = 5 * 60 * 1000;
const TRACKED_KEYS = ["value", "checked", "open", "pressed"] as const;

type Tracked = {
  component: string;
  keys: Record<string, unknown>;
  label?: string;
};

const same = (a: unknown, b: unknown): boolean =>
  a === b || JSON.stringify(a) === JSON.stringify(b);

const isFilled = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && !value.length);

/**
 * Creates the bridge between an agent and the HeroUI components on the page.
 *
 * - `snapshot()` lists components with their labels, state, and available actions.
 * - `act({steps})` calls those actions through the components' own change handlers.
 * - `query({within, text, kind})` finds components and list choices.
 * - `subscribe(listener)` reports changes made by people, the app, and the agent.
 */
export const createAgent = (options: AgentOptions = {}): Agent => {
  const refs = new WeakMap<Element, string>();
  let counter = 0;

  const refOf = (element: Element): string => {
    let ref = refs.get(element);

    if (!ref) {
      ref = `c${++counter}`;
      refs.set(element, ref);
    }

    return ref;
  };

  const getRoot = (): ParentNode | null => {
    if (typeof document === "undefined") return null;

    const root = typeof options.root === "function" ? options.root() : options.root;

    return root ?? document;
  };

  const find = (): Found[] => {
    const root = getRoot();

    return root ? discover(root) : [];
  };

  /* Describing ------------------------------------------------------------------------------- */
  const nameOf = (found: Found): string | undefined => found.label ?? labelOf(found.el);

  const titleOf = (found: Found): string => {
    const label = nameOf(found);

    return label ? `${label} (${refOf(found.el)})` : `${found.kind} ${refOf(found.el)}`;
  };

  const isSecretFound = (found: Found): boolean => found.secret === true || isSecret(found.el);

  const readState = (found: Found): Record<string, unknown> => {
    const state = {...found.state()};

    if (isSecretFound(found) && isFilled(state["value"])) state["value"] = REDACTED;

    return state;
  };

  const describe = (found: Found, itemLimit = MAX_INLINE_ITEMS): AgentComponent => {
    const element = found.el;
    const label = nameOf(found);
    const disabled = isDisabled(element);
    // `actions` is assigned last so the identifying fields lead in the serialized result.
    const out = {ref: refOf(element), component: found.kind} as AgentComponent;
    const set = (key: string, value: unknown) => {
      if (value !== undefined && value !== "") out[key] = value;
    };

    set("label", label);
    set("group", groupOf(element, label));
    set("row", rowOf(element, label));

    for (const [key, value] of Object.entries(readState(found))) set(key, value);

    if (found.items) {
      const items = found.items();

      if (items.length > 0 && items.length <= itemLimit) out.items = items;
      else if (items.length > 0) out.itemCount = items.length;
    }

    set("description", descriptionOf(element));
    if (element.getAttribute("aria-invalid") === "true") out.invalid = true;
    if (
      element.getAttribute("aria-required") === "true" ||
      (element as HTMLInputElement).required === true
    ) {
      out.required = true;
    }
    if (disabled) out.disabled = true;
    set("confirm", confirmOf(element));
    set("note", found.note);
    out.actions = disabled ? [] : Object.keys(found.actions());

    return out;
  };

  /** Keeps fields first when a page has more components than fit in one answer. */
  const cap = (list: Found[], itemLimit?: number): AgentComponent[] => {
    if (list.length <= MAX_COMPONENTS) return list.map((found) => describe(found, itemLimit));

    const kept = new Set([...list].sort((a, b) => a.rank - b.rank).slice(0, MAX_COMPONENTS));
    const components = list.filter((found) => kept.has(found)).map((found) => describe(found));

    components.push({
      actions: [],
      component: "more",
      more: list.length - MAX_COMPONENTS,
      note: "Use query to find the rest.",
      ref: "more",
    });

    return components;
  };

  const snapshot = (): AgentComponent[] => cap(find());

  /* Finding a step's target -------------------------------------------------------------------- */
  const resolve = (list: Found[], ref: string, action?: string): Found => {
    const text = ref.trim();
    const byRef = list.find((found) => refOf(found.el) === text);

    if (byRef) return byRef;

    let matches = list.filter((found) => {
      const label = nameOf(found);

      return (
        hasWords(label, text) ||
        hasWords(groupOf(found.el, label), text) ||
        hasWords(rowOf(found.el, label), text)
      );
    });

    if (matches.length === 0) matches = list.filter((found) => fold(found.kind) === fold(text));

    if (matches.length > 1 && action) {
      const able = matches.filter((found) => action in found.actions());

      if (able.length === 1) matches = able;
    }

    if (matches.length > 1) {
      const exact = matches.filter((found) => fold(nameOf(found) ?? "") === fold(text));

      // An exact label only wins when nothing else on the page could have been meant.
      if (exact.length === 1 && matches.every((found) => found === exact[0] || found.rank > 0)) {
        matches = exact;
      }
    }

    const [match] = matches;

    if (match && matches.length === 1) return match;

    if (matches.length > 1) {
      throw new AgentError(
        `"${text}" names ${matches.length} components: ${matches
          .slice(0, 8)
          .map((found) => {
            const label = nameOf(found);
            const row = rowOf(found.el, label) ?? groupOf(found.el, label);

            return `${refOf(found.el)} ${found.kind} ${label ?? ""}${row ? ` (${row})` : ""}`.trim();
          })
          .join(", ")}. Use a ref.`,
      );
    }

    const root = getRoot();
    const hidden = root
      ? Array.from(
          root.querySelectorAll(
            "[data-agent-hidden] :is(input, textarea, select, button, a, [role], [data-slot])",
          ),
        ).some((node) => hasWords(labelOf(node), text))
      : false;

    if (hidden) {
      throw new AgentError(`"${text}" is kept from agents. Ask the person to do this themselves.`);
    }

    const closed = list
      .filter((found) => found.state()["open"] === false && found.rank === 1)
      .map((found) => nameOf(found))
      .filter(Boolean)
      .slice(0, 6);

    throw new AgentError(
      `No component "${text}" on the page.${
        closed.length > 0 ? ` It may be behind a closed section: ${closed.join(", ")}.` : ""
      } Take a snapshot to see what is there.`,
    );
  };

  /* Permissions ------------------------------------------------------------------------------ */
  const ask = async (allow: AgentAllow, action: AgentAction): Promise<boolean> => {
    const controller = new AbortController();
    const timeout = options.timeout ?? DEFAULT_TIMEOUT;
    let timer: ReturnType<typeof setTimeout> | undefined;

    try {
      return await Promise.race([
        Promise.resolve(allow(action, {signal: controller.signal})),
        new Promise<boolean>((_, reject) => {
          timer = setTimeout(
            () => reject(new AgentError(`Nobody answered within ${Math.round(timeout / 1000)}s.`)),
            timeout,
          );
        }),
      ]);
    } catch (error) {
      controller.abort();
      throw error;
    } finally {
      if (timer) clearTimeout(timer);
    }
  };

  const permit = async (action: AgentAction, extra?: AgentAllow): Promise<void> => {
    const checks = [options.allow, extra].filter((check): check is AgentAllow => Boolean(check));
    const target = action.label ? `"${action.label}"` : `${action.component} ${action.ref}`;

    if (action.confirm && checks.length === 0) {
      throw new AgentError(
        `Needs a person: "${action.confirm}". Ask them to use ${target} themselves.`,
      );
    }

    for (const check of checks) {
      if (await ask(check, action)) continue;

      throw new AgentError(
        action.confirm
          ? `The person said no to "${action.confirm}".`
          : `The app doesn't allow ${action.action} on ${target}.`,
      );
    }
  };

  /* Tracking state for change reports --------------------------------------------------------- */
  const track = (list: Found[] = find()): Map<string, Tracked> => {
    const states = new Map<string, Tracked>();

    for (const found of list) {
      const state = readState(found);
      const keys: Record<string, unknown> = {};

      for (const key of TRACKED_KEYS) if (key in state) keys[key] = state[key];

      states.set(refOf(found.el), {component: found.kind, keys, label: nameOf(found)});
    }

    return states;
  };

  const diff = (
    before: Map<string, Tracked>,
    after: Map<string, Tracked>,
  ): Omit<AgentChange, "source">[] => {
    const changes: Omit<AgentChange, "source">[] = [];

    for (const [ref, next] of after) {
      const previous = before.get(ref);

      if (!previous) continue;

      for (const [key, value] of Object.entries(next.keys)) {
        if (same(previous.keys[key], value)) continue;

        changes.push({
          component: next.component,
          key,
          ...(next.label ? {label: next.label} : {}),
          previous: previous.keys[key],
          ref,
          value,
        });
      }
    }

    return changes;
  };

  const listeners = new Set<(change: AgentChange) => void>();
  let baseline: Map<string, Tracked> | null = null;
  let scheduled: ReturnType<typeof setTimeout> | undefined;
  let stopWatching: (() => void) | undefined;
  let acting = false;

  const emit = (changes: Omit<AgentChange, "source">[], source: AgentChange["source"]) => {
    for (const change of changes) {
      for (const listener of listeners) listener({...change, source});
    }
  };

  /** Reports what changed since the last look, attributed to `source`. */
  const flush = (source: AgentChange["source"]): Omit<AgentChange, "source">[] => {
    if (scheduled) clearTimeout(scheduled);
    scheduled = undefined;

    const next = track();
    const changes = baseline ? diff(baseline, next) : [];

    baseline = next;
    emit(changes, source);

    return changes;
  };

  const schedule = () => {
    // Events the bridge dispatches itself are reported by the step that caused them.
    if (acting || scheduled || listeners.size === 0) return;
    scheduled = setTimeout(() => {
      scheduled = undefined;
      flush("user");
    }, 0);
  };

  const watch = () => {
    const root = getRoot();

    if (!root) return;

    const target =
      "documentElement" in root ? (root as Document).documentElement : (root as Element);

    const events = ["input", "change", "click", "keyup"];

    for (const type of events) target.addEventListener(type, schedule, true);

    const observer =
      typeof MutationObserver === "undefined" ? undefined : new MutationObserver(schedule);

    observer?.observe(target, {
      attributeFilter: ["aria-checked", "aria-expanded", "aria-pressed", "aria-selected", "value"],
      attributes: true,
      childList: true,
      subtree: true,
    });

    stopWatching = () => {
      for (const type of events) target.removeEventListener(type, schedule, true);
      observer?.disconnect();
      if (scheduled) clearTimeout(scheduled);
      scheduled = undefined;
      baseline = null;
      stopWatching = undefined;
    };
  };

  const subscribe = (listener: (change: AgentChange) => void): (() => void) => {
    if (listeners.size === 0) {
      baseline = track();
      watch();
    }
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) stopWatching?.();
    };
  };

  /* Acting ----------------------------------------------------------------------------------- */
  const valuesOf = (list: Found[]): Record<string, unknown> => {
    const values: Record<string, unknown> = {};

    for (const found of list) {
      if (found.rank !== 0 || Object.keys(values).length >= MAX_COMPONENTS) continue;

      const state = readState(found);
      const value = "value" in state ? state["value"] : state["checked"];

      if (value === undefined) continue;

      const label = nameOf(found);

      values[label ? `${refOf(found.el)} ${label}` : refOf(found.el)] = value;
    }

    return values;
  };

  /** Turns labels into values for lists whose value is always one of their items. */
  const resolveArgs = (found: Found, action: string, args: unknown[]): unknown[] => {
    if (!found.closed || !found.items || action !== "setValue") return args;

    const items: AgentItem[] = found.items();
    const toValue = (arg: unknown) => pickItem(items, arg, titleOf(found)).value;

    return args.map((arg) => (Array.isArray(arg) ? arg.map(toValue) : toValue(arg)));
  };

  const runStep = async (
    step: AgentStep,
    index: number,
    extra?: AgentAllow,
  ): Promise<AgentStepResult> => {
    if (!step || typeof step.ref !== "string" || typeof step.action !== "string") {
      throw new AgentError("A step needs a ref and an action.");
    }

    const list = find();
    const found = resolve(list, step.ref, step.action);
    const ref = refOf(found.el);

    if (isAgentHidden(found.el)) {
      throw new AgentError(`${titleOf(found)} is kept from agents. Ask the person.`);
    }
    if (isDisabled(found.el)) throw new AgentError(`${titleOf(found)} is disabled.`);

    const actions = found.actions();
    const run = actions[step.action];

    if (!run) {
      throw new AgentError(
        `${titleOf(found)} takes no ${step.action} now. It takes: ${
          Object.keys(actions).join(", ") || "nothing"
        }.`,
      );
    }

    const args = resolveArgs(found, step.action, Array.isArray(step.args) ? step.args : []);

    await permit(
      {
        action: step.action,
        args,
        component: found.kind,
        confirm: confirmOf(found.el),
        label: nameOf(found),
        ref,
      },
      extra,
    );

    // Anything a person changed before this step is theirs, not the agent's.
    if (listeners.size > 0) flush("user");

    const before = listeners.size > 0 && baseline ? baseline : track(list);
    let result: unknown;

    acting = true;
    try {
      result = await asAgent(() => run(...args));
      await settle();
    } finally {
      acting = false;
    }

    const after = track();
    const changes = diff(before, after);

    if (listeners.size > 0) {
      baseline = after;
      emit(changes, "agent");
    }

    return {changes, ref, step: index, ...(result === undefined ? {} : {result})};
  };

  let queue: Promise<unknown> = Promise.resolve();

  const enqueue = <T>(task: () => Promise<T>): Promise<T> => {
    const next = queue.then(task, task);

    queue = next.catch(() => undefined);

    return next;
  };

  const act: Agent["act"] = (input, actOptions) =>
    enqueue(async () => {
      const steps = Array.isArray(input?.steps) ? input.steps : [];
      const startRefs = new Set(find().map((found) => refOf(found.el)));
      const result: AgentActResult = {ok: true, steps: [], values: {}};

      for (const [index, step] of steps.entries()) {
        try {
          result.steps.push(await runStep(step, index, actOptions?.allow));
        } catch (error) {
          result.ok = false;
          result.error = {
            message: error instanceof Error ? error.message : String(error),
            step: index,
          };
          break;
        }
      }

      const end = find();
      const endRefs = new Set(end.map((found) => refOf(found.el)));
      const appeared = end.filter((found) => !startRefs.has(refOf(found.el)));
      const gone = [...startRefs].filter((ref) => !endRefs.has(ref));

      result.values = valuesOf(end);
      if (appeared.length > 0) result.appeared = cap(appeared.slice(0, 20));
      if (gone.length > 0) result.gone = gone.slice(0, 20);

      return result;
    });

  /* Querying --------------------------------------------------------------------------------- */
  const filterItems = (found: Found, text?: string): Pick<AgentComponent, "items" | "more"> => {
    const all = found.items?.() ?? [];
    const needle = text ? fold(text) : "";
    const matching = needle
      ? all.filter((item) => fold(item.label).includes(needle) || fold(item.value).includes(needle))
      : all;

    return {
      items: matching.slice(0, MAX_QUERY_ITEMS),
      ...(matching.length > MAX_QUERY_ITEMS ? {more: matching.length - MAX_QUERY_ITEMS} : {}),
    };
  };

  const query: Agent["query"] = (input: AgentQuery) =>
    enqueue(async () => {
      const {kind, text, within} = input ?? {};

      if (!kind && !text && !within) return {error: "Pass text, within, or kind."};

      let list = find();

      if (kind) list = list.filter((found) => fold(found.kind) === fold(kind));

      if (within) {
        let found: Found;

        try {
          found = resolve(list, within);
        } catch (error) {
          return {error: error instanceof Error ? error.message : String(error)};
        }

        const component = describe(found, 0);

        delete component.itemCount;
        Object.assign(component, filterItems(found, text));

        if (component.items?.length === 0 && !text) {
          component.note = found.note ?? "It has no items to list right now.";
        }

        return [component];
      }

      const matches: AgentComponent[] = [];

      for (const found of list) {
        const label = nameOf(found);
        const named =
          !text ||
          hasWords(label, text) ||
          hasWords(groupOf(found.el, label), text) ||
          hasWords(rowOf(found.el, label), text);

        if (named) {
          matches.push(describe(found));
          continue;
        }

        if (!found.items || !text) continue;

        const filtered = filterItems(found, text);

        if (filtered.items && filtered.items.length > 0) {
          const component = describe(found, 0);

          delete component.itemCount;
          matches.push(Object.assign(component, filtered));
        }
      }

      if (matches.length > MAX_COMPONENTS) {
        const more = matches.length - MAX_COMPONENTS;

        matches.length = MAX_COMPONENTS;
        matches.push({actions: [], component: "more", more, ref: "more"});
      }

      return matches;
    });

  return {act, query, snapshot, subscribe};
};
