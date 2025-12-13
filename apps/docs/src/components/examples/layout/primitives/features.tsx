"use client";

import Markdown from "react-markdown";

type FeatureItem = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

type Props = {
  items: FeatureItem[];
};

export function Features({ items }: Props) {
  return (
    <div className="grid w-full gap-6 max-h-96 overflow-y-auto">
      {items.map(({ title, description, icon }, i) => {
        return (
          <div key={i} className="flex items-start gap-2">
            {icon && (
              <div className="rounded-full bg-muted border border-foreground/20 text-primary p-2 [&>svg]:size-4">
                <>{icon}</>
              </div>
            )}
            <div className="flex flex-col text-start not-prose">
              <div className="font-medium text-sm">
                <Markdown>{title}</Markdown>
              </div>
              {description && (
                <div className="text-sm text-foreground/30">
                  <Markdown>{description}</Markdown>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
