import {Ban, Check, CircleFill, CircleInfo, TriangleExclamation} from "@gravity-ui/icons";
import {Chip} from "@heroui/react";

export function ChipStatuses() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Chip variant="primary">
          <CircleFill width={6} />
          <Chip.Label>默认</Chip.Label>
        </Chip>
        <Chip color="success" variant="primary">
          <CircleFill width={6} />
          <Chip.Label>活跃</Chip.Label>
        </Chip>
        <Chip color="warning" variant="primary">
          <CircleFill width={6} />
          <Chip.Label>待处理</Chip.Label>
        </Chip>
        <Chip color="danger" variant="primary">
          <CircleFill width={6} />
          <Chip.Label>未激活</Chip.Label>
        </Chip>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Chip>
          <CircleInfo width={12} />
          <Chip.Label>新功能</Chip.Label>
        </Chip>
        <Chip color="success">
          <Check width={12} />
          <Chip.Label>可用</Chip.Label>
        </Chip>
        <Chip color="warning">
          <TriangleExclamation width={12} />
          <Chip.Label>测试版</Chip.Label>
        </Chip>
        <Chip color="danger">
          <Ban width={12} />
          <Chip.Label>已弃用</Chip.Label>
        </Chip>
      </div>
    </div>
  );
}
