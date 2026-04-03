'use client';

import Link from 'next/link';

import WidgetCard from '@/components/WidgetCard';
import { useTranslation } from '@/hooks/use-translation';
import { Routes } from '@/lib/routes';
import { AllWidget, Widget } from '@/types/widget';

type WidgetListProperties = {
  widgets: Widget[];
  topicId: string;
};

export default function WidgetList({ widgets, topicId }: WidgetListProperties) {
  const { t } = useTranslation();
  const allWidget: AllWidget = {
    type: 'all',
    icon: 'A',
    title: t('library.widget.all.title'),
    description: t('library.widget.all.description'),
  };
  const widgetsWithAll = [...widgets, allWidget];
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
