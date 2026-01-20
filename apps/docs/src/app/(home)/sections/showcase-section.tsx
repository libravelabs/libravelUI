"use client";

import { Calendar } from "@/components/ui/core/calendar";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from "@/components/ui/core/command";
import { TiltingCard } from "@/components/ui/motion/tilting-card";
import { ShiningText } from "@/components/ui/motion/shining-text";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import {
  Calendar as CalendarIcon,
  Search,
  Settings,
  Shield,
  Activity,
  Home,
  User,
  Mail,
  Bell,
  Wifi,
  Battery,
  Signal,
} from "lucide-react";

const SHOWCASE_CONTENT = {
  header: {
    badge: "◼ VISUAL_MODULES",
    title: "High-Fidelity Interaction",
    description:
      "Advanced interface components designed for fluid user experiences and complex data manipulation.",
  },
  demos: [
    {
      id: "motion-card",
      title: "Holographic Projection",
      description: "3D tilting card with perspective distortion.",
      colSpan: "lg:col-span-2",
      component: (
        <div className="h-full w-full flex items-center justify-center min-h-[300px] p-8 perspective-[1000px]">
          <TiltingCard
            className="w-[300px] h-[180px] rounded-xl border border-white/10 bg-black/80 backdrop-blur-xl p-6 flex flex-col justify-between shadow-2xl shadow-primary/20"
            intensity={15}
          >
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Activity className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    System Status
                  </h4>
                  <p className="text-xs text-primary/80">Online</p>
                </div>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-green-500/50" />
                <div className="w-1 h-1 rounded-full bg-green-500/30" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-400">
                <span>CPU Load</span>
                <span>34%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[34%] bg-primary rounded-full" />
              </div>

              <div className="flex justify-between text-xs text-gray-400 pt-1">
                <span>Memory</span>
                <span>62%</span>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[62%] bg-blue-500 rounded-full" />
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-mono">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3" /> LAN-01
              </span>
              <span className="flex items-center gap-1">
                <Battery className="w-3 h-3" /> 98%
              </span>
            </div>
          </TiltingCard>
        </div>
      ),
    },
    {
      id: "core-calendar",
      title: "Temporal Navigation",
      description: "Full-featured calendar with keyboard support.",
      colSpan: "lg:col-span-1",
      component: (
        <div className="h-full w-full flex items-center justify-center p-6 bg-background/50 backdrop-blur-sm border border-border/50 rounded-xl">
          <Calendar className="rounded-md border border-border bg-background shadow-none" />
        </div>
      ),
    },
    {
      id: "core-command",
      title: "Command Interface",
      description: "Fast, composable command menu for power users.",
      colSpan: "lg:col-span-1",
      component: (
        <div className="h-full w-full flex items-center justify-center p-6">
          <Command className="rounded-lg border shadow-md w-full max-w-[300px]">
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandGroup title="Suggestions">
                <CommandItem>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>Calendar</span>
                </CommandItem>
                <CommandItem>
                  <Search className="mr-2 h-4 w-4" />
                  <span>Search</span>
                </CommandItem>
                <CommandItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      ),
    },
    {
      id: "motion-controls",
      title: "Interactive Controls",
      description: "Animated toggle groups with layout transitions.",
      colSpan: "lg:col-span-2",
      component: (
        <div className="h-full w-full flex flex-col items-center justify-center gap-8 min-h-[200px]">
          <ShiningText className="text-2xl font-medium">
            System Configuration
          </ShiningText>

          <div className="flex flex-col gap-4 items-center">
            <AnimatedToggleGroup defaultValue="home" className="p-2 gap-2">
              <AnimatedToggleItem value="home" className="w-10 h-10">
                <Home className="w-5 h-5" />
              </AnimatedToggleItem>
              <AnimatedToggleItem value="user" className="w-10 h-10">
                <User className="w-5 h-5" />
              </AnimatedToggleItem>
              <AnimatedToggleItem value="mail" className="w-10 h-10">
                <Mail className="w-5 h-5" />
              </AnimatedToggleItem>
              <AnimatedToggleItem value="bell" className="w-10 h-10">
                <Bell className="w-5 h-5" />
              </AnimatedToggleItem>
              <AnimatedToggleItem value="settings" className="w-10 h-10">
                <Settings className="w-5 h-5" />
              </AnimatedToggleItem>
            </AnimatedToggleGroup>

            <AnimatedToggleGroup defaultValue="shield" className="p-2 gap-2">
              <AnimatedToggleItem value="shield" className="w-10 h-10">
                <Shield className="w-5 h-5" />
              </AnimatedToggleItem>
              <AnimatedToggleItem value="signal" className="w-10 h-10">
                <Signal className="w-5 h-5" />
              </AnimatedToggleItem>
              <AnimatedToggleItem value="wifi" className="w-10 h-10">
                <Wifi className="w-5 h-5" />
              </AnimatedToggleItem>
            </AnimatedToggleGroup>
          </div>
        </div>
      ),
    },
  ],
};

export function ShowcaseSection() {
  return (
    <section className="py-24 bg-background border-b border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-size-[24px_24px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-primary">
              {SHOWCASE_CONTENT.header.badge}
            </div>
            <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-5xl">
              {SHOWCASE_CONTENT.header.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground font-light leading-relaxed">
              {SHOWCASE_CONTENT.header.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SHOWCASE_CONTENT.demos.map((demo) => (
            <div
              key={demo.id}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card/50 backdrop-blur-sm ${demo.colSpan || "lg:col-span-1"}`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="p-6 border-b border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-foreground">
                    {demo.title}
                  </h3>
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {demo.description}
                </p>
              </div>

              <div className="p-6 bg-muted/5 min-h-[200px] flex items-center justify-center">
                {demo.component}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
