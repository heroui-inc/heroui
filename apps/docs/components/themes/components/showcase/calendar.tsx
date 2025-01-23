import {cloneElement} from "react";
import {CalendarProps, Calendar as HeroUICalendar} from "@heroui/react";
import {today, getLocalTimeZone} from "@internationalized/date";

import {ShowcaseComponent} from "../showcase-component";

type Color = CalendarProps["color"];

const SectionBase = ({color, isDisabled}: {color?: Color; isDisabled?: boolean}) => {
  return (
    <HeroUICalendar
      key={color}
      aria-label="Calendar"
      color={color}
      isDisabled={isDisabled}
      value={today(getLocalTimeZone())}
    />
  );
};

const Section = ({color}: {color: Color}) => {
  return (
    <div className="flex flex-col gap-y-4">
      {cloneElement(<SectionBase />, {color, isDisabled: false})}
      {cloneElement(<SectionBase />, {color, isDisabled: true})}
    </div>
  );
};

export const Calendar = () => {
  const colors: Color[] = ["foreground", "primary", "secondary", "success", "warning", "danger"];

  return (
    <ShowcaseComponent name="Calendar">
      {colors.map((color, idx) => (
        <Section key={idx} color={color} />
      ))}
    </ShowcaseComponent>
  );
};
