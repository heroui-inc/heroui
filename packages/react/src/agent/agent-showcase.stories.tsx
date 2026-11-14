import type {Task} from "./agent-panel.stories.shared";
import type {AgentComponent} from "./index";
import type {Meta} from "@storybook/react";
import type {CSSProperties} from "react";

import {Icon} from "@iconify/react";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {flushSync} from "react-dom";

import {Avatar} from "../components/avatar";
import {Button} from "../components/button";
import {Chip} from "../components/chip";
import {ColorSlider} from "../components/color-slider";
import {Label} from "../components/label";
import {ListBox} from "../components/list-box";
import {Radio} from "../components/radio";
import {RadioGroup} from "../components/radio-group";
import {Select} from "../components/select";
import {Switch} from "../components/switch";
import {Table} from "../components/table";
import {Tooltip} from "../components/tooltip";

import {AgentPanel, Stage, useAgentActivity} from "./agent-panel.stories.shared";

import {createAgent, getChangeSource, useAgentComponent} from "./index";

export default {
  parameters: {
    layout: "fullscreen",
  },
  title: "Components/Agents/Showcase",
} as Meta;

type Source = "agent" | "user";

const fold = (text: unknown) => String(text).trim().toLowerCase();

const initialsOf = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

/** Marks something the agent changed. */
const AgentDot = ({className = ""}: {className?: string}) => (
  <span
    aria-hidden
    className={`absolute size-1.5 rounded-full bg-accent ring-3 ring-accent-soft ${className}`}
    title="Changed by the agent"
  />
);

/** Puts a demo back the way it started. Kept from the agent. */
const ResetButton = ({label, onPress}: {label: string; onPress: () => void}) => (
  <div data-agent-hidden>
    <Tooltip delay={300}>
      <Button isIconOnly aria-label={label} size="sm" variant="ghost" onPress={onPress}>
        <Icon icon="gravity-ui:arrow-rotate-left" />
      </Button>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  </div>
);

/* -------------------------------------------------------------------------------------------------
 * Flight seat map: 90 seats, three passengers, one registered component.
 * -----------------------------------------------------------------------------------------------*/

type Cabin = "business" | "economy";
type Position = "window" | "middle" | "aisle";

type Seat = {
  cabin: Cabin;
  hasLegroom: boolean;
  id: string;
  isExit: boolean;
  isTaken: boolean;
  letter: string;
  position: Position;
  price: number;
  row: number;
};

/** `at` stamps the change so the agent cursor can follow it. */
type Assignment = {at: number; by: Source; seat: string};
type Assignments = Partial<Record<string, Assignment>>;

type SeatSearch = {
  cabin?: Cabin;
  extraLegroom?: boolean;
  position?: Position;
  together?: number;
};

const CABINS: Cabin[] = ["business", "economy"];
const ROWS: Record<Cabin, number[]> = {
  business: [1, 2, 3],
  economy: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21],
};
const BLOCKS: Record<Cabin, string[][]> = {
  business: [
    ["A", "C"],
    ["D", "F"],
  ],
  economy: [
    ["A", "B", "C"],
    ["D", "E", "F"],
  ],
};
const EXIT_ROW = 15;
const TAKEN_SEATS = new Set(
  "1A 1C 2F 3D 10A 10B 11C 11D 12A 12B 12E 13D 13F 14B 14C 15A 15F 16D 16E 16F 17A 17C 18B 18E 19A 19B 19C 19D 20F 21A 21E 21F".split(
    " ",
  ),
);
const PASSENGERS = ["Ada Lovelace", "Grace Hopper", "Alan Turing"];

const positionOf = (letter: string): Position => {
  if (letter === "A" || letter === "F") return "window";

  return letter === "B" || letter === "E" ? "middle" : "aisle";
};

const priceOf = (cabin: Cabin, hasLegroom: boolean, position: Position): number => {
  if (cabin === "business") return 180;
  if (hasLegroom) return 45;

  return position === "middle" ? 0 : 15;
};

const SEATS: Seat[] = CABINS.flatMap((cabin) =>
  ROWS[cabin].flatMap((row) =>
    BLOCKS[cabin].flat().map((letter) => {
      const position = positionOf(letter);
      const isExit = row === EXIT_ROW;
      const hasLegroom = cabin === "economy" && (row === 10 || isExit);
      const id = `${row}${letter}`;

      return {
        cabin,
        hasLegroom,
        id,
        isExit,
        isTaken: TAKEN_SEATS.has(id),
        letter,
        position,
        price: priceOf(cabin, hasLegroom, position),
        row,
      };
    }),
  ),
);

const SEAT_BY_ID = new Map(SEATS.map((seat) => [seat.id, seat]));

const describeSeat = (seat: Seat) =>
  [
    seat.position,
    seat.hasLegroom ? "extra legroom" : null,
    seat.isExit ? "exit row" : null,
    seat.cabin,
    seat.price > 0 ? `+$${seat.price}` : "free",
  ]
    .filter(Boolean)
    .join(", ");

const totalOf = (assignments: Assignments) =>
  PASSENGERS.reduce(
    (sum, name) => sum + (SEAT_BY_ID.get(assignments[name]?.seat ?? "")?.price ?? 0),
    0,
  );

const findPassenger = (text: string): string => {
  const needle = fold(text);
  const match = PASSENGERS.find(
    (name) => fold(name) === needle || fold(name).split(" ").includes(needle),
  );

  if (!match) {
    throw new Error(
      `No passenger "${text}" on this booking. Passengers: ${PASSENGERS.join(", ")}.`,
    );
  }

  return match;
};

const SEAT_BASE =
  "relative flex items-center justify-center text-[10px] font-medium outline-none transition-[background-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-focus motion-reduce:transition-none";

const SEAT_SIZES: Record<Cabin, string> = {
  business: "h-9 w-10 rounded-[9px]",
  economy: "h-7 w-[30px] rounded-[7px]",
};

const SEAT_TONES = {
  free: "bg-surface text-muted ring-1 ring-border ring-inset hover:bg-default hover:text-foreground",
  held: "bg-accent font-semibold text-accent-foreground",
  legroom: "bg-accent-soft text-accent-soft-foreground hover:bg-accent-soft-hover",
  proposed: "border-[1.5px] border-dashed border-accent bg-accent-soft font-semibold text-accent",
  taken: "cursor-not-allowed bg-default",
};

const FLIGHT_TASKS: Task[] = [
  {
    ask: "Which window seats with extra legroom are left?",
    label: "Legroom windows",
    query: {text: "window, extra legroom", within: "Seat map"},
  },
  {
    ask: "Give Ada the window seat with extra legroom",
    label: "Ada by the window",
    reply: (
      <>
        Ada has <b>10F</b>, a window in the first economy row with extra legroom, for <b>$45</b>.
      </>
    ),
    steps: [{action: "assign", args: ["Ada", "10F"], ref: "Seat map"}],
  },
  {
    ask: "Seat all three together, as far forward in economy as possible",
    label: "Seat us together",
    reply: (
      <>
        Row 13 is the first with three free seats side by side, so you sit together in{" "}
        <b>13A–13C</b> for <b>$30</b> in all. Say pay when you're ready.
      </>
    ),
    steps: [
      {action: "findSeats", args: [{cabin: "economy", together: 3}], ref: "Seat map"},
      {action: "assign", args: ["Ada", "13A"], ref: "Seat map"},
      {action: "assign", args: ["Grace", "13B"], ref: "Seat map"},
      {action: "assign", args: ["Alan", "13C"], ref: "Seat map"},
    ],
  },
  {
    ask: "Move Grace to 15A, the exit-row window",
    label: "Grace to 15A",
    recover: true,
    reply: (
      <>
        15A is taken, so I gave Grace <b>15B</b>, the free seat next to it in the exit row.
      </>
    ),
    steps: [
      {action: "assign", args: ["Grace", "15A"], ref: "Seat map"},
      {action: "assign", args: ["Grace", "15B"], ref: "Seat map"},
    ],
  },
  {
    ask: "Upgrade Alan to a business aisle seat",
    label: "Upgrade Alan",
    reply: (
      <>
        Alan moves up to <b>2C</b>, a business aisle seat, for <b>$180</b>.
      </>
    ),
    steps: [
      {action: "findSeats", args: [{cabin: "business", position: "aisle"}], ref: "Seat map"},
      {action: "assign", args: ["Alan", "2C"], ref: "Seat map"},
    ],
  },
  {
    ask: "Pay for the seats",
    label: "Pay",
    reply: <>Paid. The seats are booked and can no longer change.</>,
    steps: [{action: "press", ref: "Confirm and pay"}],
  },
];

