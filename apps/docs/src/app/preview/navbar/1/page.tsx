"use client";

import { useState } from "react";
import { Heading } from "@/components/ui/core/heading";
import { NavbarProps, NavbarProvider } from "@/components/ui/block/navbar";
import AppNavbar from "../app-navbar";
import {
  AnimatedToggleGroup,
  AnimatedToggleItem,
} from "@/components/ui/motion/animated-toggle-group";
import { Label } from "@/components/ui/core/field";

export default function Page() {
  const [placement, setPlacement] = useState<NavbarProps["placement"]>("top");

  return (
    <NavbarProvider>
      <AppNavbar placement={placement} />
      <main className="p-6 md:pt-20">
        <Heading>Default navbar</Heading>

        <div className="hidden md:flex flex-col gap-2 mt-12">
          <Label>Placement</Label>
          <AnimatedToggleGroup
            className="w-fit"
            value={placement as string}
            onValueChange={(value) =>
              setPlacement(value as NavbarProps["placement"])
            }
          >
            <AnimatedToggleItem value="top" className="w-fit px-2">
              Top
            </AnimatedToggleItem>
            <AnimatedToggleItem value="bottom" className="w-fit px-2">
              Bottom
            </AnimatedToggleItem>
          </AnimatedToggleGroup>
        </div>
      </main>
    </NavbarProvider>
  );
}
