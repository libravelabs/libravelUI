import { useEffect, useState } from "react";
import { fetchSource, type RegistryEntry } from "@/lib/fetch-source";

export function useComponentCode(comp: string) {
  const [state, setState] = useState({
    code: "",
    loading: false,
  });

  useEffect(() => {
    if (!comp) return;

    let active = true;

    const load = async () => {
      setState({ code: "", loading: true });

      const res = await fetchSource(comp);

      if (!active) return;

      const file = res?.files?.[0];
      const code = file?.code ?? file?.content ?? "";

      setState({ code, loading: false });
    };

    load();

    return () => {
      active = false;
    };
  }, [comp]);

  return state;
}
