"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/core/card";
import { cn } from "fumadocs-ui/utils/cn";

export function LegalCardHeader({
  header,
  ...props
}: React.ComponentProps<typeof Card> & {
  header?: React.ReactNode;
}) {
  return (
    <Card
      padding="lg"
      radius="lg"
      shadow="md"
      variant="gradient"
      circleGradient
      className={cn("flex flex-col gap-8", props.className)}
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      {props.children && <CardContent>{props.children}</CardContent>}
    </Card>
  );
}
