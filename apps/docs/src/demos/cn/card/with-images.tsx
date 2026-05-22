import {CircleDollar} from "@gravity-ui/icons";
import {Avatar, Button, Card, CloseButton, Link} from "@heroui/react";

export function WithImages() {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="grid w-full max-w-2xl grid-cols-12 gap-4 p-4">
        {/* 第 1 行：大图商品卡 */}
        <Card className="col-span-12 flex h-auto min-h-[152px] flex-col sm:flex-row">
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

        {/* 第 2 行 */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          {/* 左栏 */}
          <div className="col-span-12 grid grid-cols-12 gap-4 lg:col-span-6">
            {/* 上方卡片 */}
            <Card className="col-span-12">
              <div className="absolute top-3 right-3 z-10">
                <CloseButton aria-label="关闭通知" />
              </div>
              <Card.Header className="gap-3">
                <CircleDollar
                  aria-label="美元图标"
                  className="text-primary size-8 shrink-0"
                  role="img"
                />
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted uppercase">支付</span>
                  <Card.Title className="pr-8 text-sm sm:text-base">
                    现已支持加密货币提现
                  </Card.Title>
                  <Card.Description className="text-xs sm:text-sm">
                    在设置中添加钱包即可提现
                  </Card.Description>
                </div>
              </Card.Header>
              <Card.Footer>
                <Link aria-label="前往设置" href="#" rel="noopener noreferrer">
                  前往设置
                  <Link.Icon aria-hidden="true" />
                </Link>
              </Card.Footer>
            </Card>
            {/* 下方小卡 */}
            <div className="col-span-12 grid grid-cols-12 gap-4">
              {/* 左卡 */}
              <Card className="col-span-12 gap-2 sm:col-span-6">
                <Card.Header>
                  <Avatar className="size-[56px] rounded-xl">
                    <Avatar.Image
                      alt="演示图片 1"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content className="mt-1">
                  <p className="text-sm leading-4 font-medium">Indie Hackers</p>
                  <p className="text-xs text-muted">148 位成员</p>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2">
                  <Avatar className="size-4">
                    <Avatar.Image
                      alt="约翰"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
                  <p className="text-xs text-muted">创建者：约翰</p>
                </Card.Footer>
              </Card>
              {/* 右卡 */}
              <Card className="col-span-12 gap-2 sm:col-span-6">
                <Card.Header>
                  <Avatar className="size-[56px] rounded-xl">
                    <Avatar.Image
                      alt="演示图片 2"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg"
                    />
                    <Avatar.Fallback>AB</Avatar.Fallback>
                  </Avatar>
                </Card.Header>
                <Card.Content className="mt-1">
                  <p className="text-sm leading-4 font-medium">AI Builders</p>
                  <p className="text-xs text-muted">362 位成员</p>
                </Card.Content>
                <Card.Footer className="flex items-center gap-2">
                  <Avatar className="size-4">
                    <Avatar.Image
                      alt="玛莎"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
                    />
                    <Avatar.Fallback>M</Avatar.Fallback>
                  </Avatar>
                  <p className="text-xs text-muted">创建者：玛莎</p>
                </Card.Footer>
              </Card>
            </div>
          </div>
          {/* 右栏 */}
          <Card className="col-span-12 min-h-[200px] overflow-hidden rounded-3xl lg:col-span-6">
            {/* 背景图 */}
            <img
              alt="NEO 家用机器人"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo2.jpeg"
            />

            {/* 标题区 */}
            <Card.Header className="z-10 text-white">
              <Card.Title className="text-xs font-semibold tracking-wide text-black/70">
                NEO
              </Card.Title>
              <Card.Description className="text-sm leading-5 font-medium text-black/50">
                家用机器人
              </Card.Description>
            </Card.Header>

            {/* 底部 */}
            <Card.Footer className="z-10 mt-auto flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-black">即将推出</div>
                <div className="text-xs text-black/60">接收上架通知</div>
              </div>
              <Button className="bg-white text-black" size="sm" variant="tertiary">
                通知我
              </Button>
            </Card.Footer>
          </Card>
        </div>

        {/* 第 3 行 */}
        <div className="col-span-12 grid grid-cols-12 gap-4">
          {/* 左：大图卡 */}
          <Card className="relative col-span-12 h-[250px] sm:h-[300px] md:col-span-8 md:h-[350px]">
            <img
              alt="NEO 家用机器人"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/neo1.jpeg"
            />

            <Card.Footer className="z-10 mt-auto flex items-end justify-between">
              <div>
                <div className="text-base font-medium text-black sm:text-lg">NEO</div>
                <div className="text-xs font-medium text-black/50 sm:text-sm">$499/月</div>
              </div>
              <Button className="bg-white text-black" size="sm" variant="tertiary">
                立即购买
              </Button>
            </Card.Footer>
          </Card>

          {/* 右：堆叠小卡 */}
          <div className="col-span-12 flex flex-col gap-2 md:col-span-4 md:justify-between md:gap-0 md:py-2">
            {/* 1 */}
            <Card className="flex flex-row gap-3 p-1" variant="transparent">
              <img
                alt="未来感机器人"
                className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none sm:h-20 sm:w-20"
                loading="lazy"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/robot1.jpeg"
              />
              <div className="flex flex-1 flex-col justify-center gap-1">
                <Card.Title className="text-sm">连接未来</Card.Title>
                <Card.Description className="text-xs">今天 18:30</Card.Description>
              </div>
            </Card>
            {/* 2 */}
            <Card className="flex flex-row gap-3 p-1" variant="transparent">
              <img
                alt="牛油果"
                className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none sm:h-20 sm:w-20"
                loading="lazy"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/avocado.jpeg"
              />
              <div className="flex flex-1 flex-col justify-center gap-1">
                <Card.Title className="text-sm">牛油果黑客松</Card.Title>
                <Card.Description className="text-xs">周三 16:30</Card.Description>
              </div>
            </Card>
            {/* 3 */}
            <Card className="flex flex-row gap-3 p-1" variant="transparent">
              <img
                alt="Sound Electro 活动"
                className="aspect-square h-16 w-16 shrink-0 rounded-xl object-cover select-none sm:h-20 sm:w-20"
                loading="lazy"
                src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/oranges.jpeg"
              />
              <div className="flex flex-1 flex-col justify-center gap-1">
                <Card.Title className="text-sm">Sound Electro｜超越艺术</Card.Title>
                <Card.Description className="text-xs">周五 20:00</Card.Description>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
