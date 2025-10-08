"use client";

import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";
import { BasicCommandBase } from "./basic-command";

export function WithModalCommandBase() {
  return (
    <Modal>
      <ModalTrigger variant="outline">Open Command</ModalTrigger>
      <ModalContent blurred showCloseButton={false} className="p-0">
        <BasicCommandBase />
      </ModalContent>
    </Modal>
  );
}

export const WithModalCommandCode = `"use client";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Terminal,
  Edit3,
  Eye,
  Bug,
  LogOut,
} from "lucide-react";

import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/modal";

const tools = [
  { id: "editor", name: "Editor", icon: Edit3, shortcut: "⌘E" },
  { id: "terminal", name: "Terminal", icon: Terminal, shortcut: "⌘T" },
  { id: "preview", name: "Preview", icon: Eye, shortcut: "⌘R" },
  { id: "debugger", name: "Debugger", icon: Bug, shortcut: "⌘D" },
];

export function WithModalCommandBase() {
  return (
    <Modal>
      <ModalTrigger variant="outline">Open Command</ModalTrigger>
      <ModalContent blurred showCloseButton={false} className="p-0">
        <Command className="w-full max-w-lg">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandGroup title="Suggestions">
              <CommandItem textValue="Calendar">
                <Calendar />
                <span>Calendar</span>
              </CommandItem>

              <CommandItem textValue="Search Emoji">
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>

              <CommandItem textValue="Calculator">
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

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

            <CommandSeparator />

            <CommandGroup title="Tools">
              {tools.map(({ id, name, icon: Icon, shortcut }) => (
                <CommandItem key={id} textValue={name}>
                  <Icon />
                  <span>{name}</span>
                  {shortcut && <CommandShortcut keys={shortcut} />}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup title="Danger Zone">
              <CommandItem destructive textValue="Logout">
                <LogOut />
                <span>Logout</span>
                <CommandShortcut keys="⌘Q" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </ModalContent>
    </Modal>
  );
}
`;
