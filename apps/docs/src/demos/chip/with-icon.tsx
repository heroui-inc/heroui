import {Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function ChipWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>
        <Icon icon="gravity-ui:circle-fill" width={6} />
        Information
      </Chip>
      <Chip color="success">
        <Icon icon="gravity-ui:circle-check-fill" width={12} />
        Completed
      </Chip>
      <Chip color="warning">
        <Icon icon="gravity-ui:clock" width={12} />
        Pending
      </Chip>
      <Chip color="danger">
        <Icon icon="gravity-ui:xmark" width={12} />
        Failed
      </Chip>
      <Chip color="accent">
        Label
        <Icon icon="gravity-ui:chevron-down" width={12} />
      </Chip>
    </div>
  );
}
