import {NextRequest} from "next/server";
import {describe, expect, it} from "vitest";

import {proxy} from "@/proxy";

import {getRedirects} from "../next-redirects";

type Redirect = Awaited<ReturnType<typeof getRedirects>>[number];

function findRedirect(redirects: Redirect[], source: string): Redirect | undefined {
  return redirects.find((redirect) => redirect.source === source);
}

describe("Docs redirects", () => {
  it.each(["navbar", "progress"])(
    "redirects the legacy %s component URL to its migration guide",
    async (component) => {
      const redirects = await getRedirects();
      const destination = `/docs/react/migration/${component}`;

      expect(findRedirect(redirects, `/docs/components/${component}`)).toMatchObject({
        destination: `/en${destination}`,
        permanent: true,
      });
      expect(findRedirect(redirects, `/:lang(en|cn)/docs/components/${component}`)).toMatchObject({
        destination: `/:lang${destination}`,
        permanent: true,
      });
    },
  );

  it("prefers an existing React component page over its migration guide", async () => {
    const redirects = await getRedirects();

    expect(findRedirect(redirects, "/docs/components/calendar")).toMatchObject({
      destination: "/en/docs/react/components/calendar",
      permanent: true,
    });
  });

  it("redirects the leaked beta calendar MDX URL to the current component page", async () => {
    const redirects = await getRedirects();

    expect(findRedirect(redirects, "/docs/components/calendar.mdx")).toMatchObject({
      destination: "/en/docs/react/components/calendar",
      permanent: true,
    });
  });

  it("maps unknown legacy component URLs into the current namespace", async () => {
    const redirects = await getRedirects();

    expect(findRedirect(redirects, "/docs/components/:path*")).toMatchObject({
      destination: "/en/docs/react/components/:path*",
      permanent: true,
    });
    expect(findRedirect(redirects, "/:lang(en|cn)/docs/components/:path*")).toMatchObject({
      destination: "/:lang/docs/react/components/:path*",
      permanent: true,
    });
  });
});

describe("Leaked build paths", () => {
  it.each(["/en/src/uniwind.d.ts", "/en/node_modules/heroui-native/lib"])(
    "returns 410 for %s",
    (pathname) => {
      const response = proxy(new NextRequest(`https://heroui.com${pathname}`));

      expect(response.status).toBe(410);
      expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    },
  );
});
