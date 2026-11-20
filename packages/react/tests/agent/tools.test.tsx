import type {AgentTool} from "@/agent";

import {cleanup, render} from "@heroui/testing/helpers";

import {agentTools, callAgentTool, createAgent, registerTools} from "@/agent";

import {SettingsFixture} from "./fixtures";

type RegisteredTool = AgentTool & {execute: (input: unknown) => Promise<unknown>};

const environment = globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean};

const installModelContext = (target: object) => {
  const tools = new Map<string, RegisteredTool>();

  Object.defineProperty(target, "modelContext", {
    configurable: true,
    value: {
      registerTool: (tool: RegisteredTool) => tools.set(tool.name, tool),
      unregisterTool: (name: string) => tools.delete(name),
    },
  });

  return {
    tools,
    uninstall: () => {
      delete (target as {modelContext?: unknown}).modelContext;
    },
  };
};

describe("Agent tools", () => {
  beforeEach(() => {
    environment.IS_REACT_ACT_ENVIRONMENT = false;
  });

  afterEach(() => {
    environment.IS_REACT_ACT_ENVIRONMENT = true;
    cleanup();
  });

  it("exposes snapshot, act, and query definitions with JSON Schemas", () => {
    expect(agentTools.map((tool) => tool.name)).toEqual(["snapshot", "act", "query"]);

    for (const tool of agentTools) {
      expect(tool.description.length).toBeGreaterThan(40);
      expect(tool.inputSchema).toMatchObject({type: "object"});
      expect(tool.annotations.untrustedContentHint).toBe(true);
    }

    expect(agentTools.find((tool) => tool.name === "act")?.annotations).toMatchObject({
      consequentialHint: true,
      readOnlyHint: false,
    });
  });

  it("calls the matching bridge method for a tool call", async () => {
    render(<SettingsFixture />);

    const agent = createAgent();

    expect(await callAgentTool(agent, "snapshot", {})).toEqual(agent.snapshot());
    expect(
      await callAgentTool(agent, "act", {
        steps: [{action: "setValue", args: ["Atlas"], ref: "Project name"}],
      }),
    ).toMatchObject({ok: true});
    expect(await callAgentTool(agent, "query", {within: "Region"})).toEqual([
      expect.objectContaining({label: "Region"}),
    ]);
    await expect(callAgentTool(agent, "destroy", {})).rejects.toThrow(/Unknown agent tool/);
  });

  it.each([
    ["document", () => document],
    ["navigator", () => navigator],
  ])("supports registering with WebMCP on %s.modelContext", async (_, getTarget) => {
    const onSave = vi.fn();
    const {tools, uninstall} = installModelContext(getTarget());

    render(<SettingsFixture onSave={onSave} />);

    const unregister = registerTools(createAgent(), {
      allow: (action) => action.action !== "press",
    });

    expect([...tools.keys()]).toEqual(["snapshot", "act", "query"]);
    expect(await tools.get("snapshot")?.execute({})).toEqual(
      expect.arrayContaining([expect.objectContaining({label: "Project name"})]),
    );
    expect(
      await tools.get("act")?.execute({steps: [{action: "press", ref: "Save"}]}),
    ).toMatchObject({error: {message: `The app doesn't allow press on "Save".`}, ok: false});
    expect(onSave).not.toHaveBeenCalled();

    unregister();

    expect(tools.size).toBe(0);
    uninstall();
  });

  it("supports a prefix and does nothing without WebMCP", () => {
    expect(registerTools(createAgent(), {allow: () => true})).toBeInstanceOf(Function);

    const {tools, uninstall} = installModelContext(document);
    const unregister = registerTools(createAgent(), {allow: () => true, prefix: "app_"});

    expect([...tools.keys()]).toEqual(["app_snapshot", "app_act", "app_query"]);
    unregister();
    uninstall();
  });
});
