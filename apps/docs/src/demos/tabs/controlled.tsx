"use client";

import {useState} from "react";
import {Tabs} from "@heroui/react";

export function Controlled() {
  const [selectedKey, setSelectedKey] = useState("photos");

  return (
    <div className="w-full max-w-md">
      <p className="text-sm text-gray-600 mb-3">
        Selected tab: <strong>{selectedKey}</strong>
      </p>
      <Tabs selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
        <Tabs.List aria-label="Controlled tabs">
          <Tabs.Tab id="photos">Photos</Tabs.Tab>
          <Tabs.Tab id="music">Music</Tabs.Tab>
          <Tabs.Tab id="videos">Videos</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="photos" className="pt-4">
          <p>Browse your photo collection.</p>
        </Tabs.Panel>
        <Tabs.Panel id="music" className="pt-4">
          <p>Listen to your favorite tracks.</p>
        </Tabs.Panel>
        <Tabs.Panel id="videos" className="pt-4">
          <p>Watch your video library.</p>
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}