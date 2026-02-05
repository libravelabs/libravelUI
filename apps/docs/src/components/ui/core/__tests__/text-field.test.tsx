import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { TextField } from "../text-field";
import { Input } from "../input";
import { Label, FieldError, Description } from "../field";

describe("TextField", () => {
  it("renders correctly with label and input", () => {
    render(
      <TextField name="email">
        <Label>Email</Label>
        <Input placeholder="Enter email" />
      </TextField>,
    );
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
  });

  it("shows description", () => {
    render(
      <TextField>
        <Label>Password</Label>
        <Input />
        <Description>At least 8 characters</Description>
      </TextField>,
    );
    expect(screen.getByText("At least 8 characters")).toBeInTheDocument();
  });

  it("shows error message when invalid", () => {
    render(
      <TextField isInvalid>
        <Label>Username</Label>
        <Input />
        <FieldError>Username is required</FieldError>
      </TextField>,
    );
    expect(screen.getByText("Username is required")).toBeInTheDocument();
  });

  it("updates value when typing", async () => {
    render(
      <TextField>
        <Label>Search</Label>
        <Input />
      </TextField>,
    );
    const input = screen.getByLabelText("Search");
    await userEvent.type(input, "hello world");
    expect(input).toHaveValue("hello world");
  });

  it("handles password visibility toggle", async () => {
    render(
      <TextField>
        <Label>Password</Label>
        <Input type="password" />
      </TextField>,
    );
    const input = screen.getByLabelText("Password");
    const toggle = screen.getByLabelText("Show password");

    expect(input).toHaveAttribute("type", "password");

    await userEvent.click(toggle);
    expect(input).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Hide password")).toBeInTheDocument();
  });
});
