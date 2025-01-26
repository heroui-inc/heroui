import {RangeCalendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@heroui/shared-utils";

export default function App() {
  return <RangeCalendar aria-label="Date (Max Date Value)" maxValue={today(getLocalTimeZone())} />;
}
