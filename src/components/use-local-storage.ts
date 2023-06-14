import { useCallback, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const debouncedSetItem = useDebouncedCallback((value: string) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(key, value);
    }
  }, 1000);

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = useCallback(
    (value: T) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        debouncedSetItem(JSON.stringify(valueToStore));
      } catch (error) {
        console.log(error);
      }
    },
    [storedValue, debouncedSetItem],
  );
  return [storedValue, setValue];
}
