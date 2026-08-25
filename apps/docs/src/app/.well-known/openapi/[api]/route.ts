import {OPENAPI_HEADERS, absoluteUrl, getRequestOrigin, jsonResponse} from "@/lib/agent-discovery";
import {OPENAPI_BUILDERS} from "@/lib/agent-openapi";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: Request, {params}: {params: Promise<{api: string}>}) {
  const {api} = await params;
  const builder = OPENAPI_BUILDERS[api];

  if (!builder) {
    return jsonResponse(
      {
        code: "OPENAPI_NOT_FOUND",
        error: true,
        hint: `Use one of: ${Object.keys(OPENAPI_BUILDERS).join(", ")}.`,
        message: "The requested HeroUI OpenAPI description was not found.",
      },
      {status: 404},
    );
  }

  const origin = getRequestOrigin(request);

  return new Response(JSON.stringify(builder(origin), null, 2), {
    headers: {
      ...OPENAPI_HEADERS,
      Link: `<${absoluteUrl(origin, "/.well-known/api-catalog")}>; rel="api-catalog"; type="application/linkset+json"`,
    },
  });
}
