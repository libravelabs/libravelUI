export function mergeRefs<T>(
  refs: Array<React.Ref<T> | undefined>
): React.RefCallback<T> {
  return (value: T) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        try {
          (ref as React.MutableRefObject<T>).current = value;
        } catch {}
      }
    }
  };
}
