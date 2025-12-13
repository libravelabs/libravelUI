"use client";

import { Badge } from "@/components/ui/core/badge";
import { Button } from "@/components/ui/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/core/card";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@/components/ui/core/tabs";

export default function BasicTabs() {
  return (
    <Tabs defaultSelectedKey="overview">
      <TabList>
        <TabTrigger id="overview">Overview</TabTrigger>
        <TabTrigger id="features">Features</TabTrigger>
        <TabTrigger id="pricing">Pricing</TabTrigger>
        <TabTrigger id="support">Support</TabTrigger>
      </TabList>

      <TabContent id="overview">
        <Card className="p-0">
          <CardTitle className="text-2xl font-semibold">
            Welcome to the future
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            Experience a new paradigm of interface design. Our tabs component
            brings together precision engineering and aesthetic excellence,
            creating interactions that feel alive and responsive.
          </CardDescription>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Card className="p-4 rounded-xl bg-muted/50 border border-border/40">
              <CardTitle className="text-3xl font-bold text-primary mb-1">
                99.9%
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Uptime
              </CardDescription>
            </Card>
            <Card className="p-4 rounded-xl bg-muted/50 border border-border/40">
              <CardTitle className="text-3xl font-bold text-primary mb-1">
                50ms
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                Response Time
              </CardDescription>
            </Card>
          </div>
        </Card>
      </TabContent>

      <TabContent id="features">
        <Card className="p-0">
          <CardTitle className="text-2xl font-semibold">
            Built for excellence
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            Discover the features that make our tabs component stand out from
            the rest.
          </CardDescription>
          <ul className="space-y-3 mt-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="font-medium">Fluid Animations</div>
                <div className="text-sm text-muted-foreground">
                  Spring-based transitions for natural movement
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="font-medium">Accessible by Default</div>
                <div className="text-sm text-muted-foreground">
                  Full keyboard navigation and ARIA support
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <div className="font-medium">Infinite Customization</div>
                <div className="text-sm text-muted-foreground">
                  Variants for every design context
                </div>
              </div>
            </li>
          </ul>
        </Card>
      </TabContent>

      <TabContent id="pricing">
        <Card className="p-0">
          <CardTitle className="text-2xl font-semibold">
            Simple, transparent pricing
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            Choose the plan that&apos;s right for you. No hidden fees, cancel
            anytime.
          </CardDescription>
          <CardContent className="grid gap-4 pt-4">
            <Card variant="outline" tone="neutral">
              <CardTitle className="text-sm font-medium text-primary mb-2">
                Starter
              </CardTitle>
              <CardDescription className="text-4xl font-bold mb-4">
                $29
                <span className="text-lg text-muted-foreground">/mo</span>
              </CardDescription>
              <CardDescription className="text-muted-foreground text-sm">
                Perfect for small teams getting started
              </CardDescription>
            </Card>
            <Card variant="outline" tone="primary" className="border-2">
              <Badge tone="primary" className="absolute top-4 end-4">
                Popular
              </Badge>
              <CardTitle className="text-sm font-medium text-primary mb-2">
                Professional
              </CardTitle>
              <CardDescription className="text-4xl font-bold mb-4">
                $99
                <span className="text-lg text-muted-foreground">/mo</span>
              </CardDescription>
              <CardDescription className="text-muted-foreground text-sm">
                For growing businesses that need more power
              </CardDescription>
            </Card>
          </CardContent>
        </Card>
      </TabContent>

      <TabContent id="support">
        <Card className="p-0">
          <CardTitle className="text-2xl font-semibold">
            We&apos;re here to help
          </CardTitle>
          <CardDescription className="text-muted-foreground leading-relaxed">
            Our dedicated support team is available around the clock to ensure
            your success. From onboarding to advanced implementation, we&apos;ve
            got you covered.
          </CardDescription>
          <div className="flex gap-3 pt-4">
            <Button>Contact Support</Button>
            <Button tone="outline">Documentation</Button>
          </div>
        </Card>
      </TabContent>
    </Tabs>
  );
}
