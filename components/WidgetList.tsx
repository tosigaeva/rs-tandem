import Link from 'next/link';

import WidgetCard from '@/components/WidgetCard';
import { Routes } from '@/lib/routes';
import { Widget, WidgetFilter } from '@/types/widget';

const ALL_WIDGET: Widget = {
  type: 'all',
  icon: 'A',
  title: 'All Exercises',
  description: 'Practice with all available question types in this topic.',
};

type WidgetListProperties = {
  widgets: Widget[];
  topicId: string;
};

export default function WidgetList({ widgets, topicId }: WidgetListProperties) {
  const widgetsWithAll = [ALL_WIDGET, ...widgets];
  return (
    <section>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {widgetsWithAll.map((widget) => (
          <li key={widget.type} className="overflow-visible">
            <Link
              href={{
                pathname: `${Routes.Library}/${topicId}`,
                query: { widgetType: widget.type },
              }}
            >
              <WidgetCard widget={widget} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
