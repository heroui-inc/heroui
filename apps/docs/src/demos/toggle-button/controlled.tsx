"use client";

import {ToggleButton} from "@heroui/react";
import {Icon} from "@iconify/react";
import {useState} from "react";

export function Controlled() {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <ToggleButton isSelected={isSelected} onChange={setIsSelected}>
        {({isSelected: selected}) => (
          <>
            <Icon icon={selected ? "gravity-ui:heart-fill" : "gravity-ui:heart"} />
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
