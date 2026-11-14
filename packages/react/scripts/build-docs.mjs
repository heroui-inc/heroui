#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * Builds `docs/`: the Markdown docs that ship inside `@heroui/react`.
 *
 * Coding agents read them from `node_modules/@heroui/react/docs/`, so what they read always
 * matches the installed version. The content comes from the docs site's MDX (English, React),
 * with each live demo replaced by its source code.
 */
import path from "path";
import {fileURLToPath} from "url";

import fs from "fs-extra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const docsAppDir = path.resolve(rootDir, "../../apps/docs");
const contentDir = path.join(docsAppDir, "content/docs/en/react");
const demosDir = path.join(docsAppDir, "src/demos");
const outDir = path.join(rootDir, "docs");

const SITE_URL = "https://heroui.com";

/** Docs-site widgets that carry no information in Markdown. */
const WIDGET_TAGS =
  /<(ComponentCard|ComponentGrid|ComponentsCategory|RelatedComponents|RelatedShowcases|DocsImage|ColorSection\w*|NativeComponentsCategory|NativeVideoPlayerView|NativeTryOnDevice)\b[^>]*\/>\n?/g;
const COMPONENT_PREVIEW = /<ComponentPreview\b[^>]*?\bname\s*=\s*["']([^"']+)["'][^>]*\/>/g;
/** Blocks that only make sense on the site, such as the "copy this prompt" button. */
const SITE_ONLY_BLOCKS = /<CopyPrompt\b[\s\S]*?<\/CopyPrompt>\n?/g;
/** Shiki line annotations, such as `// [!code highlight]`. */
const CODE_ANNOTATIONS = /[ \t]*(\/\/|\/\*|#|\{\/\*)\s*\[!code[^\]]*\]\s*(\*\/\}?)?/g;
const COLLAPSIBLE_CODE =
  /<CollapsibleCode\s+lang\s*=\s*["']([^"']+)["']\s+code\s*=\s*{?`([\s\S]*?)`}?\s*\/>/g;
const CALLOUT_LABELS = {error: "Warning", info: "Note", warn: "Warning", warning: "Warning"};

const titleCase = (slug) =>
  slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

async function walk(dir) {
  const entries = await fs.readdir(dir, {withFileTypes: true});
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) files.push(...(await walk(fullPath)));
    else if (entry.name.endsWith(".mdx")) files.push(fullPath);
  }

  return files.sort();
}

/** Demo name → source file, read from the docs demo registry. */
async function readDemoRegistry() {
  const registry = await fs.readFile(path.join(demosDir, "en/index.ts"), "utf-8");
  const demos = new Map();

  for (const match of registry.matchAll(/"([^"]+)":\s*\{[^}]*?file:\s*"([^"]+)"/g)) {
    demos.set(match[1], match[2]);
  }

  return demos;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!match) return {body: raw, data: {}};

  const data = {};
  let parent = null;

  for (const line of match[1].split("\n")) {
    const pair = line.match(/^(\s*)([\w-]+):\s*(.*)$/);

    if (!pair) continue;

    const value = pair[3].replace(/^["']|["']$/g, "");

    if (pair[1]) {
      if (parent) data[parent][pair[2]] = value;
    } else if (value === "") {
      parent = pair[2];
      data[parent] = {};
    } else {
      parent = null;
      data[pair[2]] = value;
    }
  }

  return {body: raw.slice(match[0].length), data};
}

/** Lists every page that will be written, so links between them can be made relative. */
async function collectPages() {
  const pages = [];

  for (const file of await walk(path.join(contentDir, "components"))) {
    const slug = path.basename(file, ".mdx");

    if (slug === "index") continue;

    const group = path.basename(path.dirname(file)).replace(/[()]/g, "");

    pages.push({
      file,
      group: titleCase(group),
      kind: "components",
      slug,
      url: `/docs/react/components/${slug}`,
    });
  }

  for (const file of await walk(path.join(contentDir, "getting-started"))) {
    const slug = path.basename(file, ".mdx");

    if (slug === "index") continue;

    const group = path.basename(path.dirname(file)).replace(/[()]/g, "");

    pages.push({
      file,
      group: titleCase(group),
      kind: "guides",
      slug,
      url: `/docs/react/getting-started/${slug}`,
    });
  }

  return pages;
}

function createLinkRewriter(pages, fromKind) {
  const bySlug = new Map();

  // Component pages win a slug clash, since most links point at components.
  for (const page of pages) {
    if (!bySlug.has(page.slug) || page.kind === "components") bySlug.set(page.slug, page);
  }

  return (text) =>
    text.replace(/\]\((\/[^)\s]*)\)/g, (whole, href) => {
      const [pathname, hash = ""] = href.split("#");
      const segments = pathname.split("/").filter(Boolean);
      const page = segments[0] === "docs" ? bySlug.get(segments.at(-1)) : undefined;
      const anchor = hash ? `#${hash}` : "";

      if (!page) return `](${SITE_URL}${href})`;

      const target =
        page.kind === fromKind ? `./${page.slug}.md` : `../${page.kind}/${page.slug}.md`;

      return `](${target}${anchor})`;
    });
}

