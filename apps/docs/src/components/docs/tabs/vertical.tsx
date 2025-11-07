"use client";

import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/tabs";
import { Home, Settings, User, CreditCard } from "lucide-react";

export default function VerticalTabs() {
  return (
    <Tabs orientation="vertical">
      <TabList>
        <TabTrigger id="dashboard">
          <Home className="mr-2" />
          Dashboard
        </TabTrigger>
        <TabTrigger id="settings">
          <Settings className="mr-2" />
          Settings
        </TabTrigger>
        <TabTrigger id="profile">
          <User className="mr-2" />
          Profile
        </TabTrigger>
        <TabTrigger id="billing">
          <CreditCard className="mr-2" />
          Billing
        </TabTrigger>
      </TabList>

      <TabContent id="dashboard">Dashboard</TabContent>
      <TabContent id="settings">Settings</TabContent>
      <TabContent id="profile">Profile</TabContent>
      <TabContent id="billing">Billing</TabContent>
    </Tabs>
  );
}
