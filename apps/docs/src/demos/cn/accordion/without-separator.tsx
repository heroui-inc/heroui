import {ChevronDown, CreditCard, Receipt, ShoppingBag} from "@gravity-ui/icons";
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
];

export function WithoutSeparator() {
  return (
    <Accordion hideSeparator className="w-full max-w-md">
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