/**
 * Turns the docs site's MDX into plain Markdown: tabs become labelled blocks, callouts become
 * quotes, and code fences are left untouched.
 */
function toMarkdown(body, rewriteLinks) {
  const lines = body.split("\n");
  const out = [];
  let fence = null;
  let tabIndent = null;
  let callout = null;

  const emit = (line) => {
    out.push(callout ? `> ${line}`.trimEnd() : line);
  };

  const dedent = (line) => {
    if (tabIndent === null) return line;

    const leading = line.match(/^ */)[0].length;

    return line.slice(Math.min(leading, tabIndent));
  };

  for (const rawLine of lines) {
    if (fence) {
      const line = dedent(rawLine);

      emit(line);
      if (line.trim() === fence) fence = null;
      continue;
    }

    // A tab's own indentation is taken from its first line of content.
    if (tabIndent === -1 && rawLine.trim() !== "") tabIndent = rawLine.match(/^ */)[0].length;

    const line = dedent(rawLine);
    const trimmed = line.trim();
    const opening = trimmed.match(/^(`{3,}|~{3,})/);

    if (opening) {
      fence = opening[1];
      emit(line);
      continue;
    }

    if (/^<Tabs\b[^>]*>$/.test(trimmed) || trimmed === "</Tabs>") continue;

    const tab = trimmed.match(/^<Tab\s+value\s*=\s*["']([^"']+)["']\s*>$/);

    if (tab) {
      emit(`**${tab[1]}**`);
      emit("");
      tabIndent = -1;
      continue;
    }

    if (trimmed === "</Tab>") {
      tabIndent = null;
      emit("");
      continue;
    }

    const inlineCallout = trimmed.match(/^<Callout\b([^>]*)>(.+)<\/Callout>$/);
    const calloutOpen = inlineCallout ?? trimmed.match(/^<Callout\b([^>]*)>(.*)$/);

    if (calloutOpen) {
      const type = calloutOpen[1].match(/type\s*=\s*["'](\w+)["']/)?.[1] ?? "info";
      const title = calloutOpen[1].match(/title\s*=\s*["']([^"']+)["']/)?.[1];
      const label = `**${title ?? CALLOUT_LABELS[type] ?? "Note"}:**`;
      const rest = rewriteLinks(calloutOpen[2].trim());

      out.push(rest ? `> ${label} ${rest}` : `> ${label}`);
      if (!inlineCallout) callout = true;
      continue;
    }

    if (callout && trimmed.endsWith("</Callout>")) {
      const rest = trimmed.slice(0, -"</Callout>".length).trim();

      if (rest) emit(rewriteLinks(rest));
      callout = null;
      continue;
    }

    // MDX module lines have no meaning outside the docs site.
    if (!callout && /^(import|export)\s.+\sfrom\s+["'][^"']+["'];?$/.test(line)) continue;

    emit(rewriteLinks(callout ? trimmed : line));
  }

  return out.join("\n");
}

async function renderPage(page, context) {
  const raw = await fs.readFile(page.file, "utf-8");
  const {body, data} = parseFrontmatter(raw);
  const blocks = [];

  const hold = (block) => {
    blocks.push(block);

    return `@@HEROUI_BLOCK_${blocks.length - 1}@@`;
  };

  let content = body.replace(SITE_ONLY_BLOCKS, "").replace(WIDGET_TAGS, "");

  content = content.replace(COLLAPSIBLE_CODE, (_match, lang, code) =>
    hold(`\`\`\`${lang || "tsx"}\n${code.trim()}\n\`\`\``),
  );

  const previews = [...content.matchAll(COMPONENT_PREVIEW)];
  const sources = new Map();

  for (const [, name] of previews) {
    const file = context.demos.get(name);

    if (!file || sources.has(name)) continue;

    try {
      sources.set(name, (await fs.readFile(path.join(demosDir, file), "utf-8")).trim());
    } catch {
      context.missingDemos.add(name);
    }
  }

  content = content.replace(COMPONENT_PREVIEW, (_match, name) => {
    const source = sources.get(name);

    if (!source) {
      context.missingDemos.add(name);

      return "";
    }

    return hold(`\`\`\`tsx\n${source}\n\`\`\``);
  });

  content = toMarkdown(content, createLinkRewriter(context.pages, page.kind));
  content = content.replace(/@@HEROUI_BLOCK_(\d+)@@/g, (_match, index) => blocks[Number(index)]);
  content = content.replace(CODE_ANNOTATIONS, "");
  content = content.replace(/\n{3,}/g, "\n\n").trim();

  const title = data.title || titleCase(page.slug);
  const description = data.description || "";
  const facts = [`Docs: ${SITE_URL}${page.url}`];

  if (data.links?.source) {
    facts.push(
      `Source: https://github.com/heroui-inc/heroui/blob/v3/packages/react/src/components/${data.links.source}`,
    );
  }
  if (data.links?.styles) {
    facts.push(`Styles: \`@heroui/styles/components/${data.links.styles}\``);
  }
  if (data.links?.rac) {
    facts.push(`React Aria: https://react-spectrum.adobe.com/react-aria/${data.links.rac}.html`);
  }

  page.title = title;
  page.description = description;

  return [
    `# ${title}`,
    "",
    ...(description ? [`> ${description}`, ""] : []),
    ...facts.map((fact) => `- ${fact}`),
    "",
    content,
    "",
  ].join("\n");
}

function renderIndex(pages, version) {
  const has = (kind, slug) => pages.some((page) => page.kind === kind && page.slug === slug);
  const route = (label, kind, slugs) => {
    const links = slugs
      .filter((slug) => has(kind, slug))
      .map((slug) => `[${slug}](${kind}/${slug}.md)`);

    return links.length > 0 ? `- ${label}: ${links.join(", ")}` : null;
  };

  const lines = [
    "# HeroUI v3 (React)",
    "",
    `> Docs for @heroui/react ${version}. These files ship inside the package, so they match the version installed in this project. Paths are relative to this file. Read the page for a component before you use it; do not rely on HeroUI v2 knowledge.`,
    "",
    "## Rules that always apply",
    "",
    "- v3 has no provider. Do not add `HeroUIProvider`, `framer-motion`, or `@heroui/theme`.",
    "- Components are compound: `<Card><Card.Header>…</Card.Header></Card>`, not flat props.",
    '- Styles come from `@heroui/styles`. In the app\'s CSS, `@import "tailwindcss";` goes first, then `@import "@heroui/styles";`.',
    "- Labels, descriptions, and errors are shared parts: `Label`, `Description`, `FieldError`.",
    "- Style with Tailwind classes on `className`, or globally through the component's BEM classes and CSS variables. Never patch `node_modules`.",
    "",
    "## Where to go",
    "",
    route("Set up HeroUI in a project", "guides", ["quick-start", "frameworks", "cli"]),
    route("Build a screen", "guides", ["composition", "styling"]),
    route("Change colors, radius, fonts, or build a whole theme", "guides", [
      "theming-for-agents",
      "theming",
      "colors",
      "dark-mode",
    ]),
    route("Restyle one component everywhere", "guides", ["theming-for-agents", "styling"]),
    route("Add motion", "guides", ["animation"]),
    route("Let an AI agent operate the running app", "guides", [
      "agent-bridge",
      "agent-bridge-reference",
    ]),
    route("Give a coding agent more HeroUI context", "guides", [
      "agent-skills",
      "mcp-server",
      "agents-md",
      "design-md",
      "llms-txt",
    ]),
    "- Use one component: open its page under Components below.",
    "",
  ].filter((line) => line !== null);

  for (const [heading, kind] of [
    ["Components", "components"],
    ["Guides", "guides"],
  ]) {
    lines.push(`## ${heading}`, "");

    const groups = new Map();

    for (const page of pages.filter((candidate) => candidate.kind === kind)) {
      if (!groups.has(page.group)) groups.set(page.group, []);
      groups.get(page.group).push(page);
    }

    for (const [group, groupPages] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
      lines.push(`### ${group}`, "");

      for (const page of groupPages.sort((a, b) => a.title.localeCompare(b.title))) {
        const summary = page.description ? `: ${page.description}` : "";

        lines.push(`- [${page.title}](${kind}/${page.slug}.md)${summary}`);
      }

      lines.push("");
    }
  }

  lines.push(
    "## Not in this folder",
    "",
    `- Migration from v2: ${SITE_URL}/docs/react/migration`,
    `- Release notes: ${SITE_URL}/docs/react/releases`,
    `- Theme gallery and builder: ${SITE_URL}/themes`,
    "",
  );

  return lines.join("\n");
}

async function buildDocs() {
  if (!(await fs.pathExists(contentDir))) {
    throw new Error(`Docs content not found: ${contentDir}`);
  }

  const {version} = await fs.readJson(path.join(rootDir, "package.json"));
  const context = {
    demos: await readDemoRegistry(),
    missingDemos: new Set(),
    pages: await collectPages(),
  };

  await fs.remove(outDir);

  let bytes = 0;

  for (const page of context.pages) {
    const markdown = await renderPage(page, context);
    const target = path.join(outDir, page.kind, `${page.slug}.md`);

    await fs.outputFile(target, markdown);
    bytes += Buffer.byteLength(markdown);
  }

  const index = renderIndex(context.pages, version);

  await fs.outputFile(path.join(outDir, "llms.txt"), index);
  bytes += Buffer.byteLength(index);

  if (context.missingDemos.size > 0) {
    console.warn(`⚠️  Demos without source: ${[...context.missingDemos].join(", ")}`);
  }

  const components = context.pages.filter((page) => page.kind === "components").length;
  const guides = context.pages.length - components;

  console.log(
    `📚 Wrote docs/ for v${version}: ${components} components, ${guides} guides, ${(bytes / 1000).toFixed(0)}kb`,
  );
}

buildDocs().catch((error) => {
  console.error("❌ Failed to build docs:", error);
  process.exit(1);
});
