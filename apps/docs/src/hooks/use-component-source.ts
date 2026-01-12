import { useEffect, useState } from "react";
import { fetchSource, type SourceFile } from "@/lib/fetch-source";

type ComponentSourceState = {
  code: SourceFile["code"];
  loading: boolean;
};

export function useComponentSource(comp: string): ComponentSourceState {
  const [state, setState] = useState<ComponentSourceState>({
    code: "",
    loading: false,
  });

  useEffect(() => {
    if (!comp) {
      setState({ code: "", loading: false });
      return;
    }

    let active = true;

    const load = async () => {
      setState((s) => ({ ...s, loading: true }));

      try {
        const res = await fetchSource(comp);

        if (!active || !res?.files?.length) {
          setState({ code: "", loading: false });
          return;
        }

        const file = res.files[0];
        const code = file.code ?? file.content ?? "";

        setState({ code, loading: false });
      } catch {
        if (active) {
          setState({ code: "", loading: false });
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [comp]);

  return state;
}
