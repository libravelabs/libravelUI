import { transform } from "sucrase";
import * as prettier from "prettier/standalone";
import * as parserBabel from "prettier/plugins/babel";
import parserEstree from "prettier/plugins/estree";

export async function ts2js(code: string): Promise<string> {
  try {
    const transpiled = transform(code, {
      transforms: ["typescript", "jsx"],
      jsxRuntime: "preserve",
      disableESTransforms: true,
    }).code;

    const formatted = await prettier.format(transpiled, {
      parser: "babel",
      plugins: [parserBabel, parserEstree],
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      singleQuote: false,
    });

    return formatted.trim();
  } catch (e) {
    console.error("TS2JS Error:", e);
    return code;
  }
}
