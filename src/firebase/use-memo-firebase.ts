
'use client';

import { useMemo, useRef } from 'react';

export function useMemoFirebase<T>(factory: () => T, dependencies: any[]): T {
  const ref = useRef<T>(null);
  const depsRef = useRef<any[]>([]);

  const changed = dependencies.length !== depsRef.current.length || dependencies.some((dep, i) => dep !== depsRef.current[i]);

  if (changed) {
    (ref as any).current = factory();
    depsRef.current = dependencies;
  }

  return ref.current!;
}
