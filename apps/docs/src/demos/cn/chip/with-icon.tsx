import {ChevronDown, CircleCheckFill, CircleFill, Clock, Xmark} from "@gravity-ui/icons";
import {Chip} from "@heroui/react";

export function ChipWithIcon() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>
        <CircleFill width={6} />
        <Chip.Label>信息</Chip.Label>
      </Chip>
      <Chip color="success">
        <CircleCheckFill width={12} />
        <Chip.Label>已完成</Chip.Label>
      </Chip>
      <Chip color="warning">
        <Clock width={12} />
        <Chip.Label>待处理</Chip.Label>
      </Chip>
      <Chip color="danger">
        <Xmark width={12} />
        <Chip.Label>失败</Chip.Label>
      </Chip>
      <Chip color="accent">
        <Chip.Label>标签</Chip.Label>
        <ChevronDown width={12} />
      </Chip>
    </div>
  );
}
