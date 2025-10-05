"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { User, Lock, Mail } from "lucide-react";

export default function BasicCardBase() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form className="space-y-4">
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
              type="email"
              label="Email"
              id="email"
              placeholder="m@example.com"
              startContent={<Mail />}
            />
            <TextField
              isRequired
              type="password"
              label="Password"
              id="password"
              placeholder="It's secret.."
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
            Login with Google
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}

export const BasicCardCode = `"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/ui/text-field";
import { User, Lock, Mail } from "lucide-react";

export default function BasicCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form className="space-y-4">
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
              type="email"
              label="Email"
              id="email"
              placeholder="m@example.com"
              startContent={<Mail />}
            />
            <TextField
              isRequired
              type="password"
              label="Password"
              id="password"
              placeholder="It's secret.."
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
            Login with Google
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
`;
