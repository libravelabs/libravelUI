"use client";

import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { AtSign, User } from "lucide-react";

export default function BasicTabs() {
  return (
    <Tabs defaultSelectedKey="account">
      <TabList>
        <TabTrigger id="account" key="account">
          Account
        </TabTrigger>
        <TabTrigger id="password" key="password">
          Password
        </TabTrigger>
      </TabList>

      <TabContent id="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <TextField
              type="text"
              isRequired
              label="Full Name"
              id="fullname"
              defaultValue="Tyler Durden"
              startContent={<User />}
            />

            <TextField
              type="text"
              isRequired
              label="Username"
              id="username"
              defaultValue="tyler_durden"
              startContent={<AtSign />}
            />
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabContent>

      <TabContent id="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <TextField
              type="password"
              isRequired
              label="Current Password"
              id="current_password"
            />

            <TextField
              type="password"
              isRequired
              label="New Password"
              id="new_password"
            />
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabContent>
    </Tabs>
  );
}
