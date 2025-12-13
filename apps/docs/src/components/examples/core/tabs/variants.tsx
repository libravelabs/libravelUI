"use client";

import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
  type TabsProps,
} from "@/components/ui/core/tabs";
import { Button } from "@/components/ui/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/core/card";
import { Avatar } from "@/components/ui/core/avatar";
import { Switch } from "@/components/ui/core/switch";
import { TextField } from "@/components/ui/core/text-field";
import { AppearanceDropdown } from "@/components/app/partials/appearance-dropdown";
import { Mail, User, Phone, MapPin } from "lucide-react";

export default function TabsVariants({ ...props }: TabsProps) {
  return (
    <Tabs defaultSelectedKey="profile" {...props}>
      <TabList>
        <TabTrigger id="profile" key="profile">
          Profile
        </TabTrigger>
        <TabTrigger id="settings" key="settings">
          Settings
        </TabTrigger>
        <TabTrigger id="notifications" key="notifications">
          Notifications
        </TabTrigger>
      </TabList>

      <TabContent className="p-0" id="profile">
        <Card className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>
              Manage your personal information and public profile.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Avatar
                src="https://cdn.pfps.gg/pfps/4413-saul-goodman.png"
                alt="jimmy-mcgill"
                size="xl"
              />
              <div className="space-y-1">
                <p className="font-semibold">@jimmy_mcgill</p>
                <p className="text-sm text-muted-foreground">
                  saulgoodman@bcs.com
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <TextField
                label="Full Name"
                isReadOnly
                defaultValue="James Morgan McGill"
                startContent={<User className="size-4" />}
              />
              <TextField
                label="Email"
                type="email"
                isReadOnly
                defaultValue="saulgoodman@bcs.com"
                startContent={<Mail className="size-4" />}
              />
              <TextField
                label="Phone"
                isReadOnly
                defaultValue="+1 505 842 5662"
                startContent={<Phone className="size-4" />}
              />
              <TextField
                label="Location"
                isReadOnly
                defaultValue="Albuquerque, New Mexico"
                startContent={<MapPin className="size-4" />}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button tone="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabContent>

      <TabContent className="p-0" id="settings">
        <Card className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your account preferences and privacy settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p className="text-sm font-medium mb-2">Privacy</p>
              <Switch
                label="Public profile"
                description="Allow others to see your profile information."
              />
              <Switch
                label="Show online status"
                description="Display when you're active on the platform."
              />
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">Appearance</p>
                  <p className="text-sm text-muted-foreground">
                    Customize how the interface looks.
                  </p>
                </div>
                <AppearanceDropdown />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button tone="outline">Reset</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabContent>

      <TabContent className="p-0" id="notifications">
        <Card radius="none" className="flex flex-col gap-6">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what updates you want to receive.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Switch
              label="Email notifications"
              description="Receive updates about your account via email."
            />
            <Switch
              label="Push notifications"
              description="Get notified about important events."
            />
            <Switch
              label="Marketing emails"
              description="Receive news and promotional content."
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Update Preferences</Button>
          </CardFooter>
        </Card>
      </TabContent>
    </Tabs>
  );
}
