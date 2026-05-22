import {Accordion} from "@heroui/react";

export function Disabled() {
  return (
    <div className="flex w-full flex-col items-center gap-8">
      <div className="w-full max-w-md space-y-2">
        <h3 className="text-sm font-medium text-muted">整个手风琴禁用</h3>
        <Accordion isDisabled className="w-full max-w-md">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                禁用项 1
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>手风琴禁用时无法查看此内容。</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                禁用项 2
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>手风琴禁用时无法查看此内容。</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>

      <div className="w-full max-w-md space-y-2">
        <h3 className="text-sm font-medium text-muted">单独禁用条目</h3>
        <Accordion className="w-full max-w-md">
          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                可用项
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>此项可用，可正常展开与折叠。</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item isDisabled>
            <Accordion.Heading>
              <Accordion.Trigger>
                禁用项
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>条目禁用时无法查看此内容。</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item>
            <Accordion.Heading>
              <Accordion.Trigger>
                另一可用项
                <Accordion.Indicator />
              </Accordion.Trigger>
            </Accordion.Heading>
            <Accordion.Panel>
              <Accordion.Body>此项同样可用，可正常切换。</Accordion.Body>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}
