import {Chip} from "@heroui/react";
import {Icon} from "@iconify/react";

export function ChipStatuses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Chip variant="primary">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Default
        </Chip>
        <Chip type="success" variant="primary">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Active
        </Chip>
        <Chip type="warning" variant="primary">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Pending
        </Chip>
        <Chip type="danger" variant="primary">
          <Icon icon="gravity-ui:circle-fill" width={6} />
          Inactive
        </Chip>
      </div>

      <div className="flex items-center gap-3">
        <Chip>
          <Icon icon="gravity-ui:circle-info" width={12} />
          New Feature
        </Chip>
        <Chip type="success">
          <Icon icon="gravity-ui:check" width={12} />
          Available
        </Chip>
        <Chip type="warning">
          <Icon icon="gravity-ui:triangle-exclamation" width={12} />
          Beta
        </Chip>
        <Chip type="danger">
          <Icon icon="gravity-ui:ban" width={12} />
          Deprecated
        </Chip>
      </div>
    </div>
  );
}
