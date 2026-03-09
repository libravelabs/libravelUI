"use client";

import { HeroSection } from "./sections/hero-section";
import { ComparisonSection } from "./sections/comparison-section";
import { ShowcaseSection } from "./sections/showcase-section";
import { PlaygroundSection } from "./sections/playground-section";
import { CTASection } from "./sections/cta-section";
import { Button, type ButtonProps } from "@/components/ui/core/button";
import { SearchBar } from "@/components/ui/core/search-bar";
import { Input } from "@/components/ui/core/input";
import { Badge } from "@/components/ui/core/badge";
import ActionableCard from "@/components/examples/core/card/actionable";
import {
  Tabs,
  TabList,
  TabTrigger,
  TabContent,
} from "@/components/ui/core/tabs";
import BasicDialog from "@/components/examples/core/dialog/basic";
import { CreditCard, Settings, User } from "lucide-react";
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/core/command";
import BasicComboboxBasic from "@/components/examples/core/combobox/basic";
import PaginationExample from "@/components/examples/core/pagination/basic.demo";
import { Switch } from "@/components/ui/core/switch";
import { ProgressBar } from "@/components/ui/core/progress";
import { Slider, SliderTrack, SliderThumb } from "@/components/ui/core/slider";
import { Checkbox } from "@/components/ui/core/checkbox";
import { RadioGroup, Radio } from "@/components/ui/core/radio-group";
import { Avatar } from "@/components/ui/core/avatar";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-hidden px-2 md:px-6 pt-20 relative">
      <HeroSection GRID={GRID} />
      <ShowcaseSection GRID={GRID} />
      <ComparisonSection />
      <PlaygroundSection />
      <CTASection />
    </main>
  );
}

export type GridItem = {
  name: string;
  Preview: React.ComponentType;
  href: string;
};

export const GRID: GridItem[] = [
  {
    name: "Button",
    Preview: ButtonPreview,
    href: "/docs/components/core/button",
  },
  { name: "Input", Preview: InputPreview, href: "/docs/components/core/input" },
  { name: "Card", Preview: CardPreview, href: "/docs/components/core/card" },
  {
    name: "Dialog",
    Preview: DialogPreview,
    href: "/docs/components/core/dialog",
  },
  { name: "Tabs", Preview: TabsPreview, href: "/docs/components/core/tabs" },
  {
    name: "Command",
    Preview: CommandPreview,
    href: "/docs/components/core/command",
  },
  {
    name: "Combobox",
    Preview: ComboboxPreview,
    href: "/docs/components/core/combobox",
  },
  {
    name: "Pagination",
    Preview: PaginationPreview,
    href: "/docs/components/core/pagination",
  },
  { name: "Badge", Preview: BadgePreview, href: "/docs/components/core/badge" },
  {
    name: "Switch",
    Preview: SwitchPreview,
    href: "/docs/components/core/switch",
  },
  {
    name: "Progress",
    Preview: ProgressPreview,
    href: "/docs/components/core/progress",
  },
  {
    name: "Slider",
    Preview: SliderPreview,
    href: "/docs/components/core/slider",
  },
  {
    name: "Checkbox",
    Preview: CheckboxPreview,
    href: "/docs/components/core/checkbox",
  },
  {
    name: "RadioGroup",
    Preview: RadioGroupPreview,
    href: "/docs/components/core/radio-group",
  },
  {
    name: "Avatar",
    Preview: AvatarPreview,
    href: "/docs/components/core/avatar",
  },
];

function ButtonPreview() {
  const BUTTON_TONES = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "ghost",
    "link",
  ];

  return (
    <div className="flex flex-wrap gap-2 justify-center items-center p-4">
      {BUTTON_TONES.map((tone) => (
        <Button key={tone} tone={tone as ButtonProps["tone"]} size="sm">
          {tone}
        </Button>
      ))}
    </div>
  );
}

function InputPreview() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full">
      <SearchBar placeholder="Search components..." />
      <div className="flex gap-2">
        <Input className="flex-1" placeholder="email@example.com" />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
}

function CardPreview() {
  return (
    <div className="p-4 w-full">
      <ActionableCard />
    </div>
  );
}

function TabsPreview() {
  const tabs = ["Overview", "Analytics", "Settings"];
  const content = [
    "Your project overview and summary stats.",
    "Traffic sources, conversions, and engagement.",
    "Manage team members and permissions.",
  ];

  return (
    <div className="p-4 w-full">
      <Tabs tone="underline">
        <TabList>
          {tabs.map((t, i) => (
            <TabTrigger key={t} id={t}>
              {t}
            </TabTrigger>
          ))}
        </TabList>
        {tabs.map((t, i) => (
          <TabContent key={t} id={t}>
            <p>{content[i]}</p>
          </TabContent>
        ))}
      </Tabs>
    </div>
  );
}

function DialogPreview() {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <BasicDialog />
    </div>
  );
}

function CommandPreview() {
  return (
    <div className="p-4 w-full">
      <Command className="w-full max-w-lg">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup title="Settings">
            <CommandItem textValue="Profile">
              <User />
              <span>Profile</span>
              <CommandShortcut keys="⌘P" />
            </CommandItem>

            <CommandItem textValue="Billing">
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut keys="⌘B" />
            </CommandItem>

            <CommandItem isDisabled textValue="Settings">
              <Settings />
              <span>Settings</span>
              <CommandShortcut keys="⌘S" />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
}

function ComboboxPreview() {
  return (
    <div className="p-4 w-full">
      <BasicComboboxBasic />
    </div>
  );
}

function PaginationPreview() {
  return (
    <div className="p-4 w-full">
      <PaginationExample />
    </div>
  );
}

function BadgePreview() {
  return (
    <div className="p-4 flex flex-wrap gap-2 justify-center items-center">
      <Badge>Default</Badge>
      <Badge tone="secondary">Secondary</Badge>
      <Badge tone="destructive">Destructive</Badge>
      <Badge tone="outline">Outline</Badge>
      <Badge tone="success">Success</Badge>
      <Badge tone="warning">Warning</Badge>
      <Badge tone="info">Info</Badge>
    </div>
  );
}

function SwitchPreview() {
  return (
    <div className="p-4 flex items-center justify-center h-full">
      <Switch>Airplane Mode</Switch>
    </div>
  );
}

function ProgressPreview() {
  return (
    <div className="p-4 w-full flex items-center justify-center">
      <ProgressBar value={60} className="w-full max-w-xs" />
    </div>
  );
}

function SliderPreview() {
  return (
    <div className="p-4 w-full flex items-center justify-center">
      <Slider defaultValue={50} className="w-full max-w-xs">
        <SliderTrack>
          <SliderThumb />
        </SliderTrack>
      </Slider>
    </div>
  );
}

function CheckboxPreview() {
  return (
    <div className="p-4 flex flex-col gap-2 justify-center items-start">
      <Checkbox>Accept terms and conditions</Checkbox>
      <Checkbox defaultSelected>Subscribe to newsletter</Checkbox>
    </div>
  );
}

function RadioGroupPreview() {
  return (
    <div className="p-4 flex flex-col items-center w-full">
      <RadioGroup defaultValue="1" className="flex flex-col gap-2">
        <Radio value="1">Default option</Radio>
        <Radio value="2">Alternative option</Radio>
      </RadioGroup>
    </div>
  );
}

function AvatarPreview() {
  return (
    <div className="p-4 flex gap-4 items-center justify-center h-full">
      <Avatar src="/assets/dummies/travis-bickle.png" />
      <Avatar initials="TB" shape="square" />
    </div>
  );
}