export const FlightSeatMap = () => {
  const cabinRef = useRef<HTMLDivElement>(null);
  const [assignments, setAssignments] = useState<Assignments>({});
  const [active, setActive] = useState(PASSENGERS[0] ?? "");
  const [paidBy, setPaidBy] = useState<Source | null>(null);
  const {pending} = useAgentActivity();
  const isAwaitingPay = pending === "Confirm and pay";

  const total = totalOf(assignments);
  const seated = PASSENGERS.filter((name) => assignments[name]);
  const holderOf = (seatId: string) =>
    PASSENGERS.find((name) => assignments[name]?.seat === seatId);

  const assign = (passengerName: string, seatId: string) => {
    if (paidBy) throw new Error("This booking is paid. Its seats can no longer change.");

    const passenger = findPassenger(passengerName);
    const seat = SEAT_BY_ID.get(String(seatId).trim().toUpperCase());

    if (!seat) {
      throw new Error(
        `No seat "${seatId}" on this aircraft. Business is rows 1–3 (A C D F), economy rows 10–21 (A–F).`,
      );
    }

    if (seat.isTaken) {
      const free = SEATS.filter(
        (other) => other.row === seat.row && !other.isTaken && !holderOf(other.id),
      ).map((other) => other.id);

      throw new Error(
        `Seat ${seat.id} is taken. ${
          free.length > 0
            ? `Free in row ${seat.row}: ${free.join(", ")}.`
            : `Row ${seat.row} is full. Use findSeats to look elsewhere.`
        }`,
      );
    }

    const holder = holderOf(seat.id);

    if (holder && holder !== passenger) {
      throw new Error(`Seat ${seat.id} is held by ${holder}. Release it first or pick another.`);
    }

    const next = {
      ...assignments,
      [passenger]: {at: Date.now(), by: getChangeSource(), seat: seat.id},
    };

    setAssignments(next);

    return {details: describeSeat(seat), passenger, seat: seat.id, total: totalOf(next)};
  };

  const release = (passengerName: string) => {
    if (paidBy) throw new Error("This booking is paid. Its seats can no longer change.");

    const passenger = findPassenger(passengerName);
    const next = {...assignments};

    delete next[passenger];
    setAssignments(next);

    return {passenger, total: totalOf(next)};
  };

  const findSeats = (search: SeatSearch = {}) => {
    const size = Math.max(1, Math.min(3, Number(search.together) || 1));
    const isFree = (seat: Seat) => !seat.isTaken && !holderOf(seat.id);
    const groups: {cabin: Cabin; price: number; row: number; seats: string[]}[] = [];

    for (const cabin of CABINS) {
      if (search.cabin && search.cabin !== cabin) continue;

      for (const row of ROWS[cabin]) {
        for (const block of BLOCKS[cabin]) {
          for (let start = 0; start + size <= block.length; start++) {
            const seats = block
              .slice(start, start + size)
              .flatMap((letter) => SEAT_BY_ID.get(`${row}${letter}`) ?? []);

            if (seats.length < size || !seats.every(isFree)) continue;
            if (search.extraLegroom && !seats.every((seat) => seat.hasLegroom)) continue;
            if (search.position && !seats.some((seat) => seat.position === search.position)) {
              continue;
            }

            groups.push({
              cabin,
              price: seats.reduce((sum, seat) => sum + seat.price, 0),
              row,
              seats: seats.map((seat) => seat.id),
            });
          }
        }
      }
    }

    if (groups.length === 0) {
      throw new Error("No free seats match. Ask for fewer seats together or drop a filter.");
    }

    return groups.slice(0, 5);
  };

  // One entry for the agent instead of 90 buttons. The actions are the cabin's own rules.
  useAgentComponent(cabinRef, {
    actions: {assign, findSeats, release},
    component: "seat-map",
    items: () =>
      SEATS.map((seat) => ({
        disabled: seat.isTaken || Boolean(holderOf(seat.id)),
        label: `${seat.id} · ${describeSeat(seat)}`,
        value: seat.id,
      })),
    state: () => ({
      flight: "HX 204 Lisbon → San Francisco",
      free: SEATS.filter((seat) => !seat.isTaken && !holderOf(seat.id)).length,
      total,
      value: Object.fromEntries(PASSENGERS.map((name) => [name, assignments[name]?.seat ?? null])),
    }),
  });

  const pressSeat = (seat: Seat) => {
    if (paidBy) return;

    const holder = holderOf(seat.id);

    if (holder === active) {
      release(active);

      return;
    }

    if (holder) {
      setActive(holder);

      return;
    }

    assign(active, seat.id);

    const next = PASSENGERS.find((name) => name !== active && !assignments[name]);

    if (next) setActive(next);
  };

  const renderSeat = (seat: Seat) => {
    const holder = holderOf(seat.id);
    const assignment = holder === undefined ? undefined : assignments[holder];
    const isProposed = assignment?.by === "agent" && !paidBy;
    const tone = seat.isTaken
      ? "taken"
      : isProposed
        ? "proposed"
        : holder
          ? "held"
          : seat.hasLegroom
            ? "legroom"
            : "free";

    return (
      <button
        key={seat.id}
        aria-pressed={Boolean(holder)}
        disabled={seat.isTaken}
        type="button"
        aria-label={`Seat ${seat.id}, ${describeSeat(seat)}${
          seat.isTaken ? ", taken" : holder ? `, ${holder}` : ""
        }`}
        className={`${SEAT_BASE} ${SEAT_SIZES[seat.cabin]} ${SEAT_TONES[tone]}`}
        data-agent-pointer={assignment?.by === "agent" ? assignment.at : undefined}
        onClick={() => pressSeat(seat)}
      >
        {holder ? initialsOf(holder) : seat.isTaken ? null : seat.letter}
      </button>
    );
  };

  const renderRow = (cabin: Cabin, row: number) => {
    // Seen from above with the nose on the left: F is the top window, A the bottom one.
    const [port = [], starboard = []] = BLOCKS[cabin];
    const seatsOf = (letters: string[]) =>
      [...letters]
        .reverse()
        .flatMap((letter) => SEAT_BY_ID.get(`${row}${letter}`) ?? [])
        .map(renderSeat);

    return (
      <div key={row} className="relative flex flex-col items-center gap-1">
        {row === EXIT_ROW ? (
          <>
            <span className="absolute -top-5 text-[10px] font-medium text-success">Exit</span>
            <span className="absolute -bottom-5 text-[10px] font-medium text-success">Exit</span>
          </>
        ) : null}
        {seatsOf(starboard)}
        <span className="flex h-6 items-center text-[10px] text-muted tabular-nums">{row}</span>
        {seatsOf(port)}
      </div>
    );
  };

  return (
    <Stage
      isWide
      description="Ninety seats are ninety anonymous buttons to an agent. Described once, the cabin is one seat map it can search and book with the cabin's own rules. Paying still waits for you."
      eyebrow="useAgentComponent · seat-map"
      panel={<AgentPanel guarded tasks={FLIGHT_TASKS} />}
      title="Pick seats by asking"
    >
      <div className="flex flex-col gap-8">
        <div
          ref={cabinRef}
          aria-label="Seat map"
          className="flex flex-col gap-6"
          data-agent-pointer="0"
          role="group"
        >
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="flex items-center gap-2 text-lg font-semibold">
                Lisbon
                <Icon className="size-4 text-muted" icon="gravity-ui:arrow-right" />
                San Francisco
              </p>
              <p className="text-sm text-muted">HX 204 · Mon, Nov 16 · Airbus A321</p>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] bg-surface ring-1 ring-border" /> Free
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] bg-accent-soft" /> Extra legroom
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] bg-default" /> Taken
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] bg-accent" /> Yours
              </li>
              <li className="flex items-center gap-1.5">
                <span className="size-3 rounded-[3px] border-[1.5px] border-dashed border-accent bg-accent-soft" />
                Proposed by the agent
              </li>
            </ul>
          </div>

          <div className="-m-4 overflow-x-auto p-4">
            <div className="flex w-fit items-center gap-6 rounded-[220px_56px_56px_220px] bg-surface py-9 ps-28 pe-10 shadow-surface">
              <div className="relative flex gap-2">
                {ROWS.business.map((row) => renderRow("business", row))}
                <span className="absolute -bottom-7 left-0 text-[10px] text-muted">Business</span>
              </div>
              <span aria-hidden className="h-48 w-px bg-separator" />
              <div className="relative flex gap-1.5">
                {ROWS.economy.map((row) => renderRow("economy", row))}
                <span className="absolute -bottom-7 left-0 text-[10px] text-muted">Economy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
          <div className="flex flex-wrap gap-1" data-agent-hidden>
            {PASSENGERS.map((name) => {
              const seat = SEAT_BY_ID.get(assignments[name]?.seat ?? "");

              return (
                <button
                  key={name}
                  aria-pressed={active === name}
                  className="flex w-36 flex-col items-start gap-0.5 rounded-2xl px-3.5 py-2.5 text-start outline-none hover:bg-default/60 focus-visible:ring-2 focus-visible:ring-focus aria-pressed:bg-surface aria-pressed:shadow-surface"
                  type="button"
                  onClick={() => setActive(name)}
                >
                  <span className="text-xs text-muted">{name}</span>
                  <span
                    className={`text-2xl leading-8 font-semibold tabular-nums ${
                      seat ? "" : "text-muted/50"
                    }`}
                  >
                    {seat?.id ?? "—"}
                  </span>
                  <span className="w-full truncate text-xs text-muted">
                    {seat
                      ? `${seat.position}${seat.hasLegroom ? " · legroom" : ""}`
                      : active === name
                        ? "Pick a seat"
                        : "No seat yet"}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="ms-auto flex items-center gap-5">
            <p className="flex items-baseline gap-2 text-sm text-muted">
              Seats
              <span className="text-xl font-semibold text-foreground tabular-nums">${total}</span>
            </p>
            {paidBy ? (
              <p className="flex items-center gap-1.5 text-sm font-medium text-success">
                <Icon icon="gravity-ui:circle-check-fill" />
                Paid
              </p>
            ) : (
              <Button
                data-agent-confirm={`Charges $${total} to the Visa ending 4242`}
                isDisabled={seated.length === 0}
                className={`transition-shadow duration-300 ${
                  isAwaitingPay
                    ? "shadow-[0_0_0_3px_var(--background),0_0_0_5px_var(--color-warning)]"
                    : ""
                }`}
                onPress={() => setPaidBy(getChangeSource())}
              >
                Confirm and pay
              </Button>
            )}
            <ResetButton
              label="Start over"
              onPress={() => {
                setAssignments({});
                setPaidBy(null);
                setActive(PASSENGERS[0] ?? "");
              }}
            />
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Sprint board: drag and drop for people, `move` for agents.
 * -----------------------------------------------------------------------------------------------*/

type ColumnId = "Backlog" | "In progress" | "Review" | "Done";
type Priority = "low" | "medium" | "high";

type BoardCard = {
  assignee: string;
  column: ColumnId;
  id: string;
  movedBy?: Source;
  priority: Priority;
  tag: string;
  title: string;
};

const COLUMNS: {id: ColumnId; limit?: number}[] = [
  {id: "Backlog"},
  {id: "In progress", limit: 3},
  {id: "Review"},
  {id: "Done"},
];

const TEAM = ["Ada", "Grace", "Alan"];

const PRIORITY_DOTS: Record<Priority, string> = {
  high: "bg-danger",
  low: "bg-muted/50",
  medium: "bg-warning",
};

const INITIAL_CARDS: BoardCard[] = [
  {
    assignee: "Ada",
    column: "Backlog",
    id: "c1",
    priority: "medium",
    tag: "Design",
    title: "Dark mode for charts",
  },
  {
    assignee: "Alan",
    column: "Backlog",
    id: "c2",
    priority: "high",
    tag: "Backend",
    title: "Migrate billing webhooks",
  },
  {
    assignee: "Grace",
    column: "Backlog",
    id: "c3",
    priority: "low",
    tag: "Growth",
    title: "Onboarding checklist",
  },
  {
    assignee: "Ada",
    column: "Backlog",
    id: "c4",
    priority: "medium",
    tag: "A11y",
    title: "Audit color contrast",
  },
  {
    assignee: "Grace",
    column: "In progress",
    id: "c5",
    priority: "high",
    tag: "Frontend",
    title: "Seat map component",
  },
  {
    assignee: "Alan",
    column: "In progress",
    id: "c6",
    priority: "medium",
    tag: "Backend",
    title: "Rate limit the API",
  },
  {
    assignee: "Ada",
    column: "Review",
    id: "c7",
    priority: "medium",
    tag: "Docs",
    title: "Agent bridge docs",
  },
  {
    assignee: "Grace",
    column: "Done",
    id: "c8",
    priority: "low",
    tag: "Frontend",
    title: "Fix date picker locale",
  },
];

/** Runs a state update inside a view transition, so cards glide to their new place. */
const withTransition = (update: () => void): Promise<void> => {
  const canAnimate =
    typeof document.startViewTransition === "function" &&
    document.visibilityState === "visible" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canAnimate) {
    update();

    return Promise.resolve();
  }

  return document.startViewTransition(() => flushSync(update)).updateCallbackDone;
};

const findColumn = (text: string): ColumnId => {
  const match = COLUMNS.find((column) => fold(column.id) === fold(text));

  if (!match) {
    throw new Error(
      `No column "${text}". Columns: ${COLUMNS.map((column) => column.id).join(", ")}.`,
    );
  }

  return match.id;
};

const findCard = (cards: BoardCard[], text: string): BoardCard => {
  const needle = fold(text);
  const exact = cards.filter((card) => fold(card.title) === needle);
  const matches =
    exact.length > 0 ? exact : cards.filter((card) => fold(card.title).includes(needle));
  const [match] = matches;

  if (!match) {
    throw new Error(
      `No card "${text}" on the board. Cards: ${cards.map((card) => card.title).join(", ")}.`,
    );
  }

  if (matches.length > 1) {
    throw new Error(
      `"${text}" names ${matches.length} cards: ${matches
        .map((card) => card.title)
        .join(", ")}. Use the full title.`,
    );
  }

  return match;
};

/** Returns the cards with one of them placed in `column`, at `index` of that column. */
const placeCard = (
  cards: BoardCard[],
  card: BoardCard,
  column: ColumnId,
  index: number | undefined,
  by: Source,
): BoardCard[] => {
  const rest = cards.filter((other) => other.id !== card.id);
  const inColumn = rest.filter((other) => other.column === column);
  const before = index === undefined ? undefined : inColumn[Math.max(0, index)];
  const moved = {...card, column, movedBy: by};

  if (!before) return [...rest, moved];

  const at = rest.indexOf(before);

  return [...rest.slice(0, at), moved, ...rest.slice(at)];
};

const BOARD_TASKS: Task[] = [
  {
    ask: "Start the billing webhooks migration",
    label: "Start billing",
    steps: [
      {action: "move", args: ["Migrate billing webhooks", "In progress"], ref: "Sprint board"},
    ],
  },
  {
    ask: "The docs are approved: put them at the top of Done",
    label: "Docs approved",
    steps: [{action: "move", args: ["Agent bridge docs", "Done", "top"], ref: "Sprint board"}],
  },
  {
    ask: "Start dark mode and the contrast audit too",
    label: "Start two more",
    steps: [
      {action: "move", args: ["Dark mode for charts", "In progress"], ref: "Sprint board"},
      {action: "move", args: ["Audit color contrast", "In progress"], ref: "Sprint board"},
    ],
  },
  {
    ask: "Hand the seat map to Alan and send it to review",
    label: "Hand off seat map",
    steps: [
      {action: "assign", args: ["Seat map", "Alan"], ref: "Sprint board"},
      {action: "move", args: ["Seat map", "Review"], ref: "Sprint board"},
    ],
  },
  {
    ask: "Add a high-priority card for Grace: Write the launch post",
    label: "Add a card",
    steps: [
      {
        action: "add",
        args: [
          {assignee: "Grace", priority: "high", tag: "Launch", title: "Write the launch post"},
        ],
        ref: "Sprint board",
      },
    ],
  },
  {
    ask: "Archive everything that is done",
    label: "Archive done",
    steps: [{action: "archiveDone", ref: "Sprint board"}],
  },
  {
    ask: "Move the pricing page to review",
    label: "Pricing page",
    steps: [{action: "move", args: ["Pricing page", "Review"], ref: "Sprint board"}],
  },
];

export const SprintBoard = () => {
  const boardRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [over, setOver] = useState<ColumnId | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const cardsIn = (column: ColumnId) => cards.filter((card) => card.column === column);

  /** Checks the board's rules, then moves the card. Throws with what to do instead. */
  const move = (card: BoardCard, column: ColumnId, index?: number) => {
    const limit = COLUMNS.find((entry) => entry.id === column)?.limit;
    const there = cardsIn(column);

    if (limit && card.column !== column && there.length >= limit) {
      throw new Error(
        `${column} is at its limit of ${limit}. Finish or move one first: ${there
          .map((other) => other.title)
          .join(", ")}.`,
      );
    }

    const by = getChangeSource();
    const next = placeCard(cards, card, column, index, by);

    return withTransition(() => setCards(next));
  };

  useAgentComponent(boardRef, {
    actions: {
      add: (input: {
        assignee?: string;
        column?: string;
        priority?: Priority;
        tag?: string;
        title: string;
      }) => {
        if (!input || typeof input.title !== "string" || input.title.trim() === "") {
          throw new Error(
            "add takes {title, column, assignee, priority, tag}. A title is required.",
          );
        }

        const assignee = TEAM.find((name) => fold(name) === fold(input.assignee ?? TEAM[0]));

        if (!assignee) {
          throw new Error(`No teammate "${input.assignee}". The team: ${TEAM.join(", ")}.`);
        }

        const card: BoardCard = {
          assignee,
          column: "Backlog",
          id: `c${nextId.current++}`,
          priority: input.priority && input.priority in PRIORITY_DOTS ? input.priority : "medium",
          tag: input.tag ?? "Task",
          title: input.title.trim(),
        };
        const column = input.column ? findColumn(input.column) : "Backlog";
        const limit = COLUMNS.find((entry) => entry.id === column)?.limit;

        if (limit && cardsIn(column).length >= limit) {
          throw new Error(
            `${column} is at its limit of ${limit}. Add the card to Backlog instead.`,
          );
        }

        const created = {...card, column, movedBy: getChangeSource()};

        return withTransition(() => setCards([...cards, created])).then(() => ({
          assignee,
          column,
          title: card.title,
        }));
      },
      archiveDone: () => {
        const done = cardsIn("Done").map((card) => card.title);

        if (done.length === 0) throw new Error("Done is already empty.");

        return withTransition(() => setCards(cards.filter((card) => card.column !== "Done"))).then(
          () => ({archived: done}),
        );
      },
      assign: (cardTitle: string, person: string) => {
        const card = findCard(cards, cardTitle);
        const assignee = TEAM.find((name) => fold(name) === fold(person));

        if (!assignee) throw new Error(`No teammate "${person}". The team: ${TEAM.join(", ")}.`);

        setCards(cards.map((other) => (other.id === card.id ? {...other, assignee} : other)));

        return {assignee, card: card.title};
      },
      move: (cardTitle: string, columnName: string, position?: number | "top" | "bottom") => {
        const card = findCard(cards, cardTitle);
        const column = findColumn(columnName);
        const index =
          position === "top" ? 0 : typeof position === "number" ? position - 1 : undefined;

        return move(card, column, index).then(() => ({
          card: card.title,
          from: card.column,
          to: column,
        }));
      },
    },
    component: "board",
    state: () => ({
      columns: Object.fromEntries(
        COLUMNS.map((column) => [
          column.id,
          cardsIn(column.id).map((card) => `${card.title} (${card.assignee}, ${card.priority})`),
        ]),
      ),
      limits: {"In progress": 3},
      value: Object.fromEntries(COLUMNS.map((column) => [column.id, cardsIn(column.id).length])),
    }),
  });

  const drop = (column: ColumnId) => {
    const card = cards.find((other) => other.id === dragging);

    setDragging(null);
    setOver(null);

    if (!card || card.column === column) return;

    try {
      void move(card, column);
      setNotice(null);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <Stage
      isWide
      description="Drag and drop is the classic thing an agent can't do with clicks. People drag the cards; the agent calls move, assign, add and archiveDone on one board. Both go through the same rule: three cards in progress at most."
      eyebrow="useAgentComponent · board"
      panel={<AgentPanel tasks={BOARD_TASKS} />}
      title="Run the sprint from chat"
    >
      <div className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted">
            Sprint 14 · Nov 16–27 · <span className="tabular-nums">{cards.length}</span> cards
          </p>
          <div className="flex items-center gap-3">
            {notice ? (
              <p className="max-w-md text-sm text-warning-soft-foreground" role="status">
                {notice}
              </p>
            ) : null}
            <ResetButton
              label="Reset board"
              onPress={() => {
                setNotice(null);
                void withTransition(() => setCards(INITIAL_CARDS));
              }}
            />
          </div>
        </div>

        <div
          ref={boardRef}
          aria-label="Sprint board"
          className="grid grid-cols-2 items-start gap-4 xl:grid-cols-4"
          role="group"
        >
          {COLUMNS.map((column) => {
            const list = cardsIn(column.id);
            const isFull = column.limit !== undefined && list.length >= column.limit;

            return (
              <section
                key={column.id}
                aria-label={column.id}
                className={`-m-2 flex min-h-80 flex-col gap-2 rounded-3xl p-2 transition-colors duration-150 motion-reduce:transition-none ${
                  over === column.id ? "bg-accent-soft" : ""
                }`}
                onDragLeave={() => setOver((current) => (current === column.id ? null : current))}
                onDrop={() => drop(column.id)}
                onDragOver={(event) => {
                  event.preventDefault();
                  setOver(column.id);
                }}
              >
                <header className="flex items-center justify-between px-1 pb-1">
                  <h2 className="text-sm font-medium">{column.id}</h2>
                  <span
                    className={`text-xs tabular-nums ${isFull ? "text-warning-soft-foreground" : "text-muted"}`}
                  >
                    {list.length}
                    {column.limit ? ` / ${column.limit}` : null}
                  </span>
                </header>

                {list.map((card) => (
                  <article
                    key={card.id}
                    draggable
                    style={{viewTransitionName: `board-card-${card.id}`}}
                    className={`relative flex cursor-grab flex-col gap-4 rounded-2xl bg-surface p-3.5 shadow-surface active:cursor-grabbing ${
                      dragging === card.id ? "opacity-40" : ""
                    }`}
                    onDragEnd={() => setDragging(null)}
                    onDragStart={(event) => {
                      event.dataTransfer.effectAllowed = "move";
                      event.dataTransfer.setData("text/plain", card.id);
                      setDragging(card.id);
                    }}
                  >
                    {card.movedBy === "agent" ? <AgentDot className="top-3.5 right-3.5" /> : null}
                    <p className="pe-4 text-sm leading-snug font-medium">{card.title}</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted">
                        <span
                          className={`size-1.5 rounded-full ${PRIORITY_DOTS[card.priority]}`}
                          title={`${card.priority} priority`}
                        />
                        {card.tag}
                      </div>
                      <Avatar className="size-6" size="sm">
                        <Avatar.Fallback className="text-[10px]">
                          {card.assignee[0]}
                        </Avatar.Fallback>
                      </Avatar>
                    </div>
                  </article>
                ))}
              </section>
            );
          })}
        </div>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Week calendar: the component knows its own conflicts and says where there is room.
 * -----------------------------------------------------------------------------------------------*/

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"] as const;

type Day = (typeof DAYS)[number];
type Tone = "accent" | "default" | "success" | "warning";

type CalendarEvent = {
  /** When the agent last touched it, for the agent cursor. */
  at?: number;
  by?: Source;
  day: Day;
  /** Minutes from midnight. */
  end: number;
  id: string;
  /** Where a moved event was before the agent proposed the move. */
  previous?: {day: Day; end: number; start: number};
  /** Made or moved by the agent, and not kept yet. */
  proposed?: boolean;
  start: number;
  title: string;
  tone: Tone;
  with?: string;
};

type Slot = {end: number; start: number};

const DAY_DATES: Record<Day, number> = {Fri: 20, Mon: 16, Thu: 19, Tue: 17, Wed: 18};
const DAY_START = 8 * 60;
const DAY_END = 18 * 60;
const HOUR_HEIGHT = 52;
const TODAY: Day = "Wed";
/** "Now" in the demo: early Wednesday, before anything the agent proposes. */
const NOW = 9 * 60 + 40;
const HOURS = Array.from(
  {length: (DAY_END - DAY_START) / 60},
  (_, index) => DAY_START + index * 60,
);

const TONES: Record<Tone, string> = {
  accent: "bg-accent-soft text-accent-soft-foreground shadow-[inset_3px_0_0_var(--color-accent)]",
  default: "bg-default text-default-foreground shadow-[inset_3px_0_0_var(--color-muted)]",
  success:
    "bg-success-soft text-success-soft-foreground shadow-[inset_3px_0_0_var(--color-success)]",
  warning:
    "bg-warning-soft text-warning-soft-foreground shadow-[inset_3px_0_0_var(--color-warning)]",
};

const PROPOSED_TONE =
  "border-[1.5px] border-dashed border-accent bg-surface text-accent shadow-[0_4px_14px_-6px_var(--color-accent)]";

const at = (hours: number, minutes = 0) => hours * 60 + minutes;

const INITIAL_EVENTS: CalendarEvent[] = [
  ...DAYS.map((day, index) => ({
    day,
    end: at(9, 30),
    id: `e${index}`,
    start: at(9),
    title: "Standup",
    tone: "default" as const,
  })),
  {
    day: "Mon",
    end: at(11, 30),
    id: "e10",
    start: at(10),
    title: "Sprint planning",
    tone: "warning",
  },
  {
    day: "Tue",
    end: at(11, 30),
    id: "e11",
    start: at(10, 30),
    title: "Design review",
    tone: "warning",
  },
  {
    day: "Tue",
    end: at(13, 30),
    id: "e12",
    start: at(12, 30),
    title: "Lunch with Alan",
    tone: "success",
  },
  {day: "Wed", end: at(15), id: "e13", start: at(14), title: "Customer call", tone: "warning"},
  {day: "Thu", end: at(12), id: "e14", start: at(9, 30), title: "Deep work", tone: "success"},
  {day: "Fri", end: at(16, 30), id: "e15", start: at(15), title: "Demo day", tone: "warning"},
];

const clock = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

const span = (slot: Slot) => `${clock(slot.start)}–${clock(slot.end)}`;

const parseTime = (input: unknown): number => {
  const match = /^(\d{1,2})(?::(\d{2}))?$/.exec(String(input).trim());
  const minutes = match ? Number(match[1]) * 60 + Number(match[2] ?? 0) : NaN;

  if (Number.isNaN(minutes) || minutes > 24 * 60) {
    throw new Error(`Times look like "14:30". Got "${String(input)}".`);
  }

  return minutes;
};

const parseDay = (input: unknown): Day => {
  const match = DAYS.find((day) => fold(input).startsWith(fold(day)));

  if (!match) throw new Error(`No day "${String(input)}" this week. Days: ${DAYS.join(", ")}.`);

  return match;
};

const sorted = (events: CalendarEvent[]) =>
  [...events].sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start - b.start);

/** Free windows of at least `minutes` on one day. */
const freeSlots = (events: CalendarEvent[], day: Day, minutes: number, ignore?: string): Slot[] => {
  const slots: Slot[] = [];
  let cursor = DAY_START;

  for (const event of sorted(events)) {
    if (event.day !== day || event.id === ignore) continue;
    if (event.start - cursor >= minutes) slots.push({end: event.start, start: cursor});
    cursor = Math.max(cursor, event.end);
  }

  if (DAY_END - cursor >= minutes) slots.push({end: DAY_END, start: cursor});

  return slots;
};

/** Throws when the slot is outside the day or overlaps something, with where there is room. */
const checkSlot = (events: CalendarEvent[], day: Day, slot: Slot, ignore?: string) => {
  if (slot.end <= slot.start) throw new Error("The end has to be after the start.");

  if (slot.start < DAY_START || slot.end > DAY_END) {
    throw new Error(`The calendar runs ${clock(DAY_START)}–${clock(DAY_END)}. Got ${span(slot)}.`);
  }

  const clash = events.find(
    (event) =>
      event.day === day && event.id !== ignore && event.start < slot.end && slot.start < event.end,
  );

  if (clash) {
    const minutes = slot.end - slot.start;
    const free = freeSlots(events, day, minutes, ignore).map(span);

    throw new Error(
      `${day} ${span(slot)} overlaps "${clash.title}" (${span(clash)}). ${
        free.length > 0
          ? `Free on ${day} for ${minutes} min: ${free.join(", ")}.`
          : `${day} has no ${minutes} min free. Try another day.`
      }`,
    );
  }
};

const findEvent = (events: CalendarEvent[], title: string, dayName?: string): CalendarEvent => {
  const day = dayName === undefined ? undefined : parseDay(dayName);
  const matches = events.filter(
    (event) => fold(event.title).includes(fold(title)) && (!day || event.day === day),
  );
  const [match] = matches;

  if (!match) {
    const titles = [...new Set(sorted(events).map((event) => event.title))];

    throw new Error(`No event "${title}"${day ? ` on ${day}` : ""}. Events: ${titles.join(", ")}.`);
  }

  if (matches.length > 1) {
    throw new Error(
      `"${title}" names ${matches.length} events: ${sorted(matches)
        .map((event) => `${event.day} ${clock(event.start)}`)
        .join(", ")}. Pass a day.`,
    );
  }

  return match;
};

const CALENDAR_TASKS: Task[] = [
  {
    ask: "Find 30 minutes with Grace this week, and keep Wednesday morning for focus.",
    label: "30 min with Grace",
    recover: true,
    reply: (
      <>
        10:30 clashed with your design review, so I put the{" "}
        <b>1:1 with Grace on Tuesday at 14:00</b> and blocked <b>Wednesday 10:00–12:00</b> for
        focus. Both are proposals: keep them from the bar under the calendar.
      </>
    ),
    steps: [
      {
        action: "schedule",
        args: [{day: "Tue", minutes: 30, start: "10:30", title: "1:1 with Grace", with: "Grace"}],
        ref: "Team calendar",
      },
      {
        action: "schedule",
        args: [{day: "Tue", minutes: 30, start: "14:00", title: "1:1 with Grace", with: "Grace"}],
        ref: "Team calendar",
      },
      {
        action: "schedule",
        args: [{day: "Wed", end: "12:00", start: "10:00", title: "Focus"}],
        ref: "Team calendar",
      },
    ],
  },
  {
    ask: "Book a 1:1 with Grace on Tuesday at 10:00",
    label: "1:1 Tue 10:00",
    steps: [
      {
        action: "schedule",
        args: [{day: "Tue", start: "10:00", title: "1:1 with Grace", with: "Grace"}],
        ref: "Team calendar",
      },
    ],
  },
  {
    ask: "When is Tuesday free for an hour?",
    label: "Free on Tuesday?",
    reply: (
      <>
        Tuesday has an hour free <b>08:00–09:00</b>, <b>11:30–12:30</b> and from <b>13:30</b> on.
      </>
    ),
    steps: [{action: "findFreeSlots", args: [{day: "Tue", minutes: 60}], ref: "Team calendar"}],
  },
  {
    ask: "Book the 1:1 at 14:00 instead",
    label: "Book 14:00",
    steps: [
      {
        action: "schedule",
        args: [{day: "Tue", start: "14:00", title: "1:1 with Grace", with: "Grace"}],
        ref: "Team calendar",
      },
    ],
  },
  {
    ask: "Move the design review to Thursday at 15:00",
    label: "Move review",
    reply: (
      <>
        Proposed moving the <b>design review to Thursday 15:00–16:00</b>. Undo puts it back on
        Tuesday.
      </>
    ),
    steps: [
      {action: "move", args: ["Design review", {day: "Thu", start: "15:00"}], ref: "Team calendar"},
    ],
  },
  {
    ask: "Block focus time on Wednesday and Friday, 10:00 to 12:00",
    label: "Focus time",
    steps: [
      {
        action: "schedule",
        args: [{day: "Wed", end: "12:00", start: "10:00", title: "Focus time"}],
        ref: "Team calendar",
      },
      {
        action: "schedule",
        args: [{day: "Fri", end: "12:00", start: "10:00", title: "Focus time"}],
        ref: "Team calendar",
      },
    ],
  },
  {
    ask: "Cancel Friday's standup",
    label: "Cancel Fri standup",
    steps: [{action: "cancel", args: ["Standup", "Fri"], ref: "Team calendar"}],
  },
  {
    ask: "Cancel the standup",
    label: "Cancel standup",
    steps: [{action: "cancel", args: ["Standup"], ref: "Team calendar"}],
  },
];

export const WeekCalendar = () => {
  const calendarRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(100);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  const proposals = events.filter((event) => event.proposed);

  const create = (input: Omit<CalendarEvent, "by" | "id">) => {
    checkSlot(events, input.day, input);

    const by = getChangeSource();
    const event: CalendarEvent = {
      ...input,
      by,
      id: `e${nextId.current++}`,
      ...(by === "agent" ? {at: Date.now(), proposed: true} : {}),
    };

    setEvents([...events, event]);

    return event;
  };

  useAgentComponent(calendarRef, {
    actions: {
      cancel: (title: string, day?: string) => {
        const event = findEvent(events, title, day);

        setEvents(events.filter((other) => other.id !== event.id));

        return {cancelled: `${event.day} ${span(event)} ${event.title}`};
      },
      findFreeSlots: (search: {day?: string; minutes?: number} = {}) => {
        const minutes = Number(search.minutes) || 60;
        const days = search.day === undefined ? DAYS : [parseDay(search.day)];

        return days.map((day) => ({day, free: freeSlots(events, day, minutes).map(span)}));
      },
      move: (title: string, to: {day?: string; start: string}) => {
        const event = findEvent(events, title);

        if (!to || to.start === undefined) throw new Error("move takes a title and {day, start}.");

        const day = to.day === undefined ? event.day : parseDay(to.day);
        const start = parseTime(to.start);
        const slot = {end: start + (event.end - event.start), start};

        checkSlot(events, day, slot, event.id);

        const by = getChangeSource();

        setEvents(
          events.map((other) =>
            other.id === event.id
              ? {
                  ...other,
                  ...slot,
                  by,
                  day,
                  ...(by === "agent"
                    ? {
                        at: Date.now(),
                        previous: other.previous ?? {
                          day: other.day,
                          end: other.end,
                          start: other.start,
                        },
                        proposed: true,
                      }
                    : {previous: undefined, proposed: false}),
                }
              : other,
          ),
        );

        return {day, time: span(slot), title: event.title};
      },
      schedule: (input: {
        day: string;
        end?: string;
        minutes?: number;
        start: string;
        title: string;
        with?: string;
      }) => {
        if (!input || typeof input.title !== "string") {
          throw new Error("schedule takes {title, day, start, end or minutes, with}.");
        }

        const start = parseTime(input.start);
        const end =
          input.end === undefined ? start + (Number(input.minutes) || 60) : parseTime(input.end);
        const event = create({
          day: parseDay(input.day),
          end,
          start,
          title: input.title,
          tone: "accent",
          with: input.with,
        });

        return {day: event.day, time: span(event), title: event.title};
      },
    },
    component: "calendar",
    state: () => ({
      events: sorted(events).map(
        (event) =>
          `${event.day} ${span(event)} ${event.title}${event.proposed ? " (proposed, not kept)" : ""}`,
      ),
      hours: `${clock(DAY_START)}–${clock(DAY_END)}`,
      value: events.length,
      week: "Nov 16–20, 2026",
    }),
  });

  /** Takes back everything the agent proposed: new events go, moved ones return. */
  const undo = () =>
    setEvents(
      events.flatMap((event) => {
        if (!event.proposed) return [event];
        if (!event.previous) return [];

        return [{...event, ...event.previous, at: undefined, previous: undefined, proposed: false}];
      }),
    );

  const keep = () =>
    setEvents(events.map((event) => ({...event, previous: undefined, proposed: false})));

  const addFocusTime = (day: Day, start: number) => {
    try {
      create({day, end: start + 60, start, title: "Focus time", tone: "success"});
    } catch {
      // The hour is not free: nothing to add.
    }
  };

  return (
    <Stage
      isWide
      description="A calendar grid is all geometry: nothing a model can read or click with confidence. As one component it takes schedule, move, cancel and findFreeSlots, and a clash answers with the free windows. Click an empty hour to add focus time yourself."
      eyebrow="useAgentComponent · calendar"
      panel={<AgentPanel tasks={CALENDAR_TASKS} />}
      title="A week it can reason about"
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-muted">Team calendar · Nov 16–20</p>
          <ResetButton label="Reset week" onPress={() => setEvents(INITIAL_EVENTS)} />
        </div>

        <div ref={calendarRef} aria-label="Team calendar" data-agent-pointer="0" role="group">
          <div className="grid grid-cols-[3.5rem_repeat(5,minmax(0,1fr))]">
            <span />
            {DAYS.map((day) => (
              <div key={day} className="flex items-center gap-2 px-2 pb-3">
                <p
                  className={`flex size-8 items-center justify-center rounded-full text-base font-semibold tabular-nums ${
                    day === TODAY ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  {DAY_DATES[day]}
                </p>
                <p
                  className={`text-xs ${day === TODAY ? "font-medium text-accent" : "text-muted"}`}
                >
                  {day}
                  {day === TODAY ? <span className="sr-only">, today</span> : null}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-[3.5rem_repeat(5,minmax(0,1fr))] border-t border-separator">
            <div>
              {HOURS.map((hour) => (
                <p
                  key={hour}
                  className="-mt-2 pe-3 text-end text-[11px] text-muted tabular-nums first:mt-0 first:opacity-0"
                  style={{height: HOUR_HEIGHT}}
                >
                  {clock(hour)}
                </p>
              ))}
            </div>

            {DAYS.map((day) => (
              <div key={day} className="relative border-s border-separator">
                {HOURS.map((hour) => (
                  <button
                    key={hour}
                    aria-label={`Add focus time on ${day} at ${clock(hour)}`}
                    className="block w-full border-b border-separator outline-none hover:bg-default/40 focus-visible:bg-default/60"
                    style={{height: HOUR_HEIGHT}}
                    type="button"
                    onClick={() => addFocusTime(day, hour)}
                  />
                ))}

                {events
                  .filter((event) => event.day === day)
                  .map((event) => (
                    <div
                      key={event.id}
                      data-agent-pointer={event.by === "agent" ? event.at : undefined}
                      className={`group absolute inset-x-1 flex overflow-hidden ps-2.5 pe-2 text-xs transition-[top,height,background-color] duration-300 motion-reduce:transition-none ${
                        event.end - event.start < 60
                          ? "items-center gap-1.5 rounded-lg"
                          : "flex-col gap-0.5 rounded-lg py-1.5"
                      } ${event.proposed ? PROPOSED_TONE : TONES[event.tone]}`}
                      style={{
                        height: ((event.end - event.start) / 60) * HOUR_HEIGHT - 3,
                        top: ((event.start - DAY_START) / 60) * HOUR_HEIGHT + 1.5,
                      }}
                    >
                      <p className="min-w-0 truncate font-medium">{event.title}</p>
                      <p className="shrink-0 truncate tabular-nums opacity-70">{span(event)}</p>
                      {event.by === "agent" && !event.proposed ? (
                        <AgentDot className="top-2 right-2" />
                      ) : null}
                      <button
                        aria-label={`Remove ${event.title}`}
                        className="absolute top-1 right-1 flex size-5 items-center justify-center rounded-full bg-background/80 opacity-0 outline-none group-hover:opacity-100 focus-visible:opacity-100"
                        type="button"
                        onClick={() => setEvents(events.filter((other) => other.id !== event.id))}
                      >
                        <Icon className="size-3" icon="gravity-ui:xmark" />
                      </button>
                    </div>
                  ))}

                {day === TODAY ? (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 z-10 flex items-center"
                    style={{top: ((NOW - DAY_START) / 60) * HOUR_HEIGHT}}
                  >
                    <span className="-ms-1 size-2 rounded-full bg-danger" />
                    <span className="h-0.5 flex-1 bg-danger" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {/* Always takes its space, so the page does not jump when proposals arrive. */}
        <div className="flex h-12 items-center justify-center" data-agent-hidden>
          {proposals.length > 0 ? (
            <div className="flex animate-in items-center gap-1 rounded-full bg-foreground py-1.5 ps-4 pe-1.5 text-sm text-background shadow-overlay duration-300 fade-in slide-in-from-bottom-2">
              <span className="flex items-center gap-2 pe-3">
                <span className="size-2 rounded-full bg-accent" />
                <span className="tabular-nums">
                  {proposals.length} {proposals.length === 1 ? "change" : "changes"} proposed by the
                  agent
                </span>
              </span>
              <button
                className="rounded-full px-3 py-1.5 text-background/70 outline-none hover:bg-background/10 hover:text-background focus-visible:ring-2 focus-visible:ring-focus"
                type="button"
                onClick={undo}
              >
                Undo
              </button>
              <button
                className="rounded-full bg-background px-3.5 py-1.5 font-medium text-foreground outline-none hover:bg-background/90 focus-visible:ring-2 focus-visible:ring-focus"
                type="button"
                onClick={keep}
              >
                {proposals.length === 1
                  ? "Keep it"
                  : proposals.length === 2
                    ? "Keep both"
                    : "Keep all"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Theme studio: four ordinary controls drive the theme tokens of a live preview.
 * -----------------------------------------------------------------------------------------------*/

const CORNERS = [
  {id: "sharp", name: "Sharp", radius: "0.125rem"},
  {id: "soft", name: "Soft", radius: "0.5rem"},
  {id: "round", name: "Round", radius: "1rem"},
] as const;

const TYPEFACES = [
  {id: "sans", name: "Sans", stack: "Inter, ui-sans-serif, system-ui, sans-serif"},
  {id: "serif", name: "Serif", stack: '"Instrument Serif", "Iowan Old Style", Georgia, serif'},
  {id: "rounded", name: "Rounded", stack: 'ui-rounded, "SF Pro Rounded", system-ui, sans-serif'},
  {id: "mono", name: "Mono", stack: '"Geist Mono", ui-monospace, Menlo, monospace'},
] as const;

type CornerId = (typeof CORNERS)[number]["id"];
type TypefaceId = (typeof TYPEFACES)[number]["id"];

const ACTIVITY = [
  {amount: -4280, date: "Nov 14", name: "Atelier Rossi"},
  {amount: 18500, date: "Nov 12", name: "Payroll · Northwind"},
  {amount: -112.4, date: "Nov 11", name: "Harbor Wine Co."},
];

const money = (value: number) =>
  value.toLocaleString("en-US", {currency: "USD", minimumFractionDigits: 2, style: "currency"});

const THEME_TASKS: Task[] = [
  {
    ask: "Make it feel like a private bank: deep green, sharp corners, a serif",
    label: "Private bank",
    steps: [
      {action: "setValue", args: [152], ref: "Accent hue"},
      {action: "setValue", args: ["Sharp"], ref: "Corners"},
      {action: "setValue", args: ["Serif"], ref: "Typeface"},
    ],
  },
  {
    ask: "Now a playful fintech for students",
    label: "Playful fintech",
    steps: [
      {action: "setValue", args: [276], ref: "Accent hue"},
      {action: "setValue", args: ["Round"], ref: "Corners"},
      {action: "setValue", args: ["Rounded"], ref: "Typeface"},
    ],
  },
  {
    ask: "Use our brand orange, #FF5A1F",
    label: "Brand orange",
    steps: [{action: "setValue", args: [15], ref: "Accent hue"}],
  },
  {
    ask: "Switch it to dark mode",
    label: "Dark mode",
    steps: [{action: "setChecked", args: [true], ref: "Dark mode"}],
  },
  {
    ask: "Set the hue to 400",
    label: "Hue 400",
    steps: [{action: "setValue", args: [400], ref: "Accent hue"}],
  },
];

export const ThemeStudio = () => {
  const [hue, setHue] = useState(212);
  const [corners, setCorners] = useState<CornerId>("soft");
  const [typeface, setTypeface] = useState<TypefaceId>("sans");
  const [isDark, setIsDark] = useState(false);
  const [roundUp, setRoundUp] = useState(true);

  const radius = CORNERS.find((entry) => entry.id === corners)?.radius ?? "0.5rem";
  const accent = `hsl(${hue} 66% ${isDark ? 58 : 38}%)`;

  // The `light` or `dark` class re-declares the derived tokens (hover, soft, focus) on the
  // preview itself, so they follow the accent set inline instead of the page's.
  const tokens = {
    "--accent": accent,
    "--field-radius": `calc(${radius} * 1.5)`,
    "--radius": radius,
    fontFamily: TYPEFACES.find((entry) => entry.id === typeface)?.stack,
  } as CSSProperties;

  return (
    <Stage
      isWide
      description="Four ordinary HeroUI controls drive the theme tokens of a live preview. Nothing is custom: the agent sets a slider, a radio group, a select and a switch, the same way you would."
      eyebrow="snapshot · act · theme tokens"
      panel={<AgentPanel tasks={THEME_TASKS} />}
      title="Theme studio"
    >
      <div className="grid items-start gap-10 md:grid-cols-[232px_minmax(0,1fr)]">
        <div className="flex flex-col gap-7">
          <ColorSlider
            channel="hue"
            className="w-full"
            colorSpace="hsl"
            defaultValue={`hsl(${hue}, 100%, 50%)`}
            onChange={(color) => setHue(Math.round(color.getChannelValue("hue")))}
          >
            <Label>Accent hue</Label>
            <ColorSlider.Output />
            <ColorSlider.Track>
              <ColorSlider.Thumb />
            </ColorSlider.Track>
          </ColorSlider>

          <RadioGroup value={corners} onChange={(value) => setCorners(value as CornerId)}>
            <Label>Corners</Label>
            {CORNERS.map((entry) => (
              <Radio key={entry.id} value={entry.id}>
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  {entry.name}
                </Radio.Content>
              </Radio>
            ))}
          </RadioGroup>

          <Select value={typeface} onChange={(key) => setTypeface((key ?? "sans") as TypefaceId)}>
            <Label>Typeface</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                {TYPEFACES.map((entry) => (
                  <ListBox.Item key={entry.id} id={entry.id} textValue={entry.name}>
                    {entry.name}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>

          <Switch className="justify-between" isSelected={isDark} onChange={setIsDark}>
            <Switch.Content className="w-full justify-between">
              Dark mode
              <Switch.Control>
                <Switch.Thumb />
              </Switch.Control>
            </Switch.Content>
          </Switch>
        </div>

        <div
          data-agent-hidden
          className={`${isDark ? "dark" : "light"} flex flex-col gap-8 rounded-[28px] bg-background p-8 text-foreground shadow-surface transition-colors duration-300 motion-reduce:transition-none`}
          style={tokens}
        >
          <header className="flex items-center justify-between">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <span className="size-5 rounded-[calc(var(--radius)*0.75)] bg-accent" />
              Northwind Private
            </p>
            <Avatar size="sm">
              <Avatar.Fallback>EV</Avatar.Fallback>
            </Avatar>
          </header>

          <div className="flex flex-col gap-2">
            <p className="text-sm text-muted">Checking ·· 4821</p>
            <p className="text-5xl font-semibold tracking-tight tabular-nums">$248,120.40</p>
            <Chip className="w-fit" color="success" size="sm" variant="soft">
              +2.4% this month
            </Chip>
          </div>

          <div className="flex gap-2">
            <Button>Transfer</Button>
            <Button variant="outline">Add money</Button>
          </div>

          <div className="flex flex-col gap-1 rounded-[calc(var(--radius)*3)] bg-surface p-2 shadow-surface">
            {ACTIVITY.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between gap-4 px-3 py-2.5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{entry.name}</span>
                  <span className="text-xs text-muted">{entry.date}</span>
                </div>
                <span
                  className={`text-sm font-medium tabular-nums ${entry.amount > 0 ? "text-success" : ""}`}
                >
                  {entry.amount > 0 ? "+" : ""}
                  {money(entry.amount)}
                </span>
              </div>
            ))}
            <Switch className="px-3 py-2.5" isSelected={roundUp} onChange={setRoundUp}>
              <Switch.Content className="w-full justify-between">
                <span className="flex flex-col">
                  <span className="text-sm font-medium">Round-up savings</span>
                  <span className="text-xs text-muted">Spare change goes to Reserve</span>
                </span>
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch.Content>
            </Switch>
          </div>
        </div>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Feedback triage: eighteen selects in a table, told apart by their row.
 * -----------------------------------------------------------------------------------------------*/

type Field = "owner" | "priority" | "sentiment";

const FIELDS: {id: Field; items: string[]; label: string}[] = [
  {id: "sentiment", items: ["Positive", "Neutral", "Negative"], label: "Sentiment"},
  {id: "owner", items: ["Ada", "Grace", "Alan"], label: "Owner"},
  {id: "priority", items: ["Low", "Medium", "High", "Urgent"], label: "Priority"},
];

const FEEDBACK = [
  {
    customer: "Acme",
    text: "Invoices show the wrong VAT since the March update. Finance is blocked.",
  },
  {customer: "Globex", text: "The new dashboard is so much faster. The team loves it."},
  {customer: "Initech", text: "SSO sign-in loops back to the login page on Safari."},
  {customer: "Umbrella", text: "Could reports export to CSV? We paste them into sheets today."},
  {customer: "Hooli", text: "We were charged twice this month. Please refund one of them."},
  {customer: "Stark", text: "Onboarding was smooth, but the webhook docs are thin."},
];

/** What a model would decide from the feedback text. */
const TRIAGE: Record<string, Record<Field, string>> = {
  Acme: {owner: "Ada", priority: "Urgent", sentiment: "Negative"},
  Globex: {owner: "Alan", priority: "Low", sentiment: "Positive"},
  Hooli: {owner: "Ada", priority: "High", sentiment: "Negative"},
  Initech: {owner: "Grace", priority: "High", sentiment: "Negative"},
  Stark: {owner: "Grace", priority: "Medium", sentiment: "Neutral"},
  Umbrella: {owner: "Alan", priority: "Medium", sentiment: "Neutral"},
};

/** Finds the select for one field in one row, the way a model reads a snapshot. */
const cellRef = (page: AgentComponent[], customer: string, label: string) =>
  page.find(
    (component) =>
      component.component === "select" &&
      component.label === label &&
      component.row?.startsWith(customer),
  )?.ref ?? `${label} ${customer}`;

const TRIAGE_TASKS: Task[] = [
  {
    ask: "Triage this feedback: sentiment, owner and priority for every row",
    label: "Triage all six",
    steps: (page) =>
      FEEDBACK.flatMap(({customer}) =>
        FIELDS.map((field) => ({
          action: "setValue",
          args: [TRIAGE[customer]?.[field.id]],
          ref: cellRef(page, customer, field.label),
        })),
      ),
  },
  {
    ask: "Anything about billing goes to Ada, as urgent",
    label: "Billing to Ada",
    steps: (page) =>
      ["Acme", "Hooli"].flatMap((customer) => [
        {action: "setValue", args: ["Ada"], ref: cellRef(page, customer, "Owner")},
        {action: "setValue", args: ["Urgent"], ref: cellRef(page, customer, "Priority")},
      ]),
  },
  {
    ask: "Mark Globex as critical",
    label: "Globex critical",
    steps: (page) => [
      {action: "setValue", args: ["Critical"], ref: cellRef(page, "Globex", "Priority")},
    ],
  },
  {
    ask: "Save the triage",
    label: "Save",
    steps: [{action: "press", ref: "Save triage"}],
  },
];

type Triage = Record<string, Partial<Record<Field, {by: Source; value: string}>>>;

export const FeedbackTriage = () => {
  const [triage, setTriage] = useState<Triage>({});
  const [savedBy, setSavedBy] = useState<Source | null>(null);

  const set = (customer: string, field: Field, value: string) => {
    const by = getChangeSource();

    setSavedBy(null);
    setTriage((current) => ({
      ...current,
      [customer]: {...current[customer], [field]: {by, value}},
    }));
  };

  const entries = Object.values(triage).flatMap((row) => Object.values(row));
  const done = FEEDBACK.filter(({customer}) =>
    FIELDS.every((field) => triage[customer]?.[field.id]),
  ).length;
  const byAgent = entries.filter((entry) => entry?.by === "agent").length;

  return (
    <Stage
      isWide
      description="Eighteen selects that all share three labels. The agent tells them apart by the row they sit in, and picks values the way you would: by their label."
      eyebrow="snapshot · row · act"
      panel={<AgentPanel guarded tasks={TRIAGE_TASKS} />}
      title="Triage the inbox"
    >
      <div className="flex flex-col gap-5">
        <Table variant="secondary">
          <Table.ScrollContainer>
            <Table.Content aria-label="Customer feedback" className="min-w-[860px]">
              <Table.Header>
                <Table.Column isRowHeader className="w-32">
                  Customer
                </Table.Column>
                <Table.Column>Feedback</Table.Column>
                {FIELDS.map((field) => (
                  <Table.Column key={field.id} className="w-36">
                    {field.label}
                  </Table.Column>
                ))}
              </Table.Header>
              <Table.Body>
                {FEEDBACK.map(({customer, text}) => {
                  const row = triage[customer] ?? {};
                  const isByAgent = Object.values(row).some((entry) => entry?.by === "agent");

                  return (
                    <Table.Row key={customer} id={customer}>
                      <Table.Cell>
                        <span className="flex items-center gap-2 font-medium">
                          {customer}
                          {isByAgent ? (
                            <span
                              aria-hidden
                              className="size-1.5 rounded-full bg-accent"
                              title="Filled by the agent"
                            />
                          ) : null}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <p className="max-w-80 text-sm text-pretty text-muted">{text}</p>
                      </Table.Cell>
                      {FIELDS.map((field) => (
                        <Table.Cell key={field.id}>
                          <Select
                            aria-label={field.label}
                            placeholder="—"
                            value={row[field.id]?.value.toLowerCase() ?? null}
                            onChange={(key) => {
                              const item = field.items.find((name) => name.toLowerCase() === key);

                              if (item) set(customer, field.id, item);
                            }}
                          >
                            <Select.Trigger>
                              <Select.Value />
                              <Select.Indicator />
                            </Select.Trigger>
                            <Select.Popover>
                              <ListBox>
                                {field.items.map((item) => (
                                  <ListBox.Item key={item} id={item.toLowerCase()} textValue={item}>
                                    {item}
                                  </ListBox.Item>
                                ))}
                              </ListBox>
                            </Select.Popover>
                          </Select>
                        </Table.Cell>
                      ))}
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>

        <footer className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted tabular-nums">
            {done} of {FEEDBACK.length} triaged
            {byAgent > 0 ? ` · ${byAgent} fields set by the agent` : null}
          </p>
          <div className="flex items-center gap-3">
            {savedBy ? (
              <p className="flex items-center gap-1.5 text-sm font-medium text-success">
                <Icon icon="gravity-ui:circle-check-fill" />
                Sent to the support queue
              </p>
            ) : null}
            <ResetButton
              label="Clear triage"
              onPress={() => {
                setTriage({});
                setSavedBy(null);
              }}
            />
            <Button
              data-agent-confirm="Sends the triage to the support queue and notifies each owner"
              isDisabled={done === 0}
              onPress={() => setSavedBy(getChangeSource())}
            >
              Save triage
            </Button>
          </div>
        </footer>
      </div>
    </Stage>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Inline answer: the model answers with a component, and can still act on it once it is on screen.
 * -----------------------------------------------------------------------------------------------*/

type Words = (string | {b: string})[];

type ChatItem =
  | {id: number; kind: "user"; text: string}
  | {id: number; kind: "text"; words: Words}
  | {id: number; kind: "ticket"}
  | {
      call: string;
      detail?: string;
      id: number;
      kind: "call";
      status: "error" | "ok" | "running";
      tag: "act" | "tool";
    };

/** A chat item before it gets an id. */
type NewChatItem = ChatItem extends infer Item
  ? Item extends ChatItem
    ? Omit<Item, "id">
    : never
  : never;

const TYPE_SPEED = 28;

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Splits a reply into words so it can appear one word at a time. */
const tokensOf = (words: Words) =>
  words.flatMap((part) =>
    typeof part === "string"
      ? part.split(/(\s+)/).map((text) => ({bold: false, text}))
      : [{bold: true, text: part.b}],
  );

const Typed = ({words}: {words: Words}) => {
  const tokens = useMemo(() => tokensOf(words), [words]);
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? tokens.length : 0));

  useEffect(() => {
    if (shown >= tokens.length) return;

    const timer = setTimeout(() => setShown((count) => count + 1), TYPE_SPEED);

    return () => clearTimeout(timer);
  }, [shown, tokens.length]);

  return (
    <p className="text-[15px] leading-6 text-foreground/80">
      {tokens.slice(0, shown).map((token, index) =>
        token.bold ? (
          <b key={index} className="font-semibold text-foreground">
            {token.text}
          </b>
        ) : (
          <React.Fragment key={index}>{token.text}</React.Fragment>
        ),
      )}
    </p>
  );
};

const typingTime = (words: Words) =>
  prefersReducedMotion() ? 0 : tokensOf(words).length * TYPE_SPEED;

type SeatNumber = "42" | "43";

const SEAT_DETAILS: Record<SeatNumber, {caption: string; kind: string}> = {
  "42": {caption: "Window, facing forward · Coach 7, two cars from the café", kind: "window"},
  "43": {caption: "Aisle, facing forward · Coach 7, two cars from the café", kind: "aisle"},
};

/** Coach 7 from above: 22 rows of 2 + 2, the door on the left, and a path to your seat. */
const CoachMap = ({seat}: {seat: SeatNumber}) => {
  const columns = Array.from({length: 22}, (_, index) => 40 + index * 14);
  const rows = [14, 24, 47, 57];
  const mine = {x: 194, y: seat === "42" ? 14 : 24};

  return (
    <div className="relative pt-16">
      <svg aria-hidden className="h-auto w-full text-muted" fill="none" viewBox="-2 -2 386 74">
        <rect
          className="fill-default/60 stroke-separator"
          height="70"
          rx="16"
          strokeWidth="1.5"
          width="382"
        />
        <rect className="fill-background" height="14" rx="2" width="4" x="-1" y="28" />
        {columns.flatMap((x) =>
          rows.map((y) => (
            <rect
              key={`${x}-${y}`}
              className={
                x === mine.x && y === mine.y ? "fill-accent" : "fill-surface stroke-border"
              }
              height="7"
              rx="2"
              strokeWidth="0.75"
              width="10"
              x={x}
              y={y}
            />
          )),
        )}
        <path
          className="stroke-accent transition-[d] duration-500 motion-reduce:transition-none"
          d={`M 6 35.5 H ${mine.x + 5} V ${mine.y + 8}`}
          strokeDasharray="2 3"
          strokeLinecap="round"
          strokeWidth="1.5"
        />
        <circle className="fill-accent" cx="6" cy="35.5" r="2.5" />
      </svg>

      <div
        aria-hidden
        className="absolute top-0 flex -translate-x-1/2 flex-col gap-1 rounded-xl bg-surface p-1.5 shadow-overlay"
        style={{left: `${((mine.x + 7) / 386) * 100}%`}}
      >
        {(["42", "43"] as const).map((number) => (
          <span
            key={number}
            className={`flex h-5 w-8 items-center justify-center rounded-md text-[11px] font-semibold tabular-nums transition-colors duration-300 ${
              number === seat ? "bg-accent text-accent-foreground" : "bg-default text-muted"
            }`}
          >
            {number}
          </span>
        ))}
      </div>
    </div>
  );
};

const Stat = ({label, tone = "", value}: {label: string; tone?: string; value: string}) => (
  <div className="flex flex-col gap-0.5">
    <p className="text-xs text-muted">{label}</p>
    <p className={`text-base font-semibold tabular-nums ${tone}`}>{value}</p>
  </div>
);

type TicketProps = {
  inCalendar: boolean;
  isSaved: boolean;
  onAddToCalendar: () => {added: string};
  onSave: () => void;
  onSwap: (seat: string) => {seat: string; side: string};
  seat: SeatNumber;
};

/** The component the model answers with. It registers itself, so the model can keep using it. */
const TrainTicket = ({inCalendar, isSaved, onAddToCalendar, onSave, onSwap, seat}: TicketProps) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  useAgentComponent(ticketRef, {
    actions: {
      addToCalendar: onAddToCalendar,
      saveOffline: () => {
        onSave();

        return {saved: "offline, scannable without signal"};
      },
      swapSeat: onSwap,
    },
    component: "ticket",
    state: () => ({
      coach: 7,
      departs: "Fri 21 Nov 09:01, London St Pancras",
      inCalendar,
      savedOffline: isSaved,
      value: seat,
    }),
  });

  return (
    <div
      ref={ticketRef}
      aria-label="Train ticket"
      className="flex animate-in flex-col rounded-[28px] bg-surface shadow-surface duration-500 fade-in slide-in-from-bottom-3 motion-reduce:animate-none"
      role="group"
    >
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[#14532D] text-sm font-bold text-white">
              N
            </span>
            <div className="flex flex-col">
              <p className="text-sm font-semibold">Northline Rail</p>
              <p className="text-xs text-muted tabular-nums">NL 9014 · Fri 21 Nov · Plus class</p>
            </div>
          </div>
          <Chip color="success" size="sm" variant="soft">
            On time
          </Chip>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-3xl font-semibold tracking-tight">LON</p>
            <p className="text-xs text-muted">London St Pancras</p>
          </div>
          <div className="flex w-36 flex-col items-center gap-1.5">
            <div className="flex w-full items-center gap-2 text-muted">
              <span className="h-px flex-1 border-t border-dotted border-current" />
              <svg aria-hidden className="size-4" fill="none" viewBox="0 0 16 16">
                <rect
                  height="10"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  width="10"
                  x="3"
                  y="2"
                />
                <path
                  d="M3 8h10M6 15l1-3M10 15l-1-3"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="1.4"
                />
              </svg>
              <span className="h-px flex-1 border-t border-dotted border-current" />
            </div>
            <p className="text-xs text-muted">2h 16m · direct</p>
          </div>
          <div className="flex flex-col items-end gap-0.5 text-end">
            <p className="text-3xl font-semibold tracking-tight">PAR</p>
            <p className="text-xs text-muted">Paris Gare du Nord</p>
          </div>
        </div>

        <div className="flex justify-between text-sm">
          <p>
            <span className="text-muted">Departs</span>{" "}
            <span className="font-semibold tabular-nums">09:01</span>
          </p>
          <p>
            <span className="text-muted">Arrives</span>{" "}
            <span className="font-semibold tabular-nums">12:17</span>
          </p>
        </div>

        <div className="grid grid-cols-5 gap-3">
          <Stat label="Check-in" value="08:31" />
          <Stat label="Coach" value="7" />
          <Stat label="Seat" tone="text-accent" value={seat} />
          <Stat label="Platform" value="5" />
          <Stat label="Price" value="£148" />
        </div>
      </div>

      <div aria-hidden className="relative flex h-5 items-center">
        <span className="absolute -left-2.5 size-5 rounded-full bg-background" />
        <span className="mx-5 h-px flex-1 border-t-2 border-dashed border-separator" />
        <span className="absolute -right-2.5 size-5 rounded-full bg-background" />
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-3 pt-2">
          <CoachMap seat={seat} />
          <p className="text-xs text-muted">{SEAT_DETAILS[seat].caption}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isSaved ? (
            <p className="flex h-10 items-center gap-1.5 rounded-full bg-foreground px-4 text-sm font-medium text-background md:h-9">
              <Icon icon="gravity-ui:check" />
              Ticket saved offline
            </p>
          ) : (
            <Button onPress={onSave}>Save offline</Button>
          )}
          <Button variant="outline" onPress={() => onSwap(seat === "42" ? "43" : "42")}>
            Swap seat
          </Button>
          <p className="ms-auto text-xs text-muted">
            {inCalendar ? "In your calendar. " : ""}Scan it at the gate, no signal needed.
          </p>
        </div>
      </div>
    </div>
  );
};

const INLINE_ASK = "What's my seat on the Paris train Friday?";

type FollowUp = {
  ask: string;
  label: string;
  reply: Words;
  steps?: {action: string; args?: unknown[]; call: string; ref: string}[];
};

const FOLLOW_UPS: FollowUp[] = [
  {
    ask: "Can you swap me to an aisle?",
    label: "Swap to an aisle",
    reply: [
      "Done: you're in ",
      {b: "seat 43"},
      ", the aisle next to your old seat, still facing forward. Same coach, no fare difference.",
    ],
    steps: [{action: "swapSeat", args: ["43"], call: 'swapSeat("43")', ref: "Train ticket"}],
  },
  {
    ask: "Add it to my calendar",
    label: "Add to calendar",
    reply: ["Added ", {b: "Paris, 09:01–12:17"}, " to Friday, with a reminder at 07:45."],
    steps: [{action: "addToCalendar", call: "addToCalendar()", ref: "Train ticket"}],
  },
  {
    ask: "When should I leave home?",
    label: "When to leave?",
    reply: [
      "Check-in closes at ",
      {b: "08:31"},
      ", and the queue is longest just before. Aim to be at St Pancras by ",
      {b: "08:10"},
      ". No calls needed for that one.",
    ],
  },
];

export const InlineAnswer = () => {
  const agent = useMemo(() => createAgent(), []);
  const [items, setItems] = useState<ChatItem[]>([]);
  const [seat, setSeat] = useState<SeatNumber>("42");
  const [isSaved, setIsSaved] = useState(false);
  const [inCalendar, setInCalendar] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [asked, setAsked] = useState<string[]>([]);
  const nextId = useRef(0);
  const run = useRef(0);
  const endRef = useRef<HTMLDivElement>(null);

  const push = (item: NewChatItem) => {
    const id = nextId.current++;

    setItems((list) => [...list, {...item, id} as ChatItem]);

    return id;
  };

  const settle = (id: number, patch: {detail?: string; status: "error" | "ok"}) =>
    setItems((list) =>
      list.map((item) => (item.id === id ? ({...item, ...patch} as ChatItem) : item)),
    );

  /** Waits, unless the person started over in the meantime. */
  const pause = async (token: number, ms: number) => {
    await wait(ms);

    return token === run.current;
  };

  const say = async (token: number, words: Words) => {
    push({kind: "text", words});

    return pause(token, typingTime(words) + 250);
  };

  const act = async (token: number, step: NonNullable<FollowUp["steps"]>[number]) => {
    const id = push({call: step.call, kind: "call", status: "running", tag: "act"});

    if (!(await pause(token, 450))) return false;

    const result = await agent.act({
      steps: [{action: step.action, args: step.args, ref: step.ref}],
    });

    if (!result.ok) {
      settle(id, {detail: result.error?.message, status: "error"});
      setIsBusy(false);

      return false;
    }

    settle(id, {detail: summarizeResult(result.steps[0]?.result), status: "ok"});

    return pause(token, 300);
  };

  const start = async () => {
    const token = ++run.current;

    setItems([]);
    setSeat("42");
    setIsSaved(false);
    setInCalendar(false);
    setAsked([]);
    setIsBusy(true);

    if (!(await pause(token, 400))) return;
    push({kind: "user", text: INLINE_ASK});
    if (!(await pause(token, 500))) return;

    const lookup = push({
      call: 'getBooking({to: "Paris", date: "Fri 21 Nov"})',
      kind: "call",
      status: "running",
      tag: "tool",
    });

    if (!(await pause(token, 700))) return;
    settle(lookup, {detail: "NL 9014 · coach 7 · seat 42", status: "ok"});

    if (
      !(await say(token, [
        "You're booked on the ",
        {b: "09:01 to Paris Gare du Nord"},
        ", and your seat is ",
        {b: "42 in coach 7"},
        ". Check-in at St Pancras closes at ",
        {b: "08:31"},
        ".",
      ]))
    ) {
      return;
    }

    push({kind: "ticket"});
    if (!(await pause(token, 900))) return;

    // The ticket is on screen now, so the model can use it like any other component.
    if (!(await act(token, {action: "saveOffline", call: "saveOffline()", ref: "Train ticket"}))) {
      return;
    }

    await say(token, [
      "Seat ",
      {b: "42"},
      " is a forward-facing window with a table, and the café is in coach 9. I saved the ticket for offline use, so arrive by ",
      {b: "08:10"},
      " and scan it at the gate.",
    ]);

    if (token === run.current) setIsBusy(false);
  };

  const followUp = async (entry: FollowUp) => {
    const token = run.current;

    setIsBusy(true);
    setAsked((list) => [...list, entry.label]);
    push({kind: "user", text: entry.ask});

    if (!(await pause(token, 500))) return;

    for (const step of entry.steps ?? []) {
      if (!(await act(token, step))) return;
    }

    await say(token, entry.reply);

    if (token === run.current) setIsBusy(false);
  };

  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;

    started.current = true;
    void start();
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "end",
    });
  }, [items]);

  const swapSeat = (to: string) => {
    const next = String(to).trim();

    if (next !== "42" && next !== "43") {
      throw new Error(`Seat ${next} isn't free in coach 7. Free next to you: 43 (aisle).`);
    }

    setSeat(next);

    return {seat: next, side: SEAT_DETAILS[next].kind};
  };

  const addToCalendar = () => {
    setInCalendar(true);

    return {added: "Fri 21 Nov 09:01–12:17, reminder 07:45"};
  };

  const remaining = FOLLOW_UPS.filter((entry) => !asked.includes(entry.label));

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto flex w-full max-w-[680px] flex-col gap-6 px-4 pt-14 pb-8">
          <header className="flex items-start justify-between gap-4 pb-4">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs text-muted">useAgentComponent · generative UI</p>
              <h1 className="text-3xl font-semibold tracking-tight">Answers that are components</h1>
              <p className="max-w-lg text-[15px] leading-relaxed text-pretty text-muted">
                The model answers with a ticket instead of a paragraph. The ticket describes itself
                to the bridge, so the same model can save it and change the seat.
              </p>
            </div>
            <ResetButton label="Start over" onPress={() => void start()} />
          </header>

          {items.map((item) => {
            if (item.kind === "user") {
              return (
                <p
                  key={item.id}
                  className="ms-auto max-w-[80%] animate-in rounded-[20px] rounded-br-md bg-surface px-4 py-2.5 text-[15px] shadow-surface duration-300 fade-in slide-in-from-bottom-1"
                >
                  {item.text}
                </p>
              );
            }

            if (item.kind === "call") {
              return (
                <p
                  key={item.id}
                  className="-my-2 flex animate-in items-center gap-2 text-xs duration-300 fade-in"
                >
                  <span
                    className={`rounded-md px-1.5 font-mono text-[10px] leading-[18px] ${
                      item.status === "error"
                        ? "bg-danger-soft text-danger-soft-foreground"
                        : item.tag === "act"
                          ? "bg-accent-soft text-accent-soft-foreground"
                          : "bg-default text-muted"
                    }`}
                  >
                    {item.tag}
                  </span>
                  <span className="font-mono">{item.call}</span>
                  <span className={item.status === "error" ? "text-danger" : "text-muted"}>
                    {item.status === "running" ? "…" : item.detail}
                  </span>
                </p>
              );
            }

            if (item.kind === "ticket") {
              return (
                <TrainTicket
                  key={item.id}
                  inCalendar={inCalendar}
                  isSaved={isSaved}
                  seat={seat}
                  onAddToCalendar={addToCalendar}
                  onSave={() => setIsSaved(true)}
                  onSwap={swapSeat}
                />
              );
            }

            return <Typed key={item.id} words={item.words} />;
          })}
          <div ref={endRef} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[680px] flex-col gap-3 px-4 pb-6" data-agent-hidden>
        <div className="flex min-h-8 flex-wrap gap-1.5">
          {remaining.map((entry) => (
            <Button
              key={entry.label}
              isDisabled={isBusy}
              size="sm"
              variant="outline"
              onPress={() => void followUp(entry)}
            >
              {entry.label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-[22px] bg-surface p-2 ps-4 text-sm text-muted shadow-surface">
          <span className="flex-1">Pick a follow-up. This demo has no model.</span>
          <Button isDisabled isIconOnly aria-label="Send" size="sm">
            <Icon icon="gravity-ui:arrow-up" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const summarizeResult = (value: unknown) =>
  value && typeof value === "object"
    ? Object.values(value as Record<string, unknown>).join(" · ")
    : value === undefined
      ? "done"
      : String(value);
