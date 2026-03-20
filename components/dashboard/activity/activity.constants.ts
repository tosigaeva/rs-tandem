import { ActivityLevel } from './activity.types';

export const activityLevelClassMap: Record<ActivityLevel, string> = {
  none: 'bg-[var(--heatmap-idle)]',
  low: 'bg-[var(--heatmap-low)]',
  medium: 'bg-[var(--heatmap-low)]',
  high: 'bg-[var(--heatmap-high)]',
};

type ActivityLegendItem = {
  label: string;
  level: ActivityLevel;
};

export const activityLegendItems: ReadonlyArray<ActivityLegendItem> = [
  {
    label: '0',
    level: 'none',
  },
  {
    label: '1-9',
    level: 'low',
  },
  {
    label: '10+',
    level: 'high',
  },
];
