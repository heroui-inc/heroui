import type {Meta, StoryObj} from "@storybook/react";

import React from "react";

import {Button} from "../button";
import {Description} from "../description";
import {FieldError} from "../field-error";
import {Form} from "../form";
import {Kbd} from "../kbd";
import {Label} from "../label";
import {Spinner} from "../spinner";
import {Surface} from "../surface";

import {SearchField} from "./index";

const meta: Meta<typeof SearchField> = {
  component: SearchField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/Forms/SearchField",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SearchField name="search">
      <Label>Search</Label>
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className="w-[280px]" placeholder="Search..." />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchField name="search">
        <Label>Search products</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search products..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Enter keywords to search for products</Description>
      </SearchField>
      <SearchField name="search-users">
        <Label>Search users</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search users..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Search by name, email, or username</Description>
      </SearchField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchField isRequired name="search">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>
      <SearchField isRequired name="search-query">
        <Label>Search query</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Enter search query..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Minimum 3 characters required</Description>
      </SearchField>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchField isInvalid isRequired name="search" value="ab">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>Search query must be at least 3 characters</FieldError>
      </SearchField>
      <SearchField isInvalid name="search-invalid">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." value="invalid@query" />
          <SearchField.ClearButton />
        </SearchField.Group>
        <FieldError>Invalid characters in search query</FieldError>
      </SearchField>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchField isDisabled name="search" value="Disabled search">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>This search field is disabled</Description>
      </SearchField>
      <SearchField isDisabled name="search-empty">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>This search field is disabled</Description>
      </SearchField>
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("");

    return (
      <div className="flex flex-col gap-4">
        <SearchField name="search" value={value} onChange={setValue}>
          <Label>Search</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[280px]" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
          <Description>Current value: {value || "(empty)"}</Description>
        </SearchField>
        <div className="flex gap-2">
          <Button variant="tertiary" onPress={() => setValue("")}>
            Clear
          </Button>
          <Button variant="tertiary" onPress={() => setValue("example query")}>
            Set example
          </Button>
        </div>
      </div>
    );
  },
};

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const isInvalid = value.length > 0 && value.length < 3;

    return (
      <div className="flex flex-col gap-4">
        <SearchField
          isRequired
          isInvalid={isInvalid}
          name="search"
          value={value}
          onChange={setValue}
        >
          <Label>Search</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[280px]" placeholder="Search..." />
            <SearchField.ClearButton />
          </SearchField.Group>
          {isInvalid ? (
            <FieldError>Search query must be at least 3 characters</FieldError>
          ) : (
            <Description>Enter at least 3 characters to search</Description>
          )}
        </SearchField>
      </div>
    );
  },
};

export const CustomIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchField name="search-custom">
        <Label>Search (Custom Icons)</Label>
        <SearchField.Group>
          <SearchField.SearchIcon>
            <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M12.5 4c0 .174-.071.513-.885.888S9.538 5.5 8 5.5s-2.799-.237-3.615-.612C3.57 4.513 3.5 4.174 3.5 4s.071-.513.885-.888S6.462 2.5 8 2.5s2.799.237 3.615.612c.814.375.885.714.885.888m-1.448 2.66C10.158 6.888 9.115 7 8 7s-2.158-.113-3.052-.34l1.98 2.905c.21.308.322.672.322 1.044v3.37q.088.02.25.021c.422 0 .749-.14.95-.316c.185-.162.3-.38.3-.684v-2.39c0-.373.112-.737.322-1.045zM8 1c3.314 0 6 1 6 3a3.24 3.24 0 0 1-.563 1.826l-3.125 4.584a.35.35 0 0 0-.062.2V13c0 1.5-1.25 2.5-2.75 2.5s-1.75-1-1.75-1v-3.89a.35.35 0 0 0-.061-.2L2.563 5.826A3.24 3.24 0 0 1 2 4c0-2 2.686-3 6-3m-.88 12.936q-.015-.008-.013-.01z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </SearchField.SearchIcon>
          <SearchField.Input className="w-[280px]" placeholder="Search..." />
          <SearchField.ClearButton>
            <svg height="16" viewBox="0 0 16 16" width="16" xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14M6.53 5.47a.75.75 0 0 0-1.06 1.06L6.94 8L5.47 9.47a.75.75 0 1 0 1.06 1.06L8 9.06l1.47 1.47a.75.75 0 1 0 1.06-1.06L9.06 8l1.47-1.47a.75.75 0 1 0-1.06-1.06L8 6.94z"
                fill="currentColor"
                fillRule="evenodd"
              />
            </svg>
          </SearchField.ClearButton>
        </SearchField.Group>
        <Description>Custom icon children</Description>
      </SearchField>
    </div>
  ),
};

