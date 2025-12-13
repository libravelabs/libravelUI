"use client";

import { Form } from "@/components/ui/core/form";
import { TextField } from "@/components/ui/core/text-field";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/core/button";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";

export default function BasicForm() {
  return (
    <Form className="space-y-4 p-8 w-full max-w-96">
      <div className="flex flex-col gap-6">
        <TextField isRequired>
          <Label>Username</Label>
          <Input
            type="text"
            id="username"
            placeholder="beatrix_kiddo"
            startContent={<User />}
          />
        </TextField>

        <TextField isRequired>
          <div className="flex justify-between items-center">
            <Label>Password</Label>
            <a
              href="#"
              className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input
            type="password"
            id="password"
            placeholder="It's a secret.."
            startContent={<Lock />}
          />
        </TextField>
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button tone="outline" className="w-full">
        <i className="devicon-google-plain" aria-hidden="true" />
        Login with Google
      </Button>
    </Form>
  );
}
