import type {NextRequest} from "next/server";

import {NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {email} = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({error: "Please enter a valid email."}, {status: 400});
    }

    const apiKey = process.env["FEATUREBASE_API_KEY"];
    const apiEndpoint = process.env["FEATUREBASE_API_ENDPOINT"] || "https://do.featurebase.app/v2";

    if (!apiKey) {
      console.error("FEATUREBASE_API_KEY is not configured");

      return NextResponse.json({error: "Featurebase service is not configured."}, {status: 500});
    }

    await fetch(`${apiEndpoint}/changelog/subscribers`, {
      body: JSON.stringify({
        emails: [email],
      }),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Featurebase subscription error:", error);

    return NextResponse.json({error: "Something went wrong. Please try again."}, {status: 500});
  }
}
