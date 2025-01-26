import {TimeInput} from "@heroui/react";
import {parseZonedDateTime} from "@heroui/shared-utils";

export default function App() {
  return (
    <TimeInput
      hideTimeZone
      defaultValue={parseZonedDateTime("2022-11-07T10:45[America/Los_Angeles]")}
      label="Meeting time"
    />
  );
}
