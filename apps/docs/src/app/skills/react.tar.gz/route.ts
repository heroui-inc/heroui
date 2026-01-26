import {NextResponse} from "next/server";

export const revalidate = false;

/**
 * Backward compatibility route for /skills/react.tar.gz
 * Redirects to the new dynamic route with heroui-react
 */
export async function GET() {
  // Redirect to heroui-react (the new name for the react skill)
  return NextResponse.redirect("/skills/heroui-react.tar.gz", 307);
}
