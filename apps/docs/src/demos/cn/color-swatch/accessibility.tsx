import {ColorSwatch} from "@heroui/react";

export function ColorSwatchAccessibility() {
  return (
    <div className="flex items-center gap-3">
      <ColorSwatch aria-label="主品牌色" color="#0485F7" colorName="海洋蓝" />
      <ColorSwatch aria-label="错误状态色" color="#EF4444" colorName="珊瑚红" />
      <ColorSwatch aria-label="警告色" color="#F59E0B" colorName="落日橙" />
    </div>
  );
}
