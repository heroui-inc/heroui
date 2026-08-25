import {agentErrorResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

function notFoundResponse() {
  return agentErrorResponse({
    code: "AGENT_ENDPOINT_NOT_FOUND",
    hint: "Read /openapi.json or GET /api/agent for the available endpoints.",
    message: "The requested HeroUI agent API endpoint does not exist.",
    status: 404,
  });
}

export const DELETE = notFoundResponse;
export const GET = notFoundResponse;
export const PATCH = notFoundResponse;
export const POST = notFoundResponse;
export const PUT = notFoundResponse;
