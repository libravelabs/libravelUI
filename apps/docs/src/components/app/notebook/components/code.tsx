import { CodeBlock } from "@/components/docs/code-block";

type NotebookCodeProps = {
  code: string | null;
};

export function NotebookCode({ code }: NotebookCodeProps) {
  if (!code) {
    return null;
  }

  return (
    <div className="flex min-h-full flex-col overflow-hidden">
      <CodeBlock
        lang="tsx"
        code={code}
        className="h-full w-full max-w-none rounded-none border-none"
      />
    </div>
  );
}
