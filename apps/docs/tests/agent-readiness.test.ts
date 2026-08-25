import type {ReactElement, ReactNode} from "react";

import {NextRequest} from "next/server";
import {isValidElement} from "react";
import {describe, expect, it} from "vitest";

import AboutPage from "@/app/[lang]/(home)/about/page";
import ContactPage from "@/app/[lang]/(home)/contact/page";
import HomePage from "@/app/[lang]/(home)/page";
import PrivacyPage from "@/app/[lang]/(home)/privacy/page";
import {GET as getMarkdown} from "@/app/agent-markdown/route";
import {GET as getUnknownAgentEndpoint} from "@/app/api/agent/[...path]/route";
import {GET as getAgentPage} from "@/app/api/agent/page/route";
import {GET as searchAgentDocs} from "@/app/api/agent/search/route";
import {GET as getOpenApi} from "@/app/openapi.json/route";
import {getOrganizationJsonLd} from "@/lib/json-ld";
import {generateIndexHeader} from "@/lib/llms-utils";

import {GET as getMcpHandshake} from "@/app/.well-known/mcp/route";

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join(" ");
  if (!isValidElement(node)) return "";

  const element = node as ReactElement<{
    children?: ReactNode;
    description?: string;
    title?: string;
  }>;

  return [
    element.props.title ?? "",
    element.props.description ?? "",
    extractText(element.props.children),
  ].join(" ");
}

function collectHeadingLevels(node: ReactNode): number[] {
  if (Array.isArray(node)) return node.flatMap(collectHeadingLevels);
  if (!isValidElement(node)) return [];

  const element = node as ReactElement<{children?: ReactNode}>;
  const level =
    typeof element.type === "string" && /^h[1-6]$/.test(element.type)
      ? Number(element.type.slice(1))
      : null;

  return [...(level === null ? [] : [level]), ...collectHeadingLevels(element.props.children)];
}

describe("HeroUI agent readiness", () => {
  it("publishes a typed OpenAPI alias with unique documented operations", async () => {
    const response = getOpenApi(new Request("https://heroui.com/openapi.json"));
    const document = (await response.json()) as {
      info: {title: string};
      openapi: string;
      paths: Record<string, Record<string, {description?: string; operationId?: string}>>;
    };
    const operations = Object.values(document.paths).flatMap((path) => Object.values(path));
    const operationIds = operations.map((operation) => operation.operationId);

    expect(response.headers.get("content-type")).toContain("application/vnd.oai.openapi+json");
    expect(document.info.title).toBe("HeroUI Docs Agent API");
    expect(document.openapi).toBe("3.1.0");
    expect(operations.every((operation) => Boolean(operation.description))).toBe(true);
    expect(new Set(operationIds).size).toBe(operationIds.length);
  });

  it("returns structured JSON errors from agent API routes", async () => {
    const responses = [
      await searchAgentDocs(new NextRequest("https://heroui.com/api/agent/search")),
      await getAgentPage(new NextRequest("https://heroui.com/api/agent/page")),
      getUnknownAgentEndpoint(),
    ];

    for (const response of responses) {
      const body = (await response.json()) as Record<string, unknown>;

      expect(response.status).toBeGreaterThanOrEqual(400);
      expect(response.headers.get("content-type")).toContain("application/json");
      expect(body).toEqual({
        code: expect.any(String),
        error: true,
        hint: expect.any(String),
        message: expect.any(String),
      });
    }
  });

  it("varies negotiated markdown by Accept and Accept-Encoding", async () => {
    const request = new NextRequest("https://heroui.com/agent-markdown?path=/", {
      headers: {
        accept: "text/markdown",
        "x-heroui-markdown-path": "/",
      },
    });
    const response = await getMarkdown(request);

    expect(response.headers.get("content-type")).toContain("text/markdown");
    expect(response.headers.get("vary")).toBe("Accept, Accept-Encoding");
    expect(await response.text()).toContain("# HeroUI");
  });

  it("serves the existing HeroUI MCP packages from the well-known handshake", async () => {
    const response = getMcpHandshake(new Request("https://heroui.com/.well-known/mcp"));
    const card = (await response.json()) as {
      endpoint: string;
      transports: {package: string; type: string}[];
    };

    expect(card.endpoint).toBe("https://heroui.com/.well-known/mcp");
    expect(card.transports).toEqual(
      expect.arrayContaining([
        expect.objectContaining({package: "@heroui/react-mcp", type: "stdio"}),
        expect.objectContaining({package: "@heroui/native-mcp", type: "stdio"}),
      ]),
    );
  });

  it("lists predictable HeroUI developer resources in llms.txt", () => {
    const header = generateIndexHeader().join("\n");

    expect(header).toContain("HeroUI OpenAPI specification");
    expect(header).toContain("/openapi.json");
    expect(header).toContain("/.well-known/mcp");
    expect(header).toContain("/docs/react/getting-started/cli");
  });

  it("adds a verified HeroUI support contact without fabricating an address", () => {
    const organization = getOrganizationJsonLd();

    expect(organization.contactPoint).toEqual({
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "sales@heroui.com",
    });
    expect(organization).not.toHaveProperty("address");
  });

  it("ships substantial trust-page copy", () => {
    for (const page of [AboutPage(), ContactPage(), PrivacyPage()]) {
      expect(extractText(page).replace(/\s+/g, " ").trim().length).toBeGreaterThanOrEqual(500);
      expect(collectHeadingLevels(page)).toEqual(expect.arrayContaining([2]));
    }
  });

  it("server-renders meaningful homepage text with a hierarchical outline", async () => {
    const page = await HomePage({params: Promise.resolve({lang: "en"})});
    const text = extractText(page).replace(/\s+/g, " ").trim();
    const headings = collectHeadingLevels(page);

    expect(text.length).toBeGreaterThanOrEqual(500);
    expect(headings).toEqual(expect.arrayContaining([1, 2, 3]));
    expect(headings.filter((level) => level === 1)).toHaveLength(1);
  });
});
