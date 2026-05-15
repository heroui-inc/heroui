import {Chip} from "@heroui/react";

export function ChipBasic() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Chip>默认</Chip>
      <Chip color="accent">强调</Chip>
      <Chip color="success">成功</Chip>
      <Chip color="warning">警告</Chip>
      <Chip color="danger">危险</Chip>
    </div>
  );
}
