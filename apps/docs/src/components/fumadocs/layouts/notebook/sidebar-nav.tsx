"use client";

import type * as PageTree from "fumadocs-core/page-tree";

import {usePathname} from "fumadocs-core/framework";
import {useTreeContext, useTreePath} from "fumadocs-ui/contexts/tree";
import {useMemo} from "react";

import {isActive} from "@/components/fumadocs/utils/urls";

import {
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
} from "./sidebar";

type TreeParent = PageTree.Root | PageTree.Folder;

/** Finds the folder (or root) whose direct children include `target`. */
function findParent(node: TreeParent, target: PageTree.Node | PageTree.Root): TreeParent | null {
  for (const child of node.children) {
    if (child === target) return node;
    if (child.type === "folder") {
      const found = findParent(child, target);

      if (found) return found;
    }
  }

  return null;
}

/**
 * `node.icon` is either a gravity icon or, for `icon: new | updated | preview`
 * frontmatter, a StatusChip (see `lib/meta-icon.tsx`). The chip carries
 * `order-last`, so it lands after the flexible label; `global.css` restyles it as
 * a muted text tag inside the sidebar.
 */
function NodeLabel({node}: {node: PageTree.Item | PageTree.Folder}) {
  return (
    <>
      {node.icon}
      <span className="min-w-0 flex-1 truncate">{node.name}</span>
    </>
  );
}

const RELEASES_INDEX = /\/releases\/?$/;
const QUICK_START = /\/quick-start\/?$/;

/** Releases lists every entry on its landing page, so the sidebar only links to that page. */
function isReleasesRoot(folder: TreeParent): boolean {
  const index = getRootIndex(folder);

  return !!index && RELEASES_INDEX.test(index.url);
}

function NodeList({nodes}: {nodes: PageTree.Node[]}) {
  return nodes.map((node, i) => <TreeNode key={node.$id ?? i} node={node} />);
}

function TreeNode({node}: {node: PageTree.Node}) {
  const pathname = usePathname();
  const path = useTreePath();

  if (node.type === "separator") {
    return (
      <SidebarSeparator>
        {node.icon}
        {node.name}
      </SidebarSeparator>
    );
  }

  if (node.type === "folder") {
    return (
      <SidebarFolder
        active={path.includes(node)}
        collapsible={node.collapsible}
        defaultOpen={node.defaultOpen}
      >
        {node.index ? (
          <SidebarFolderLink
            active={isActive(node.index.url, pathname)}
            external={node.index.external}
            href={node.index.url}
          >
            <NodeLabel node={node} />
          </SidebarFolderLink>
        ) : (
          <SidebarFolderTrigger>
            <NodeLabel node={node} />
          </SidebarFolderTrigger>
        )}
        <SidebarFolderContent>
          <NodeList nodes={node.children} />
        </SidebarFolderContent>
      </SidebarFolder>
    );
  }

  return (
    <SidebarItem
      active={isActive(node.url, pathname, RELEASES_INDEX.test(node.url))}
      external={node.external}
      href={node.url}
      icon={node.icon}
    >
      <span className="min-w-0 flex-1 truncate">{node.name}</span>
    </SidebarItem>
  );
}

function isRootFolder(node: PageTree.Node): node is PageTree.Folder {
  return node.type === "folder" && node.root === true;
}

/** A root's landing page: its `index`, or the first page meta.json lists. */
function getRootIndex(folder: TreeParent): PageTree.Item | undefined {
  const index = "index" in folder ? folder.index : undefined;

  return index ?? folder.children.find((child): child is PageTree.Item => child.type === "page");
}

function heading(id: string, name: PageTree.Folder["name"]): PageTree.Separator {
  return {$id: id, name, type: "separator"};
}

/**
 * Flat sidebar items: nothing collapses and nothing moves between pages. The page footer
 * follows this order for its previous / next links.
 *
 * 1. The first root (Getting Started) is always on top, headed by its name. Its leading
 *    pages come with links to the other roots' landing pages: Components right after
 *    Quick Start, Releases and Migration at the end. Its own sections (Handbook,
 *    UI for Agents, ...) follow.
 * 2. Below it comes the current root's content. Its landing page is skipped, since step 1
 *    links to it. Releases adds nothing (its link stays active on every release page), so
 *    on Releases, Getting Started, and roots with only a landing page, the second root
 *    (Components) shows instead.
 */
export function useSidebarNodes(): PageTree.Node[] {
  const {full, root} = useTreeContext();

  return useMemo(() => {
    const parent = root === full ? null : findParent(full, root);
    const roots = parent?.children.filter(isRootFolder) ?? [];
    const [base, ...rest] = roots;

    if (!base) return root.children;

    const rootLinks = rest.flatMap((folder): PageTree.Item[] => {
      const index = getRootIndex(folder);

      return index
        ? [{...index, $id: `${folder.$id}-link`, icon: folder.icon, name: folder.name}]
        : [];
    });
    const baseNodes = base.children;
    const firstSection = baseNodes.findIndex((node) => node.type === "separator");
    const leading = firstSection === -1 ? baseNodes : baseNodes.slice(0, firstSection);
    const sections = firstSection === -1 ? [] : baseNodes.slice(firstSection);
    // Components (the first root link) sits right after Quick Start.
    const quickStart = leading.findIndex(
      (node) => node.type === "page" && QUICK_START.test(node.url),
    );
    const [componentsLink, ...otherLinks] = rootLinks;
    const leadingWithLinks =
      quickStart === -1 || !componentsLink
        ? [...leading, ...rootLinks]
        : [
            ...leading.slice(0, quickStart + 1),
            componentsLink,
            ...leading.slice(quickStart + 1),
            ...otherLinks,
          ];
    const nodes: PageTree.Node[] = [
      heading(`${base.$id}-heading`, base.name),
      ...leadingWithLinks,
      ...sections,
    ];

    const contentOf = (folder: TreeParent): PageTree.Node[] => {
      if (isReleasesRoot(folder)) return [];
      const index = getRootIndex(folder);

      return folder.children.filter((node) => node !== index);
    };
    const own = root === base ? [] : contentOf(root);
    const current = own.length > 0 ? root : rest[0];

    if (current) {
      const currentNodes = current === root ? own : contentOf(current);

      if (currentNodes[0] && currentNodes[0].type !== "separator") {
        nodes.push(heading(`${current.$id}-heading`, current.name));
      }
      nodes.push(...currentNodes);
    }

    return nodes;
  }, [full, root]);
}

/** Docs navigation (replaces the header tabs row the layout used to render). */
export function SidebarNav() {
  const nodes = useSidebarNodes();

  return <NodeList nodes={nodes} />;
}
