import {Separator} from "@heroui/react";

const items = [
  {
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/bell-small.png",
    subtitle: "接收账户活动更新",
    title: "设置通知",
  },
  {
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/compass-small.png",
    subtitle: "将浏览器连接到你的账户",
    title: "设置浏览器扩展",
  },
  {
    iconUrl:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/mint-collective-small.png",
    subtitle: "创建你的第一件收藏品",
    title: "铸造收藏品",
  },
];

export function WithContent() {
  return (
    <div className="max-w-md space-y-4">
      {items.map((item, index) => (
        <div key={index}>
          <div className="flex items-center gap-3">
            <img alt={item.title} className="size-12" src={item.iconUrl} />
            <div className="flex-1 space-y-0">
              <h4 className="text-small font-medium">{item.title}</h4>
              <p className="text-sm text-muted">{item.subtitle}</p>
            </div>
          </div>
          {index < items.length - 1 && <Separator className="my-4" />}
        </div>
      ))}
    </div>
  );
}
