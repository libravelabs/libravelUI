"use client";
import { useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLinkIcon,
  MessageCircleIcon,
  MoreVertical,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/core/popover";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/core/dropdown-menu";
import { cva } from "class-variance-authority";
import { Button } from "../ui/core/button";
import { toast } from "sonner";
import { BsClaude, BsGithub, BsOpenai } from "react-icons/bs";

const cache = new Map<string, Promise<string>>();

export function useMarkdownCopy(markdownUrl: string) {
  const [isLoading, setLoading] = useState(false);

  const [checked, onCopyClick] = useCopyButton(async () => {
    let promise = cache.get(markdownUrl);

    if (!promise) {
      promise = fetch(withBasePath(markdownUrl)).then(async (res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch markdown (${res.status})`);
        }

        return res.text();
      });

      cache.set(markdownUrl, promise);
    }

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": promise,
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return {
    isLoading,
    checked,
    onCopyClick,
  };
}

export function CopyButton({
  markdownUrl,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  markdownUrl: string;
}) {
  const { isLoading, checked, onCopyClick } = useMarkdownCopy(markdownUrl);

  return (
    <Button
      tone="secondary"
      size="sm"
      isPending={isLoading}
      onClick={onCopyClick}
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </Button>
  );
}

const optionVariants = cva(
  "text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4",
);

export function useLLMOptions(markdownUrl: string, githubUrl: string) {
  return useMemo(() => {
    const fullMarkdownUrl =
      typeof window !== "undefined"
        ? new URL(markdownUrl, window.location.origin)
        : "loading";
    const q = `Read ${fullMarkdownUrl}, I want to ask questions about it.`;

    return [
      {
        title: "Open in GitHub",
        href: githubUrl,
        icon: <BsGithub />,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          hints: "search",
          q,
        })}`,
        icon: <BsOpenai />,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({
          q,
        })}`,
        icon: <BsClaude />,
      },
      {
        title: "Open in T3 Chat",
        href: `https://t3.chat/new?${new URLSearchParams({
          q,
        })}`,
        icon: <MessageCircleIcon />,
      },
    ];
  }, [githubUrl, markdownUrl]);
}

export function LLMOptions({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl: string;
  githubUrl: string;
}) {
  const items = useLLMOptions(markdownUrl, githubUrl);

  return (
    <Popover>
      <PopoverTrigger tone="secondary" size="sm" className="gap-2">
        Open
        <ChevronDown className="size-3.5 text-fd-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent className="flex flex-col overflow-auto p-1">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            rel="noreferrer noopener"
            target="_blank"
            className={cn(optionVariants())}
          >
            {item.icon}
            {item.title}
            <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
          </a>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export function PageActions({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl: string;
  githubUrl: string;
}) {
  const { checked, onCopyClick } = useMarkdownCopy(markdownUrl);
  const items = useLLMOptions(markdownUrl, githubUrl);

  return (
    <>
      <div className="flex md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger tone="secondary" size="sm" iconOnly>
            <MoreVertical className="size-4 text-fd-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onAction={() => onCopyClick(undefined as any)}>
              {checked ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
              {checked ? "Copied" : "Copy Markdown"}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuGroup title="Open in...">
              {items.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.icon}
                  {item.title}
                  <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="hidden md:flex gap-2">
        <CopyButton markdownUrl={markdownUrl} />
        <LLMOptions markdownUrl={markdownUrl} githubUrl={githubUrl} />
      </div>
    </>
  );
}

function withBasePath(href: string) {
  if (href.match(/^\w+:/) || href.startsWith("//")) return href;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";

  return appUrl + href;
}
