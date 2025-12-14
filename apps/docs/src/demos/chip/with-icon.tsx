import {ChevronDown, CircleCheckFill, CircleFill, Clock, Xmark} from "@gravity-ui/icons";
import {Chip} from "@heroui/react";

export function ChipWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>
        <CircleFill width={6} />
        Information
      </Chip>
      <Chip color="success">
        <CircleCheckFill width={12} />
        Completed
      </Chip>
      <Chip color="warning">
        <Clock width={12} />
        Pending
      </Chip>
      <Chip color="danger">
        <Xmark width={12} />
        Failed
      </Chip>
      <Chip color="accent">
        Label
        <ChevronDown width={12} />
      </Chip>
    </div>
  );
}
