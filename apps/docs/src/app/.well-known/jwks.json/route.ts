import {jsonResponse} from "@/lib/agent-discovery";

export const revalidate = false;

export async function GET() {
  return jsonResponse({keys: []});
}
