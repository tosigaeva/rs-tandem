import { activityLegendItems, activityLevelColorMap } from './activity.constants';

export function ActivityLegend() {
  return (
    <div className="max-w-full overflow-x-auto">
      <ul className="text-muted-foreground/90 flex w-max items-center gap-5 text-xs font-normal whitespace-nowrap">
        {activityLegendItems.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span
              aria-hidden
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: activityLevelColorMap[item.level] }}
            />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
