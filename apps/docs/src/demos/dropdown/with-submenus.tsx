"use client";

import {Button, Dropdown, Label} from "@heroui/react";

export function WithSubmenus() {
  return (
    <Dropdown>
      <Button aria-label="Menu" variant="secondary">
        Share
      </Button>
      <Dropdown.Content>
        <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
          <Dropdown.Item id="copy-link" textValue="Copy Link">
            <Label>Copy Link</Label>
          </Dropdown.Item>
          <Dropdown.Item id="facebook" textValue="Facebook">
            <Label>Facebook</Label>
          </Dropdown.Item>
          <Dropdown.Item id="twitter" textValue="Twitter">
            <Label>X / Twitter</Label>
          </Dropdown.Item>
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="share" textValue="Share">
              <Label>Other</Label>
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Content>
              <Dropdown.Menu>
                <Dropdown.Item id="whatsapp" textValue="WhatsApp">
                  <Label>WhatsApp</Label>
                </Dropdown.Item>
                <Dropdown.Item id="telegram" textValue="Telegram">
                  <Label>Telegram</Label>
                </Dropdown.Item>
                <Dropdown.Item id="discord" textValue="Discord">
                  <Label>Discord</Label>
                </Dropdown.Item>
                <Dropdown.SubmenuTrigger>
                  <Dropdown.Item id="email" textValue="Email">
                    <Label>Email</Label>
                    <Dropdown.SubmenuIndicator />
                  </Dropdown.Item>
                  <Dropdown.Content>
                    <Dropdown.Menu>
                      <Dropdown.Item id="work" textValue="Work email">
                        <Label>Work email</Label>
                      </Dropdown.Item>
                      <Dropdown.Item id="personal" textValue="Personal email">
                        <Label>Personal email</Label>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Content>
                </Dropdown.SubmenuTrigger>
              </Dropdown.Menu>
            </Dropdown.Content>
          </Dropdown.SubmenuTrigger>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  );
}
