import {CircleDollar} from "@gravity-ui/icons";
import {Card, Link} from "@heroui/react";

export function Default() {
  return (
    <Card className="w-[400px]">
      <CircleDollar aria-label="美元图标" className="text-primary size-6" role="img" />
      <Card.Header>
        <Card.Title>成为 Acme 创作者！</Card.Title>
        <Card.Description>
          前往 Acme 创作者中心立即注册，开始从粉丝与支持者处获得积分奖励。
        </Card.Description>
      </Card.Header>
      <Card.Footer>
        <Link
          aria-label="前往 Acme 创作者中心（在新标签页打开）"
          href="https://heroui.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          创作者中心
          <Link.Icon aria-hidden="true" />
        </Link>
      </Card.Footer>
    </Card>
  );
}
