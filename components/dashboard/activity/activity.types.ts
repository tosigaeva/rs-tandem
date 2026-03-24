export type ActivityLevel = 'none' | 'low' | 'medium' | 'high';

export type ActivityDay = {
  date: string;
  count: number;
};

export type ActivityCell = ActivityDay & {
  level: ActivityLevel;
};

export type DailyActivityCardProperties = {
  days: ActivityDay[];
};
