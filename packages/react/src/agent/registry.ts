import type {AgentComponentOptions} from "./types";

/**
 * Custom components that describe themselves to the bridge. The registry is a plain
 * module-level map so registering costs nothing until a bridge reads it.
 */
const registry = new Map<Element, () => AgentComponentOptions>();

/**
 * Describes a custom component to the agent bridge: its state and the actions an agent
 * may call. Returns a function that removes the registration.
 */
export const registerAgentComponent = (
  element: Element,
  options: AgentComponentOptions | (() => AgentComponentOptions),
): (() => void) => {
  const read = typeof options === "function" ? options : () => options;

  registry.set(element, read);

  return () => {
    if (registry.get(element) === read) registry.delete(element);
  };
};

export const registeredComponents = (): ReadonlyMap<Element, () => AgentComponentOptions> =>
  registry;
