import type {SpinnerProps} from "@heroui/react";

import {Spinner} from "@heroui/react";

export function SpinnerBasic(props: SpinnerProps) {
  return (
    <div className="flex items-center gap-4">
      <Spinner {...props} />
    </div>
  );
}
