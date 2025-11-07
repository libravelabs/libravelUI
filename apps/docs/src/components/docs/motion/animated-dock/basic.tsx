"use client";

import { Mail, Calendar, FileText, Music, Settings, Image } from "lucide-react";

import {
  Dock,
  DockIcon,
  DockItem,
  DockLabel,
} from "@/components/ui/motion/animated-dock";

const apps = [
  {
    title: "Mail",
    icon: <Mail className="h-full w-full" />,
  },
  {
    title: "Calendar",
    icon: <Calendar className="h-full w-full" />,
  },
  {
    title: "Notes",
    icon: <FileText className="h-full w-full" />,
  },
  {
    title: "Music",
    icon: <Music className="h-full w-full" />,
  },
  {
    title: "Settings",
    icon: <Settings className="h-full w-full" />,
  },
  {
    title: "Photos",
    icon: <Image className="h-full w-full" />,
  },
];

export default function BasicAnimatedDock() {
  return (
    <Dock className="items-end pb-3">
      {apps.map((app, idx) => (
        <DockItem key={idx} className="aspect-square rounded-full">
          <DockLabel>{app.title}</DockLabel>
          <DockIcon>{app.icon}</DockIcon>
        </DockItem>
      ))}
    </Dock>
  );
}
