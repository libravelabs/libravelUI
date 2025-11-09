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
import { Heading } from "@/components/ui/core/heading";
import { Avatar } from "@/components/ui/core/avatar";
import { Switch } from "@/components/ui/core/switch";
import { AppearanceDropdown } from "@/components/ui/appearance-dropdown";

export default function VariantsTabs() {
  const variants = ["default", "ghost", "underline", "outline"];

  return (
    <div className="grid gap-16">
      {variants.map((variant) => (
        <div key={variant} className="grid gap-4">
          <Heading size={3} className="capitalize">
            {variant}
          </Heading>

          <Tabs
            variant={variant as TabsProps["variant"]}
            defaultSelectedKey="profile"
          >
            <TabList>
              <TabTrigger id="profile" key="profile">
                Profile
              </TabTrigger>
              <TabTrigger id="settings" key="settings">
                Settings
              </TabTrigger>
            </TabList>

            <TabContent id="profile">
              <Card className="w-sm">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>
                    Your personal information overview.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Avatar
                      src="https://cdn.pfps.gg/pfps/4413-saul-goodman.png"
                      alt="jimmy-mcgill"
                    />
                    <div className="grid text-sm">
                      <span>@jimmy_mcgill</span>
                      <span className="opacity-60">saulgoodman@bcs.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabContent>

            <TabContent id="settings">
              <Card className="w-sm">
                <CardHeader>
                  <CardTitle>Settings</CardTitle>
                  <CardDescription>
                    Manage your preferences and appearance.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Switch
                    label="Public profile"
                    description="Allow others to see your profile."
                  />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">Theme</p>
                      <p className="text-sm text-muted-foreground">
                        Choose between light or dark mode.
                      </p>
                    </div>
                    <AppearanceDropdown />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabContent>
          </Tabs>
        </div>
      ))}
    </div>
  );
}
