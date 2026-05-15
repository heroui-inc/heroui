"use client";

import {
  Autocomplete,
  Button,
  EmptyState,
  FieldError,
  Form,
  Label,
  ListBox,
  SearchField,
  useFilter,
} from "@heroui/react";

export function Required() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert("表单提交成功！");
  };

  const {contains} = useFilter({sensitivity: "base"});

  const states = [
    {id: "florida", name: "Florida"},
    {id: "delaware", name: "Delaware"},
    {id: "california", name: "California"},
    {id: "texas", name: "Texas"},
    {id: "new-york", name: "New York"},
    {id: "washington", name: "Washington"},
  ];

  const countries = [
    {id: "usa", name: "United States"},
    {id: "canada", name: "Canada"},
    {id: "mexico", name: "Mexico"},
    {id: "uk", name: "United Kingdom"},
    {id: "france", name: "France"},
    {id: "germany", name: "Germany"},
  ];

  return (
    <Form className="flex w-[256px] flex-col gap-4" onSubmit={onSubmit}>
      <Autocomplete
        isRequired
        className="w-full"
        name="state"
        placeholder="请选择一项"
        selectionMode="single"
      >
        <Label>州</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="搜索州名…" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
              {states.map((state) => (
                <ListBox.Item key={state.id} id={state.id} textValue={state.name}>
                  {state.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
        <FieldError />
      </Autocomplete>
      <Autocomplete
        isRequired
        className="w-full"
        name="country"
        placeholder="选择一个国家"
        selectionMode="single"
      >
        <Label>国家</Label>
        <Autocomplete.Trigger>
          <Autocomplete.Value />
          <Autocomplete.ClearButton />
          <Autocomplete.Indicator />
        </Autocomplete.Trigger>
        <Autocomplete.Popover>
          <Autocomplete.Filter filter={contains}>
            <SearchField autoFocus name="search" variant="secondary">
              <SearchField.Group>
                <SearchField.SearchIcon />
                <SearchField.Input placeholder="搜索国家…" />
                <SearchField.ClearButton />
              </SearchField.Group>
            </SearchField>
            <ListBox renderEmptyState={() => <EmptyState>未找到结果</EmptyState>}>
              {countries.map((country) => (
                <ListBox.Item key={country.id} id={country.id} textValue={country.name}>
                  {country.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Autocomplete.Filter>
        </Autocomplete.Popover>
        <FieldError />
      </Autocomplete>
      <Button type="submit">提交</Button>
    </Form>
  );
}
