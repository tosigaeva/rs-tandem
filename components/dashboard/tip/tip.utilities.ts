import { tips } from '@/components/dashboard/tip/tip.constants';
import { Tip } from '@/components/dashboard/tip/tip.types';

export function getRandomTip(items: Tip[] = tips) {
  return items[Math.floor(Math.random() * items.length)];
}
