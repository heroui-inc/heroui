import type {HTMLHeroUIProps} from "@heroui/system";
import type {TableHeaderProps as TableHeaderBaseProps} from "@react-types/table";

import {TableHeader as TableHeaderBase} from "@react-stately/table";

export type TableHeaderProps<T> = TableHeaderBaseProps<T> &
  Omit<HTMLHeroUIProps<"thead">, keyof TableHeaderBaseProps<T>>;

const TableHeader = TableHeaderBase as <T>(props: TableHeaderProps<T>) => JSX.Element;

export default TableHeader;
