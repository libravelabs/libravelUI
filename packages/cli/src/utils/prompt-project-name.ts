import { text, isCancel, cancel } from "@clack/prompts";

export async function promptProjectName(): Promise<string> {
  const promptedName = await text({
    message: "What is your project named?",
    placeholder: "my-app",
    initialValue: "my-app",
  });

  if (isCancel(promptedName)) {
    cancel("Operation cancelled");
    process.exit(0);
  }

  return promptedName as string;
}
