import {TimeInput} from "@vezham/react";
import {Time} from "@internationalized/date";

export default function App() {
  return <TimeInput label="Meeting time" placeholderValue={new Time(9)} />;
}
