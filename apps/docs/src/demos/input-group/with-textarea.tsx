"use client";

import {ArrowUp, At, Globe, Paperclip} from "@gravity-ui/icons";
import {Button, InputGroup, Spinner, TextField} from "@heroui/react";
import {useState} from "react";

export function WithTextArea() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!value.trim()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setValue("");
    }, 1000);
  };

  return (
    <TextField
      fullWidth
      aria-label="Prompt input"
      className="flex w-sm flex-col sm:w-md"
      name="prompt"
    >
      <InputGroup fullWidth className="flex flex-col gap-2 py-2">
        <InputGroup.Prefix className="px-3 py-0">
          <Button
            aria-label="Add context"
            className="border border-field-border-hover hover:border-field-border focus:border-field-border"
            size="sm"
            variant="ghost"
          >
            <At />
            Add Context
          </Button>
        </InputGroup.Prefix>
        <InputGroup.TextArea
          className="w-full resize-none px-3 py-0"
          placeholder="Ask, search, or make anything..."
          rows={5}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <InputGroup.Suffix className="flex w-full items-center gap-1 px-3 py-0">
          <Button isIconOnly aria-label="Attach file" size="sm" variant="ghost">
            <Paperclip />
          </Button>
          <Button aria-label="Auto mode" size="sm" variant="ghost">
            Auto
          </Button>
          <Button aria-label="All resources" size="sm" variant="ghost">
            <Globe />
            All Resources
          </Button>
          <Button
            isIconOnly
            aria-label="Send prompt"
            className="ml-auto"
            isDisabled={!value.trim()}
            isPending={isSubmitting}
            onPress={handleSubmit}
          >
            {({isPending}) => (isPending ? <Spinner color="current" size="sm" /> : <ArrowUp />)}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
  );
}
