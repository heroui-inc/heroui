import type {HTMLHeroUIProps} from "@heroui/system";
import type {CellProps} from "@react-types/table";

import {Cell} from "@react-stately/table";

export type TableCellProps = CellProps & HTMLHeroUIProps<"td">;

const TableCell = Cell as (props: TableCellProps) => JSX.Element;

export default TableCell;
