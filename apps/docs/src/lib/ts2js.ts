import * as ts from "typescript";

export function ts2js(tsCode: string): string {
  const result = ts.transpileModule(tsCode, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2015,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.Preserve,
      removeComments: false,
      strict: true,
      esModuleInterop: true,
    },
    fileName: "file.tsx",
    reportDiagnostics: true,
  });

  return result.outputText.trim();
}
