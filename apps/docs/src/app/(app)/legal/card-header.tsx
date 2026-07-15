"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/core/card";

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
      className="grid gap-8"
      {...props}
    >
      {header && <CardHeader>{header}</CardHeader>}
      {props.children && <CardContent>{props.children}</CardContent>}
    </Card>
  );
}
