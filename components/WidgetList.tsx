'use client';

import Link from 'next/link';

import WidgetCard from '@/components/WidgetCard';
import { Routes } from '@/lib/routes';
import { AllWidget, WidgetOverview } from '@/types/schemas/widget-schema';

const ALL_WIDGET: AllWidget = {
  type: 'all',
  icon: 'A',
  name: {
    en: 'All Exercises',
    ru: 'Все упражнения',
    by: 'Усе практыкаванні',
  },
  description: {
    en: 'Practice with all available question types in this topic.',
    ru: 'Практикуйтесь со всеми доступными типами вопросов в этой теме.',
    by: 'Практыкуйцеся з усімі даступнымі тыпамі пытанняў у гэтай тэме.',
  },
  totalQuestions: 0,
  correctAnswers: 0,
};

type WidgetListProperties = {
  widgets: WidgetOverview[];
  topicId: string;
  totalQuestions: number;
  correctAnswers: number;
};

export default function WidgetList({ widgets, topicId, totalQuestions, correctAnswers }: WidgetListProperties) {
  const allWidget = { ...ALL_WIDGET, totalQuestions, correctAnswers };
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
