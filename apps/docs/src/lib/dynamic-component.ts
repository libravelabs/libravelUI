import dynamic from "next/dynamic";
import { ComponentType } from "react";

export function dynamicComponent<T = {}>(loader: () => Promise<any>) {
  return dynamic(async () => {
    const mod = await loader();
    return (mod.default ?? Object.values(mod)[0]) as ComponentType<T>;
  });
}
