import type {HTMLHeroUIProps} from "@heroui/system";
import type {TableBodyProps as TableBodyBaseProps} from "@react-types/table";
import type {ReactNode} from "react";

import {TableBody as TableBodyBase} from "@react-stately/table";

export interface TableBodyProps<T>
  extends TableBodyBaseProps<T>,
    Omit<HTMLHeroUIProps<"tbody">, keyof TableBodyBaseProps<T>> {
  /**
   * Provides content to display a loading component when the `loadingState` is `loading` or `loadingMore`.
   */
  loadingContent?: ReactNode;
  /**
   * Whether the table data is currently loading.
   * @default false
   */
  isLoading?: boolean;
  /**
   *  Provides content to display when there are no rows in the table.
   * */
  emptyContent?: ReactNode;
}

const TableBody = TableBodyBase as <T>(props: TableBodyProps<T>) => JSX.Element;

export default TableBody;
