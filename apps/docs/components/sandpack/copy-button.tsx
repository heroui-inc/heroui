import React from "react";
import {useSandpack} from "@codesandbox/sandpack-react";
import {Tooltip, Button} from "@heroui/react";
import {useClipboard} from "@heroui/use-clipboard";

import {CheckLinearIcon, CopyLinearIcon} from "@/components/icons";

export const CopyButton = ({code: codeProp}: {code?: string}) => {
  const {copy, copied} = useClipboard();

  const {sandpack} = useSandpack();

  const copyHandler = () => {
    const code = codeProp ?? sandpack.files[sandpack.activeFile].code;

    copy(code);
  };

  const icon = copied ? (
    <CheckLinearIcon
      className="text-white dark:text-zinc-500 opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
      data-visible={copied}
      height={16}
      size={16}
      width={16}
    />
  ) : (
    <CopyLinearIcon
      className="text-white dark:text-zinc-500 opacity-0 scale-50 data-[visible=true]:opacity-100 data-[visible=true]:scale-100 transition-transform-opacity"
      data-visible={!copied}
      height={16}
      width={16}
    />
  );

  return (
    <Tooltip
      key={copied ? "copied" : "copy"}
      className="text-xs px-2"
      closeDelay={0}
      content={copied ? "Copied!" : "Copy"}
      radius="md"
    >
      <Button isIconOnly size="sm" title="Copy Code" variant="light" onPress={copyHandler}>
        {icon}
      </Button>
    </Tooltip>
  );
};
