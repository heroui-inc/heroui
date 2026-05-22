import {jsonResponse} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET() {
  return jsonResponse({keys: []});
}
