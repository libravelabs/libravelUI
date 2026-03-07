#!/usr/bin/env node
import { Command } from "commander";
import { init } from "./commands/init";
import { add } from "./commands/add";
import { create } from "./commands/create";

const program = new Command();

program.name("libravelui").description("CLI for LibravelUI").version("1.0.0");

program
  .command("init")
  .description("Initialize LibravelUI in your project")
  .action(init);

program
  .command("add")
  .description("Add a component to your project")
  .argument("[components...]", "Components to add")
  .option("-a, --all", "Add all components")
  .action(add);

program
  .command("create [project-name]")
  .description("Create a new project using LibravelUI starter templates")
  .option("--next", "Use Next.js starter template")
  .option("--vite", "Use Vite starter template")
  .action(create);

program.parse();
