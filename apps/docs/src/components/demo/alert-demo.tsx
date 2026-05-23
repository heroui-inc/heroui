"use client";

import {Alert, Button} from "@heroui/react";

import {useDictionary} from "@/hooks/use-dictionary";

export function AlertDemo() {
  const {demos} = useDictionary();
  const t = demos.alert;

  return (
    <Alert className="w-full items-center xl:w-[400px]">
      <Alert.Indicator />
      <Alert.Content className="text-left">
        <Alert.Title className="leading-5">{t.title}</Alert.Title>
        <Alert.Description className="text-xs">{t.description}</Alert.Description>
      </Alert.Content>
      <Button variant="tertiary">{t.action}</Button>
    </Alert>
  );
}
