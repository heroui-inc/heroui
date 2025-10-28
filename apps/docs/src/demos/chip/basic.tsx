import {Chip} from "@heroui/react";

export function ChipBasic() {
  return (
    <div className="flex items-center gap-3">
      <Chip>Default</Chip>
      <Chip type="accent">Accent</Chip>
      <Chip type="success">Success</Chip>
      <Chip type="warning">Warning</Chip>
      <Chip type="danger">Danger</Chip>
    </div>
  );
}
