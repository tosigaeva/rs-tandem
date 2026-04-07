import { ActivityLevel } from './activity.types';

export const activityLevelColorMap: Record<ActivityLevel, string> = {
  none: 'var(--heatmap-idle)',
  low: 'var(--heatmap-low)',
  medium: 'var(--heatmap-low)',
  high: 'var(--heatmap-high)',
};

export type ActivityLegendLevel = Exclude<ActivityLevel, 'medium'>;

type ActivityLegendItem = {
  label: string;
  level: ActivityLegendLevel;
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
