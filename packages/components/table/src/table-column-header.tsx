import type {ReactNode, ReactElement} from "react";
import type {GridNode} from "@react-types/grid";
import type {HTMLHeroUIProps} from "@heroui/system";
import type {ValuesType} from "./use-table";

import {cloneElement, isValidElement} from "react";
import {forwardRef} from "@heroui/system";
import {useDOMRef, filterDOMProps} from "@heroui/react-utils";
import {clsx, dataAttr} from "@heroui/shared-utils";
import {useTableColumnHeader} from "@react-aria/table";
import {mergeProps} from "@react-aria/utils";
import {ChevronDownIcon} from "@heroui/shared-icons";
import {useFocusRing} from "@react-aria/focus";
import {VisuallyHidden} from "@react-aria/visually-hidden";
import {useHover} from "@react-aria/interactions";

// @internal
export type SortIconProps = {
  "aria-hidden"?: boolean;
  "data-direction"?: "ascending" | "descending";
  "data-visible"?: boolean | "true" | "false";
  className?: string;
};

export interface TableColumnHeaderProps<T = object> extends HTMLHeroUIProps<"th"> {
  slots: ValuesType["slots"];
  state: ValuesType["state"];
  classNames?: ValuesType["classNames"];
  /**
   * Custom Icon to be displayed in the table header - overrides the default chevron one
   */
  sortIcon?: ReactNode | ((props: SortIconProps) => ReactNode);
  /**
   * The table node to render.
   */
  node: GridNode<T>;
}

const TableColumnHeader = forwardRef<"th", TableColumnHeaderProps>((props, ref) => {
  const {as, className, state, node, slots, classNames, sortIcon, ...otherProps} = props;

  const Component = as || "th";
  const shouldFilterDOMProps = typeof Component === "string";

  const domRef = useDOMRef(ref);

  const {columnHeaderProps} = useTableColumnHeader({node}, state, domRef);

  const thStyles = clsx(classNames?.th, className, node.props?.className);

  const {isFocusVisible, focusProps} = useFocusRing();
  const {isHovered, hoverProps} = useHover({});
  const {hideHeader, align, ...columnProps} = node.props;

  const allowsSorting = columnProps.allowsSorting;

  const sortIconProps = {
    "aria-hidden": true,
    "data-direction": state.sortDescriptor?.direction,
    "data-visible": dataAttr(state.sortDescriptor?.column === node.key),
    className: slots.sortIcon?.({class: classNames?.sortIcon}),
  };

  const customSortIcon =
    typeof sortIcon === "function"
      ? sortIcon(sortIconProps)
      : isValidElement(sortIcon) && cloneElement(sortIcon as ReactElement, sortIconProps);

  return (
    <Component
      ref={domRef}
      colSpan={node.colspan}
      data-focus-visible={dataAttr(isFocusVisible)}
      data-hover={dataAttr(isHovered)}
      data-sortable={dataAttr(allowsSorting)}
      {...mergeProps(
        columnHeaderProps,
        focusProps,
        filterDOMProps(columnProps, {
          enabled: shouldFilterDOMProps,
        }),
        allowsSorting ? hoverProps : {},
        otherProps,
      )}
      className={slots.th?.({align, class: thStyles})}
    >
      {hideHeader ? <VisuallyHidden>{node.rendered}</VisuallyHidden> : node.rendered}
      {allowsSorting && (customSortIcon || <ChevronDownIcon strokeWidth={3} {...sortIconProps} />)}
    </Component>
  );
});

TableColumnHeader.displayName = "HeroUI.TableColumnHeader";

export default TableColumnHeader;
