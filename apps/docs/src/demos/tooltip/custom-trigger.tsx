import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  Chip,
  TooltipArrow,
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from "@heroui/react";
import {Icon} from "@iconify/react";

export function TooltipCustomTrigger() {
  return (
    <div className="flex items-center gap-6">
      <TooltipRoot delay={0}>
        <TooltipTrigger aria-label="User avatar">
          <AvatarRoot>
            <AvatarImage
              alt="John Doe"
              src="https://img.heroui.chat/image/avatar?w=400&h=400&u=1"
            />
            <AvatarFallback>JD</AvatarFallback>
          </AvatarRoot>
        </TooltipTrigger>
        <TooltipContent showArrow>
          <TooltipArrow />
          <div className="flex flex-col gap-0 py-1">
            <p className="font-semibold">Jane Doe</p>
            <p className="text-muted text-xs">jane@example.com</p>
          </div>
        </TooltipContent>
      </TooltipRoot>

      <TooltipRoot delay={0}>
        <TooltipTrigger aria-label="Status chip">
          <Chip type="success">
            <Icon icon="gravity-ui:circle-check-fill" width={12} />
            Active
          </Chip>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="bg-success absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-success relative inline-flex size-2 rounded-full" />
          </span>
          <p>Jane is currently online</p>
        </TooltipContent>
      </TooltipRoot>

      <TooltipRoot delay={0}>
        <TooltipTrigger aria-label="Info icon">
          <div className="bg-accent-soft rounded-full p-2">
            <Icon className="text-accent" icon="gravity-ui:circle-question" />
          </div>
        </TooltipTrigger>
        <TooltipContent showArrow>
          <TooltipArrow />
          <div className="max-w-xs px-1 py-1.5">
            <p className="mb-1 font-semibold">Help Information</p>
            <p className="text-muted text-sm">
              This is a helpful tooltip with more detailed information about this feature.
            </p>
          </div>
        </TooltipContent>
      </TooltipRoot>
    </div>
  );
}
