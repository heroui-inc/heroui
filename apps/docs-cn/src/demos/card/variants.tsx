import {Card} from "@heroui/react";

export function Variants() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-[320px]" variant="transparent">
        <Card.Header>
          <Card.Title>透明</Card.Title>
          <Card.Description>背景透明，视觉层级较低（transparent）</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>适合次要内容或嵌套在其它容器中的卡片</p>
        </Card.Content>
      </Card>

      <Card className="w-[320px]" variant="default">
        <Card.Header>
          <Card.Title>默认</Card.Title>
          <Card.Description>标准外观（bg-surface）</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>大多数场景的默认卡片变体</p>
        </Card.Content>
      </Card>

      <Card className="w-[320px]" variant="secondary">
        <Card.Header>
          <Card.Title>次要</Card.Title>
          <Card.Description>中等强调（bg-surface-secondary）</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>用于需要适度吸引注意力的内容</p>
        </Card.Content>
      </Card>

      <Card className="w-[320px]" variant="tertiary">
        <Card.Header>
          <Card.Title>第三</Card.Title>
          <Card.Description>更高强调（bg-surface-tertiary）</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>适合主要内容或需要突出的展示位</p>
        </Card.Content>
      </Card>
    </div>
  );
}
