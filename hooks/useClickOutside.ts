'use client';
import { useEffect, useRef } from 'react';

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callbackRef.current();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return ref;
}
