import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Routes } from './routes';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentRoute(path: string) {
  return Object.values(Routes).find((route) => route === path);
}
