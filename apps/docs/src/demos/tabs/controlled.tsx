"use client";

import {Tabs} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [selectedKey, setSelectedKey] = useState("photos");

  return (
    <div className="w-full max-w-md">
      <p className="mb-3 text-sm text-gray-600">
        Selected tab: <strong>{selectedKey}</strong>
      </p>
      <Tabs selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as string)}>
        <Tabs.List aria-label="Controlled tabs">
          <Tabs.Tab id="photos">Photos</Tabs.Tab>
          <Tabs.Tab id="music">Music</Tabs.Tab>
          <Tabs.Tab id="videos">Videos</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel className="pt-4" id="photos">
          <p>Browse your photo collection.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="music">
          <p>Listen to your favorite tracks.</p>
        </Tabs.Panel>
        <Tabs.Panel className="pt-4" id="videos">
          <p>Watch your video library.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
