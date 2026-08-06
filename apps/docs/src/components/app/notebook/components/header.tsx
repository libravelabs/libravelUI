import { LuChevronUp, LuCode } from "react-icons/lu";
import { Button } from "@/components/ui/core/button";
import { ModalTrigger } from "@/components/ui/core/modal";

type NotebookHeaderProps = {
  code: string | null;
  setShowCode: React.Dispatch<React.SetStateAction<boolean>>;
  showCode: boolean;
};

export function NotebookHeader({
  code,
  setShowCode,
  showCode,
}: NotebookHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3">
      <div className="text-xs font-medium uppercase text-muted-foreground">
        Preview
      </div>

      {code && (
        <ModalTrigger
          iconOnly
          tone="outline"
          onPress={() => setShowCode(!showCode)}
        >
          {showCode ? <LuChevronUp /> : <LuCode />}
        </ModalTrigger>
      )}
    </div>
  );
}
