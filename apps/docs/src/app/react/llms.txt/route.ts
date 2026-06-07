import {createPlatformRouteHandler, getPlatformLlmsTxt} from "@/lib/llms-platform-handlers";

export const revalidate = false;

export const GET = createPlatformRouteHandler("react", getPlatformLlmsTxt);
