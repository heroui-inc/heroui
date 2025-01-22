import {clsx} from "@heroui/shared-utils";

interface ConfigurationSectionProps {
  children: React.ReactNode;
  id?: string;
  title: string;
  icon?: React.ReactNode;
}

export function ConfigSection({children, id, title, icon}: ConfigurationSectionProps) {
  return (
    <div id={id}>
      <div className="text-[#71717A] dark:text-[#A1A1AA] text-sm flex gap-1 items-center">
        {icon}
        {title}
      </div>
      <div className={clsx("flex flex-wrap gap-1 mt-2")}>{children}</div>
    </div>
  );
}
