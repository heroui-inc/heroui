import {Tooltip} from "@heroui/react";
import {clsx} from "@heroui/shared-utils";

import {CircleInfo} from "@/components/icons";

interface ConfigurationSectionProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  icon?: React.ReactNode;
  visualPurposeOnly?: boolean;
}

export function ConfigSection({
  children,
  id,
  title,
  icon,
  visualPurposeOnly,
}: ConfigurationSectionProps) {
  return (
    <div id={id}>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-md font-medium leading-7 flex gap-1.5 items-center">
        <div>{icon}</div>
        <div>{title}</div>
        {visualPurposeOnly && (
          <Tooltip
            classNames={{content: "text-tiny text-default-600"}}
            content="For visual purpose only"
            placement="right"
          >
            <div>
              <CircleInfo className="h-4 w-4 opacity-80 dark:opacity-60" />
            </div>
          </Tooltip>
        )}
      </div>
      <div className={clsx("flex flex-wrap gap-2 mt-3")}>{children}</div>
    </div>
  );
}
