import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {email} = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({error: "Please enter a valid email."}, {status: 400});
    }

    const apiKey = process.env["LOOPS_API_KEY"];
    const apiEndpoint = process.env["LOOPS_API_ENDPOINT"] || "https://app.loops.so/api/v1";

    if (!apiKey) {
      console.error("LOOPS_API_KEY is not configured");

      return NextResponse.json({error: "Newsletter service is not configured."}, {status: 500});
    }

    const response = await fetch(`${apiEndpoint}/contacts/create`, {
      body: JSON.stringify({
        email,
        source: "Subscribe from HeroUI Docs",
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = await response.json();

    if (!response.ok) {
      // Contact already exists - treat as success
      if (response.status === 409) {
        return NextResponse.json({success: true});
      }

      throw new Error(data.message || "Failed to subscribe");
    }

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    return NextResponse.json({error: "Something went wrong. Please try again."}, {status: 500});
  }
}
