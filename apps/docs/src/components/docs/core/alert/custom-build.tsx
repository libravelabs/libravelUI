"use client";

import {
  AlertDescription,
  AlertTitle,
  AlertRoot,
} from "@/components/ui/core/alert";
import { Button } from "@/components/ui/core/button";
import { Cog } from "lucide-react";

export default function CustomBuildAlert() {
  return (
    <section>
      <AlertRoot className="flex flex-col gap-4 w-full">
        <div className="flex gap-2">
          <Cog />
          <div>
            <AlertTitle>Pulled Marcellus? Time to Choose</AlertTitle>
            <AlertDescription>
              You’re staring down the barrel — “Kill Bill” or “Save Marcellus”?
              No turning back once you hit that button
            </AlertDescription>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <Button size="sm" variant="outline">
            Kill Bill
          </Button>
          <Button size="sm">Save Marcellus</Button>
        </div>
      </AlertRoot>
    </section>
  );
}