export const OnSurface: Story = {
  render: () => (
    <Surface className="flex w-full min-w-[340px] flex-col gap-4 rounded-3xl p-6">
      <SearchField name="search">
        <Label>Search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Enter keywords to search</Description>
      </SearchField>
      <SearchField name="search-2">
        <Label>Advanced search</Label>
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input className="w-full" placeholder="Advanced search..." />
          <SearchField.ClearButton />
        </SearchField.Group>
        <Description>Use filters to refine your search</Description>
      </SearchField>
    </Surface>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const MIN_LENGTH = 3;
    const isInvalid = value.length > 0 && value.length < MIN_LENGTH;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      if (value.length < MIN_LENGTH) {
        return;
      }

      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        // eslint-disable-next-line no-console
        console.log("Search submitted:", {query: value});
        setValue("");
        setIsSubmitting(false);
      }, 1500);
    };

    return (
      <Form className="flex w-[280px] flex-col gap-4" onSubmit={handleSubmit}>
        <SearchField
          isRequired
          isInvalid={isInvalid}
          name="search"
          value={value}
          onChange={setValue}
        >
          <Label>Search products</Label>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-full" placeholder="Search products..." />
            <SearchField.ClearButton />
          </SearchField.Group>
          {isInvalid ? (
            <FieldError>Search query must be at least {MIN_LENGTH} characters</FieldError>
          ) : (
            <Description>Enter at least {MIN_LENGTH} characters to search</Description>
          )}
        </SearchField>
        <Button
          className="w-full"
          isDisabled={value.length < MIN_LENGTH}
          isPending={isSubmitting}
          type="submit"
          variant="primary"
        >
          {isSubmitting ? (
            <>
              <Spinner color="current" size="sm" />
              Searching...
            </>
          ) : (
            "Search"
          )}
        </Button>
      </Form>
    );
  },
};

export const WithKeyboardShortcut: Story = {
  render: () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [value, setValue] = React.useState("");

    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Check for CMD+K (Meta+K) or CTRL+K
        if ((e.metaKey || e.ctrlKey) && e.key === "k") {
          e.preventDefault();
          inputRef.current?.focus();
        }
        // Check for ESC key to blur the input
        if (e.key === "Escape" && document.activeElement === inputRef.current) {
          inputRef.current?.blur();
        }
      };

      // Add global event listener
      window.addEventListener("keydown", handleKeyDown);

      // Cleanup on unmount
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    return (
      <div className="flex flex-col gap-4">
        <div>
          <SearchField name="search" value={value} onChange={setValue}>
            <Label>Search</Label>
            <SearchField.Group>
              <SearchField.SearchIcon />
              <SearchField.Input ref={inputRef} className="w-[280px]" placeholder="Search..." />
              <SearchField.ClearButton />
            </SearchField.Group>
            <Description>Use keyboard shortcut to quickly focus this field</Description>
          </SearchField>
        </div>
        <div className="text-default-500 flex items-center gap-2 text-sm">
          <span>Press</span>
          <Kbd>
            <Kbd.Abbr keyValue="command" />
            <Kbd.Content>K</Kbd.Content>
          </Kbd>
          <span>to focus the search field</span>
        </div>
      </div>
    );
  },
};
