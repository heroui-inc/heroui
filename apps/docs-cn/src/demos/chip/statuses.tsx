import {Ban, Check, CircleFill, CircleInfo, TriangleExclamation} from "@gravity-ui/icons";
import {Chip} from "@heroui/react";

export function ChipStatuses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="primary">
          <CircleFill width={6} />
          <Chip.Label>Default</Chip.Label>
        </Chip>
        <Chip color="success" variant="primary">
          <CircleFill width={6} />
          <Chip.Label>Active</Chip.Label>
        </Chip>
        <Chip color="warning" variant="primary">
          <CircleFill width={6} />
          <Chip.Label>Pending</Chip.Label>
        </Chip>
        <Chip color="danger" variant="primary">
          <CircleFill width={6} />
          <Chip.Label>Inactive</Chip.Label>
        </Chip>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Chip>
          <CircleInfo width={12} />
          <Chip.Label>New Feature</Chip.Label>
        </Chip>
        <Chip color="success">
          <Check width={12} />
          <Chip.Label>Available</Chip.Label>
        </Chip>
        <Chip color="warning">
          <TriangleExclamation width={12} />
          <Chip.Label>Beta</Chip.Label>
        </Chip>
        <Chip color="danger">
          <Ban width={12} />
          <Chip.Label>Deprecated</Chip.Label>
        </Chip>
      </div>
    </div>
  );
}
