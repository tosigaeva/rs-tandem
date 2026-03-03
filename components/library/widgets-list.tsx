import Link from 'next/link';

import WidgetCard from '@/components/library/widget-card';
import { Routes } from '@/lib/routes';
import { Widget } from '@/types/widget';

type WidgetListProperties = {
  widgets: Widget[];
  topicId: string;
};

export default function WidgetList({ widgets, topicId }: WidgetListProperties) {
  return (
    <section>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {widgets.map((widget) => (
          <li key={widget.id} className="overflow-visible">
            <Link href={`${Routes.Library}/${topicId}/${Routes.Widget}/${widget.id}`}>
              <WidgetCard widget={widget} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
