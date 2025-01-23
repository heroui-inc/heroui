import {showcaseId} from "../../constants";

import {Alert} from "./alert";
import {Avatar} from "./avatar";
import {BreadCrumbs} from "./breadcrumbs";
import {Button} from "./button";
import {Calendar} from "./calendar";
import {Checkbox} from "./checkbox";
import {Chip} from "./chip";
import {Code} from "./code";
import {DropdownComponent} from "./dropdown";
import {InputComponent} from "./input";
import {PaginationComponent} from "./pagination";
import {PopoverComponent} from "./popover";
import {SelectComponent} from "./select";
import {SwitchComponent} from "./switch";
import {TableComponent} from "./table";
import {TabsComponent} from "./tabs";

export function Showcase() {
  return (
    <div className="grid grid-cols-1 gap-4 w-full min-w-6xl pb-20" id={showcaseId}>
      <div className="text-4xl text-default-800 font-medium">Theme Generator</div>
      <Avatar />
      <Alert />
      <BreadCrumbs />
      <Button />
      <Calendar />
      <Checkbox />
      <Chip />
      <Code />
      <DropdownComponent />
      <InputComponent />
      <PaginationComponent />
      <PopoverComponent />
      <SelectComponent />
      <SwitchComponent />
      <TableComponent />
      <TabsComponent />
    </div>
  );
}
