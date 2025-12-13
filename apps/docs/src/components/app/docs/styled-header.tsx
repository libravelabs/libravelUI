"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/core/card";
import * as Lucide from "lucide-react";
import Markdown from "react-markdown";
import { Badge } from "@/components/ui/core/badge";

type StyledHeaderProps = {
  title: string;
  description?: string;
  features?: {
    title: string;
    icon?: Lucide.LucideIcon;
  }[];
};

export function StyledHeader({
  title,
  description,
  features,
}: StyledHeaderProps) {
  return (
    <Card
      padding="lg"
      radius="lg"
      shadow="md"
      variant="gradient"
      circleGradient
    >
      <CardContent>
        <div className="flex items-start gap-6">
          <div className="flex-1 max-w-2xl">
            <CardHeader className="px-0! py-0!">
              <h1 className="text-4xl font-semibold leading-tight">{title}</h1>
            </CardHeader>

            <Markdown>{description}</Markdown>

            {features && (
              <div className="flex mt-6 flex-wrap gap-3 items-center">
                {features?.map(({ title, icon }, id) => {
                  const IconComp =
                    typeof icon === "string" ? Lucide[icon] : icon;

                  return (
                    <Badge key={id} size="md" radius="full" tone="secondary">
                      {IconComp && <IconComp className="size-4 opacity-90" />}
                      {title}
                    </Badge>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
