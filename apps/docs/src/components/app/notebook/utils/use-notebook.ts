import { useCallback, useEffect, useMemo, useState } from "react";
import { formatCode } from "@/components/app/notebook/format-code";
import { stringifyNotebookCode } from "@/components/app/notebook/serialize";
import type { NotebookConfig } from "@/components/app/notebook/types";
import { getDefaultArgs, typedEntries } from "./utils";

export function useNotebook<TArgs extends object>(note: NotebookConfig<TArgs>) {
  const [showCode, setShowCode] = useState(true);

  const defaultArgs = useMemo(() => getDefaultArgs(note.args), [note.args]);

  const [args, setArgs] = useState<TArgs>(defaultArgs);
  const [code, setCode] = useState<string | null>(null);

  const controls = useMemo(
    () =>
      typedEntries(note.args).filter(([, field]) => {
        if (!field.control) {
          return false;
        }

        if (typeof field.visible === "function") {
          return field.visible(args);
        }

        return field.visible !== false;
      }),
    [note.args, args],
  );

  useEffect(() => {
    setArgs(defaultArgs);
  }, [defaultArgs]);

  const updateArg = useCallback(
    <K extends keyof TArgs>(key: K, value: TArgs[K]) => {
      setArgs((current) => ({
        ...current,
        [key]: value,
      }));
    },
    [],
  );

  const rawCode = note.code
    ? stringifyNotebookCode({
        title: note.title,
        imports: note.code(args).imports,
        element: note.code(args).element,
        defaults: defaultArgs,
        fields: note.args,
      })
    : null;

  useEffect(() => {
    if (!rawCode) {
      setCode(null);
      return;
    }

    let cancelled = false;

    formatCode(rawCode).then((formatted) => {
      if (!cancelled) {
        setCode(formatted.trim());
      }
    });

    return () => {
      cancelled = true;
    };
  }, [rawCode]);

  return {
    args,
    code,
    controls,
    showCode,
    setShowCode,
    updateArg,
  };
}
