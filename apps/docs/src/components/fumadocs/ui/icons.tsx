/**
 * @license lucide-react - ISC
 *
 * All copyright belongs to https://github.com/lucide-icons/lucide, we bundle it as part of library to avoid upstream issues.
 */
import type {ComponentProps} from "react";

import {createElement, forwardRef} from "react";

const defaultAttributes: LucideProps = {
  fill: "none",
  height: 24,
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  strokeWidth: 2,
  viewBox: "0 0 24 24",
  width: 24,
  xmlns: "http://www.w3.org/2000/svg",
};

type SVGElementType =
  | "circle"
  | "ellipse"
  | "g"
  | "line"
  | "path"
  | "polygon"
  | "polyline"
  | "rect";

export interface LucideProps extends ComponentProps<"svg"> {
  size?: string | number;
}

export type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][];

const createLucideIcon = (iconName: string, iconNode: IconNode) => {
  const Component = forwardRef<SVGSVGElement, LucideProps>(
    ({children, color = "currentColor", size = 24, ...props}, ref) => {
      return (
        <svg ref={ref} {...defaultAttributes} height={size} stroke={color} width={size} {...props}>
          {iconNode.map(([tag, attr]) => createElement(tag, attr))}
          {children}
        </svg>
      );
    },
  );

  Component.displayName = iconName;

  return Component;
};

export const ChevronDown = createLucideIcon("chevron-down", [
  ["path", {d: "m6 9 6 6 6-6", key: "qrunsl"}],
]);

export const Languages = createLucideIcon("languages", [
  ["path", {d: "m5 8 6 6", key: "1wu5hv"}],
  ["path", {d: "m4 14 6-6 2-3", key: "1k1g8d"}],
  ["path", {d: "M2 5h12", key: "or177f"}],
  ["path", {d: "M7 2h1", key: "1t2jsx"}],
  ["path", {d: "m22 22-5-10-5 10", key: "don7ne"}],
  ["path", {d: "M14 18h6", key: "1m8k6r"}],
]);

export const Sidebar = createLucideIcon("panel-left", [
  ["rect", {height: "18", key: "afitv7", rx: "2", width: "18", x: "3", y: "3"}],
  ["path", {d: "M9 3v18", key: "fh3hqa"}],
]);

export const ChevronsUpDown = createLucideIcon("chevrons-up-down", [
  ["path", {d: "m7 15 5 5 5-5", key: "1hf1tw"}],
  ["path", {d: "m7 9 5-5 5 5", key: "sgt6xg"}],
]);

export const Search = createLucideIcon("search", [
  ["circle", {cx: "11", cy: "11", key: "4ej97u", r: "8"}],
  ["path", {d: "m21 21-4.3-4.3", key: "1qie3q"}],
]);

export const ExternalLink = createLucideIcon("external-link", [
  ["path", {d: "M15 3h6v6", key: "1q9fwt"}],
  ["path", {d: "M10 14 21 3", key: "gplh6r"}],
  [
    "path",
    {
      d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
      key: "a6xqqp",
    },
  ],
]);

export const Moon = createLucideIcon("moon", [
  ["path", {d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z", key: "a7tn18"}],
]);

export const Sun = createLucideIcon("sun", [
  ["circle", {cx: "12", cy: "12", key: "4exip2", r: "4"}],
  ["path", {d: "M12 2v2", key: "tus03m"}],
  ["path", {d: "M12 20v2", key: "1lh1kg"}],
  ["path", {d: "m4.93 4.93 1.41 1.41", key: "149t6j"}],
  ["path", {d: "m17.66 17.66 1.41 1.41", key: "ptbguv"}],
  ["path", {d: "M2 12h2", key: "1t8f8n"}],
  ["path", {d: "M20 12h2", key: "1q8mjw"}],
  ["path", {d: "m6.34 17.66-1.41 1.41", key: "1m8zz5"}],
  ["path", {d: "m19.07 4.93-1.41 1.41", key: "1shlcs"}],
]);

export const Airplay = createLucideIcon("airplay", [
  [
    "path",
    {
      d: "M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1",
      key: "ns4c3b",
    },
  ],
  ["path", {d: "m12 15 5 6H7Z", key: "14qnn2"}],
]);

export const Menu = createLucideIcon("menu", [
  ["line", {key: "1e0a9i", x1: "4", x2: "20", y1: "12", y2: "12"}],
  ["line", {key: "1owob3", x1: "4", x2: "20", y1: "6", y2: "6"}],
  ["line", {key: "yk5zj1", x1: "4", x2: "20", y1: "18", y2: "18"}],
]);

export const X = createLucideIcon("x", [
  ["path", {d: "M18 6 6 18", key: "1bl5f8"}],
  ["path", {d: "m6 6 12 12", key: "d8bk6v"}],
]);

export const LoaderCircle = createLucideIcon("loader-circle", [
  ["path", {d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald"}],
]);

export const CircleCheck = createLucideIcon("circle-check", [
  ["circle", {cx: "12", cy: "12", key: "1mglay", r: "10"}],
  ["path", {d: "m9 12 2 2 4-4", key: "dzmm74"}],
]);

export const CircleX = createLucideIcon("circle-x", [
  ["circle", {cx: "12", cy: "12", key: "1mglay", r: "10"}],
  ["path", {d: "m15 9-6 6", key: "1uzhvr"}],
  ["path", {d: "m9 9 6 6", key: "z0biqf"}],
]);

export const Check = createLucideIcon("check", [["path", {d: "M20 6 9 17l-5-5", key: "1gmf2c"}]]);

export const TriangleAlert = createLucideIcon("triangle-alert", [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq",
    },
  ],
  ["path", {d: "M12 9v4", key: "juzpu7"}],
  ["path", {d: "M12 17h.01", key: "p32p05"}],
]);

export const Info = createLucideIcon("info", [
  ["circle", {cx: "12", cy: "12", key: "1mglay", r: "10"}],
  ["path", {d: "M12 16v-4", key: "1dtifu"}],
  ["path", {d: "M12 8h.01", key: "e9boi3"}],
]);

export const Copy = createLucideIcon("copy", [
  [
    "rect",
    {
      height: "14",
      key: "17jyea",
      rx: "2",
      ry: "2",
      width: "14",
      x: "8",
      y: "8",
    },
  ],
  [
    "path",
    {
      d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",
      key: "zix9uf",
    },
  ],
]);

export const Clipboard = createLucideIcon("clipboard", [
  [
    "rect",
    {
      height: "4",
      key: "1",
      rx: "1",
      ry: "1",
      width: "8",
      x: "8",
      y: "2",
    },
  ],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "2",
    },
  ],
]);

