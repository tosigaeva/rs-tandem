import { activityLegendItems, activityLevelClassMap } from './activity.constants';

export function ActivityLegend() {
  return (
    <ul className="text-muted-foreground/90 flex items-center gap-5 text-xs font-normal">
      {activityLegendItems.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden className={`size-3 rounded-full ${activityLevelClassMap[item.level]}`} />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
