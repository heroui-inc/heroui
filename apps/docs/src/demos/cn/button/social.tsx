import {Button} from "@heroui/react";
import {Icon} from "@iconify/react";

export function Social() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <Button className="w-full" variant="tertiary">
        <Icon icon="devicon:google" />
        使用 Google 登录
      </Button>
      <Button className="w-full" variant="tertiary">
        <Icon icon="mdi:github" />
        使用 GitHub 登录
      </Button>
      <Button className="w-full" variant="tertiary">
        <Icon icon="ion:logo-apple" />
        使用 Apple 登录
      </Button>
    </div>
  );
}
