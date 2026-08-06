import { cn } from "@/lib/utils";
import { NotebookControlField } from "@/components/app/notebook/components/control-field";
import type {
  NotebookArgs,
  NotebookLayout,
} from "@/components/app/notebook/types";
import { getControlColumnClass, getControlSpanClass } from "../utils/utils";

type NotebookControlsProps<TArgs extends object> = {
  controls: readonly [keyof TArgs, NotebookArgs<TArgs>[keyof TArgs]][];
  args: TArgs;
  layout?: NotebookLayout;
  onChange<K extends keyof TArgs>(key: K, value: TArgs[K]): void;
};

export function NotebookControls<TArgs extends object>({
  controls,
  args,
  layout,
  onChange,
}: NotebookControlsProps<TArgs>) {
  if (controls.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center p-4 gap-5 sm:p-5",
        getControlColumnClass(layout?.control?.columns),
        layout?.control?.className,
      )}
    >
      {controls.map(([name, field]) => (
        <div
          key={String(name)}
          className={cn(
            "col-span-1",
            getControlSpanClass(field.style?.colSpan),
            field.style?.className,
          )}
        >
          <NotebookControlField
            name={String(name)}
            control={field.control!}
            value={args[name]}
            onChange={(value) => onChange(name, value as TArgs[typeof name])}
          />
        </div>
      ))}
    </div>
  );
}
