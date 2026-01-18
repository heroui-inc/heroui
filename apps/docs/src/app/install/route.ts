import type {NextRequest} from "next/server";

import fs from "fs";
import path from "path";

import {NextResponse} from "next/server";

import {captureEvent} from "@/libs/posthog";

export const revalidate = false;

export async function GET(request: NextRequest) {
  await captureEvent({
    event: "heroui_skill_installed",
    properties: {
      city: request.headers.get("x-vercel-ip-city"),
      country: request.headers.get("x-vercel-ip-country"),
      ip: request.headers.get("x-forwarded-for"),
      postalCode: request.headers.get("x-vercel-ip-postal-code"),
      referer: request.headers.get("referer"),
      region: request.headers.get("x-vercel-ip-region"),
      url: request.url,
      userAgent: request.headers.get("user-agent"),
    },
  });

  const host = request.headers.get("host") || "v3.heroui.com";
  const protocol = host.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  const filePath = path.join(process.cwd(), "_raw", "install.sh");
  const installScript = fs.readFileSync(filePath, "utf-8");
  const body = installScript.replace(/\{\{BASE_URL\}\}/g, baseUrl).trim() + "\n";

  return new NextResponse(body, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "text/x-shellscript; charset=utf-8",
    },
  });
}
