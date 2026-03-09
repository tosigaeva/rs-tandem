import { WidgetComponent, widgetRegistry, WidgetSkinsMap } from '@/components/library/widget/widget.config';
import { WidgetType } from '@/types/widget';

export function getWidgetComponent<T extends WidgetType>(
  widgetType: T,
  skin: WidgetSkinsMap[T] = 'default'
): WidgetComponent<T> {
  const WidgetComponent: WidgetComponent<T> | undefined = widgetRegistry[widgetType]?.[skin];

  if (WidgetComponent === undefined) {
    throw new Error(`Unknown widget type: ${widgetType}`);
  }

  return WidgetComponent;
}
