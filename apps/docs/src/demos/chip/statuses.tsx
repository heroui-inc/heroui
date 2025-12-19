import {Ban, Check, CircleFill, CircleInfo, TriangleExclamation} from "@gravity-ui/icons";
import {Chip} from "@heroui/react";

export function ChipStatuses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="primary">
          <CircleFill width={6} />
          Default
        </Chip>
        <Chip color="success" variant="primary">
          <CircleFill width={6} />
          Active
        </Chip>
        <Chip color="warning" variant="primary">
          <CircleFill width={6} />
          Pending
        </Chip>
        <Chip color="danger" variant="primary">
          <CircleFill width={6} />
          Inactive
        </Chip>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Chip>
          <CircleInfo width={12} />
          New Feature
        </Chip>
        <Chip color="success">
          <Check width={12} />
          Available
        </Chip>
        <Chip color="warning">
          <TriangleExclamation width={12} />
          Beta
        </Chip>
        <Chip color="danger">
          <Ban width={12} />
          Deprecated
        </Chip>
      </div>
    </div>
  );
}
