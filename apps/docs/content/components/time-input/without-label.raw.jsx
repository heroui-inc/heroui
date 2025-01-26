import {TimeInput} from "@heroui/react";
import {Time} from "@heroui/shared-utils";

export default function App() {
  return <TimeInput defaultValue={new Time(11, 45)} label={null} />;
}
