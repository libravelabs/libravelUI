"use client";

import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { User, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BasicForm() {
  return (
    <Form className="space-y-4 p-8 w-full max-w-96">
      <div className="flex flex-col gap-6">
        <TextField
          isRequired
          type="text"
          label="Username"
          id="username"
          placeholder="beatrice_kiddo"
          startContent={<User />}
        />
        <TextField
          isRequired
          type="password"
          label="Password"
          id="password"
          placeholder="It's a secret.."
          startContent={<Lock />}
          labelExtra={
            <a
              href="#"
              className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          }
        />
      </div>
      <Button type="submit" className="w-full">
        Login
      </Button>
      <Button variant="outline" className="w-full">
        <i className="devicon-google-plain" aria-hidden="true" />
        Login with Google
      </Button>
    </Form>
  );
}
