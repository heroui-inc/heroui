import {createPlatformRouteHandler, getPlatformLlmsFullTxt} from "@/lib/llms-platform-handlers";

export const revalidate = false;

export const GET = createPlatformRouteHandler("native", getPlatformLlmsFullTxt);
