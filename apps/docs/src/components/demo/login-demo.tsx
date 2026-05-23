"use client";

import {Avatar, Button, Card, CloseButton, Separator} from "@heroui/react";

import {Iconify} from "@/components/iconify";
import {useDictionary} from "@/hooks/use-dictionary";
import {AppleIcon} from "@/icons/apple";
import {GoogleIcon} from "@/icons/google";

export function LoginDemo() {
  const {demos} = useDictionary();
  const t = demos.login;

  return (
    <Card className="w-full max-w-[320px] items-start justify-center p-5">
      <Card.Header className="flex w-full items-center justify-center gap-2">
        <Avatar>
          <Avatar.Fallback>
            <Iconify icon="gravity-ui:person" />
          </Avatar.Fallback>
        </Avatar>
        <Card.Title>{t.title}</Card.Title>
        <CloseButton className="absolute top-3 right-3" />
      </Card.Header>
      <Card.Content className="gap-2">
        <p className="text-center text-sm font-medium text-muted">{t.trialNote}</p>
        <Button className="w-full">{t.getStarted}</Button>
        <div className="flex w-full items-center gap-2 py-2">
          <Separator className="flex-1" />
          <p className="text-center text-xs font-medium text-muted uppercase">{t.or}</p>
          <Separator className="flex-1" />
        </div>
        <Button className="w-full" variant="tertiary">
          <GoogleIcon />
          {t.continueWithGoogle}
        </Button>
        <Button className="w-full" variant="tertiary">
          <AppleIcon />
          {t.continueWithApple}
        </Button>
      </Card.Content>
    </Card>
  );
}
