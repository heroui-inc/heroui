"use client";

import {Heart, HeartFill} from "@gravity-ui/icons";
import {ToggleButton} from "@heroui/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
        {({isSelected: selected}) => (
          <>
            {selected ? <HeartFill /> : <Heart />}
            {selected ? "已点赞" : "点赞"}
          </>
        )}
      </ToggleButton>
      <p className="text-sm text-muted">
        状态：<span className="font-medium">{isSelected ? "已选" : "未选"}</span>
      </p>
    </div>
  );
}
