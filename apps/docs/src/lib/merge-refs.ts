export function mergeRefs(refs: any[]) {
  return (value: any) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        try {
          ref.current = value;
        } catch {}
      }
    }
  };
}
