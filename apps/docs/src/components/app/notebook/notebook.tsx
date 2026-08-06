import { NotebookRenderer } from "./renderer";
import { noteRegistry, type NoteName } from "@/components/examples/notes";

type NotebookProps = {
  note: NoteName;
};

export function Notebook({ note }: NotebookProps) {
  const config = noteRegistry[note];

  return <NotebookRenderer notebook={config} />;
}
