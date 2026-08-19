import {ListBox, Surface} from "@heroui/react";

type ScrollbarMode = {
  id: string;
  label: string;
  scrollbar?: "thin" | "default" | "none";
};

const modes: ScrollbarMode[] = [
  {
    id: "heroui",
    label: "HeroUI 纤细",
    scrollbar: "thin",
  },
  {
    id: "browser",
    label: "浏览器默认",
    scrollbar: "default",
  },
  {
    id: "hidden",
    label: "隐藏",
    scrollbar: "none",
  },
];

const animals = [
  {id: "aardvark", name: "土豚"},
  {id: "alpaca", name: "羊驼"},
  {id: "antelope", name: "羚羊"},
  {id: "bear", name: "熊"},
  {id: "cat", name: "猫"},
  {id: "dog", name: "狗"},
  {id: "fox", name: "狐狸"},
  {id: "giraffe", name: "长颈鹿"},
  {id: "kangaroo", name: "袋鼠"},
  {id: "koala", name: "考拉"},
  {id: "lemur", name: "狐猴"},
  {id: "otter", name: "水獭"},
  {id: "panda", name: "熊猫"},
  {id: "penguin", name: "企鹅"},
  {id: "rabbit", name: "兔子"},
  {id: "snake", name: "蛇"},
  {id: "turtle", name: "海龟"},
  {id: "wombat", name: "袋熊"},
  {id: "zebra", name: "斑马"},
];

function ScrollbarListBox({mode}: {mode: ScrollbarMode}) {
  return (
    <div className="flex w-[260px] flex-col gap-2">
      <h3 className="px-1 text-sm font-semibold text-muted">{mode.label}</h3>
      <Surface
        className="overflow-hidden rounded-3xl shadow-surface"
        data-scrollbar={mode.scrollbar}
      >
        <div className="h-52 scrollbar overflow-y-auto p-1">
          <ListBox aria-label={`${mode.label}动物列表`} selectionMode="single">
            {animals.map((animal) => (
              <ListBox.Item
                key={`${mode.id}-${animal.id}`}
                className="text-sm leading-5 font-medium"
                id={`${mode.id}-${animal.id}`}
                textValue={animal.name}
              >
                {animal.name}
              </ListBox.Item>
            ))}
          </ListBox>
        </div>
      </Surface>
    </div>
  );
}

export function ScrollbarModes() {
  return (
    <div className="flex w-full flex-wrap justify-center gap-4">
      {modes.map((mode) => (
        <ScrollbarListBox key={mode.id} mode={mode} />
      ))}
    </div>
  );
}
