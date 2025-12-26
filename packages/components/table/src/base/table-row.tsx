import type {HTMLHeroUIProps} from "@heroui/system";
import type {RowProps} from "@react-types/table";

import {Row} from "@react-stately/table";

export type TableRowProps<T = object> = RowProps<T> &
  Omit<HTMLHeroUIProps<"tr">, keyof RowProps<T>>;

const TableRow = Row as (props: TableRowProps) => JSX.Element;

export default TableRow;
