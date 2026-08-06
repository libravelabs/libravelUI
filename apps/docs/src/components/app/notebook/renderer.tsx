"use client";

import { AnimatePresence, motion } from "motion/react";
import { useNotebook } from "@/components/app/notebook/utils/use-notebook";
import { NotebookCode } from "@/components/app/notebook/components/code";
import { NotebookControls } from "@/components/app/notebook/components/controls";
import { NotebookHeader } from "@/components/app/notebook/components/header";
import { NotebookPreview } from "@/components/app/notebook/components/preview";
import type { NotebookConfig } from "@/components/app/notebook/types";

type NotebookRendererProps<TArgs extends object> = {
  notebook: NotebookConfig<TArgs>;
};

export function NotebookRenderer<TArgs extends object>({
  notebook,
}: NotebookRendererProps<TArgs>) {
  const { args, code, controls, showCode, setShowCode, updateArg } =
    useNotebook(notebook);

  const preview = notebook.render ? (
    notebook.render(args)
  ) : notebook.component ? (
    <notebook.component {...args} />
  ) : null;

  return (
    <div className="flex w-full flex-col overflow-hidden divide-y">
      <NotebookHeader
        code={code}
        setShowCode={setShowCode}
        showCode={showCode}
      />

      <AnimatePresence initial={false}>
        {showCode && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
            className="overflow-hidden border-b"
          >
            <div className="min-h-0">
              <NotebookCode code={code} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NotebookControls
        controls={controls}
        args={args}
        layout={notebook.layout}
        onChange={updateArg}
      />

      <NotebookPreview>{preview}</NotebookPreview>
    </div>
  );
}
