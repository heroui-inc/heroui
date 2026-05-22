import {Button, Card, CloseButton} from "@heroui/react";

export function Horizontal() {
  return (
    <Card className="w-full items-stretch md:flex-row">
      <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
        <img
          alt="樱桃"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="pr-8">成为 ACME 创作者！</Card.Title>
          <Card.Description>
            这是一段占位说明文字，用于展示横向卡片布局、配图与右上角关闭按钮的排版效果。
          </Card.Description>
          <CloseButton aria-label="关闭横幅" className="absolute top-3 right-3" />
        </Card.Header>
        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">仅剩 10 个名额</span>
            <span className="text-xs text-muted">报名截止：10 月 10 日</span>
          </div>
          <Button className="w-full sm:w-auto">立即申请</Button>
        </Card.Footer>
      </div>
    </Card>
  );
}
