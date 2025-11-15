"use client";

import {Button, Dropdown, Label} from "@heroui/react";
import {Icon} from "@iconify/react";

export function WithCustomSubmenuIndicator() {
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
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="share" textValue="Share">
              <Label>More options</Label>
              <Dropdown.SubmenuIndicator>
                <Icon className="text-muted size-3.5" icon="gravity-ui:arrow-right" />
              </Dropdown.SubmenuIndicator>
            </Dropdown.Item>
            <Dropdown.Content>
              <Dropdown.Menu>
                <Dropdown.Item id="whatsapp" textValue="WhatsApp">
                  <Label>WhatsApp</Label>
                </Dropdown.Item>
                <Dropdown.Item id="telegram" textValue="Telegram">
                  <Label>Telegram</Label>
                </Dropdown.Item>
                <Dropdown.SubmenuTrigger>
                  <Dropdown.Item id="email" textValue="Email">
                    <Label>Email</Label>
                    <Dropdown.SubmenuIndicator>
                      <svg
                        className="text-muted size-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </Dropdown.SubmenuIndicator>
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
                <Dropdown.Item id="discord" textValue="Discord">
                  <Label>Discord</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Content>
          </Dropdown.SubmenuTrigger>
          <Dropdown.SubmenuTrigger>
            <Dropdown.Item id="other" textValue="Other">
              <Label>Other (default indicator)</Label>
              <Dropdown.SubmenuIndicator />
            </Dropdown.Item>
            <Dropdown.Content>
              <Dropdown.Menu>
                <Dropdown.Item id="sms" textValue="SMS">
                  <Label>SMS</Label>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Content>
          </Dropdown.SubmenuTrigger>
        </Dropdown.Menu>
      </Dropdown.Content>
    </Dropdown>
  );
}
