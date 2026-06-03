import { ExternalLink } from "lucide-react";
import { BlocksLayout } from "../base-blocks-layout";

export default function BlockPage() {
  return (
    <BlocksLayout
      header={{
        title: "Blocks",
        description:
          "Ready-to-use modern React blocks with a clean design, easy integration, open-source licensing, and zero cost forever.",
        cta: {
          label: (
            <>
              Explore more <ExternalLink />
            </>
          ),
          href: "/blocks",
          button: {
            tone: "outline",
            className: "border-2 bg-secondary/30",
          },
        },
      }}
    ></BlocksLayout>
  );
}
