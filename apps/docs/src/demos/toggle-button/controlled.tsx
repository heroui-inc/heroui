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
            {selected ? "Liked" : "Like"}
          </>
        )}
      </ToggleButton>
      <p className="text-sm text-muted">
        Status: <span className="font-medium">{isSelected ? "Selected" : "Not selected"}</span>
      </p>
    </div>
  );
}
