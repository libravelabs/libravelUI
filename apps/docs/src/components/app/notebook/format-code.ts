import prettier from "prettier/standalone";
import * as prettierBabel from "prettier/plugins/babel";
import * as prettierEstree from "prettier/plugins/estree";

export async function formatCode(code: string) {
  return prettier.format(code, {
    parser: "babel",
    plugins: [prettierBabel, prettierEstree],
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });
}
