import {Avatar} from "@heroui/react";

export function CustomStyles() {
  return (
    <div className="flex items-center gap-4">
      {/* 使用 Tailwind 自定义尺寸 */}
      <Avatar className="size-16">
        <Avatar.Image
          alt="超大头像"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue.jpg"
        />
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>

      {/* 方形头像 */}
      <Avatar className="rounded-lg">
        <Avatar.Image
          alt="方形头像"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/purple.jpg"
        />
        <Avatar.Fallback className="rounded-lg">SQ</Avatar.Fallback>
      </Avatar>

      {/* 渐变描边 */}
      <Avatar className="bg-gradient-to-tr from-pink-500 to-yellow-500 p-0.5">
        <div className="size-full rounded-full bg-background p-0.5">
          <Avatar.Image
            alt="渐变描边头像"
            className="rounded-full"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/red.jpg"
          />
          <Avatar.Fallback className="border-none">GB</Avatar.Fallback>
        </div>
      </Avatar>

      {/* 在线状态指示 */}
      <div className="relative">
        <Avatar>
          <Avatar.Image
            alt="在线用户"
            src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/orange.jpg"
          />
          <Avatar.Fallback>ON</Avatar.Fallback>
        </Avatar>
        <span className="absolute right-0 bottom-0 size-3 rounded-full bg-green-500 ring-2 ring-background" />
      </div>
    </div>
  );
}
