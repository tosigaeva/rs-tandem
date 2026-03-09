import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Routes } from './routes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNavigation(path: string): Routes | undefined {
  const navigation = path.split('/')[1] || '';

  return Object.values(Routes).find((route) => `/${navigation}` === route);
}

export function hashString(str: string) {
  let hash = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str.codePointAt(i) ?? 0;
    hash = (hash << 5) - hash + char;
    hash = Math.trunc(hash); // convert to 32bit int
  }

  return hash;
}