export const FileText = createLucideIcon("file-text", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", {d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb"}],
  ["path", {d: "M10 9H8", key: "b1mrlr"}],
  ["path", {d: "M16 13H8", key: "t4e002"}],
  ["path", {d: "M16 17H8", key: "z1uh3a"}],
]);

export const Hash = createLucideIcon("hash", [
  ["line", {key: "4lhtct", x1: "4", x2: "20", y1: "9", y2: "9"}],
  ["line", {key: "vyu0kd", x1: "4", x2: "20", y1: "15", y2: "15"}],
  ["line", {key: "1ggp8o", x1: "10", x2: "8", y1: "3", y2: "21"}],
  ["line", {key: "weycgp", x1: "16", x2: "14", y1: "3", y2: "21"}],
]);

export const Text = createLucideIcon("text", [
  ["path", {d: "M15 18H3", key: "olowqp"}],
  ["path", {d: "M17 6H3", key: "16j9eg"}],
  ["path", {d: "M21 12H3", key: "2avoz0"}],
]);

export const File = createLucideIcon("file", [
  [
    "path",
    {
      d: "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",
      key: "1rqfz7",
    },
  ],
  ["path", {d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb"}],
]);

export const Folder = createLucideIcon("folder", [
  [
    "path",
    {
      d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
      key: "1kt360",
    },
  ],
]);

export const FolderOpen = createLucideIcon("folder-open", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0",
    },
  ],
]);

export const Star = createLucideIcon("star", [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s",
    },
  ],
]);

export const Link = createLucideIcon("link", [
  [
    "path",
    {
      d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",
      key: "1cjeqo",
    },
  ],
  [
    "path",
    {
      d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",
      key: "19qd67",
    },
  ],
]);

export const Edit = createLucideIcon("square-pen", [
  [
    "path",
    {
      d: "M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7",
      key: "1m0v6g",
    },
  ],
  [
    "path",
    {
      d: "M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z",
      key: "ohrbg2",
    },
  ],
]);

export const ChevronRight = createLucideIcon("chevron-right", [
  ["path", {d: "m9 18 6-6-6-6", key: "mthhwq"}],
]);

export const ChevronLeft = createLucideIcon("chevron-left", [
  ["path", {d: "m15 18-6-6 6-6", key: "1wnfg3"}],
]);

export const Plus = createLucideIcon("plus", [
  ["path", {d: "M5 12h14", key: "1ays0h"}],
  ["path", {d: "M12 5v14", key: "s699le"}],
]);

export const Trash2 = createLucideIcon("trash-2", [
  ["path", {d: "M3 6h18", key: "d0wm0j"}],
  ["path", {d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4"}],
  ["path", {d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e"}],
  ["line", {key: "1uufr5", x1: "10", x2: "10", y1: "11", y2: "17"}],
  ["line", {key: "xtxkd", x1: "14", x2: "14", y1: "11", y2: "17"}],
]);

export const ChevronUp = createLucideIcon("chevron-up", [
  ["path", {d: "m18 15-6-6-6 6", key: "153udz"}],
]);
