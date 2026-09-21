import {HeroUIAgentAuthError, createAuthToken} from "@heroui/agent/server";

import {HEROUI_DOCS_AGENT_ID} from "@/lib/heroui-agent";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function POST(request: Request) {
  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return Response.json({error: "Invalid request"}, {status: 400});
  }

  const anonymousId =
    typeof input === "object" && input !== null && "anonymousId" in input
      ? input.anonymousId
      : null;
  const agentId =
    typeof input === "object" && input !== null && "agentId" in input ? input.agentId : null;
  const apiKey = process.env["HEROUI_AGENT_API_KEY"];
  const normalizedAnonymousId = typeof anonymousId === "string" ? anonymousId.trim() : "";

  if (
    !normalizedAnonymousId ||
    normalizedAnonymousId.length > 200 ||
    agentId !== HEROUI_DOCS_AGENT_ID
  ) {
    return Response.json({error: "Invalid agent"}, {status: 400});
  }

  if (!apiKey) {
    return Response.json({error: "Agent is not configured"}, {status: 503});
  }

  try {
    const token = await createAuthToken({
      agentId: HEROUI_DOCS_AGENT_ID,
      anonymousId: normalizedAnonymousId,
      apiKey,
      identity: {id: normalizedAnonymousId, type: "anonymous"},
      metadata: {surface: "heroui-docs"},
    });

    return Response.json(token, {headers: {"Cache-Control": "no-store"}});
  } catch (error) {
    const status = error instanceof HeroUIAgentAuthError ? error.status : 502;

    return Response.json({error: "Agent authentication failed"}, {status});
  }
}
