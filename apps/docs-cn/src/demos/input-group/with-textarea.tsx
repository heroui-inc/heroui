"use client";

import {ArrowUp, At, Microphone, PlugConnection, Plus} from "@gravity-ui/icons";
import {Button, InputGroup, Kbd, Spinner, TextField, Tooltip} from "@heroui/react";
import {useState} from "react";

export function WithTextArea() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setValue("");
    }, 1000);
  };

  return (
    <TextField fullWidth aria-label="提示输入" className="flex w-sm flex-col sm:w-lg" name="prompt">
      <InputGroup fullWidth className="flex flex-col gap-2 rounded-3xl py-2">
        <InputGroup.Prefix className="px-3 py-0">
          <Button aria-label="添加上下文" size="sm" variant="outline">
            <At />
            添加上下文
          </Button>
        </InputGroup.Prefix>
        <InputGroup.TextArea
          className="w-full resize-none px-3.5 py-0"
          placeholder="分配任务或提问…"
          rows={5}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <InputGroup.Suffix className="flex w-full items-center gap-1.5 px-3 py-0">
          <Tooltip delay={0}>
            <Button isIconOnly aria-label="附加文件" size="sm" variant="tertiary">
              <Plus />
            </Button>
            <Tooltip.Content>
              <p className="text-xs">添加文件等</p>
            </Tooltip.Content>
          </Tooltip>
          <Tooltip delay={0}>
            <Button isIconOnly aria-label="连接应用" size="sm" variant="tertiary">
              <PlugConnection />
            </Button>
            <Tooltip.Content>
              <p className="text-xs">连接应用</p>
            </Tooltip.Content>
          </Tooltip>
          <div className="ml-auto flex items-center gap-1.5">
            <Tooltip delay={0}>
              <Button isIconOnly aria-label="语音输入" size="sm" variant="ghost">
                <Microphone />
              </Button>
              <Tooltip.Content>
                <p className="text-xs">语音输入</p>
              </Tooltip.Content>
            </Tooltip>
            <Tooltip delay={0}>
              <Button
                isIconOnly
                aria-label="发送提示"
                isDisabled={!value.trim()}
                isPending={isSubmitting}
                onPress={handleSubmit}
              >
                {({isPending}) => (isPending ? <Spinner color="current" size="sm" /> : <ArrowUp />)}
              </Button>
              <Tooltip.Content className="flex items-center gap-1">
                <p className="text-xs">发送</p>
                <Kbd className="h-4 rounded-sm px-1">
                  <Kbd.Abbr keyValue="enter" />
                </Kbd>
              </Tooltip.Content>
            </Tooltip>
          </div>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
