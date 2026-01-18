import {execSync} from "child_process";
import path from "path";

import {NextResponse} from "next/server";

export const revalidate = false;

export async function GET() {
  const skillsDir = path.join(process.cwd(), "_raw", "skills", "react");

  // Generate tar.gz on the fly
  const tarBuffer = execSync(`tar czf - -C "${skillsDir}" .`, {
    maxBuffer: 10 * 1024 * 1024, // 10MB max
  });

  return new NextResponse(tarBuffer, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Disposition": "attachment; filename=heroui-react.tar.gz",
      "Content-Type": "application/gzip",
    },
  });
}
