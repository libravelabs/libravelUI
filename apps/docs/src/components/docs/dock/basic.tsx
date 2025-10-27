"use client";

import {
  DockContent,
  DockHeader,
  DockTitle,
  DockDescription,
  Dock,
  DockFooter,
  DockClose,
  DockBody,
} from "@/components/ui/dock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/field";
import { AtSign, Lock, User } from "lucide-react";

export default function BasicDock() {
  return (
    <Dock>
      <Button variant="outline">Open Dock</Button>

      <DockContent side="right" shouldScaleBackground>
        {({ close }) => (
          <>
            <DockHeader>
              <DockTitle>Profile</DockTitle>
              <DockDescription>
                Make changes to your profile here. Click save when {"you're"}{" "}
                done.
              </DockDescription>
            </DockHeader>

            <DockBody>
              <div className="grid flex-1 auto-rows-min gap-6 px-2">
                <Input
                  id="dock-example-name"
                  label="Name"
                  defaultValue="Travis Bickle"
                  startContent={<User />}
                  autoFocus
                />
                <Input
                  id="dock-example-username"
                  label="Username"
                  defaultValue="@bicklelonewolf"
                  startContent={<AtSign />}
                />
                <Input
                  id="dock-example-password"
                  label="Password"
                  type="password"
                  defaultValue="ilovebetsymorethanever"
                  startContent={<Lock />}
                />
              </div>
            </DockBody>

            <DockFooter className="grid grid-cols-1">
              <Button onPress={close}>Save</Button>
              <DockClose>Close</DockClose>
            </DockFooter>
          </>
        )}
      </DockContent>
    </Dock>
  );
}
