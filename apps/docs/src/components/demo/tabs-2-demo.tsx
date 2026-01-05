import {Tabs} from "@heroui/react";

import {Iconify} from "@/components/iconify";

export function TabsDemo2() {
  return (
    <Tabs className="w-[256px]">
      <Tabs.ListContainer>
        <Tabs.List aria-label="Options">
          <Tabs.Tab className="gap-1.5" id="chats">
            <Iconify icon="gravity-ui:comment" />
            <span>Chats</span>
            <Tabs.Indicator />
          </Tabs.Tab>
          <Tabs.Tab className="gap-1.5" id="emails">
            <Iconify icon="gravity-ui:envelope" />
            <span>Emails</span>
            <Tabs.Indicator />
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.ListContainer>
    </Tabs>
  );
}
