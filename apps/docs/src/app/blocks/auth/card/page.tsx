"use client";

import Link from "next/link";
import { AuthLayout } from "./auth-layout";
import { Form } from "@/components/ui/core/form";
import { TextField } from "@/components/ui/core/text-field";
import { AtSign, Lock } from "lucide-react";
import { Button } from "@/components/ui/core/button";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";

export default function AuthCardPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      description="Enter your email and password to access your account"
      footer={
        <>
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </>
      }
    >
      <Form className="grid gap-6 w-full">
        <div className="flex flex-col gap-6">
          <TextField isRequired>
            <Label>Username</Label>
            <Input
              type="text"
              id="username"
              placeholder="beatrix_kiddo"
              startContent={<AtSign />}
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
        <div className="grid gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button tone="outline" className="w-full">
            <i className="devicon-google-plain" aria-hidden="true" />
            Login with Google
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          {"Don't"} have an account?{" "}
          <a
            href="#"
            className="text-primary underline underline-offset-4 hover:opacity-80"
          >
            Sign up
          </a>
        </p>
      </Form>
    </AuthLayout>
  );
}
