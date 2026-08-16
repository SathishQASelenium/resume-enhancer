import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * True only after client-side hydration. Uses useSyncExternalStore instead of
 * a useEffect+setState pair so React doesn't flag a synchronous setState
 * inside an effect (react-hooks/set-state-in-effect) — this is the pattern
 * React's own docs recommend for hydration-gated rendering.
 */
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
