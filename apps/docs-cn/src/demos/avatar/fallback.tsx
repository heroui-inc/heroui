import {Person} from "@gravity-ui/icons";
import {Avatar} from "@heroui/react";

export function Fallback() {
  return (
    <div className="flex items-center gap-4">
      {/* 文字回退 */}
      <Avatar>
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

      {/* 图标回退 */}
      <Avatar>
        <Avatar.Fallback>
          <Person />
        </Avatar.Fallback>
      </Avatar>

      {/* 延迟显示回退 */}
      <Avatar>
        <Avatar.Image alt="延迟加载头像" src="https://invalid-url-to-show-fallback.com/image.jpg" />
        <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
      </Avatar>

      {/* 自定义样式回退 */}
      <Avatar>
        <Avatar.Fallback className="border-none bg-gradient-to-br from-pink-500 to-purple-500 text-white">
          GB
        </Avatar.Fallback>
      </Avatar>
    </div>
  );
}
