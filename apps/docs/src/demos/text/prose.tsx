import {Text} from "@heroui/react";

export const Prose = () => {
  return (
    <Text.Prose className="flex max-w-xl flex-col gap-3">
      <h1>Prose title</h1>
      <p>
        Prose is for authored content where the markup is already semantic and HeroUI applies the
        default typography rhythm.
      </p>
      <h2>Section title</h2>
      <p>
        Inline code like <code>render</code> receives the same code treatment as the Text
        primitive.
      </p>
    </Text.Prose>
  );
};
