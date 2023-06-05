import type {VariantProps} from "tailwind-variants";

import {tv} from "tailwind-variants";

const focusRing = [
  "data-[focus-visible=true]:outline-none",
  "data-[focus-visible=true]:ring-2",
  "data-[focus-visible=true]:ring-primary",
  "data-[focus-visible=true]:ring-offset-2",
  "data-[focus-visible=true]:ring-offset-background",
  "data-[focus-visible=true]:dark:ring-offset-background-dark",
];

/**
 * Table **Tailwind Variants** component
 *
 * @example
 * ```js
 * const {base, table, thead, tbody, tr, th, td, tfoot} = table({...})
 *
 * <div className={base()}>
 *   <table className={table()}>
 *    <thead className={thead()}>
 *      <tr className={tr()}>
 *        <th className={th()}>...</th>
 *        <th className={th()}>...</th>
 *      </tr>
 *    </thead>
 *    <tbody className={tbody()}>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *      </tr>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *     </tr>
 *   </tbody>
 *    <tfoot className={tfoot()}>
 *      <tr className={tr()}>
 *        <td className={td()}>...</td>
 *        <td className={td()}>...</td>
 *      </tr>
 *    </tfoot>
 *  </table>
 * </div>
 * ```
 */
const table = tv({
  slots: {
    base: [
      "p-4",
      "flex",
      "flex-col",
      "relative",
      "justify-between",
      "gap-4",
      "border",
      "border-default-100",
      "overflow-auto",
    ],
    table: "min-w-full h-auto",
    thead: "[&>tr]:first:rounded-lg",
    tbody: "",
    tr: ["group", "outline-none", ...focusRing],
    th: [
      "group",
      "px-3",
      "h-10",
      "text-start",
      "align-middle",
      "bg-default-100",
      "text-default-500",
      "text-xs",
      "font-semibold",
      "first:rounded-l-lg",
      "first:rtl:rounded-l-none",
      "first:rtl:rounded-r-lg",
      "last:rounded-r-lg",
      "last:rtl:rounded-r-none",
      "last:rtl:rounded-l-lg",
      "outline-none",
      "data-[sortable=true]:transition-colors",
      "data-[sortable=true]:cursor-pointer",
      "data-[hover=true]:text-default-400",
      ...focusRing,
    ],
    td: [
      "py-2",
      "px-3",
      "relative",
      "align-middle",
      "whitespace-normal",
      "text-sm",
      "font-normal",
      "outline-none",
      ...focusRing,
      // before content for selection
      "before:content-['']",
      "before:absolute",
      "before:-z-[1]",
      "before:inset-0",
      "before:opacity-0",
      "data-[selected=true]:before:opacity-100",
      // disabled
      "group-data-[disabled=true]:text-default-300",
    ],
    tfoot: "",
    sortIcon: [
      "ml-2",
      "mb-px",
      "opacity-0",
      "text-inherit",
      "inline-block",
      "transition-transform-opacity",
      "data-[visible=true]:opacity-100",
      "group-data-[hover=true]:opacity-100",
      "data-[direction=ascending]:rotate-180",
    ],
    emptyWrapper: "text-default-400 align-middle text-center h-40",
    loadingWrapper: "absolute inset-0 flex items-center justify-center",
  },
  variants: {
    color: {
      default: {
        td:
          "before:bg-default-200 dark:before:bg-default-100 data-[selected=true]:text-default-foreground",
      },
      primary: {
        td: "before:bg-primary-50 data-[selected=true]:text-primary",
      },
      secondary: {
        td: "before:bg-secondary-100 data-[selected=true]:text-secondary",
      },
      success: {
        td: "before:bg-success-50 data-[selected=true]:text-success",
      },
      warning: {
        td: "before:bg-warning-50 data-[selected=true]:text-warning",
      },
      danger: {
        td: "before:bg-danger-50 data-[selected=true]:text-danger",
      },
    },
    layout: {
      auto: {
        table: "table-auto",
      },
      fixed: {
        table: "table-fixed",
      },
    },
    radius: {
      none: {
        base: "rounded-none",
      },
      base: {
        base: "rounded",
      },
      sm: {
        base: "rounded-sm",
      },
      md: {
        base: "rounded-md",
      },
      lg: {
        base: "rounded-lg",
      },
      xl: {
        base: "rounded-xl",
      },
      "2xl": {
        base: "rounded-2xl",
      },
    },
    shadow: {
      none: {
        base: "shadow-none",
      },
      sm: {
        base: "shadow-sm",
      },
      md: {
        base: "shadow-md",
      },
      lg: {
        base: "shadow-lg",
      },
      xl: {
        base: "shadow-xl",
      },
      "2xl": {
        base: "shadow-2xl",
      },
      inner: {
        base: "shadow-inner",
      },
    },
    hideHeader: {
      true: {
        thead: "hidden",
      },
    },
    isStriped: {
      true: {
        td: [
          "group-data-[odd=true]:before:bg-default-100",
          "group-data-[odd=true]:before:opacity-100",
        ],
      },
    },
    isHeaderSticky: {
      true: {
        thead: "sticky top-0 z-10 [&>tr]:first:shadow",
      },
    },
    isSelectable: {
      true: {
        tr: "cursor-default",
        td: ["group-data-[hover=true]:before:opacity-70"],
      },
    },
    isMultiSelectable: {
      true: {
        td: [
          // first
          "group-data-[first=true]:first:before:rounded-tl-lg",
          "rtl:group-data-[first=true]:first:before:rounded-tl-none",
          "rtl:group-data-[first=true]:first:before:rounded-tr-lg",
          "group-data-[first=true]:last:before:rounded-tr-lg",
          "rtl:group-data-[first=true]:last:before:rounded-tr-none",
          "rtl:group-data-[first=true]:last:before:rounded-tl-lg",
          // middle
          "group-data-[middle=true]:before:rounded-none",
          // last
          "group-data-[last=true]:first:before:rounded-bl-lg",
          "rtl:group-data-[last=true]:first:before:rounded-bl-none",
          "rtl:group-data-[last=true]:first:before:rounded-br-lg",
          "group-data-[last=true]:last:before:rounded-br-lg",
          "rtl:group-data-[last=true]:last:before:rounded-br-none",
          "rtl:group-data-[last=true]:last:before:rounded-bl-lg",
        ],
      },
      false: {
        td: [
          "first:before:rounded-l-lg",
          "first:rtl:before:rounded-l-none",
          "first:rtl:before:rounded-r-lg",
          "last:before:rounded-r-lg",
          "last:rtl:before:rounded-r-none",
          "last:rtl:before:rounded-l-lg",
        ],
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
        table: "w-full",
      },
    },
  },
  defaultVariants: {
    layout: "auto",
    shadow: "lg",
    radius: "xl",
    color: "default",
    hideHeader: false,
    isStriped: false,
    fullWidth: true,
  },
});

export type TableVariantProps = VariantProps<typeof table>;
export type TableSlots = keyof ReturnType<typeof table>;
export type TableReturnType = ReturnType<typeof table>;

export {table};
