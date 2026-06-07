import {ChevronDown} from "@gravity-ui/icons";
import {Accordion, cn} from "@heroui/react";

const items = [
  {
    content: "通过实时通知及时了解账户动态。",
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/bell-small.png",
    subtitle: "接收账户活动更新",
    title: "开启通知",
  },
  {
    content: "安装我们的官方浏览器扩展，获得更顺畅的浏览体验。",
    iconUrl: "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/compass-small.png",
    subtitle: "将浏览器连接到你的账户",
    title: "安装浏览器扩展",
  },
  {
    content: "创建你的第一件数字藏品，开启数字收藏之旅。",
    iconUrl:
      "https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/3dicons/mint-collective-small.png",
    subtitle: "创建你的第一件收藏品",
    title: "铸造收藏品",
  },
];

export function CustomStyles() {
  return (
    <Accordion className="bg-surface-1/10 w-full max-w-md rounded-2xl" variant="surface">
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          className={cn(
            "group/item",
            "first:[&_[data-slot=accordion-trigger]]:rounded-t-2xl", // First trigger we want to round the top
            "last:[&:not(:has([data-slot=accordion-trigger][aria-expanded='true']))_[data-slot=accordion-trigger]]:rounded-b-2xl", // Last trigger we want to round the bottom
          )}
        >
          <Accordion.Heading>
            <Accordion.Trigger className="hover:bgsurface group flex items-center gap-2 transition-none">
              {item.iconUrl ? (
                <img
                  alt={item.title}
                  className="h-11 w-11 transition-[scale,rotate] duration-300 ease-out group-hover/item:scale-120 group-hover/item:-rotate-10 group-hover/item:drop-shadow-lg"
                  src={item.iconUrl}
                />
              ) : null}
              <div className="flex flex-col gap-0">
                <span className="leading-5 font-medium">{item.title}</span>
                <span className="leading-6 font-normal text-muted/80">{item.subtitle}</span>
              </div>
              <Accordion.Indicator className="text-muted/50 [&>svg]:size-4">
                <ChevronDown />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body className="text-muted/80">{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
