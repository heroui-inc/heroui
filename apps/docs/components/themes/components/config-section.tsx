import {Button, Tooltip} from "@heroui/react";
import {InfoCircleIcon} from "@heroui/shared-icons";
import {clsx} from "@heroui/shared-utils";

interface ConfigurationSectionProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  icon?: React.ReactNode;
  toolTip?: string;
}

export function ConfigSection({children, id, title, icon, toolTip}: ConfigurationSectionProps) {
  return (
    <div id={id}>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-lg flex gap-1.5 items-center">
        <div>{icon}</div>
        <div>{title}</div>
        {toolTip ? (
          <Tooltip className="bg-default-200" content={toolTip}>
            <Button isIconOnly aria-label={`${title}`} className="min-w-4 w-4 h-4">
              <InfoCircleIcon className="h-4 w-4 opacity-40 fill-current" />
            </Button>
          </Tooltip>
        ) : null}
      </div>
      <div className={clsx("flex flex-wrap gap-2 mt-3")}>{children}</div>
    </div>
  );
}
