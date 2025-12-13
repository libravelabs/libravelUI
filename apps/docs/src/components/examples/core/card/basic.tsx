"use client";

import { Button } from "@/components/ui/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Form } from "@/components/ui/core/form";
import { TextField } from "@/components/ui/core/text-field";
import { User, Lock } from "lucide-react";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";

export default function BasicCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-8">
        <Form className="space-y-4">
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
            Login with Google
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
