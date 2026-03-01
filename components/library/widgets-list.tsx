import WidgetCard from '@/components/library/widget-card';
import { Widget } from '@/types/widget';

type WidgetListProperties = {
  widgets: Widget[];
};

export default function WidgetList({ widgets }: WidgetListProperties) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget) => (
          <li key={widget.id} className="overflow-visible">
            <WidgetCard widget={widget} />
          </li>
        ))}
      </ul>
    </section>
  );
}
