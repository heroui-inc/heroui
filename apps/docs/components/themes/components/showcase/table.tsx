import {cloneElement} from "react";
import {
  TableProps,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import {ShowcaseComponent} from "../showcase-component";
import {useThemeBuilder} from "../../provider";

type Color = TableProps["color"];
type Radius = TableProps["radius"];

const SectionBase = ({color, radius}: {color?: Color; radius?: Radius}) => {
  return (
    <Table
      aria-label="Example static collection table"
      color={color}
      defaultSelectedKeys={["2"]}
      radius={radius}
      selectionBehavior="toggle"
      selectionMode="multiple"
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>ROLE</TableColumn>
        <TableColumn>STATUS</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow key="1">
          <TableCell>Tony Reichert</TableCell>
          <TableCell>CEO</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="2">
          <TableCell>Zoey Lang</TableCell>
          <TableCell>Technical Lead</TableCell>
          <TableCell>Paused</TableCell>
        </TableRow>
        <TableRow key="3">
          <TableCell>Jane Fisher</TableCell>
          <TableCell>Senior Developer</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow key="4">
          <TableCell>William Howard</TableCell>
          <TableCell>Community Manager</TableCell>
          <TableCell>Vacation</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

const Section = ({color, radius}: {color: Color; radius: Radius}) => {
  return (
    <div key={color} className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, radius})}
    </div>
  );
};

export const TableComponent = () => {
  const colors: Color[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const {radiusValue} = useThemeBuilder();
  const radius = radiusValue === "full" ? "lg" : radiusValue;

  return (
    <ShowcaseComponent name="Table">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} radius={radius} />
      ))}
    </ShowcaseComponent>
  );
};
