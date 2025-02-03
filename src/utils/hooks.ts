import { useState } from "react";

export function useBooleanState(value: boolean = false) {
  const [get, set] = useState(value);
  const toggle = () => set((e) => !e);
  return { get, set, toggle };
}
