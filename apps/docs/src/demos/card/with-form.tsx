import {Button, Card, Form, Input, Label, Link, TextField} from "@heroui/react";

export function WithForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    alert("Form submitted successfully!");
  };

  return (
    <Card className="w-full max-w-md">
      <Card.Header>
        <Card.Title>Login</Card.Title>
        <Card.Description>Enter your credentials to access your account</Card.Description>
      </Card.Header>
      <Form onSubmit={onSubmit}>
        <Card.Content>
          <div className="flex flex-col gap-4">
            <TextField name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="email@example.com" />
            </TextField>
            <TextField name="password" type="password">
              <Label>Password</Label>
              <Input placeholder="••••••••" />
            </TextField>
          </div>
        </Card.Content>
        <Card.Footer className="mt-4 flex flex-col gap-2">
          <Button className="w-full" type="submit">
            Sign In
          </Button>
          <Link className="text-center text-sm" href="#">
            Forgot password?
          </Link>
        </Card.Footer>
      </Form>
    </Card>
  );
}
