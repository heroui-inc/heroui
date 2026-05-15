import {ChevronDown} from "@gravity-ui/icons";
import {Accordion} from "@heroui/react";

export function FAQ() {
  const categories = [
    {
      items: [
        {
          content: "浏览我们的商品，将商品加入购物车并前往结账。完成购买需要提供收货与支付信息。",
          title: "如何下单？",
        },
        {
          content: "可以，在订单发货前你可以修改或取消。订单一旦进入处理流程，将无法再更改。",
          title: "可以修改或取消订单吗？",
        },
      ],
      title: "常规",
    },
    {
      items: [
        {
          content: "你可以直接在官网购买许可证，选择适合的许可证类型后前往结账即可。",
          title: "如何购买许可证？",
        },
        {
          content: "标准版适用于个人或小项目；专业版包含商业使用授权与优先支持。",
          title: "标准版与专业版有什么区别？",
        },
      ],
      title: "许可",
    },
    {
      items: [
        {
          content: "可通过网站上的联系表单联系支持团队，或直接发送邮件至 support@example.com。",
          title: "如何获取支持？",
        },
      ],
      title: "支持",
    },
  ];

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">常见问题</h2>
        <p className="mb-4 text-lg font-medium text-muted">
          关于许可与使用，你需要了解的内容都在这里。
        </p>
      </div>
      {categories.map((category) => (
        <div key={category.title}>
          <p className="text-md mb-2 font-medium text-muted">{category.title}</p>
          <Accordion className="w-full" variant="surface">
            {category.items.map((item, index) => (
              <Accordion.Item key={index}>
                <Accordion.Heading>
                  <Accordion.Trigger>
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
        </div>
      ))}
    </div>
  );
}
