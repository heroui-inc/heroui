import {RangeCalendar} from "@vezham/react";
import {today, getLocalTimeZone} from "@internationalized/date";

export default function App() {
  return <RangeCalendar aria-label="Date (Min Date Value)" minValue={today(getLocalTimeZone())} />;
}
