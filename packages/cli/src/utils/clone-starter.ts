import { execa } from "execa";
import { STARTERS, Framework } from "../constants/config";

export async function cloneStarter(
  framework: Framework,
  targetDir: string,
): Promise<void> {
  const repoPath = `${STARTERS.repo}/${framework}`;

  await execa("npx", ["degit", repoPath, targetDir], { stdio: "ignore" });
}
