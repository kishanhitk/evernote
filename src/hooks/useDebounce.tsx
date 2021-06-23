import { debounce } from "lodash";
import { useCallback } from "react";

function useDebounce(callback: Function, delay: number) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFn = useCallback(
    debounce((...args) => callback(...args), delay),
    [delay]
  );
  return debouncedFn;
}
export default useDebounce;
