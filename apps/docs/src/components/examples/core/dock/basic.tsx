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
} from "@/components/ui/core/dock";
import { Button } from "@/components/ui/core/button";
import { TextField } from "@/components/ui/core/text-field";
import { Label } from "@/components/ui/core/field";
import { Input } from "@/components/ui/core/input";
import { Lock, User } from "lucide-react";

export default function BasicDock() {
  return (
    <Dock>
      <Button tone="outline">Open Dock</Button>

      <DockContent side="right">
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
              <div className="flex flex-col gap-6">
                <TextField isRequired>
                  <Label>Username</Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="beatrix_kiddo"
                    startContent={<User />}
                  />
                </TextField>

                <TextField isRequired>
                  <div className="flex justify-between items-center">
                    <Label>Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    type="password"
                    id="password"
                    placeholder="It's a secret.."
                    startContent={<Lock />}
                  />
                </TextField>
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
