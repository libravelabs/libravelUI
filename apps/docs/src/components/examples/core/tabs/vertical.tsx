"use client";

import { Avatar } from "@/components/ui/core/avatar";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@/components/ui/core/tabs";
import { TextField } from "@/components/ui/core/text-field";
import { AtSign, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/core/button";
import { Badge } from "@/components/ui/core/badge";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
} from "@/components/ui/core/card";
import { Textarea } from "@/components/ui/core/text-area";
import { Switch } from "@/components/ui/core/switch";

export default function VerticalTabs() {
  const notifications = [
    "Account Activity",
    "Friend Requests",
    "Followers Update",
    "Account Security Alerts",
    "Social Media Connection Updates",
  ];

  return (
    <Tabs
      defaultSelectedKey="profile"
      orientation="vertical"
      className="h-[600px]"
    >
      <TabList>
        <TabTrigger id="profile">Profile</TabTrigger>
        <TabTrigger id="security">Security</TabTrigger>
        <TabTrigger id="notifications">Notifications</TabTrigger>
        <TabTrigger id="billing">Billing</TabTrigger>
      </TabList>

      <TabContent id="profile">
        <Card padding="sm" className="flex flex-col gap-8 overflow-hidden">
          <CardHeader className="flex items-center gap-4">
            <Avatar
              src="/assets/dummies/travis-bickle.png"
              alt="Travis Bickle"
              size="2xl"
              shape="square"
            />

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold">@bicklepickle</h3>
              <span className="text-sm text-muted-foreground">
                travisbickle@example.com
              </span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <TextField
              label="Email"
              isReadOnly
              defaultValue="travisbickle@example.com"
            />
            <TextField
              label="Username"
              isReadOnly
              defaultValue="bicklepickle"
              startContent={<AtSign className="size-3.5" />}
            />
            <TextField
              label="Full Name"
              isReadOnly
              defaultValue="Travis Bickle"
            />
            <Textarea
              label="Bio"
              isReadOnly
              defaultValue="Someday a real rain will come and wash all the scum off the streets"
            />
          </CardContent>
          <CardFooter className="flex justify-end gap-1 pb-2">
            <Button tone="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabContent>

      <TabContent id="security">
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your account security and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 pt-4">
          <Card variant="outline" padding="sm">
            <CardTitle className="text-sm font-medium text-primary mb-2">
              Password
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm">
              Change your password
            </CardDescription>

            <CardContent className="grid gap-4 mt-8">
              <TextField type="password" label="Current Password" />
              <TextField type="password" label="New Password" />
              <TextField type="password" label="Confirm New Password" />
            </CardContent>
          </Card>

          <Card variant="gradient" tone="destructive" padding="sm">
            <CardTitle className="text-sm font-medium mb-2">
              Danger Zone
            </CardTitle>
            <CardDescription className="text-sm">
              Once you delete your account, there&apos;s no going back. This
              action is permanent.
            </CardDescription>

            <CardContent className="flex justify-center gap-4 mt-8">
              <Button tone="destructive" className="ms-auto">
                <Trash2 />
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </TabContent>

      <TabContent id="notifications">
        <Card className="space-y-6">
          <CardHeader className="space-y-2">
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>
              Choose what updates you want to receive
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {notifications.map((notif) => (
              <Card
                variant="outline"
                key={notif}
                className="flex items-center justify-between"
              >
                <CardTitle className="font-medium text-sm">{notif}</CardTitle>
                <Switch />
              </Card>
            ))}
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="billing">
        <Card variant="gradient" circleGradient>
          <CardHeader>
            <CardTitle className="text-sm text-primary font-medium">
              Current Plan
            </CardTitle>
            <CardDescription className="text-3xl font-bold">
              Professional
            </CardDescription>
            <CardDescription className="text-muted-foreground text-sm">
              Next billing date: Dec 15, 2029
            </CardDescription>
          </CardHeader>
        </Card>
        <Card padding="none" className="flex flex-col gap-4 mt-8">
          <CardTitle className="font-medium">Payment History</CardTitle>
          {[1, 2, 3].map((i) => {
            const d = new Date(
              Date.now() - Math.random() * 5 * 365 * 24 * 60 * 60 * 1000
            );

            return (
              <Card
                variant="outline"
                padding="sm"
                key={i}
                className="flex items-center justify-between"
              >
                <CardHeader>
                  <CardTitle className="text-sm">
                    {d.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </CardTitle>
                  <CardDescription className="text-xs">$99.00</CardDescription>
                </CardHeader>
                <Badge tone="success">Paid</Badge>
              </Card>
            );
          })}
        </Card>
      </TabContent>
    </Tabs>
  );
}
