import {
  ArrowsRotateLeft,
  Box,
  ChevronDown,
  CreditCard,
  PlanetEarth,
  Receipt,
  ShoppingBag,
} from "@gravity-ui/icons";
import {Accordion} from "@heroui/react";

const items = [
  {
    content: "浏览我们的商品，将商品加入购物车并前往结账。完成购买需要提供收货与支付信息。",
    icon: <ShoppingBag />,
    title: "如何下单？",
  },
  {
    content: "可以，在订单发货前你可以修改或取消。订单一旦进入处理流程，将无法再更改。",
    icon: <Receipt />,
    title: "可以修改或取消订单吗？",
  },
  {
    content: "我们接受主流信用卡，包括 Visa、Mastercard 和 American Express。",
    icon: <CreditCard />,
    title: "支持哪些支付方式？",
  },
  {
    content: "运费因收货地址与订单体积而异。订单满 50 美元可享受免运费。",
    icon: <Box />,
    title: "运费如何计算？",
  },
  {
    content: "是的，我们可向多数国家/地区发货。请查看运费说明与政策了解更多信息。",
    icon: <PlanetEarth />,
    title: "是否提供国际配送？",
  },
  {
    content: "若对购买不满意，可在购买后 30 天内申请退款。请联系客服团队协助处理。",
    icon: <ArrowsRotateLeft />,
    title: "如何申请退款？",
  },
];

export function Basic() {
  return (
    <Accordion className="w-full max-w-md">
      {items.map((item, index) => (
        <Accordion.Item key={index}>
          <Accordion.Heading>
            <Accordion.Trigger>
              {item.icon ? (
                <span className="mr-3 size-4 shrink-0 text-muted">{item.icon}</span>
              ) : null}
              {item.title}
              <Accordion.Indicator>
                <ChevronDown />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Heading>
          <Accordion.Panel>
            <Accordion.Body>{item.content}</Accordion.Body>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
